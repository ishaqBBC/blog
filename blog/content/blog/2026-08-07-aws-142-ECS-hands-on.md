---
layout: blog
title: "AWS 142: ECS Hands On"
date: 2026-08-07T10:30:00.000Z
---

## TLDR

This hands-on tutorial walks through creating an [ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/) service using AWS Fargate. You'll create a task definition, deploy an nginx container, connect it to an Application Load Balancer, and scale it up and down. The entire setup runs serverless—no [EC2 instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) to manage.

## Introduction

Theory is useful, but nothing beats actually building something. In the [previous post](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/), we covered how Amazon ECS works. Now it's time to get hands-on.

We're going to deploy a simple nginx web server using ECS and Fargate. By the end, you'll have a working containerised application running behind a load balancer. And you'll see how easy it is to scale containers up and down.

## Creating a Task Definition

Before launching anything on ECS, you need a task definition. Think of it as a blueprint that tells ECS what container to run and how to run it.

### Step 1: Start the Task Definition

Head to the ECS console and find the **Task Definitions** section. Click **Create new task definition**.

Give it a name: `nginxdemos-hello`

Why this name? We're using a Docker image called `nginxdemos/hello` from Docker Hub. It's a simple demo nginx server—perfect for testing.

![Creating task definition](/blog/src/images/142/142-1.png)

### Step 2: Choose Your Infrastructure

Now you pick where the container runs. Two options:

- **Fargate** - Serverless (AWS manages the servers)
- **EC2** - You manage the servers yourself

Leave **Fargate** selected. No need to deal with EC2 instances.

For the operating system, stick with **Linux**. The architecture defaults are fine.

### Step 3: Configure Task Size

Here's where you specify resources. Fargate needs to know how much CPU and memory to allocate.

For CPU, select **0.5 vCPU**. For memory, choose **1 GB**.

This keeps costs minimal. You can go much higher—up to 16 vCPU and 120 GB of memory—but we don't need that for a demo.

### Step 4: Task Roles

Two types of roles matter here:

**Task Role** - Lets your container make AWS API calls. We don't need this right now, so leave it blank.

**Task Execution Role** - ECS needs this to pull your Docker image and send logs to CloudWatch. Leave it as default. If the role doesn't exist yet, ECS creates it automatically.

### Step 5: Add the Container

This is the important bit. Under containers, add these details:

- **Name**: `nginxdemos-hello`
- **Image URI**: `nginxdemos/hello`

ECS pulls this image from Docker Hub automatically. Mark it as an **essential container** (it already is by default).

For **port mappings**, set it to port **80**. This exposes the nginx web server.

Everything else? Leave it as default. The defaults work fine for logging, environment variables, and resource limits.

### Step 6: Storage

Fargate provides **21 GB** of ephemeral storage by default. That's temporary storage that disappears when the task stops. For this demo, it's plenty. Leave it unchanged.

Click **Create**.

Your task definition is ready. You'll see it listed with a revision number (probably revision 1).

![Task definition created](/blog/src/images/142/142-2.png)

## Creating an ECS Service

A task definition describes what to run. A service actually runs it—and keeps it running.

### Step 1: Navigate to Your Cluster

Go to **Clusters** in the ECS console. If you don't have a cluster yet, create one first (just give it a name—Fargate doesn't need EC2 instances).

Select your cluster and click **Create Service**.

### Step 2: Configure the Service

Pick your task definition: **nginxdemos-hello**

Choose the latest revision.

Give your service a name. The console suggests one based on your task definition. You can keep it or change it.

For **Compute configuration**, leave it on **Fargate**. The capacity provider strategy uses Fargate to launch tasks.

Platform version? Leave it as **Latest**.

### Step 3: Deployment Configuration

**Replica** mode means you run multiple copies of your task across the cluster.

Set **desired tasks** to **1**. This tells ECS to run one container.

Want more? You could set it to 4, and you'd get four containers running. But one is enough for now.

Leave the rest of the deployment settings alone.

### Step 4: Networking

This bit matters. Your container needs network access.

The default VPC and subnets are fine.

