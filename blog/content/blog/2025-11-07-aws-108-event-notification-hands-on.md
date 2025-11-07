---
layout: blog
title: "AWS 108: Event Notification Hands On"
date: 2025-11-07T10:09:36.359Z
---

## TLDR
[Amazon S3 Event Notifications](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/) let your bucket tell other AWS services when something happens — like when a file is uploaded or deleted. You can send these alerts to SQS, SNS, or Lambda to trigger actions automatically. In this blog, a bucket was set up to send a message to an SQS queue every time a new file (like an image) was added. 

## Introduction

When we use Amazon S3, we often want to know when something happens — like when a new file is added.  
This is where **S3 [Event Notifications](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/)** come in. They tell other parts of our system when an event happens.

below are the steps:


## 1: Create a Bucket

First, we make a new bucket.  
We can name it something like **“magicishaq-v3-events-notifications.”**  
A bucket is a big folder in the cloud where we can store files.

Once the bucket is ready, we can open it and start setting up notifications.

![diagram of a screenshot of the bucket](/blog/src/images/108/108-1.png)

## Find the Event Notifications Section

In the S3 console, we go to **Properties** and scroll down until we see **Event Notifications**.  
Here, we can do two things:

1. **Create an event notification** – this sends messages to other services when things happen in our bucket.  
2. **Use EventBridge** – this sends all events to Amazon EventBridge for more advanced setups.

We’ll use the first option because it’s simpler.

![diagram of opening the event notifications](/blog/src/images/108/108-2.png)

## Create an Event Notification

Let’s make a new event notification.  
We’ll call it **“DemoEventNotification.”**

We can choose what types of events we want to listen for.  
In this case, we’ll listen for **“All object create events.”**  
That means when someone uploads a new file, we’ll get a message about it.


## Step 4: Choose Where to Send the Notification

S3 can send notifications to three types of places:

- **[Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)** (to run code)
- **[SNS](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)** (to send messages)
- **[SQS](https://docs.aws.amazon.com/sqs/latest/dg/welcome.html)** (to send messages to a queue)

We’ll choose **SQS** — a simple message queue where events wait to be read.

---

## Create and Connect an SQS Queue

Next, we make an SQS queue called **“DemoS3Notification.”**  
This queue will collect messages from our S3 bucket.

However, at first, S3 cannot send messages to it.  
We need to **update the access policy** to give S3 permission.

We do this by using the **Policy Generator** tool:
- Allow the action **“SendMessage”**
- Paste in our queue’s name (the ARN)
- Generate and save the policy

Once we save the new policy, S3 can now send messages to our queue.

![diagram of the sqs queue policy](/blog/src/images/108/108-3.png)

## Test the Notification

We go back to S3 and save our notification setup.  
 
S3 sends a small test message to the SQS queue to check the connection.

Now we can try it for real.

We upload a file — let’s say **coffee.jpeg** — into our bucket.  
When the file is uploaded, S3 automatically sends a message to our SQS queue.

If we open the queue and **poll for messages**, we can see a new one.  
It says an object was created, and its name is **coffee.jpeg**.

That’s how we know it worked.

![diagram of testing the message](/blog/src/images/108/108-4.png)
---

## What Can We Do Next?

This is where things get exciting.  
Now that S3 can tell us when something happens, we can build smart systems.

For example:
- When a new photo is uploaded, we could automatically make a **thumbnail**.  
- Or we could send a **notification** to a user.  
- Or trigger a **Lambda function** to process the data.

S3 [Event Notifications](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/) make all this possible.

---

## Key Takeaways

- S3 [Event Notifications](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/) help us **react to events** in our storage buckets.  
- We can send notifications to **SQS**, **SNS**, or **Lambda**.  
- We can also use **EventBridge** for more complex workflows.  
- Once it’s set up, our system can **automate tasks** whenever something changes in S3.

Congrats for staying this long...

this blog has taught us S3 [Event Notifications](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/) in a simple way.  
This small setup helps our cloud systems talk to each other and work automatically.

## Recap

Based off the previous posts in the series, we have covered the following topics:

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






