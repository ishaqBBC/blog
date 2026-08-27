---
layout: blog
title: "AWS 145: Amazon ECS Task Definitions Deep Dive"
date: 2026-08-27T09:30:00.000Z
---

## TLDR

ECS Task Definitions are JSON blueprints that tell ECS how to run your Docker containers. They specify the image name, port mappings, memory and CPU requirements, environment variables, networking configuration, [IAM roles](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles/), and logging settings. The definition handles port mapping differently between EC2 (dynamic host port mapping with ALB support) and Fargate (unique private IPs per task). You can mount bind volumes to share data between containers within the same task, with Fargate offering 20-200 GB of ephemeral storage.

## Introduction

After getting [hands-on with ECS](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/), it's worth examining task definitions more closely. These JSON documents are the foundation of every ECS deployment. Understanding how they work—particularly around port mapping, IAM roles, environment variables, and data volumes—makes the difference between a basic deployment and a properly architected containerised application.

## What Goes Into a Task Definition

Task definitions are created through the AWS console, which provides a UI that generates the underlying JSON. You could write the JSON directly, but most people use the console.

The task definition contains everything [ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/) needs to run your containers:

- **Image Name** - Which Docker image to pull (from ECR or Docker Hub)
- **Port Bindings** - Container and host ports for the EC2 launch type
- **Memory and CPU** - Resource allocation for each container
- **Environment Variables** - Configuration values passed to your containers
- **Networking Information** - Network mode and DNS settings
- **IAM Role** - What AWS services your task can access
- **Logging Configuration** - Where to send container logs (typically CloudWatch)

The AWS exam focuses on a few of these, particularly port mappings and IAM roles.

## Port Mapping on EC2

Port configuration works differently depending on your launch type. With EC2, you're dealing with both container ports and host ports.

### Container and Host Ports

Consider an [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) registered with an ECS cluster. It runs the ECS agent, which enables container orchestration.

You deploy an Apache HTTP server through an ECS task definition. The server needs exposure to the internet.

The **container port** is 80—that's where Apache listens inside the container. But you also specify a **host port** on the EC2 instance itself. This could be 80, or it could be something else like 8080. They don't have to match.

External traffic hits the EC2 instance on the host port (8080), which maps to the container port (80), giving access to the HTTP server running inside.

With Fargate, host ports are irrelevant because there's no host to manage. Fargate only uses container ports.

### Dynamic Host Port Mapping

You can define up to 10 containers per task definition, but that raises a question: how do you run multiple tasks on the same EC2 instance without port conflicts?

The answer is **Dynamic Host Port Mapping**.

When you set the container port to 80 but leave the host port as zero (undefined), ECS assigns a random host port for each task. Every ECS task running on that EC2 instance gets its own unique port on the host.

This creates a challenge: how does an Application Load Balancer know which port to use for each task?

The ALB handles this automatically. When linked to an ECS service, it uses Dynamic Host Port Mapping to discover the correct port for each task. The ALB queries ECS, finds out which random port was assigned, and routes traffic accordingly.

This only works with Application Load Balancers. Classic Load Balancers don't support this feature, which is one reason they're not recommended for ECS.

### Security Groups with Dynamic Ports

From a security perspective, the [EC2 instance security group](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/) must allow **any port** from the ALB security group. You can't predict which port will be assigned, so you allow the entire range.

It's not ideal from a least-privilege standpoint, but it's the trade-off for using dynamic port mapping on EC2.

## Port Mapping on Fargate

Fargate simplifies port configuration considerably.

Each ECS task gets a **unique private IP address** through an Elastic Network Interface (ENI). There's no host, so you only define container ports.

If you run four tasks in your ECS cluster, each gets its own ENI with its own private IP. All four tasks can use the same container port—say, port 80—because they're on different network interfaces.

When you attach an Application Load Balancer, it connects to each Fargate task on the same port. Simple.

For security groups, the **ECS ENI security group** needs to allow port 80 (or 443 for HTTPS) from the ALB security group. The ALB security group allows port 80/443 from the internet. Clean and straightforward.