Click **Create new security group**. The console generates a name automatically.

Add a rule: Allow **HTTP traffic** from anywhere. This opens port 80 so you can access the nginx server from the internet.

Turn on **public IP**. Without this, you can't reach your container from outside AWS.

![Networking configuration](/blog/src/images/142/142-3.png)

### Step 5: Load Balancing

Here's where it gets interesting. You can connect your ECS service to a load balancer.

Select **Application Load Balancer**.

Click **Create a new load balancer**. Give it a name: `DemoALBForECS`

Set the listener to port **80**.

Create a new target group: `nginxdemosTG`

The target group also uses port **80**.

Leave **VPC Lattice** disabled. We don't need service mesh features for this demo.

### Step 6: Skip Auto Scaling

For now, we're not setting up auto scaling. You can manually change the number of tasks, which is enough for this tutorial.

Click **Create**.

ECS spins up your service. This takes a minute or two.

![Service created](/blog/src/images/142/142-4.png)

## Testing the Deployment

Once the service is active, let's check if it works.

### Step 1: Check the Service Status

Click into your service. You should see:

- **Desired tasks**: 1
- **Running tasks**: 1
- **Status**: Active

Perfect. Your container is running.

### Step 2: Find the Load Balancer

Click on the **Target Group** linked to your service.

Inside the target group, you'll see one registered target—the IP address of your container.

Click on the **Load Balancer** name.

### Step 3: Access Your Application

Copy the **DNS name** of the load balancer. It looks something like:

`DemoALBForECS-123456789.us-east-1.elb.amazonaws.com`

Paste it into a browser.

You should see the nginx welcome page. Success!

The page shows the server address—the private IP of your container. That matches the IP registered in the target group.

![Nginx running](/blog/src/images/142/142-5.png)

## Scaling Your Service

Fargate makes scaling ridiculously easy. No servers to provision. Just change a number.

### Scaling Up

Go back to your service in the ECS console.

Click **Update Service**.

Change **desired tasks** from 1 to **3**.

Leave everything else unchanged. Click **Update**.

ECS launches two more containers immediately. Refresh the tasks view—you'll see three tasks running.

Now refresh your browser a few times. The server address changes with each reload. The load balancer distributes traffic across all three containers.

That's it. You've scaled up. Three containers running, zero server management.

### Scaling Down

To save costs, scale back to zero.

Update the service again. Set **desired tasks** to **0**.

The tasks stop. The service stays active, but no containers run. No charges.

If you created an EC2 cluster earlier (we didn't), you'd also want to set its Auto Scaling Group to zero capacity. But with pure Fargate, just stopping the tasks is enough.

## What Just Happened?

Let's recap what you built:

1. **Task Definition** - Told ECS to run the nginxdemos/hello container with 0.5 vCPU and 1 GB RAM
2. **ECS Service** - Deployed the task on Fargate with one running container
3. **Application Load Balancer** - Distributed traffic to your container
4. **Scaling** - Went from one container to three, then back to zero

All of this without touching a single EC2 instance. That's the power of Fargate.

## Cleaning Up

When you're done experimenting:

- Set desired tasks to 0
- Delete the service (optional)
- Delete the load balancer (optional)
- Delete the task definition (optional)

Fargate only charges for running tasks. If nothing's running, you're not paying.

## Conclusion

ECS with Fargate removes most of the complexity from running containers. You define what to run, and AWS handles the rest.

No capacity planning. No server patching. No infrastructure management. Just containers doing their job.

The next post will explore more advanced ECS features—task placement strategies, service discovery, and integration with other AWS services.

## Recap

More in the AWS series:

- [AWS 1: BookClub Overview](https://magicishaqblog.netlify.app/aws/)
- [AWS 2: Getting Started](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/)
- [AWS 10: EC2 Introduction](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/)
- [AWS 29: Application Load Balancer](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/)
- [AWS 140: Docker Introduction](https://magicishaqblog.netlify.app/2026-07-24-aws-140-docker-introduction/)
- [AWS 141: Amazon ECS - Elastic Container Service](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/)
