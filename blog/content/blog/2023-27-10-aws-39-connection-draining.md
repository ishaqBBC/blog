---
layout: blog
title: "AWS 39: Connection Draining"
date: 2023-10-27T10:35:28.085Z
---

## TLDR

Connection Draining and Deregistration Delay are essential features in AWS, ensuring graceful handling of connections during instance deregistration. They are used for [high availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) and seamless user experiences. Connection Draining parameters can be configured based on the nature of your application, making them a key aspect to understand for _AWS exams_ and real-world AWS architecture design.

## Introduction

In preparation for the _AWS developer certificate exam_ we will talk about **Connection Draining** for [Classic Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-getting-started.html) and Deregistration Delay for [Application and Network Load Balancers](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/). Understanding these concepts is needed for ensuring [high availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) and seamless user experiences in your AWS environment. In this blog post, we will explore the intricacies of Connection Draining and Deregistration Delay and how to configure them effectively to enhance the performance and reliability of your **Elastic Load Balancers** (ELB).

## Connection Draining and Deregistration Delay

So now let's talk about a feature that can come up in the _exam_, which is called **Connection Draining**. So it has two names, actually. If you're using a Classic Load Balancer, it is called **Connection Draining**, but if you're using an Application Balancer or a Network Load Balancer, this is called a **Deregistration Delay**. The idea behind this concept is that it will give some time for your instances to complete the inflight request or the active request while the instance is being deregistered or marked unhealthy.

In simple terms, when a connection is being drained, it means that the [ELB](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/) will stop sending requests to the [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) that is being deregistered, allowing existing connections to complete.

## Visualizing Connection Draining and Deregistration Delay

Let's take a closer look at how this works with a diagram. Imagine you have three EC2 instances, and one of them is set in draining mode. Users who are already connected to that specific EC2 instance will be given enough time, which is the draining period, to complete their existing connections and requests. Once everything's done, all connections to the draining instance will be shut down.

![connection draining diagram](/blog/src/images/39/39-1.png)

Now, if new users try to connect to your ELB, it will intelligently route their connections to other healthy EC2 instances, ensuring uninterrupted service.

## Configuring Connection Draining Parameters

You have the flexibility to set Connection Draining parameters based on your specific needs. The values can be adjusted within the range of **1 to 3,600 seconds**. By default, the draining period is set to **300 seconds (five minutes)**, but you can also disable it altogether by setting the value to zero.

If your requests are short, such as those lasting less than **one second,** setting a low draining connection parameter (e.g., 30 seconds) is advisable. This allows for a quick draining of the instance, making it ready for replacement or maintenance. On the other hand, if your requests are long-lived, like file uploads or lengthy processes, a higher value should be chosen. However, bear in mind that this will extend the time your EC2 instance remains active.

## Conclusion

Connection Draining and Deregistration Delay allows for a smooth user experience and maximum uptime in your AWS setup. These tools help manage connections gracefully when taking instances offline. Setting them right for your application is vital to boost performance and reliability in your infrastructure.

In your AWS exam this topic might appear so make sure you grasp the fundamental principles discussed here. Mastering these features will not only benefit your examination but also enhance your ability to design robust and scalable AWS architectures. See you next time.

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