## IAM Roles in Task Definitions

IAM roles are defined at the task definition level, not the service level. This is an exam favourite.

When you create a task definition, you assign an **ECS Task Role**. This role grants your containerised application permissions to call AWS services.

For example:

- Task Definition A has a role allowing access to [Amazon S3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/)
- Task Definition B has a role allowing access to DynamoDB

When you create an ECS service from Task Definition A, every task in that service inherits the S3 access role. If you create another service from Task Definition B, those tasks get DynamoDB access instead.

Each task definition can have a different role, giving you fine-grained control over what your containers can do. This is particularly useful in microservices architectures where different services need different permissions.

Remember: the role is attached to the task definition, not the service. All tasks launched from that definition share the same role.

## Environment Variables

Task definitions support environment variables, which come from several sources.

### Hardcoded Variables

The simplest approach is hardcoding values directly in the task definition. This works for non-sensitive configuration like a public API endpoint or a feature flag.

For example: `API_URL=https://api.example.com`

### Secrets Manager and Parameter Store

For sensitive values—API keys, database passwords, shared configuration—you use either **AWS Secrets Manager** or **Systems Manager Parameter Store**.

You reference these values in your task definition rather than embedding them directly. When ECS launches a task, it fetches the secret at runtime and injects it as an environment variable.

The credentials never appear in your task definition JSON. The container sees them as regular environment variables, but they're pulled securely from the secret store.

### Bulk Loading from S3

There's a third option for environment variables: loading them from an S3 bucket. This is called **bulk environment variables loading**.

Instead of defining variables individually, you store them in a file in S3. The task definition references that file, and ECS loads all variables from it when the task starts.

This suits scenarios where you have dozens of environment variables or when you want to manage configuration files separately from your task definitions.

## Sharing Data Between Containers

A single ECS task can run multiple containers. This is common when you have a main application container plus sidecar containers for logging, metrics collection, or proxying.

These containers sometimes need to share files. That's where **bind mounts** come in.

### How Bind Mounts Work

A bind mount creates shared storage within an ECS task. You define a volume path—say, `/var/logs`—and mount it into multiple containers.

Your application containers write log files to `/var/logs`. Your logging sidecar reads from `/var/logs` and ships those logs to CloudWatch or another destination.

Both containers see the same filesystem at that path. Changes made by one container are immediately visible to the other.

Bind mounts work for both EC2 and Fargate launch types.

### Storage Backing

With **EC2 tasks**, the bind mount uses storage from the EC2 instance itself. The data lifecycle is tied to the instance. If the instance terminates, the data disappears.

With **Fargate tasks**, you get ephemeral storage. The data lifecycle is tied to the task. When the task stops, the storage vanishes.

Fargate provides between **20 GB and 200 GB** of ephemeral storage per task, configurable when you create the task definition. That's plenty of space for temporary files, logs, or intermediate processing results.

### Common Use Cases

The primary use case is **sidecar containers**. Your main application writes data, and a sidecar processes it:

- Application container generates logs → Logging sidecar ships them to CloudWatch
- Application container writes metrics → Metrics sidecar sends them to Prometheus
- Application container processes files → Sidecar validates and moves them to S3

Any scenario where multiple containers in the same task need to share files benefits from bind mounts.

## Conclusion

ECS Task Definitions control every aspect of how your containers run on AWS. Port mapping behaves differently between EC2 (dynamic host ports with ALB support) and Fargate (unique private IPs per task). IAM roles are attached at the task definition level and inherited by all tasks launched from it. Environment variables can be hardcoded, pulled from Secrets Manager or Parameter Store, or bulk loaded from S3. Bind mounts enable data sharing between containers in the same task, with storage backed by either EC2 instances or Fargate ephemeral volumes.

Getting these details right ensures your containerised applications are secure, scalable, and properly configured. The next post will explore [ECS rolling updates](https://magicishaqblog.netlify.app/2026-08-12-aws-143-ECS-rolling-updates/) and deployment strategies.
