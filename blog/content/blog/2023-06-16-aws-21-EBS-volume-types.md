---
layout: blog
title: "AWS 21: EBS Volume types"
date: 2023-06-16T09:10:34.098Z
---

## TLDR

- General purpose SSD for a balanced approach.
- Provisioned IOPS SSD for critical business applications and high performance.
- Throughput optimized HDD for throughput-intensive workloads.
- Cold HDD for infrequently accessed, low-cost storage.

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

## Introduction

When it comes to Amazon Elastic Block Store (EBS), understanding the different volume types is crucial for optimizing your workloads in the cloud. In this blog post, we will dive into the six EBS volume types and explore their characteristics, use cases, and key differentiators. Whether you're preparing for an exam or looking to enhance your knowledge of EBS, this instructional guide will provide you with the essential information you need. So let's get started!

## 1 and 2. General Purpose SSD (gp2/gp3):

The general purpose SSD volume type strikes a balance between price and performance, making it suitable for a wide range of workloads. Key points to remember:

- Ideal for system boot volumes, virtual desktops, and development/test environments.
- Capacity ranges from 1 GB to 16 TB.
- gp3 volumes provide independent control over IOPS and throughput.
- gp2 volumes have burstable IOPS linked to the volume size.

## 3 and 4. Provisioned IOPS SSD (io1/io2):

Provisioned IOPS SSD volumes deliver high performance for mission-critical workloads that demand low latency and high throughput. Key points to remember:

- Critical for applications requiring sustained IOPS performance or exceeding 16,000 IOPS.
- io2 is the newer generation with enhanced durability and IOPS per gigabyte.
- Maximum IOPS depends on whether you have a Nitro EC2 instance or not.

## 5. Throughput Optimized HDD (st1):

Designed for throughput-intensive workloads, throughput optimized HDD volumes offer cost-effective storage. Key points to remember:

- Suitable for big data processing, data warehousing, and log processing.
- Maximum throughput is 500 MB/s, and the maximum IOPS is 500.
- Sizes can range up to 16 TB.

## 6. Cold HDD (sc1):

Cold HDD volumes are the go-to choice for infrequently accessed, cost-effective storage. Key points to remember:

- Ideal for archived data with minimal access requirements.
- Maximum throughput is 250 MB/s, and the maximum IOPS is 250.
- Sizes can range up to 16 TB.

## Final Thoughts

Mastering the knowledge of EBS volume types is essential for effectively utilizing AWS resources and optimizing your workloads. Remember to consult the official AWS documentation whenever you need more in-depth information. With this comprehensive guide, you are now equipped with the foundational understanding of the various EBS volume types. Keep exploring and building on this knowledge to leverage the full potential of Amazon EBS.

| Volume Type                    | Use Case                                    | Capacity Range | Maximum Throughput | Maximum IOPS |
| ------------------------------ | ------------------------------------------- | -------------- | ------------------ | ------------ |
| General Purpose SSD (gp2)      | System boot volumes, virtual desktops, etc. | 1 GB - 16 TB   | Varies             | Varies       |
| General Purpose SSD (gp3)      | System boot volumes, virtual desktops, etc. | 1 GB - 16 TB   | Varies             | Varies       |
| Provisioned IOPS SSD (io1)     | Mission-critical workloads                  | 4 GB - 64 TB   | Varies             | Varies       |
| Provisioned IOPS SSD (io2)     | Mission-critical workloads                  | 4 GB - 64 TB   | Varies             | Varies       |
| Throughput Optimized HDD (st1) | Big data processing, data warehousing, etc. | 500 GB - 16 TB | 500 MB/s           | 500 IOPS     |
| Cold HDD (sc1)                 | Archived data with minimal access           | 500 GB - 16 TB | 250 MB/s           | 250 IOPS     |
