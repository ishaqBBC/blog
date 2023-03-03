---
layout: blog
title: "AWS 11: EC2 View and Instance Types"
date: 2023-03-03T17:08:34.142Z
---

## TLDR

continuation of the [THIS BLOG](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), where we created our first EC2 instance on AWS. In this post, I explains how to view the instance and give an overview of the different types of instances provided by AWS. The instances are categorised into general purpose, compute optimised, memory optimised, and storage optimised instances. Each instance has a specific naming convention and is optimised for a particular workload. Understanding the different types of instances is crucial for working with AWS and optimising workloads.

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

## Introduction

Following from the last [blog post](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) where we created our first EC2 instance, this blog post will go over how to view your instance and give an overview of the instance types provided by AWS (Amazon Web Services)

## Viewing Our Instance

![EC2 instance](/blog/src/images/ec2-6.png)

we can terminate, start, stop, hibernate and reboot our instances from the `Instance State` drop down. The reason we would want to stop an instance to stop billing (currently we used a free service instance)

Above is the instances tab of the Ec2 console, as you can see we have our instances created. If we click on the `public iPv4 address` it will open a new browser with our server. **Change the protocol to http://** instead of https:// because if you use HTTPs, this is not going to work,
it's going to give you an infinite loading screen
![server](/blog/src/images/ec2-7.png)

In the security tab you have more information. We get some information on the security group ; which was created called launch-wizard-1 with these in the rules.
So `port 22` accessible from everywhere and `port 80` accessible from everywhere.

The script we provided in the advanced settings shows us our virtual server with the words `Hello world`

If you have trouble viewing this screen please follow the previous [blog post](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/)

## Different Instance Types (Basic)

When it comes to working with AWS, it's important to have a good understanding of EC2 instance types. Different types of instances can be used for different use cases and have different types of optimisation. In this guide, we'll take a closer look at the different types of EC2 instances and what they can be used for.

## General Purpose Instances

General purpose instances are great for a diversity of workloads, such as web servers or code repositories. They have a good balance between compute, memory, and networking. Within the general purpose instance family, there are various instance types, which can be viewed on the AWS website.

## Compute Optimised Instances

Compute optimised instances are optimised for compute-intensive tasks that require a high level of processor. This includes tasks such as batch processing data, media transcoding, high-performance web servers, high-performance computing, machine learning, and dedicated gaming servers. All compute optimised instances in EC2 have names starting with the letter C, such as C5, C6, and so on.

## Memory Optimised Instances

Memory optimised instances have a fast performance for the type of workloads that process large datasets in memory. The use cases for memory optimised instances include high performance for relational or non-relational databases, distributed web-scale cache stores, in-memory databases, business intelligence, and real-time processing of big unstructured data. Memory optimised instances in EC2 have names starting with the letter R, X, or Z.

## Storage Optimised Instances

Storage optimised instances are great when you are accessing a lot of data sets on local storage. The use cases for storage optimised instances include high-frequency online transactional processing, relational and NoSQL databases, in-memory databases, data warehousing applications, distributed file systems, and search optimised instances. Storage optimised instances in AWS start with an I, G, or H.

## Instance Naming Convention

AWS uses a specific naming convention for instances. For example, an M5.2xlarge instance has an M instance class, a 5th generation instance, and a 2xlarge size. The larger the size, the more memory and CPU the instance will have.

## Comparison of Instance Types

To give you an idea of the differences between instance types, let's compare a few examples. A t2.micro instance has one VCPU and 1GB of memory. An r5.16xlarge instance has 16 VCPU and 512GB of memory, with a greater emphasis on memory. A c5d.4xlarge instance has 16 VCPU and 32GB of memory, with less memory and more CPU.

## Conclusion

Understanding the different types of EC2 instances is crucial for working with AWS. Whether you're using general purpose, compute optimised, memory optimised, or storage optimised instances, it's important to know what each type can be used for and how they differ from one another. By familiarizing yourself with the different instance types and their naming conventions, you can better optimise your workloads and make the most of your AWS resources.
