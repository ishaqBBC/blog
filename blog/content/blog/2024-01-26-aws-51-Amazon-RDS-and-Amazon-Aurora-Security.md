---
layout: blog
title: "AWS 51: Amazon RDS and Amazon Aurora Security"
date: 2024-01-26T06:45:01.387Z
---

## TLDR

Explores the security features of [RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) and [Aurora](https://magicishaqblog.netlify.app/2023-01-12-aws-49-Amazon-Aurora/) databases on AWS. It covers encryption at rest using [Key Management Service (KMS)](https://aws.amazon.com/kms/), in-flight encryption between clients and databases, authentication options including [IAM roles](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles/), network access control through security groups, limited [SSH access](https://www.techradar.com/news/what-is-ssh-access-everything-you-need-to-know) through the RDS custom service, and the use of Audit Logs to monitor database activity. The goal is to simplify the understanding of complex database security measures.

![RDS icon](/blog/src/images/51/51-1.png)
![Amazon Aurora icon](/blog/src/images/51/51-2.png)

## Encryption at Rest

Let's talk about encrypting your data when it's at rest on Relational Database Service [RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) and [Aurora](https://magicishaqblog.netlify.app/2023-01-12-aws-49-Amazon-Aurora/) databases. This involves encrypting data on the [volumes](https://magicishaqblog.netlify.app/2023-06-16-aws-21-EBS-volume-types/). During the initial launch of your database, you can define encryption settings. The master database and any replicas can be encrypted using [Key Management Service (KMS)](https://aws.amazon.com/kms/). If the master isn't encrypted, read replicas can't be either. If you need to encrypt an existing unencrypted database, take a snapshot, and then restore it as an encrypted one. It's a snapshot and restore operation.

## In-Flight Encryption

Moving on to in-flight encryption, which secures data transmission between clients and your database. Every RDS and Aurora database is set up for in-flight encryption by default. Clients need to use [Transport Layer Security (TLS)](https://simple.wikipedia.org/wiki/Transport_Layer_Security) [root certificates](https://aws.amazon.com/what-is/ssl-certificate/) from AWS, available on the AWS website.

## Authentication Options

When it comes to authentication, the classic username and password combo is available. However, since it's AWS, you can also leverage [IAM roles](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles/) for connecting to your database. This means [EC2 instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance) with [IAM roles](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles/) can authenticate directly, avoiding the need for a username and password.

## Network Access Control

Control network access to your database using security groups. Specify which ports, IP addresses, or security groups are allowed or blocked.

## No SSH Access

RDS and Aurora are managed services and typically don't offer [SSH access](https://www.techradar.com/news/what-is-ssh-access-everything-you-need-to-know). But, if you use the [RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) custom service from AWS, you can get [SSH access](https://www.techradar.com/news/what-is-ssh-access-everything-you-need-to-know).

## Audit Logs

If you want to keep an eye on queries and database activity over time, enable Audit Logs. However, these logs have a shelf life. To preserve them for an extended period, send them to the CloudWatch Logs service on AWS.

## Recap

Following the previous blogs in the series.

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
- [AWS 27: High Availability and Scalability ](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)
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
