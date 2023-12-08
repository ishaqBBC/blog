---
layout: blog
title: "AWS 44: Auto Scaling Groups - Instance Refresh"
date: 2023-12-08T13:12:34.522Z
---

## TLDR

[Auto Scaling groups](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/) offer **Instance Refresh**, allowing seamless
updates to an entire group of EC2 instances. This process consists of:
a new launch template, allowing a transition without the need to terminate instances individually. By employing the **Instance Refresh** , users can define parameters such as minimum healthy percentage and warm-up time to orchestrate the gradual replacement of outdated instances with the updated configuration (launch template).

## Introduction

So this is the last auto scaling group post, thank you for making it this far. this blog post is a continuation of the previous posts: auto scaling groups: [1](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/), [2](https://magicishaqblog.netlify.app/2023-11-17-aws-41-auto-scaling-groups-hands-on/) , [3](https://magicishaqblog.netlify.app/2023-11-24-aws-42-Auto-Scaling-Groups-Policy/) and [4](https://magicishaqblog.netlify.app/2023-12-01-aws-43-auto-scaling-groups-hands-on/). Before we move onto the next topic. One particularly valuable functionality within this framework is **Instance Refresh**.

### Why use Instance Refresh

Picture this; updates to an [Auto Scaling group](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/) are necessitated, driven by the creation of a [AMI](https://magicishaqblog.netlify.app/2023-04-28-aws-18-ami/) launch template. Achieving this would involve terminating individual [instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), waiting for replacements, and meticulously managing the transition. However, with **Instance Refresh**, this is streamlined.

### How Instance Refresh Works

1. **Create a New Launch Template:** The first step involves crafting a new launch template, often prompted by updates to the underlying [AMI](https://magicishaqblog.netlify.app/2023-06-02-aws-19-AMI-Hands-On/) or other configuration changes.

2. **Initiate Instance Refresh:** Rather than terminating instances individually, the **Instance Refresh** is employed. This signals the [Auto Scaling group](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/) to refresh the process.

3. **Set Minimum Healthy Percentage:** Users can specify a minimum healthy percentage, dictating the proportion of instances that can be safely terminated over time. This ensures a gradual transition without compromising [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/).

4. **Dynamic Termination and Launch:** Instances with the outdated launch template are systematically terminated, making way for new instances that align with the updated configuration.

5. **Warm-Up Time Considerations:** To guarantee that the freshly launched instances are adequately prepared to handle traffic, a warm-up time can be defined. This temporal buffer allows for a seamless transition without disruptions.

![ASG workflow](/blog/src/images/44/44-1.png)
_Diagram of an auto scaling group_

![ASG workflow with Instance Refresh](/blog/src/images/44/44-2.png)
_Diagram of instance connect, notice the minimum healthy percentage at 25%, as there are 4 instances. 1 instance will be replaced by the the new launch template_

### Conclusion

By using **Instance Refresh** to update the instances in your [Auto Scaling group](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/) instead of manually replacing instances a few at a time. This can be useful when a configuration change requires you to replace instances, and you have a large number of instances in your[Auto Scaling group](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/).

In essence it replaces instances with new configurations automatically without the need to manually change them.

More can be found on the official docs [HERE](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html)

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
- [AWS 39: Connection Draining](https://magicishaqblog.netlify.app/2023-27-10-aws-39-connection-draining/)
- [AWS 40: Auto Scaling Groups](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/)
- [AWS 41: Auto Scaling Groups : Hands On](https://magicishaqblog.netlify.app/2023-11-17-aws-41-auto-scaling-groups-hands-on/)
- [AWS 42: Auto Scaling Groups Policy](https://magicishaqblog.netlify.app/2023-11-24-aws-42-Auto-Scaling-Groups-Policy/)
- [AWS 43: Auto Scaling Groups Policy - Hands On](https://magicishaqblog.netlify.app/2023-12-01-aws-43-auto-scaling-groups-hands-on/)
