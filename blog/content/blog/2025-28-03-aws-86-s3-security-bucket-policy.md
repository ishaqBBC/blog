---
layout: blog
title: "AWS 86: S3 Security Bucket Policy"
date: 2025-03-28T10:11:31.136Z
---

## TLDR
[amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) security involves multiple layers to control access to your data, including user-based security via - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) policies, resource-based security with S3 Bucket policies, and finer-grain control with ACLs. S3 Bucket policies, written in JSON, allow you to define who can access your buckets and objects, enforce encryption, and manage public access. Additionally, features like Block Public Access help prevent accidental data exposure. By using a combination of - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) roles, policies, and encryption, you can ensure robust security for your S3 resources.


## Introduction

When it comes to securing your data on [amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/), there are multiple layers of security options available. These options allow you to control who can access your S3 buckets and objects, as well as how that data is protected. In this article, we'll explore the key elements of [amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) security, focusing on user-based, resource-based, and encryption-based controls.

## User-Based Security: IAM Policies

The first layer of security is user-based, achieved through - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) (Identity and Access Management) policies. As a user, you can define specific permissions through - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) policies to authorize which API calls are allowed for a given - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) user.

This allows you to control what actions the user can perform on your S3 resources. For example, you could specify that a particular user is only allowed to upload files but not delete them. This is crucial for ensuring that only authorized users can interact with your data in specific ways.

## S3 Bucket Policies
The second layer of security involves resource-based security, which is managed using S3 Bucket policies. These are JSON-based policies that are directly applied to your S3 buckets from the S3 console.

S3 Bucket policies define who can access your bucket and its objects. For example, you can use these policies to grant access to specific users or even users from another AWS account, a concept known as cross-account access. Additionally, these policies can make your bucket public, allowing anyone on the internet to access its contents, which can be useful in cases where you're serving public assets like website files.

S3 Bucket policies also enable more advanced use cases, such as requiring uploaded objects to be encrypted or restricting access to a specific set of API actions.

Object Access Control Lists (ACLs)
In addition to bucket policies, [amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) offers Object Access Control Lists (ACLs). These provide more granular control over object-level access. While ACLs can be enabled or disabled depending on your needs, they are less commonly used today in favor of bucket policies.

ACLs allow you to specify who can access individual objects within your bucket, with more detailed permissions such as "read" or "write". However, it's generally recommended to use bucket policies for more efficient and flexible control.

How IAM Permissions and Resource Policies Work Together
So, how do - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) permissions and resource policies work together? To access an S3 object, an - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) user or role must have the necessary permissions, as defined by - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) policies. Additionally, the resource-based policies (such as S3 Bucket policies) must also permit the requested action. If there is an explicit "Deny" in either the - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) policy or the bucket policy, access will be denied.

For example, if you create an - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) policy that allows "GetObject" on a specific bucket, but the S3 Bucket policy explicitly denies public access, the user will not be able to access the object  even though the - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) policy grants permission.

## Deep Dive
The core of S3 security revolves around Bucket policies, which are defined using JSON. A typical bucket policy includes:

- Resource Block: Specifies which bucket and objects the policy applies to.

- Effect: Defines whether the action is allowed or denied.

- Actions: Specifies which API actions are allowed or denied (e.g., "GetObject" to retrieve an object).

- Principal: Defines the entities (users or accounts) to whom the policy applies.

For example, a policy that allows anyone to access objects in a bucket might look like this:

```json

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::example-bucket/*",
      "Principal": "*"
    }
  ]
}
```
This policy grants public read access to every object within the "example-bucket" by setting the Principal to * (everyone). While useful in some cases, this is also a potential security risk if used incorrectly, so always be careful when making your buckets public.

Practical Use Cases for Bucket Policies
Bucket policies can be used in a variety of scenarios:

Public Access: You can configure a policy to allow public access to specific objects or your entire bucket, as demonstrated above. This is often used for serving static content such as images or videos.

Cross-Account Access: If you need to allow an - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) user from another AWS account to access your S3 bucket, you can create a bucket policy that specifically grants permissions to that user.

Enforcing Encryption: You can require objects to be encrypted at the time of upload. This ensures that all data in the bucket is securely encrypted, either via AWS-managed keys or customer-provided encryption keys.

Additional Security Settings: Block Public Access
[amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) includes an important security feature called Block Public Access, which prevents accidental public exposure of your data. When enabled, this setting ensures that no public policies can be applied to your bucket, even if an S3 Bucket policy explicitly allows public access.

This feature is particularly useful for organizations that want to ensure their data remains private and protected. You can set Block Public Access on individual buckets or apply it at the account level to enforce security across all your S3 buckets.

## Summary
In summary, [amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) provides a range of security features that allow you to control access to your data at both the user and resource levels. By using - [IAM](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices) policies, S3 Bucket policies, ACLs, and encryption, you can create a robust security posture for your S3 buckets.

Additionally, AWS has introduced safeguards like Block Public Access to help prevent accidental data leaks. Whether you're managing public assets or sensitive information, understanding and implementing these security controls is key to maintaining a secure environment on Amazon S3.



## Recap

from the previous entries in the series.

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
- [AWS 27: High availability and Scalability ](https://magicishaqblog.netlify.app/section6/2023-07-28-high_[availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)_and_scalability/)
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




