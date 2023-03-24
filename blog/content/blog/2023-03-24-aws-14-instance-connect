---
layout: blog
title: "AWS 14: EC2 Instance Connect"
date: 2023-03-24T08:38:40.912Z
---

## TLDR

In this blog post, we will explore an alternative to SSH called EC2 Instance Connect. This tool is easier to use and allows us to do a browser-based SSH session into our EC2 Instance without the need to manage SSH keys. By simply clicking "Connect" in the AWS console, we can establish a connection using a temporary SSH key. This method also eliminates the need for a command line interface like Terminal. We can run commands such as whoami or ping google.com within the browser. However, if we need to use SSH, we can still do so using our own terminal, PowerShell, or EC2 Instance Connect. Finally, we saw how to edit the inbound rules in our security group to allow EC2 Instance Connect to work properly. Overall, EC2 Instance Connect is a useful tool that we will be using frequently in this course.

date

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

## Introduction

Welcome back to the 13th blog post in our AWS tutorial series! In previously we discussed how to use [SSH to connect to your EC2 instance](https://magicishaqblog.netlify.app/2023-03-17-aws-13-ssh). However, in this blog post, we will be exploring an alternative method to connect to your instance - the EC2 Instance Connect. This method is more user-friendly and convenient as it allows you to establish a browser-based SSH session directly into your EC2 instance without having to manage SSH keys. So let's dive in and learn how to use the EC2 Instance Connect step by step.

In this post, I'll walk you through the step-by-step process of using EC2 Instance Connect to connect to your EC2 instance through a browser-based SSH session. You'll be able to skip the hassle of managing SSH keys and enjoy a smoother, more streamlined experience.

## EC2 Connect

To get started, navigate to [your instance created on episode 12](https://magicishaqblog.netlify.app/2023-03-17-aws-13-ssh) on your AWS dashboard and click on "Connect." You'll see a range of connection options, including the traditional SSH client. However, the option we want to select is EC2 Instance Connect.
![EC2 connect button](/blog/src/images/connect-1.png)

After verifying the public IP address and leaving the default username (EC2 user), click on "Connect." This will open a new tab with your Amazon Linux 2 AMI instance. From here, you can run commands such as "whoami" or "ping google.com."
![EC2 connect interface](/blog/src/images/connect-2.png)

```bash
https://aws.amazon.com/amazon-linux-2/
36 package(s) needed for security, out of 39 available
Run "sudo yum update" to apply all updates.
[ec2-user@ip-XXX-XX-XX-XX ~]$ whoami
ec2-user
[ec2-user@ip-XXX-XX-XX-XX ~]$ ping google.com
PING google.com (209.85.202.139) 56(84) bytes of data.
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=1 ttl=101 time=1.36 ms
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=2 ttl=101 time=1.37 ms
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=3 ttl=101 time=1.36 ms
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=4 ttl=101 time=1.34 ms
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=5 ttl=101 time=1.45 ms
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=6 ttl=101 time=1.37 ms
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=7 ttl=101 time=1.36 ms
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=8 ttl=101 time=1.35 ms
64 bytes from dg-in-f139.1e100.net (209.85.202.139): icmp_seq=9 ttl=101 time=1.43 ms
```

One of the best things about EC2 Instance Connect is that it eliminates the need for managing SSH keys. The tool will upload a temporary SSH key for you and establish a connection that way.

Another benefit of EC2 Instance Connect is that it allows you to access your instance through a browser-based session, which can be more convenient than using a separate command line interface like Terminal. You can run commands without having to use SSH beforehand.

However, it's worth noting that EC2 Instance Connect still relies on SSH behind the scenes. If you're having trouble connecting to your instance, it's possible that you need to open port 22 in your security group. Simply edit the inbound rule and add the SSH rule from anywhere IPV4 (and IPV6, if necessary).

## Conclusion

EC2 Instance Connect is a valuable tool for anyone who wants a simpler, more streamlined way to connect to their EC2 instances on AWS. By following the steps outlined above, you can enjoy a hassle-free SSH experience that saves you time and effort.
