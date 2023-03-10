---
layout: blog
title: "AWS: Security Groups"
date: 2023-03-10T17:13:42.596Z
---

## TLDR

Welcome to the TLDR edition of "AWS: Security Groups." In this exciting blog, we learn about Security Groups, which are like firewalls that can regulate access to ports and authorised IP ranges. Yawn. We also learn about ports, which are communication endpoints that allow networked devices to send and receive data. So, if you're interested in knowing which port to use for SSH, HTTP, or RDP traffic, this is the blog for you! Aren't you excited to learn about Security Groups? I know I am.

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
- [AWS 11: EC2 View and Instance Types](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types/)

## Introduction

In the AWS cloud, Security Groups are used in network security for EC2 instances. These groups are easy to configure and contain allow rules. The rules can reference IP addresses or other Security Groups, giving EC2 instances the ability to control traffic in and out. A Security Group can be compared to a firewall that regulates access to ports and authorizes IP ranges, including IPv4 or IPv6. These groups manage inbound and outbound traffic for EC2 instances, and their rules have a type, protocol, port, and source, which represents an IP address range.

## What is a Security Group

The Security Group rules can control traffic , think of a firewall. They also regulate access to ports and authorised IP ranges (such as your computer). For example, a computer can access an EC2 instance on port 22, but someone else's computer with a different IP address won't. EC2 instances have default outbound rules, allowing any traffic out of them.

Security Groups can be attached to multiple instances, and instances can have multiple Security Groups. These groups are locked down to a region and [VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) combination. If the traffic is blocked, the EC2 instance won't even see it. Security Groups live outside the EC2 instance and function as a firewall. It's a good idea to maintain one separate Security Group for SSH access.

If an application is not accessible, it's likely a Security Group issue, and if you receive a connection refused error, the Security Group worked, but the application was not launched. By default, all inbound traffic is blocked, and all outbound traffic is authorised. When using load balancers, Security Groups can reference each other. Security Groups are a fundamental element of network security in AWS, and understanding their basics is essential to secure your EC2 instances.
As we mentioned earlier, security groups regulate access to ports. Ports are communication endpoints that allow networked devices to send and receive data. In AWS, there are a number of ports that you may need to be familiar with for the **exam**.

## Ports

One important port to be aware of is **port 22**. This is the default port used for [SSH](https://simple.wikipedia.org/wiki/Secure_Shell), which is a protocol used for secure remote access to your instances. You will likely need to configure security groups to allow SSH traffic, so it's important to understand how to do this properly.

Another port to be aware of is **port 80**, which is the default port used for [HTTP](https://simple.wikipedia.org/wiki/Hypertext_Transfer_Protocol) traffic. If you're running a web server on your EC2 instance, you will need to allow traffic on this port in order for users to access your website.

There are many other ports that you may need to be familiar with depending on your use case. For example, **port 443** is used for HTTPS traffic, which is the encrypted version of [HTTP](https://simple.wikipedia.org/wiki/Hypertext_Transfer_Protocol). Port 3389 is used for remote desktop protocol ([RDP](https://en.wikipedia.org/wiki/Remote_Desktop_Protocol)) traffic, which is a protocol used for remote access to Windows machines.

In addition to knowing the specific ports, it's important to understand the concept of port ranges. When configuring security group rules, you can specify a range of ports instead of just a single port. For example, you may want to allow traffic on ports 80 and 443 for your web server. Instead of creating two separate rules, you can create a single rule that allows traffic on ports 80-443.

Below is a diagram of how an EC2 security works
![EC2 instance security group](/blog/src/images/sg-1.png)

## Hands on with Security Groups

Follow these steps to manage your security groups

- Click on "Security" inside the EC2 instance you created from the previous **[post](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types/)** to get an overview of the security groups attached to your instance.
  ![Security Panel](/blog/src/images/sg-2.png)

- Access the more complete page of security groups from the left-hand side menu under Networking and Security.
  ![Security Groups](/blog/src/images/sg-3.png)

- Identify the default security group created by default, as well as the launch wizard security group that was created when you created your EC2 instance.

- Check the inbound rules that allow connectivity from the outside into the EC2 instance.

![Security Panel](/blog/src/images/sg-4.png)

- Note the two inbound rules, which are SSH on port 22 from anywhere, and HTTP from port 80 from anywhere.
  ![Port 22 and 80](/blog/src/images/sg-5.png)

- Delete a rule on port 80 (by clicking edit inbound rule) to test your connectivity. If you can't connect, it's likely due to an EC2 security group.
  Add back a rule for HTTP to get port 80, and allow access from anywhere IPv4.
  ![Edit inbound rules ](/blog/src/images/sg-6.png)

- Define the port or port range you want, or choose directly from a dropdown menu to set the type of protocol you want.
- Define where you want to allow access from, such as a custom CIDR anywhere, or select "My IP" to only allow access to your IP.
  Note the outbound rules, which allow all traffic on IPv4 to anywhere.
- Understand that an EC2 instance can have many security groups attached to it, and security groups can be attached to other EC2 instances.

## Conclusion

That's it! your guide to security groups for EC2 instances and how to manage them effectively.

Overall, understanding ports and how they're used in security groups is an important aspect of network security in AWS. By properly configuring security group rules, you can ensure that your EC2 instances are protected from unauthorised access while still allowing legitimate traffic to flow. And for the exam, it's important to have a solid understanding of these concepts so that you can answer related
