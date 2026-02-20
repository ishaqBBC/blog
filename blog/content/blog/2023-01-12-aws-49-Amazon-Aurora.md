---
layout: blog
title: "AWS 49: Amazon Aurora"
date: 2024-01-12T20:18:11.734Z
---

## TLDR

Amazon Aurora, a **proprietary** AWS technology compatible with Postgres and MySQL, delivers high-performance cloud-optimised databases with **5x improvement over MySQL** and **3x over Postgres on RDS**. Its **storage grows automatically** up to 128TB, eliminating manual monitoring. **Aurora supports up to 15 read replicas** with sub-10 ms replica lag and offers instantaneous failover for enhanced **high availability**. The database's design involves storing six copies of data across three Availability Zones, ensuring **reliability through self-healing mechanisms**. With a single <s>master</s> main for writes, up to 15 read replicas, and cross-region replication support, **Aurora simplifies scaling**. The cluster interface includes a writer endpoint for writes and a reader endpoint for **load-balanced read replicas**, both supporting auto scaling.

## Introduction

Aurora is a type of database. Its proprietary and not open-sourced, it boasts compatibility with Postgres and MySQL, complete with compatible drivers. This means that connecting to your Aurora database as if it were a Postgres or MySQL database is seamlessly achieved.

What sets Aurora apart is its cloud optimisation. Through a series of optimisations and ingenious strategies, it achieves remarkable performance gains  5 times faster than MySQL on RDS and 3 times faster than Postgres on RDS, among other improvements. The intricacies of these optimizations, while intriguing, will not be delved into at present.

[More information can found here](https://www.youtube.com/watch?v=FzxqIdIZ9wc)

## Storage

Aurora's storage is a marvel in itself, automatically expanding from an initial **10GB** to a capacious **128TB** as more data is infused. This negates the need for manual monitoring.

## Replication and Failover

When it comes to [replication](https://magicishaqblog.netlify.app/2023-29-12-aws-47-RDS-read-replica-Multi-Az/), Aurora outpaces MySQL with sub-10ms replica lag, and failovers occur instantaneously. Its cloud-native nature ensures high availability by default, despite the marginal 20% increase in cost compared to Relational Database Service [RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/). At scale, the efficiency of Aurora translates into significant savings according to AWS.

## High Availability and Read Scaling

Now, let us focus on the pivotal aspects of [high availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) and read scaling. Aurora stands out by storing six copies of data across three [Availability Zones](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions) (AZs). For write operations, it requires only four out of six copies, ensuring continued functionality even if one AZ faces an outage. Similarly, for reads, three out of six copies suffice, enhancing availability.

A self-healing process comes into play, rectifying corrupted or faulty data through peer-to-peer replication (provides a scale-out and high-availability solution by maintaining copies of data across multiple server instances). The reliance on hundreds of volumes (An Amazon EBS volume is a durable, block-level storage device that you can attach to your instances. After you attach a volume to an instance, you can use it as you would use a physical hard drive), coupled with automatic expansion and replication, substantially mitigates risks.

![diagram of the shared volumes in Amazon Aurora](/blog/src/images/49/49-1.png)

From a diagrammatic perspective, envision three AZs, a shared storage volume, and logical volumes handling replication, self-healing, and auto-expanding. Each write operation results in six copies distributed across different AZs, ensuring robustness.

## Architecture

In terms of architecture, Aurora resembles multi-AZ for RDS. A single [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), the <s> master </s> main, handles write operations, with failovers occurring swiftly. Up to 15 [read replicas](https://magicishaqblog.netlify.app/2023-29-12-aws-47-RDS-read-replica-Multi-Az/) serve read requests, and any of these replicas can seamlessly take over as the <s> master </s> main in case of a failure.

Cross-region replication is supported by read replicas, further enhancing flexibility. The storage infrastructure, with its self-healing and auto-expanding characteristics, is a crucial element managed in the background, reducing the administrative burden.

## Aurora DB Cluster

Considering client interactions, a shared storage volume, ranging from 10GB to 128GB, is exclusively written to by the <s> master </s> main. A writer endpoint, a DNS name, consistently points to the <s> master </s> main, even during failovers. Read replicas, supported by auto-scaling, introduce a reader endpoint to handle connection [load balancing](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/) and automatic redirection to the appropriate replica.

Below is a diagram showing how one <s> master </s> main database is used to write to the reads, where load balancing is used.
![diagram](/blog/src/images/49/49-2.png)

## Conclusion

Amazon Aurora is a cluster of instances orchestrated for optimal performance. Its features, such as auto-expanding storage, seamless failovers, and read scaling through read replicas, make it a formidable choice. The writer endpoint ensures consistent connectivity to the <s> master </s> main, while the reader endpoint facilitates load balancing for read replicas.

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
