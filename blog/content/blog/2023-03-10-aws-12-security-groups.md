---
layout: blog
title: "AWS: Security Groups"
date: 2023-03-10T17:08:34.142Z
---

## TLDR

2023-03-10

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
- [AWS 11: AWS 11: EC2 View and Instance Types](TBC)

## Introduction

## What is a Security Group

In the AWS cloud, Security Groups are fundamental in network security for EC2 instances. These groups are easy to configure and contain allow rules. The rules can reference IP addresses or other Security Groups, giving EC2 instances the ability to control traffic in and out. A Security Group can be compared to a firewall that regulates access to ports and authorizes IP ranges, including IPv4 or IPv6. These groups manage inbound and outbound traffic for EC2 instances, and their rules have a type, protocol, port, and source, which represents an IP address range.

The Security Group rules can control traffic from the outside to the instance and from the instance to the outside. They also regulate access to ports and authorized IP ranges. For example, a computer can access an EC2 instance on port 22, but someone else's computer with a different IP address won't. EC2 instances have default outbound rules, allowing any traffic out of them.

Security Groups can be attached to multiple instances, and instances can have multiple Security Groups. These groups are locked down to a region and VPC combination. If the traffic is blocked, the EC2 instance won't even see it. Security Groups live outside the EC2 instance and function as a firewall. It's a good idea to maintain one separate Security Group for SSH access.

If an application is not accessible, it's likely a Security Group issue, and if you receive a connection refused error, the Security Group worked, but the application was not launched. By default, all inbound traffic is blocked, and all outbound traffic is authorized. When using load balancers, Security Groups can reference each other. Security Groups are a fundamental element of network security in AWS, and understanding their basics is essential to secure your EC2 instances.
As we mentioned earlier, security groups regulate access to ports. Ports are communication endpoints that allow networked devices to send and receive data. In AWS, there are a number of ports that you may need to be familiar with for the exam.

One important port to be aware of is port 22. This is the default port used for SSH, which is a protocol used for secure remote access to your instances. You will likely need to configure security groups to allow SSH traffic, so it's important to understand how to do this properly.

Another port to be aware of is port 80, which is the default port used for HTTP traffic. If you're running a web server on your EC2 instance, you will need to allow traffic on this port in order for users to access your website.

There are many other ports that you may need to be familiar with depending on your use case. For example, port 443 is used for HTTPS traffic, which is the encrypted version of HTTP. Port 3389 is used for remote desktop protocol (RDP) traffic, which is a protocol used for remote access to Windows machines.

In addition to knowing the specific ports, it's important to understand the concept of port ranges. When configuring security group rules, you can specify a range of ports instead of just a single port. For example, you may want to allow traffic on ports 80 and 443 for your web server. Instead of creating two separate rules, you can create a single rule that allows traffic on ports 80-443.

Overall, understanding ports and how they're used in security groups is an important aspect of network security in AWS. By properly configuring security group rules, you can ensure that your EC2 instances are protected from unauthorized access while still allowing legitimate traffic to flow. And for the exam, it's important to have a solid understanding of these concepts so that you can answer related

## Hands on with Security Groups

## Conclusion

TBC
