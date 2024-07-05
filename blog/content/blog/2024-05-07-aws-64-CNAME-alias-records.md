---
layout: blog
title: "AWS 64: Route 53 CNAME and Alias"
date: 2024-07-05T10:40:50.683Z
---

## TLDR

[CNAME](https://docs.aws.amazon.com/managedservices/latest/ctref/management-directory-dns-add-cname-record.html) records in AWS allow you to map a [subdomain](https://kb.hubkengroup.com/en/what-are-domains-and-subdomains) to another [hostname](https://en.wikipedia.org/wiki/Hostname#:~:text=On%20the%20Internet%2C%20a%20hostname,the%20domain%20name%20wikipedia.org.) and cannot be used at the [root domain level](https://raventools.com/marketing-glossary/root-domain/), while [Alias records](https://support.dnsimple.com/articles/alias-record/), specific to AWS, enable mapping both root and subdomains to AWS resources like [Load Balancers](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/) and [CloudFront](https://aws.amazon.com/cloudfront/) distributions. Alias records are free, support [health checks](https://aws.amazon.com/builders-library/implementing-health-checks/), and automatically update if the underlying resource's [IP](https://en.wikipedia.org/wiki/IP_address) changes, making them ideal for integrating AWS services with your domain. Understanding these differences is crucial for AWS exam preparation.

## Introduction

When managing your AWS resources, especially for [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) configurations, understanding the differences between CNAME and Alias records is crucial. Both play significant roles in routing traffic to your AWS resources, such as [Load Balancers](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/) and [CloudFront](https://aws.amazon.com/cloudfront/) distributions, but they function differently. Let’s break down these differences to help you prepare for the AWS exam.

### What is a CNAME Record?

A **CNAME (Canonical Name) record** allows you to map one domain name to another domain name. This is useful when you want to point a subdomain (like `app.mydomain.com`) to another domain (such as `example.anything.com`). Here are some key points about CNAME records:

- **Use Case**: CNAME records are typically used to map a subdomain to another hostname.
- **Limitations**: CNAME records cannot be used at the root level of a domain. For example, you cannot set `mydomain.com` to be a CNAME record; it must be something like `net.mydomain.com`.
- **Flexibility**: They allow for pointing to any hostname, whether within or outside of AWS.

### What is an Alias Record?

An **Alias record** is specific to AWS and is designed to map domain names to AWS resources directly. Unlike [CNAME](https://docs.aws.amazon.com/managedservices/latest/ctref/management-directory-dns-add-cname-record.html) records, Alias records can be used at both the root domain and subdomain levels. Here are the highlights of Alias records:
![Alias record](/blog/src/images/64/64-1.png)

![List of services that support Alias](/blog/src/images/64/64-2.png)
_elactic load balancer, amazon cloudfront, amazon api gateway, elastic beanstalk , s3 websites, VPC interface endpoints, global accelerator , route 53 record_.

- **Use Case**: Alias records are used to map your domain name to AWS resources such as [Load Balancers](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/), [CloudFront](https://aws.amazon.com/cloudfront/) distributions, [API Gateways](https://aws.amazon.com/api-gateway/), and more.
- **Root Domain Compatibility**: Alias records can be used at the root level of your domain. For instance, `mydomain.com` can point directly to an AWS resource.
- **Cost and Performance**: Alias records are **free** of charge when querying within AWS and come with built-in [health checks](https://aws.amazon.com/builders-library/implementing-health-checks/).
- **Automatic Updates**: If the IP addresses of the underlying AWS resource change, the Alias record automatically recognizes and adapts to these changes.

#### Practical Example: Setting Up CNAME and Alias Records

Let’s walk through how to set up these records using AWS Route 53.

##### Creating a CNAME Record

1. **Access Route 53**: Open the Route 53 console.
2. **Create a Record**: Choose the hosted zone for your domain.
3. **Specify the Record Type**: Select `CNAME`.
4. **Enter Details**: For example, you might create a CNAME record for `myapp.mydomain.com` pointing to `blabla.anything.com`.
5. **Save the Record**: Once saved, accessing `myapp.mydomain.com` will route traffic to the specified hostname.

![Creating a CNAME screen shot](/blog/src/images/64/64-3.png)

##### Creating an Alias Record

1. **Access Route 53**: Open the Route 53 console.
2. **Create a Record**: Choose the hosted zone for your domain.
3. **Specify the Record Type**: Select `A` (IPv4) or `AAAA` (IPv6).
4. **Select Alias**: Choose the Alias option.
5. **Enter AWS Resource Details**: Select the specific AWS resource (like an Elastic Load Balancer) and region.
6. **Evaluate Target Health**: Optionally, enable health checks.
7. **Save the Record**: Once saved, the Alias record routes traffic to your AWS resource.

![Creating an Alias record](/blog/src/images/64/64-4.png)

##### Example Scenario: Root Domain Redirection

If you want `mydomain.com` to point to an AWS resource, a CNAME record won't work since it's at the root level. Instead, you would:

1. **Create an Alias Record**: Choose the type as `A` and select the appropriate AWS resource.
2. **Specify Root Domain**: Leave the subdomain field empty to denote the root domain.
3. **Save the Record**: This setup allows `mydomain.com` to route traffic directly to your AWS resource.

#### Exam Preparation

Understanding these concepts is vital for the AWS exam. Remember:

- **CNAME Records**: Use for subdomains, cannot be used at the root domain level.
- **Alias Records**: Can be used for both root and subdomains, specific to AWS resources, free to query, and provide health checks.

With this knowledge, you are better prepared to tackle DNS-related questions on the AWS exam. Good luck!

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
- [AWS 51: Amazon RDS and Amazon Aurora Security](https://magicishaqblog.netlify.app/2024-01-26-aws-51-Amazon-RDS-and-Amazon-Aurora-Security/)
- [AWS 52: RDS Proxy](https://magicishaqblog.netlify.app/2024-02-02-aws-52-RDS-Proxy/)
- [AWS 53: ElastiCache](https://magicishaqblog.netlify.app/2024-02-09-aws-53-ElastiCache/)
- [AWS 54: ElastiCache: Hands On](https://magicishaqblog.netlify.app/StructuredClone/2024-02-16-aws-54-ElastiCache-Hands-On/)
- [AWS 55: ElastiCache Strategies](https://magicishaqblog.netlify.app/2024-01-03-aws-55-ElastiCache-Strategies/)
- [AWS 56: Amazon Memory DB for Redis](https://magicishaqblog.netlify.app/2023-03-15-aws-56-AmazonMemoryDB-for-Redis/)
- [AWS 57: Quiz 3](https://magicishaqblog.netlify.app/quiz-4/2023-03-22-aws-57-quiz-4/)
- [AWS 58: DNS Name](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/)
- [AWS 59: Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)
- [AWS 60: Route 53 Registering Domain](https://magicishaqblog.netlify.app/2024-04-26-aws-60-Route53-registering-domain/)
- [AWS 61: Route 53 Creating First Record](https://magicishaqblog.netlify.app/2024-05-03-aws-61-Route53-Creating-First-Record/)
- [AWS 62: Setting up an EC2 instance and ALB with Route 53](https://magicishaqblog.netlify.app/2024-05-10-aws-62-setting-up-ec2-instances-and-alb-with-route-53/)
- [AWS 63: Route 53 TTL (Time to Live)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/)
