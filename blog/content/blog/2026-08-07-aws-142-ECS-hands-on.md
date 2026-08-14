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
- [AWS 105: Amazon s3 lifecycle Rules](https://magicishaqblog.netlify.app/2025-10-17-aws-105-s3-amazon-lifecycle/)
- [AWS 106: Amazon s3 lifecycle Rules - Hands On](https://magicishaqblog.netlify.app/2025-10-24-196-lifecycles-hands-on/)
- [AWS 107: Amazon s3 event notifications](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification)
- [AWS 108: Event Notifications Hands On](https://magicishaqblog.netlify.app/2025-11-07-aws-108-event-notification-hands-on/)
- [AWS 109: Amazon s3 performance](https://magicishaqblog.netlify.app/2025-11-14-aws-109-s3-performance/)
- [AWS 110: Quiz 10](https://magicishaqblog.netlify.app/quiz-10/2015-11-28-Quiz-10/)
- [AWS 111: Object Encryption](https://magicishaqblog.netlify.app/2025-12-05-aws-111-S3-Object-Encryption/)
- [AWS 112: Cors](https://magicishaqblog.netlify.app/2025-12-12-aws-112-AWS-Cors/)
- [AWS 113: Cors Hands On](https://magicishaqblog.netlify.app/2025-12-17-aws-113-Cors-Hands-On/)
- [AWS 114: MFA Delete](https://magicishaqblog.netlify.app/2025-aws-114-MFA-Delete/)
- [AWS 115: MFA Delete Hands On](https://magicishaqblog.netlify.app/2026-01-06-aws-115-MFA-delete-hands-on/)
- [AWS 116: Amazon S3 Access Logs](https://magicishaqblog.netlify.app/2026-01-16-aws-116-amazon-s3-access-LOGS/)
- [AWS 117: Amazon S3 Access Logs - Hands On](https://magicishaqblog.netlify.app/2023-23-01-aws-117-access-logs-hands-on/)
- [AWS 118: Amazon S3 Pre-signed URLS](https://magicishaqblog.netlify.app/2026-01-30-aws-118-pre-signed-urls/)
- [AWS 119: Amazon S3 Pre-signed URLS Hands On](https://magicishaqblog.netlify.app/2026-06-02-aws-119-pre-signed-urls-hands-on/)
- [AWS 120: Amazon S3 Access Points](https://magicishaqblog.netlify.app/2026-12-02-13-aws-120-access-points/)
- [AWS 121: Amazon S3 Object lambdas](https://magicishaqblog.netlify.app/2026-02-20-aws-121-s3-object-lambdas/)
- [AWS 122: Quiz 11: Amazon S3 Security](https://magicishaqblog.netlify.app/quiz-11/2026-02-20-Quiz-11/)
- [AWS 123: Amazon CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/)
- [AWS 124: Amazon CloudFront - Hands On](https://magicishaqblog.netlify.app/2026-03-13-aws-124-CloudFront-HandsOn/)
- [AWS 125: CloudFront Caching](https://magicishaqblog.netlify.app/2026-03-20-aws-125-Amazon-Cloudfront-Caching/)
- [AWS 126: CloudFront Invalidations](https://magicishaqblog.netlify.app/2026-03-27-aws-126-CloudFront-cache-invalidations/)
- [AWS 127: Cache Behaviors](https://magicishaqblog.netlify.app/2026-04-10-aws-127-CloudFront-Cache-Behaviors/)
- [AWS 128: Quiz 12 Advanced Security](https://magicishaqblog.netlify.app/quiz-12/2026-04-17-Quiz-12/)
- [AWS 129: Quiz 13 Advanced Security Part 2](https://magicishaqblog.netlify.app/quiz-13/2026-04-24-Quiz-13/)
- [AWS 130: Quiz 14 Advanced Security Part 3](https://magicishaqblog.netlify.app/quiz-14/2026-05-01-quiz-14/)
- [AWS 131: Quiz 15 Advanced Security Part 4](https://magicishaqblog.netlify.app/quiz-15/2026-08-05-quiz-15/)
- [AWS 132: Lighting Talk ](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/)
- [AWS 133: AWS 133: Caching and Invalidations - Hands On](https://magicishaqblog.netlify.app/2026-06-05-aws-133-Caching-and-invalidations-hands-on/)
- [AWS 134: CloudFront VPC Origins for ALB, NLB, and EC2](https://magicishaqblog.netlify.app/2026-06-12-aws-134-ALB-EC2-VPC-Origin/)
- [AWS 135:CloudFront Geo-restriction ](https://magicishaqblog.netlify.app/2026-06-19-aws-135-cloudFront-georestriction/)
- [AWS 136: Cloudfront Signed Url and Cookies](https://magicishaqblog.netlify.app/2026-06-26-aws-136-cloudfront-signed-url-cookie/)
- [AWS 137: CloudFront Pricing](https://magicishaqblog.netlify.app/2026-03-02-aws-137-cloudfront-pricing/)
- [AWS 138: CloudFront RealTime Logs](https://magicishaqblog.netlify.app/2026-10-07-aws-138-CloudFront-RealTimeLogs/)
- [AWS 139: Quiz 16 CloudFront](https://magicishaqblog.netlify.app/quiz%2016/2026-07-17-quiz-16/)
- [AWS 140: Docker Introduction](https://magicishaqblog.netlify.app/2026-07-24-aws-140-docker-introduction/)
- [AWS 141: ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/)
