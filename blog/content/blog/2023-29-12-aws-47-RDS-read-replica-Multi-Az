---
layout: blog
title: "AWS 47: RDS Read Replicas and Multi AZs"
date: "2023-12-29T11:34:09.528Z"
---

## TLDR

[RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) Read Replicas and Multi-AZ configurations. Read Replicas enable scalable reads, with up to 15 asynchronous replicas across zones and regions, capable of becoming independent databases. Multi-AZ, designed for disaster recovery, ensures high availability through synchronous replication. Read Replicas can also be configured as Multi-AZ. Transitioning from Single AZ to Multi-AZ is a zero-downtime operation.

## Introduction

In order to pass the AWS exam, it is crucial to delve deep into the intricacies of [RDS (Relational Database Service)](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/).We'll explore **Read Replicas** and [Multi-AZ](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions) configurations to equip you with the knowledge needed for success.

## Read Replicas: Scaling Your Reads

Read Replicas, as the name implies ; that allows only **read-only** connections, are your allies in [scaling](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) reads. Picture your application and its interaction with the RDS database [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance). As your application juggles reads and writes, the strain on the main database [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance) becomes apparent. To address this, AWS allows you to create up to 15 Read Replicas.

These replicas can be situated within the same [availability zone](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions), cross availability zones, or even cross [regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions). This diversity offers flexibility to adapt to your specific needs. [Asynchronous](https://cloudbasic.net/white-papers/synchronous-vs-asynchronous-replication/) replication plays a key role, ensuring eventual consistency by writing to the database in scheduled manner so eventually they are copies. However, keep in mind that reads from a Read Replica may precede data replication, introducing an element of eventual consistency.

Read Replicas not only serve for scaling reads but can also be promoted to function as independent databases. This capability allows for dynamic adjustments to your architecture.

![Diagram of read replicas](/blog/src/images/47/47-1.png)

## Use Case: Read Replicas in Action

Consider a classic scenario where your production database is handling its regular load. A new team expresses the need to run reporting and analytics on the data. Plugging this workload directly into the main RDS database [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance) risks overloading it. The solution? Create a Read Replica specifically for the new workload. Asynchronous replication ensures that the reporting application reads from the Read Replica, keeping the production application unaffected.

Remember, Read Replicas are for [SELECT-type](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver16) statements only; INSERT, UPDATE, or DELETE operations are a no-go. Th does not modify the database.

## Networking Costs with RDS Read Replicas

If the Read replica is in the same [Region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions) its free, regardless of [availability zone](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions) zones. Different zones means there is a charge

## RDS Multi-AZ: Ensuring Disaster Recovery

Multi-AZ configurations primarily serve the purpose of [disaster recovery](https://cloudian.com/guides/disaster-recovery/disaster-recovery-5-key-features-and-building-your-dr-plan/). Imagine your application interacting with a Master database [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance) in one availability zone, with synchronous replication to a standby [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance) in another zone. This synchronous replication ensures every change in the Master is mirrored in the standby.

The beauty of Multi-AZ lies in its automatic failover. In the face of an AZ failure, network issues, or a Master [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance) glitch, the standby database seamlessly takes over, maintaining one [DNS](https://simple.wikipedia.org/wiki/Domain_Name_System) name for your application to connect to.

It's crucial to note that Multi-AZ is not intended for [scaling](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/); the standby database is strictly for failover.

## Read Replicas as Multi-AZ for Disaster Recovery?

A noteworthy point for the **exam**: Read Replicas can be configured as Multi-AZ for disaster recovery purposes. Keep this in mind as it's a common exam question.

## Transitioning to Multi-AZ: A Seamless Operation

A question that might appear in the **exam** involves transitioning an [RDS database](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) from Single AZ to Multi-AZ. The good news is that it's a zero-downtime operation. Simply click on 'modify' for the database and enable Multi-AZ. Behind the scenes, AWS takes a snapshot, restores it into a standby database, establishes synchronization, and voila! You've seamlessly transitioned to Multi-AZ.

## Conclusion

Mastering the nuances of Read Replicas and Multi-AZ configurations is needed to ace the exam. Stay tuned for next weeks blog post where we will have a hands on approach for RDS

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
