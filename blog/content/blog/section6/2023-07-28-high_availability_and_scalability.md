---
layout: blog
title: "AWS 27: High Availability and Scalability"
date: 2023-07-28T09:57:09.083Z
---

## TLDR

Scalability in software engineering refers to an application's ability to handle increased demand by adapting its resources. There are two types: vertical scalability (upgrading instance size) and horizontal scalability (increasing instances).

## Introduction

In todays blog post we will go over the fundamentals of High Availability and Scalability, for some of you reading - this might feel beginner level, however its always important to master the fundamentals before we go over the load balancing features of AWS. This blog will answer the questions of their differences and how they are linked and used within AWS.
To make these concepts more relatable, we'll use a call center as a fun example to illustrate how these principles work in practice.
Title: Understanding Scalability and High Availability: A Senior Software Engineer's Guide

## What is Scalability?

Scalability refers to the ability of an application or system to handle an increasing workload by adapting to the demand. There are two main types of scalability: vertical scalability and horizontal scalability.

## What is Vertical Scalability?

Imagine you have a call center with a junior operator who can handle five calls per minute. When you promote this junior operator to a senior operator, their capacity increases to handling ten calls per minute. This shift from a lower-capacity instance (junior operator) to a higher-capacity instance (senior operator) represents vertical scalability.

In the cloud context, vertical scalability involves increasing the size of the instance, for instance, upgrading from a t2.micro to a t2.large in Amazon EC2. Vertical scalability is commonly used for non-distributed systems, such as databases (e.g., RDS or ElastiCache), though there are hardware limits to how much you can vertically scale.

![vertical scalability - the same employee being promoted to show they are being vertically scaled](/blog/src/images/27/vertical.png)

## What is Horizontal Scalability?

Continuing with the call center example, instead of promoting a single operator, you decide to hire additional operators to handle the load. By hiring multiple operators, you have effectively increased the capacity of the call center. This scenario illustrates horizontal scalability, where you increase the number of instances or systems for your application.

Horizontal scalability is well-suited for distributed systems, which are common in modern web applications. Cloud providers like Amazon EC2 make horizontal scaling relatively easy by allowing you to add or remove instances on-demand, providing greater flexibility and adaptability.

![horizontal scalability - shows multiple people working](/blog/src/images/27/horrizontal.png)

## What is High Availability?

While scalability helps your system handle greater loads, high availability ensures that your application remains operational even when faced with failures or outages. High availability often goes hand in hand with horizontal scaling, but it's not limited to that.

To achieve high availability, you run your application or system in multiple data centers or [availability zones (AZs)](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/). In our call center example, you have operators working in both New York and San Francisco. If one data center experiences a failure, the other center can still handle calls, maintaining service continuity.

High availability can be passive, such as with RDS Multi-AZ, where a standby replica is maintained in a different AZ. It can also be active, where multiple instances of the same application are running simultaneously across different AZs, managed by an auto scaler group or a load balancer.

![high availability - shows two offices](/blog/src/images/27/high-av.png)

## Conclusion

Understanding scalability and high availability is vital for any software engineer working in the modern cloud-based environment. Vertical scalability enables you to increase the capacity of individual instances, while horizontal scalability allows you to add or remove instances to handle varying workloads.

High availability ensures that your application remains operational in the face of data center failures or outages. By combining these principles effectively, you can design robust and resilient systems that provide a seamless user experience even during peak demand or adverse conditions.

As you continue your journey in the world of software engineering, keep in mind the call center analogy to solidify your understanding of these critical concepts. Always be confident in your grasp of scalability and high availability, as they are essential when tackling challenging exam questions and real-world engineering problems.

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
