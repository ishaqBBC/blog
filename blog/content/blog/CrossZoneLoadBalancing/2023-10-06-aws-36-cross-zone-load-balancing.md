---
layout: blog
title: "AWS 36:Cross Zone Load Balancing"
date: 2023-10-07T10:01:19.482Z
---

## TLDR

Cross-zone load balancing in AWS evenly distributes traffic across all registered instances in all [availability zones](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#az), ensuring [high availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) and fault tolerance. You can enable or disable it based on your use case, and the behavior varies among different types of [load balancers](https://magicishaqblog.netlify.app/?s=load+balancer).

## Introduction

Amazon Web Services (AWS) offers a wide range of services and features, and one of the fundamental components of building scalable and highly available applications on AWS is load balancing. Load balancers distribute incoming traffic across multiple instances to ensure optimal performance and fault tolerance. In this blog post, we'll dive into the concept of cross-zone load balancing in AWS, exploring what it is, why it's important, and how to configure it.

## Cross-Zone Load Balancing Explained

Imagine a scenario where you have two [availability zones (AZs)](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#az) in AWS. In the first AZ, there's a load balancer with **2** [EC2 instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), and in the second AZ, there's another load balancer with **8** EC2 instances. These load balancers serve as part of the same overarching load balancing system. When clients access these load balancers, cross-zone load balancing ensures even distribution of traffic across all instances in all availability zones.

## With cross-zone load balancing:

- Each load balancer instance sends **50%** of the traffic it receives to the first AZ and **50%** to the second AZ.
- Both load balancers redirect traffic to all **10** (2+8) EC2 instances, regardless of their availability zone.
- Traffic is evenly distributed across all EC2 instances, promoting [high availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/).

![Diagram showing a cross zone load balancing of ten instances in 2 zones. because there is 10 instances , the traffic is split evenly 10% each](/blog/src/images/36/36-1.png)

## Without cross-zone balancing:

- The client sends **50%** of the traffic to the first AZ and **50%** to the second AZ.
- Each load balancer instance only sends traffic to EC2 instances within its availability zone.
- Traffic remains contained within each AZ, potentially causing imbalanced traffic distribution if EC2 instances aren't evenly distributed.

![Diagram showing load balancing without cross-zone of ten instances in 2 zones. The Zones take 50% each, the zone with two instances splits the 50% into 25% each, while the second zone has 8 instances. dividing the 50% into 8 chucks (50/8) gives us 6.25%. And therefore we can see how uneven the traffic is split](/blog/src/images/36/36-2.png)

## Configuring Cross-Zone Load Balancing

- [Application Load Balancer (ALB)](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/): Cross-zone load balancing is enabled by default, but you can disable it at the target group level. No charges apply for inter-AZ data transfers.
- [Network Load Balancer (NLB)](https://magicishaqblog.netlify.app/NLB/2023-09-09-aws-32-network-load-balancer/) and [Gateway Load Balancer](https://magicishaqblog.netlify.app/GatewayLoadBalancer/2023-09-22-aws-34-gateway-load-balancer/): Cross-zone load balancing is disabled by default, and enabling it may incur regional data charges.

## Conclusion

Cross-zone load balancing is a crucial feature in AWS for ensuring [high availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/). and even distribution of traffic across multiple instances and availability zones. Understanding how to configure it for different load balancer types is essential for optimizing your AWS infrastructure.

By leveraging cross-zone load balancing effectively, you can build robust and fault-tolerant applications on AWS that can handle varying workloads and maintain high availability even in the face of imbalanced resource distribution.

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
