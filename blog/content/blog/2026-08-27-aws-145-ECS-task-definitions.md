---
layout: blog
title: "AWS 145: Amazon ECS Task Definitions Deep Dive"
date: 2026-08-27T09:30:00.000Z
---

## TLDR

ECS Task Definitions are JSON blueprints that tell [ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/) how to run your Docker containers. They specify the image name, port mappings, memory and CPU requirements, [environment variables](https://en.wikipedia.org/wiki/Environment_variable), networking configuration, [IAM roles](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles/), and logging settings. The definition handles port mapping differently between EC2 (dynamic host port mapping with ALB support) and Fargate (unique private IPs per task). You can mount bind volumes to share data between containers within the same task, with Fargate offering 20-200 GB of ephemeral storage.

## Introduction

After getting [hands-on with ECS](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/), it's worth examining task definitions more closely. These JSON documents are the foundation of every ECS deployment. Understanding how they work like around port mapping, [IAM roles](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles/), [environment variables](https://en.wikipedia.org/wiki/Environment_variable), and data volumes—makes the difference between a basic deployment and a properly architected containerised application.

## What Goes Into a Task Definition

Task definitions are created through the AWS console, which provides a UI that generates the underlying JSON. You could write the JSON directly, but most people use the console.

The task definition contains everything [ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/) needs to run your containers:

- **Image Name** - Which Docker image to pull (from ECR or Docker Hub)
- **Port Bindings** - Container and host ports for the EC2 launch type
- **Memory and CPU** - Resource allocation for each container
- **[environment variables](https://en.wikipedia.org/wiki/Environment_variable)** - Configuration values passed to your containers
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

![port mapping diagram](/blog/src/images/145/145-1.png)

### Dynamic Host Port Mapping

You can define up to 10 containers per task definition, but that raises a question: how do you run multiple tasks on the same EC2 instance without port conflicts?

The answer is **Dynamic Host Port Mapping**.

When you set the container port to 80 but leave the host port as zero (undefined), ECS assigns a random host port for each task. Every ECS task running on that EC2 instance gets its own unique port on the host.

This creates a challenge: how does an Application Load Balancer know which port to use for each task?

The ALB handles this automatically. When linked to an ECS service, it uses Dynamic Host Port Mapping to discover the correct port for each task. The ALB queries ECS, finds out which random port was assigned, and routes traffic accordingly.

This only works with Application Load Balancers. Classic Load Balancers don't support this feature, which is one reason they're not recommended for ECS.

![dynamic port mapping diagram](/blog/src/images/145/145-2.png)

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

![diagram of IAM roles in Task Definitions](/blog/src/images/145/145-3.png)

## [environment variables](https://en.wikipedia.org/wiki/Environment_variable)

Task definitions support [environment variables](https://en.wikipedia.org/wiki/Environment_variable), which come from several sources.

### Hardcoded Variables

The simplest approach is hardcoding values directly in the task definition. This works for non-sensitive configuration like a public API endpoint or a feature flag.

For example: `API_URL=https://api.example.com`

### Secrets Manager and Parameter Store

For sensitive values—API keys, database passwords, shared configuration—you use either **AWS Secrets Manager** or **Systems Manager Parameter Store**.

You reference these values in your task definition rather than embedding them directly. When ECS launches a task, it fetches the secret at runtime and injects it as an environment variable.

The credentials never appear in your task definition JSON. The container sees them as regular [environment variables](https://en.wikipedia.org/wiki/Environment_variable), but they're pulled securely from the secret store.

![diagram of environment variables](/blog/src/images/145/145-4.png)

### Bulk Loading from S3

There's a third option for [environment variables](https://en.wikipedia.org/wiki/Environment_variable): loading them from an S3 bucket. This is called **bulk [environment variables](https://en.wikipedia.org/wiki/Environment_variable) loading**.

Instead of defining variables individually, you store them in a file in S3. The task definition references that file, and ECS loads all variables from it when the task starts.

This suits scenarios where you have dozens of [environment variables](https://en.wikipedia.org/wiki/Environment_variable) or when you want to manage configuration files separately from your task definitions.

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

![diagram of Data Volumes](/blog/src/images/145/145-5.png)

### Common Use Cases

The primary use case is **sidecar containers**. Your main application writes data, and a sidecar processes it:

- Application container generates logs → Logging sidecar ships them to CloudWatch
- Application container writes metrics → Metrics sidecar sends them to Prometheus
- Application container processes files → Sidecar validates and moves them to S3

Any scenario where multiple containers in the same task need to share files benefits from bind mounts.

## Conclusion

ECS Task Definitions control every aspect of how your containers run on AWS. Port mapping behaves differently between EC2 (dynamic host ports with ALB support) and Fargate (unique private IPs per task). IAM roles are attached at the task definition level and inherited by all tasks launched from it. [environment variables](https://en.wikipedia.org/wiki/Environment_variable) can be hardcoded, pulled from Secrets Manager or Parameter Store, or bulk loaded from S3. Bind mounts enable data sharing between containers in the same task, with storage backed by either EC2 instances or Fargate ephemeral volumes.

Getting these details right ensures your containerised applications are secure, scalable, and properly configured. The next post will explore [ECS rolling updates](https://magicishaqblog.netlify.app/2026-08-12-aws-143-ECS-rolling-updates/) and deployment strategies.

## Recap

More in the AWS series

- [AWS 1: BookClub Overview](https://magicishaqblog.netlify.app/aws/)
- [AWS 2: Getting Started](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/)
- [AWS 3: UI Guide and Walk through](https://magicishaqblog.netlify.app/2023-01-27-aws-3-UI-guide-and-walkthrough)
- [AWS 4: IAM Creating Users and Groups](https://magicishaqblog.netlify.app/2023-01-28-aws-4-IAM)
- [AWS 5: IAM Policies](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices)
- [AWS 6: Quiz 1 ](https://magicishaqblog.netlify.app/aws-quiz-one)
- [AWS 7: AWS CLI , How to install the CLI](https://magicishaqblog.netlify.app/2023-10-03-aws-7-cli)
- [AWS 8: Access keys](https://magicishaqblog.netlify.app/2023-10-03-aws-8-access-keys)
- [AWS 9: AWS roles](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles)
- [AWS 10: EC2 Introduction](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/)
- [AWS 11: EC2 View and Instance Types](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types)
- [AWS 12: Security Groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups)
- [AWS 13: EC2 SSH-ing into an instance](https://magicishaqblog.netlify.app/2023-03-17-aws-13-ssh)
- [AWS 14: Instance Connect](https://magicishaqblog.netlify.app/2023-03-24-aws-14-instance-connect)
- [AWS 15: EC2 Purchasing Options](https://magicishaqblog.netlify.app/2023-03-31-aws-15-EC2-purchasing-options)
- [AWS 16: EBS Overview and Hands on](https://magicishaqblog.netlify.app/2023-04-14-aws-16-EBS-Overview-and-Hands-On)
- [AWS 17: EBS Snapshots](https://magicishaqblog.netlify.app/2023-04-21-aws-17-ebs-snapshots)
- [AWS 18: AMI Overview](https://magicishaqblog.netlify.app/2023-04-28-aws-18-ami)
- [AWS 19: AMI Hands On](https://magicishaqblog.netlify.app/2023-06-02-aws-19-AMI-Hands-On)
- [AWS 20: EC2 Instance Stores](https://magicishaqblog.netlify.app/2023-06-09-aws-20-EC2-Instance-Store)
- [AWS 21: EBS Volume types](https://magicishaqblog.netlify.app/2023-06-16-aws-21-EBS-volume-types)
- [AWS: 22: EBS Multi Attach](https://magicishaqblog.netlify.app/2023-06-23-aws-22-EBS-Multi-Attach)
- [AWS: 23: EFS Elastic File System](https://magicishaqblog.netlify.app/2023-06-30-aws-23-EFS-Elastic-File-System)
- [AWS 24: EFS Hands On](https://magicishasblog.netlify.app/2023-07-07-aws-24-EFS-Hands-On)
- [AWS 25: EFS vs EBS](https://magicishasblog.netlify.app/2023-07-14-aws-25-EFS-vs-EBS)
- [AWS 26: Quiz 2](https://magicishaqblog.netlify.app/quiz-2/2023-07-21-aws-26-quiz-2/)
- [AWS 27: High availability and Scalability ](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)
- [AWS 28: Elastic Load Balancer](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-11-aws-28-elastic-load-balancing/)
- [AWS 29: Application Load Balancer](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/)
- [AWS 30: Alb hands on (part 1)](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-25-aws-30-alb-hands-on/)
- [AWS 31: Alb hands on (part 2)](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-09-01-aws-31-more-on-alb/)
- [AWS 32: Network load balancer](https://magicishaqblog.netlify.app/NLB/2023-09-09-aws-32-network-load-balancer/)
- [AWS 33: Network load balancer (hands on)](https://magicishaqblog.netlify.app/NLB/2023-09-15-aws-33-network-load-balancer-hands-on/)
- [AWS 34: Gateway load balancer](https://magicishaqblog.netlify.app/GatewayLoadBalancer/2023-09-22-aws-34-gateway-load-balancer/)
- [AWS 35: ELB Sticky Sessions](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2022-09-29-aws-35-ELB-Sticky-sessions/)
- [AWS 36: Cross Zone Load Balancing](https://magicishaqblog.netlify.app/CrossZoneLoadBalancing/2023-10-06-aws-36-cross-zone-load-balancing/)
- [AWS 37: ALB SSL Cert](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-10-13-aws-37-ALB-SSL-Cert/)
- [AWS 38: ALB SSL Hands On](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-10-20-aws-38-ALB-SSL-Hands-On/)
- [AWS 39: Connection Draining](https://magicishaqblog.netlify.app/2023-27-10-aws-39-connection-draining/)
- [AWS 40: Auto Scaling Groups](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/)
- [AWS 41: Auto Scaling Groups : Hands On](https://magicishaqblog.netlify.app/2023-11-17-aws-41-auto-scaling-groups-hands-on/)
- [AWS 42: Auto Scaling Groups Policy](https://magicishaqblog.netlify.app/2023-11-24-aws-42-Auto-Scaling-Groups-Policy/)
- [AWS 43: Auto Scaling Groups Policy - Hands On](https://magicishaqblog.netlify.app/2023-12-01-aws-43-auto-scaling-groups-hands-on/)
- [AWS 44: Auto Scaling Groups - Instant Refresh](https://magicishaqblog.netlify.app/2023-12-08-aws-44-auto-scaling-groups-instant-refresh/)
- [AWS 45: Quiz 3](https://magicishaqblog.netlify.app/quiz-3/2023-12-15-aws-45-quiz-3/)
- [AWS 46: RDS Relational Database Service](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/)
- [AWS 47: RDS Read Replica Multi Az](https://magicishaqblog.netlify.app/2023-29-12-aws-47-RDS-read-replica-Multi-Az/)
- [AWS 48: RDS Hands On](https://magicishaqblog.netlify.app/2023-05-01-aws-48-RDS-Hands-On/)
- [AWS 49: Amazon Aurora](https://magicishaqblog.netlify.app/2023-01-12-aws-49-Amazon-Aurora/)
- [AWS 50: Amazon Aurora: Hands On](https://magicishaqblog.netlify.app/2024-01-19-aws-50-Amazon-Aurora-hands-on/)
- [AWS 51: Amazon RDS and Amazon Aurora Security](https://magicishaqblog.netlify.app/2024-01-26-aws-51-Amazon-RDS-and-Amazon-Aurora-Security/)
- [AWS 52: RDS Proxy](https://magicishaqblog.netlify.app/2024-02-02-aws-52-RDS-Proxy/)
- [AWS 53: ElastiCache](https://magicishaqblog.netlify.app/2024-02-09-aws-53-ElastiCache/)
- [AWS 54: ElastiCache: Hands On](https://magicishaqblog.netlify.app/StructuredClone/2024-02-16-aws-54-ElastiCache-Hands-On/)
- [AWS 55: ElastiCache Strategies](https://magicishaqblog.netlify.app/2024-01-03-aws-55-ElastiCache-Strategies/)
- [AWS 56: Amazon Memory DB for Redis](https://magicishaqblog.netlify.app/2023-03-15-aws-56-AmazonMemoryDB-for-Redis/)
- [AWS 57: Quiz 3](https://magicishaqblog.netlify.app/quiz-4/2023-03-22-aws-57-quiz-4/)
- [AWS 58: DNS Name](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/)
- [AWS 59: Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)
- [AWS 60 Route 53 Registering Domain](https://magicishaqblog.netlify.app/2024-04-26-aws-60-Route53-registering-domain/)
- [AWS 61 Route 53 Creating First Record](https://magicishaqblog.netlify.app/2024-05-03-aws-61-Route53-Creating-First-Record/)
- [AWS 62: Setting up an EC2 instance and ALB with Route 53](https://magicishaqblog.netlify.app/2024-05-10-aws-62-setting-up-ec2-instances-and-alb-with-route-53/)
- [AWS 63: Route 53 TTL (Time to Live)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/)
- [AWS 64: Route 53 CNAME and alias records](https://magicishaqblog.netlify.app/2024-05-07-aws-64-CNAME-alias-records/)
- [AWS 65: Route 53 simple routing](https://magicishaqblog.netlify.app/2024-12-07-aws-65-Route53-simple-routing/)
- [AWS 66: Route 53 weighted routing](https://magicishaqblog.netlify.app/2024-19-07-aws-route53-weighted-routing/)
- [AWS 67: Route 53 Latency](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 67: Route 53 Latency Routing](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 68: Route 53 Health Checks](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/)
- [AWS 69: Route 53 Health Checks , Hands On](https://magicishaqblog.netlify.app/2024-08-16-aws-69-Health-checks-hands-on/)
- [AWS 70: Route 53 route policy failover](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 71: Route 53 Geolocation Routing](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 72: Route 53 Geoproximity Routing Policy](https://magicishaqblog.netlify.app/2024-11-09-aws-72-Route-53-Geoproximity-Routing-Policy/)
- [AWS 73: Route 53 Traffic Flow](https://magicishaqblog.netlify.app/2024-09-20-aws-73-Route-53-Traffic-Flow/)
- [AWS 74: Route 53 IP Routing Policy](https://magicishaqblog.netlify.app/2024-09-27-aws-74-Route-53-IP-Routing/)
- [AWS 75: Route 53 Multi Value Routing](https://magicishaqblog.netlify.app/2024-04-10-aws-75-Route-53-muti-value-routing/)
- [Quiz 5 : Route 53](https://magicishaqblog.netlify.app/quiz-5/quiz-5/)
- [AWS 76: Domain Registar vs DNS Service](https://magicishaqblog.netlify.app/aws-76-Domain-registar-vs-dns-service/)
- [AWS 77: VPC intro](https://magicishaqblog.netlify.app/2023-11-01-aws-77-VPC-intro/)
- [AWS 78: Understanding AWS VPC and Subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/)
- [AWS 79: VPC network ACIS and security group](https://magicishaqblog.netlify.app/2023-11-22-aws-79-VPC-network-acls-and-security-groups/)
- [AWS 80: VPC Peering](https://magicishaqblog.netlify.app/2024-11-29-aws-80-VPC-peering/)
- [AWS 81: VPC Round Up](https://magicishaqblog.netlify.app/2024-10-01-aws-81-vpc-round-up/)
- [AWS 82: Three Tier Architecture](https://magicishaqblog.netlify.app/2025-17-01-aws-82-three-tier-architecture/)
- [AWS 83: Quiz 6 VPC](https://magicishaqblog.netlify.app/quiz-6/2025-02-24-aws-83-quiz-6/)
- [AWS 84: Amazon S3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/)
- [AWS 85: Amazon s3 Hands on](https://magicishaqblog.netlify.app/2025-03-21-aws-85-Amazon-s3-hands-on/)
- [AWS 86: s3 security bucket policy](https://magicishaqblog.netlify.app/2025-28-03-aws-86-s3-security-bucket-policy/)
- [AWS 87: S3 Buckets - Hands On](https://magicishaqblog.netlify.app/2025-04-04-aws-87-s3-bucket-hands-on/)
- [AWS 88: S3 Buckets WebHosting](https://magicishaqblog.netlify.app/2025-04-11-aws-88-s3-buckets-web-hosting/)
- [AWS 89: Amazon S3 Buckets: Hands On](https://magicishaqblog.netlify.app/2025-04-25-aws-89-s3-website-hands-on/)
- [AWS 90: Amazon S3 Buckets: Versioning](https://magicishaqblog.netlify.app/2025-05-02-aws-90-S3-versioning/)
- [AWS 91: Amazon S3 Replication](https://magicishaqblog.netlify.app/2025-05-09-aws-91-amazon-s3-replication/)
- [AWS 92: Amazon S3 Replication Rules Notes](https://magicishaqblog.netlify.app/2023-05-16-aws-92-amazon-s3-replication-notes/)
- [AWS 93: Amazon S3 Replication Hands On](https://magicishaqblog.netlify.app/2025-05-23-aws-93-amazon-s3-replication-rules-hands-on/)
- [AWS 94: Amazon S3 Storage Classes](https://magicishaqblog.netlify.app/2025-05-20-aws-94-s3-storage-classes/)
- [AWS 95: Amazon S£ Storage Classes - Hands On](https://magicishaqblog.netlify.app/2025-06-13-aws-95-storage-classes-hands-on/)
- [AWS 96: Quiz 7](https://magicishaqblog.netlify.app/quiz-7/2025-07-04-aws-quiz-7/)
- [AWS 97: EC2 Instance Metadata](https://magicishaqblog.netlify.app/2025-07-11-aws-97-ec2-instance-metadata/)
- [AWS 98: EC2 Instance Metadata hands on](https://magicishaqblog.netlify.app/2025-18-07-aws-98-ec2-instance-metadata-hands-on/)
- [AWS 99: CLI Profiles](https://magicishaqblog.netlify.app/2025-25-07-aws-99-cli-profiles/)
- [AWS 100: CLI MFA IAM](https://magicishaqblog.netlify.app/2025-08-01-aws-100-CLI-MFA-IAM/)
- [AWS 101: SDK](https://magicishaqblog.netlify.app/2025-08-08-aws-101-sdk/)
- [AWS 102: Exponential Backoff & Service Limit Increase](https://magicishaqblog.netlify.app/2025-08-15-aws-102-Exponential-Backoff-&-Service-Limit-Increase/)
- [AWS 103: Credentials-and-Provider-Chain](https://magicishaqblog.netlify.app/2025-08-22-aws-103-Credentials-and-Provider-Chain/)
- [Quiz 8](https://magicishaqblog.netlify.app/quiz-8/2025-09-05-aws-quiz-8/)
- [AWS 104: SigV4](https://magicishaqblog.netlify.app/2025-08-29-aws-104-SigV4/)
- [AWS 105: S3 Lifecycle](https://magicishaqblog.netlify.app/2025-10-17-aws-105-s3-amazon-lifecycle/)
- [AWS 106: S3 Lifecycle Hands On](https://magicishaqblog.netlify.app/2025-10-24-aws-106-lifecycles-hands-on/)
- [AWS 107: S3 Event Notification](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/)
- [AWS 108: S3 Event Notification Hands On](https://magicishaqblog.netlify.app/2025-11-07-aws-108-event-notification-hands-on/)
- [AWS 109: S3 Performance](https://magicishaqblog.netlify.app/2025-11-14-aws-109-s3-performance/)
- [AWS 110: S3 Metadata](https://magicishaqblog.netlify.app/2025-11-21-aws-110-s3-metadata/)
- [AWS 111: S3 Object Encryption](https://magicishaqblog.netlify.app/2025-12-05-aws-111-S3-Object-Encryption/)
- [AWS 112: AWS CORS](https://magicishaqblog.netlify.app/2025-12-12-aws-112-AWS-Cors/)
- [AWS 113: CORS Hands On](https://magicishaqblog.netlify.app/2025-12-17-aws-113-Cors-Hands-On/)
- [AWS 114: MFA Delete](https://magicishaqblog.netlify.app/2025-aws-114-MFA-Delete/)
- [AWS 115: MFA Delete Hands On](https://magicishaqblog.netlify.app/2026-01-06-aws-115-MFA-delete-hands-on/)
- [AWS 116: Amazon S3 Access Logs](https://magicishaqblog.netlify.app/2026-01-16-aws-116-amazon-s3-access-LOGS/)
- [AWS 117: Access Logs Hands On](https://magicishaqblog.netlify.app/2023-23-01-aws-117-access-logs-hands-on/)
- [AWS 118: Pre-Signed URLs](https://magicishaqblog.netlify.app/2026-01-30-aws-118-pre-signed-urls/)
- [AWS 119: Pre-Signed URLs Hands On](https://magicishaqblog.netlify.app/2026-06-02-aws-119-pre-signed-urls-hands-on/)
- [AWS 120: S3 Access Points](https://magicishaqblog.netlify.app/2026-12-02-13-aws-120-access-points/)
- [AWS 121: S3 Object Lambda](https://magicishaqblog.netlify.app/2026-02-20-aws-121-s3-object-lambdas/)
- [AWS 123: Amazon CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/)
- [AWS 124: CloudFront Hands On](https://magicishaqblog.netlify.app/2026-03-13-aws-124-CloudFront-HandsOn/)
- [AWS 125: Amazon CloudFront Caching](https://magicishaqblog.netlify.app/2026-03-20-aws-125-Amazon-Cloudfront-Caching/)
- [AWS 126: CloudFront Cache Invalidations](https://magicishaqblog.netlify.app/2026-03-27-aws-126-CloudFront-cache-invalidations/)
- [AWS 127: CloudFront Cache Behaviors](https://magicishaqblog.netlify.app/2026-04-10-aws-127-CloudFront-Cache-Behaviors/)
- [AWS 132: 15 Minute Lightning Revision](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/)
- [AWS 133: Caching and Invalidations Hands On](https://magicishaqblog.netlify.app/2026-06-05-aws-133-Caching-and-invalidations-hands-on/)
- [AWS 134: ALB EC2 VPC Origin](https://magicishaqblog.netlify.app/2026-06-12-aws-134-ALB-EC2-VPC-Origin/)
- [AWS 135: CloudFront Georestriction](https://magicishaqblog.netlify.app/2026-06-19-aws-135-cloudFront-georestriction/)
- [AWS 136: CloudFront Signed URL Cookie](https://magicishaqblog.netlify.app/2026-06-26-aws-136-cloudfront-signed-url-cookie/)
- [AWS 137: CloudFront Pricing](https://magicishaqblog.netlify.app/2026-03-02-aws-137-cloudfront-pricing/)
- [AWS 138: CloudFront Real Time Logs](https://magicishaqblog.netlify.app/2026-10-07-aws-138-CloudFront-RealTimeLogs/)
- [AWS 140: Docker Introduction](https://magicishaqblog.netlify.app/2026-07-24-aws-140-docker-introduction/)
- [AWS 141: AWS ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/)
- [AWS 142: ECS Hands On](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/)
- [AWS 143: ECS Rolling Updates](https://magicishaqblog.netlify.app/2026-08-12-aws-143-ECS-rolling-updates/)
- [AWS 144: ECS Solution Architectures](https://magicishaqblog.netlify.app/2026-08-19-aws-144-ECS-solution-architectures/)
