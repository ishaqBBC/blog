---
layout: blog
title: "AWS 20 - EC2 Instance Store"
date: 2023-06-09T15:06:15.065Z
---

## TLDR

EC2 Instance Store offers high-performance storage for EC2 Instances. Ephemeral, ideal for caching. Back up data. Powerful, but handle responsibly.

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

## Introduction

Welcome back, fellow developers! In our previous instalment,In todays blog post ; we'll explore EC2 Instance Store, a specialized type of storage that offers unparalleled performance for your EC2 Instances.

## Refresh: What is an EC2 Instance Store

First things first, let's refresh our memory. An EC2 Instance is essentially a virtual machine connected to a real hardware server. Some of these servers have physical disk space directly attached to them, establishing a blazing-fast connection. This physical storage, is known as the EC2 Instance Store.

## EC2 Instance Stores

The EC2 Instance Store is our go-to choice when we require exceptional I/O performance and impressive throughput. If you want your disk performance to skyrocket, this is where the magic happens. However, there's a catch. If you stop or terminate an EC2 Instance with an Instance Store, be prepared to bid adieu to your data. The storage is **ephemeral**, meaning **it won't survive a stop or termination event**.

## Why we use EC2 Instance Storage Stores

"So, what's the purpose of EC2 Instance Store then?" you might wonder. Excellent question! This storage solution is ideal for scenarios where you require a buffer, cache, or temporary content. It shines in handling scratch data. However, long-term storage calls for a different hero. Enter EBS (Elastic Block Store), a perfect match for your long-term storage needs.

## Caveats of using a Store

But let's address a potential concern: the server hosting your EC2 Instance could fail, causing an unfortunate loss. Alas, dear developers, the hardware attached to the EC2 Instance goes down with it. Should you decide to embark on the EC2 Instance Store journey, remember that you bear the responsibility of backing up and replicating your data correctly. Safety first!

Now, to paint a picture of the performance we're talking about, let's consider an example. The Instance size of I3 (followed by a dot and a number) instances comes equipped with an Instance Store. When we examine the Read IOPS (Input/Output Operations Per Second) and Write IOPS, we witness mind-boggling numbers like 3.3 million and 1.4 million, respectively, for the most high-performing instance type. In comparison, an EBS volume of type BP2 can reach up to a mere thirty-two thousand IOPS. The difference is staggering!

## Local EC2 Instance Store IOPS Table

| Instance Size | 100% Random Read IOPS | IOPS      |
| ------------- | --------------------- | --------- |
| i3.large      | 100,125               | 35,000    |
| i3.xlarge     | 206,250               | 70,000    |
| i3.2xlarge    | 412,500               | 180,000   |
| i3.4xlarge    | 825,000               | 360,000   |
| i3.8xlarge    | 1,650,000             | 720,000   |
| i3.16xlarge   | 3,300,000             | 1,400,000 |
| i3.metal      | 3,300,000             | 1,400,000 |


Remember, this example is simply to illustrate the exceptional performance boost provided by the local EC2 Instance Store. Whenever you encounter an EC2 Instance with an attached high-performance hardware volume, you know where to look.


## Conclusion

As we conclude this enlightening chapter, always keep in mind that the EC2 Instance Store empowers you with unprecedented speed. But with great power comes great responsibility. Ensure you back up and replicate your data correctly, my friends!
That wraps up our discussion on EC2 Instance Store. In our next lecture, we'll dive into another exciting topic. Stay tuned and keep exploring the wonders of AWS!

Stay Crisp!
