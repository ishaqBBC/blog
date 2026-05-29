---
layout: blog
title: "AWS 132: Lightning Talk"
date: 2026-05-29T14:30:12.910Z
---

## TLDR

AWS is like a LEGO city of cloud services. Key components include: [IAM](https://docs.aws.amazon.com/iam/) for security, [EC2](https://docs.aws.amazon.com/ec2/) for renting computers, [S3](https://docs.aws.amazon.com/s3/) for storage, [RDS](https://docs.aws.amazon.com/rds/)/[DynamoDB](https://docs.aws.amazon.com/dynamodb/) for databases, [Route 53](https://docs.aws.amazon.com/route53/) for DNS, [VPC](https://docs.aws.amazon.com/vpc/) for networking, containers ([ECS](https://docs.aws.amazon.com/ecs/)/[Fargate](https://docs.aws.amazon.com/fargate/)), automation ([CloudFormation](https://docs.aws.amazon.com/cloudformation/)/[CDK](https://docs.aws.amazon.com/cdk/)), [Lambda](https://docs.aws.amazon.com/lambda/) for serverless code, and monitoring tools ([CloudWatch](https://docs.aws.amazon.com/cloudwatch/)/[X-Ray](https://docs.aws.amazon.com/xray/)). Instead of buying physical infrastructure, businesses rent what they need, when they need it.


## Intro

Cloud computing can often feel overwhelming to newcomers. Terms such as EC2, Lambda and DynamoDB sound technical and abstract, especially for those outside the industry. But at its core, [Amazon Web Services (AWS)](https://magicishaqblog.netlify.app/aws/) is simply a collection of tools that help people build applications and websites on the internet.

The easiest way to understand AWS is to imagine it as a giant LEGO city.

Every service in AWS is like a different LEGO piece. Some pieces help build roads, others provide security, storage, or automation. Together, they allow developers to construct almost anything online from small websites to global streaming platforms.

Another way to picture AWS is as a massive department store. Inside are thousands of tools, each organised into sections depending on what you want to build.

This blog will attempt to mention the main services of AWS for the [Developer Cert](https://docs.aws.amazon.com/)

 

## Keys, Security and Access

Every building needs locks, keys and security guards. AWS is no different.


### IAM & AWS CLI

Identity and Access Management (IAM) works like employee ID badges. It controls who can enter certain areas and what actions they are allowed to perform.
![IAM icon](/blog/src/images/132/132-1.png)


### IAM Roles & Policies

These are the rules of the organisation. They decide who works where and what level of access each person receives.

Find out more on this site:
- [IAM basics](https://magicishaqblog.netlify.app/2023-01-28-aws-4-IAM/)
- [IAM policies](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices/)
- [IAM roles](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles/)
- [S3 security and bucket policy](https://magicishaqblog.netlify.app/2025-28-03-aws-86-s3-security-bucket-policy/)
- [S3 object encryption](https://magicishaqblog.netlify.app/2025-12-05-aws-111-S3-Object-Encryption/)
### S3 Security

Security settings for Amazon S3 act like padlocks on storage units, ensuring only authorised people can open them.
![IAM roles icon](/blog/src/images/132/132-2.png)
![IAM polices icon](/blog/src/images/132/132-3.png)

### KMS & Encryption

Encryption tools protect sensitive information by turning it into secret code that only approved users can read.

![Encryption icon](/blog/src/images/132/132-4.png)
 

## The Cloud: Renting Computers on the Internet

Traditionally, companies bought physical computers and stored them in offices or data centres. AWS changed that model.

Find out more on this site:
- [EC2 fundamentals](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/)
- [EC2 instance types and views](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types/)
- [EC2 storage options](https://magicishaqblog.netlify.app/2023-06-09-aws-20-EC2-Instance-Store/)
- [Elastic Load Balancing notes](https://magicishaqblog.netlify.app/2023-27-10-aws-39-connection-draining/)
- [Auto Scaling Groups overview](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/)

![EC2 Icon](/blog/src/images/132/132-5.png)
![EC2 Icon](/blog/src/images/132/132-6.png)
![EC2 Icon](/blog/src/images/132/132-8.png)

### EC2 Fundamentals

Amazon EC2 allows businesses to rent computers over the internet instead of buying their own machines.

### EC2 Instance Storage

These are the hard drives attached to those rented computers, storing files, applications and data.

### Elastic Load Balancer and Auto Scaling

Rather than relying on one computer, AWS can spread traffic across many machines. If demand increases, more servers can automatically appear to handle the load.

 

## Storage and Databases

Applications need places to store information, much like offices need filing cabinets.

Find out more on this site:
- [Amazon RDS basics](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/)
- [RDS read replicas and Multi-AZ](https://magicishaqblog.netlify.app/2023-29-12-aws-47-RDS-read-replica-Multi-Az/)
- [Amazon Aurora overview](https://magicishaqblog.netlify.app/2023-01-12-aws-49-Amazon-Aurora/)
- [Aurora hands-on](https://magicishaqblog.netlify.app/2024-01-19-aws-50-Amazon-Aurora-hands-on/)
- [ElastiCache fundamentals](https://magicishaqblog.netlify.app/2024-02-09-aws-53-ElastiCache/)
- [S3 fundamentals](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/)

### RDS, Aurora and ElastiCache

These are organised database systems that store structured information. ElastiCache uses memory (RAM) to retrieve information extremely quickly.
![RDS Icon](/blog/src/images/132/132-9.png)

### Amazon S3

S3 is one of AWS’s most popular services — essentially a giant digital storage bucket that can hold almost any file indefinitely.

find out more on this site: 
[AWS S3](https://magicishaqblog.netlify.app/?s=s3)
![s3 Icon](/blog/src/images/132/132-10.png)

### DynamoDB

DynamoDB is a fast, scalable database designed to handle huge amounts of information without slowing down.
![Dynamo DB Icon](/blog/src/images/132/132-11.png)

 

## The Internet Plumbing

Behind every website is a network making sure traffic flows correctly.

Find out more on this site:
- [Route 53 overview](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)
- [VPC introduction](https://magicishaqblog.netlify.app/2023-11-01-aws-77-VPC-intro/)
- [CloudFront fundamentals](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/)

### Route 53

This acts like the internet’s phonebook, translating website names into addresses computers understand.

### VPC Fundamentals

A Virtual Private Cloud (VPC) creates a secure, private network around your systems.

### CloudFront

CloudFront speeds up websites by storing copies closer to users around the world, reducing loading times.

 ![icons for internet plumbing](/blog/src/images/132/132-12.png)

## Containers and Easy Hosting

Modern applications are often packaged into portable units called containers.

### ECS, ECR and Fargate

Containers are like lunchboxes for applications — they ensure software behaves the same way wherever it runs.

### Elastic Beanstalk

Elastic Beanstalk simplifies deployment by handling much of the infrastructure automatically. Developers simply upload their application, and AWS takes care of the setup.

 ![icons for containers ](/blog/src/images/132/132-13.png)
 

## Automation and Infrastructure

One of AWS’s biggest strengths is automation.

### CloudFormation

CloudFormation works like a recipe card for infrastructure. Instead of manually building systems one piece at a time, developers can use templates to create entire environments automatically.

### CodeCommit, CodePipeline, CodeBuild and CodeDeploy

These services form an automated assembly line that tests, builds and deploys code.

### SAM (Serverless Application Model)

SAM provides simplified templates specifically for serverless applications.

### CDK (Cloud Development Kit)

The CDK allows engineers to define infrastructure using programming languages rather than clicking through dashboards.
![icons for automation](/blog/src/images/132/132-14.png)

 

## Messaging and Communication

Applications constantly communicate behind the scenes.

### SQS, SNS and Kinesis

These services help systems pass messages to one another — whether through queues, notifications or real-time data streams.

 ![icons for messaging](/blog/src/images/132/132-15.png)
 

## Monitoring and Visibility

Every system needs monitoring tools.

Find out more on this site:
- [S3 access logs hands-on](https://magicishaqblog.netlify.app/2023-23-01-aws-117-access-logs-hands-on/)
- [Amazon S3 access logs](https://magicishaqblog.netlify.app/2026-01-16-aws-116-amazon-s3-access-LOGS/)

### CloudWatch, X-Ray and CloudTrail

These services act like security cameras and activity logs, helping engineers monitor applications, diagnose problems and track user activity.

 ![icons for monitoring](/blog/src/images/132/132-16.png)
 

## Serverless Computing

One of AWS’s most powerful ideas is “serverless” computing.

Find out more on this site:
- [S3 event notifications](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/)
- [S3 event notifications hands-on](https://magicishaqblog.netlify.app/2025-11-07-aws-108-event-notification-hands-on/)

### Lambda

AWS Lambda runs small pieces of code only when needed. It performs a task, then shuts down again — meaning developers do not need to manage servers themselves.

### API Gateway

API Gateway acts as the front door to an application, handling incoming requests from users.

### Step Functions and AppSync

These services coordinate workflows, ensuring different tasks happen in the correct order.

 ![icons for serverless computing](/blog/src/images/132/132-17.png)
 

## User Sign-In and Authentication

### Cognito

Amazon Cognito manages user accounts, sign-up forms and login systems for applications.

 ![icons for Sign in](/blog/src/images/132/132-18.png)


 



## Conclusion

At its simplest, AWS is a rental platform for internet infrastructure. Instead of buying physical servers, storage systems and networking equipment, businesses can rent what they need, when they need it. That flexibility has transformed the technology industry.

For beginners, AWS may initially appear complex. But once broken down into simple building blocks — [security](https://aws.amazon.com/iam/), [storage](https://aws.amazon.com/s3/), [networking](https://aws.amazon.com/vpc/), [automation](https://aws.amazon.com/step-functions/), and [applications](https://aws.amazon.com/lambda/) — it becomes much easier to understand.

Like a LEGO city, every piece connects together to build something much bigger. For those studying AWS, practice exams and hands-on learning are the best way to reinforce understanding.


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