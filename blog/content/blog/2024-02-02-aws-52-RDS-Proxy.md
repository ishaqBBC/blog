---
layout: blog
title: "AWS 52: RDS Proxy"
date: 2024-02-02T11:24:19.116Z
---

## TL;DR

Amazon RDS Proxy is a fully managed, [serverless](https://aws.amazon.com/serverless/) solution that acts as an intermediary between your application and your RDS database instance. It helps improve database efficiency by pooling and sharing connections, reduces failover time by up to 66%, enforces IAM authentication, and ensures secure credential storage.

## Introduction

Continuing from our previous posts on [Amazon RDS (Relational Database Service)](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) as a go-to solution for managing your databases in the cloud. In this post, we'll demystify RDS Proxy and why it is used.
You might already know that you can deploy your RDS database within your [VPC (Virtual Private Cloud)](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html). But what about deploying a fully managed database proxy for RDS?

## Understanding Amazon RDS Proxy

Imagine this scenario: you have multiple applications connecting to your [RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) database [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance). Instead of each application establishing its own connection, they can connect to the RDS Proxy, which pools these connections together. This reduces stress on database resources, such as CPU and RAM, and minimises open connections and timeouts.

![diagram of aws rds proxy](/blog/src/images/52/52-1.png)

### Key Features of RDS Proxy

- **Fully Managed**: RDS Proxy is a serverless solution, meaning you don't need to manage its capacity.
- **Auto Scaling**: It scales seamlessly based on demand.
- **Highly Available**: Deployed across multiple [Availability Zones](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions) (AZs) to ensure resilience.
- **Failover Improvement**: Reduces failover time by up to 66%, enhancing availability for [RDS and Aurora instances](https://magicishaqblog.netlify.app/2023-01-12-aws-49-Amazon-Aurora/).

## Why Use RDS Proxy?

1. **Efficiency**: Pooling connections improves database efficiency and resource utilization.
2. **Failover Optimization**: RDS Proxy streamlines failover processes, enhancing overall system reliability.
3. **IAM Authentication**: Enforces IAM authentication for database access, ensuring security.
4. **Integration with Secrets Manager**: Securely stores credentials in AWS Secrets Manager.

## RDS Proxy and Lambda Functions

[Lambda functions](https://aws.amazon.com/pm/lambda/?gclid=Cj0KCQiAwvKtBhDrARIsAJj-kThX5RmGaGJj48WK34-BP-RwX9YFurrWCCzl0RRYE5ZxPyB_R4853b8aAuFLEALw_wcB&trk=27324d1f-ee08-40b9-8e7b-5ac228e2fecc&sc_channel=ps&ef_id=Cj0KCQiAwvKtBhDrARIsAJj-kThX5RmGaGJj48WK34-BP-RwX9YFurrWCCzl0RRYE5ZxPyB_R4853b8aAuFLEALw_wcB:G:s&s_kwcid=AL!4422!3!651612449951!e!!g!!amazon%20aws%20lambda!19836376234!148728884764), which execute code in response to events, can benefit significantly from RDS Proxy. These functions often scale rapidly, creating and closing connections dynamically. RDS Proxy efficiently manages these connections, preventing issues like open connections and timeouts.

## Conclusion

Amazon RDS Proxy is a powerful tool for optimising database performance, enhancing failover capabilities, and bolstering security in AWS environments. By leveraging its features, you can streamline database access, improve scalability, and ensure the reliability of your applications. Whether you're managing a single database instance or a complex infrastructure, RDS Proxy offers valuable benefits for your AWS projects.

So, the next time you're preparing for an AWS exam or architecting a cloud solution, remember the potential of Amazon RDS Proxy to elevate your database management strategy. Stay tuned for more insights and practical tips on mastering AWS services.

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
- [AWS 44: Auto Scaling Groups - Instant Refresh](https://magicishaqblog.netlify.app/2023-12-08-aws-44-auto-scaling-groups-instant-refresh/)
- [AWS 45: Quiz 3](https://magicishaqblog.netlify.app/quiz-3/2023-12-15-aws-45-quiz-3/)
- [AWS 46: RDS Relational Database Service](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/)
- [AWS 47: RDS Read Replica Multi Az](https://magicishaqblog.netlify.app/2023-29-12-aws-47-RDS-read-replica-Multi-Az/)
- [AWS 48: RDS Hands On](https://magicishaqblog.netlify.app/2023-05-01-aws-48-RDS-Hands-On/)
- [AWS 49: Amazon Aurora](https://magicishaqblog.netlify.app/2023-01-12-aws-49-Amazon-Aurora/)
- [AWS 50: Amazon Aurora: Hands On](https://magicishaqblog.netlify.app/2024-01-19-aws-50-Amazon-Aurora-hands-on/)
- [AWS 51: Amazon RDS and Amazon Aurora Security](https://magicishaqblog.netlify.app/2024-01-26-aws-51-Amazon-RDS-and-Amazon-Aurora-Security/)
