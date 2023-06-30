---
layout: blog
title: "AWS 23: EFS Elastic File System"
date: 2023-06-30T13:41:35.891Z
---

## TLDR

Amazon EFS (Elastic File System) is a managed NFS (network file system) provided by AWS. It can be mounted on multiple EC2 instances across different availability zones, making it highly available and scalable. EFS is compatible with Linux-based AMIs and offers encryption at rest using AWS KMS. It automatically scales and charges you based on the storage you use. Performance modes include General Purpose for latency-sensitive use cases and Max I/O for high throughput. Throughput modes like Bursting, Provisioned, and Elastic provide flexibility. EFS offers storage classes, such as Standard and Infrequent Access (EFS-IA), allowing cost optimization based on file access patterns. It can be configured as Multi-AZ for high availability or as a single-zone system for development. Backup is enabled by default, and EFS-IA provides significant cost savings. Understanding these concepts is important for working with Amazon EFS.

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

## Introduction

Welcome to our comprehensive guide on Amazon EFS (Elastic File System), an essential topic for the AWS Developer Exam. In this blog post, we will delve into the intricacies of EFS and highlight the key points you need to know to succeed in the exam. So, let's dive right in!

## Understanding Amazon EFS

Amazon EFS is a fully managed Network File System (NFS) provided by Amazon Web Services. As a network file system, EFS can be mounted on multiple EC2 instances, even if they reside in different availability zones. This unique feature makes EFS highly available and scalable, albeit at a higher cost compared to gp2 EBS volumes. With EFS, you pay for the storage you use, without any upfront provisioning.

## Use Cases of Amazon EFS

EFS finds extensive applications in various scenarios, including content management, web serving, data sharing, and even hosting WordPress websites. It internally utilizes the NFS protocol for seamless file access. To control access to your EFS, you can configure a security group.

## Compatibility and Encryption

It is important to note that EFS is only compatible with Linux-based AMIs and not Windows. However, it provides robust security features, such as enabling encryption at rest using AWS Key Management Service (KMS). EFS utilizes the POSIX system and adheres to standard file APIs, ensuring compatibility and ease of use within the Linux ecosystem.

## Auto Scaling and Performance Modes

One of the standout features of EFS is its ability to scale automatically, eliminating the need for preplanning capacity. With EFS, you gain the capability to handle thousands of concurrent NFS clients and achieve throughput of over 10 gigabytes. This scalability extends to petabyte-scale network file systems.

When creating an EFS network file system, you can choose different performance modes based on your requirements. The default mode, General Purpose, is ideal for latency-sensitive use cases like web servers and content management systems. Alternatively, the Max I/O mode maximizes throughput, making it suitable for big data applications and media processing needs.

## Throughput Modes and Storage Classes

Amazon EFS offers various throughput modes to cater to diverse workloads. Bursting mode allows you to burst up to 100 megabytes per second (MB/s) with a baseline throughput of 15 MB/s per terabyte. Provisioned mode enables you to set a specific throughput, decoupling it from storage size. For example, you can achieve one gigabyte per second (GB/s) with one terabyte of storage.

Additionally, EFS provides the Elastic throughput mode, which automatically scales throughput up and down based on workload demands. This mode is particularly useful for unpredictable workloads, offering up to three GB/s for reads and one GB/s for writes.

Furthermore, EFS offers different storage classes, including Standard and Infrequent Access (EFS-IA). Standard storage suits frequently accessed files, while EFS-IA provides a cost-effective option for files that are accessed less frequently. By using lifecycle policies, you can seamlessly move files between these tiers based on predefined criteria, optimizing cost and performance.

## Availability, Durability, and Backup

To ensure high availability and durability, you have the choice to configure EFS in a Multi-AZ configuration. This setup is recommended for production environments, as it safeguards against availability zone failures. However, for development purposes, you can opt for a single-zone EFS file system, which operates within a single availability zone.

Regardless of the configuration, EFS enables backup by default, allowing you to retrieve files and integrate with the Infrequent Access storage tier. This feature is especially relevant for One Zone-IA, which offers significant cost savings of approximately

90% compared to other storage options.

## Conclusion

Amazon EFS is a powerful and scalable network file system that caters to a wide range of use cases. With its ability to handle thousands of concurrent NFS clients, automatic scaling, and versatile performance and storage options, EFS provides developers with a robust and flexible solution.

To excel in the AWS Developer Exam, it is crucial to understand the various features, modes, and configurations of Amazon EFS. We hope this blog post has provided you with a comprehensive overview, emphasizing the essential points you need to know for the exam. Good luck with your exam preparation, and we look forward to seeing you succeed!

## Useful links

- [Amazon EFS Documentation](https://docs.aws.amazon.com/efs/index.html)
- [AWS Developer Exam Guide](https://aws.amazon.com/certification/certified-developer-associate/)
