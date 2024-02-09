---
layout: blog
title: "AWS 53: ElastiCache"
date: 2024-02-09T10:19:05.691Z
---

## TLDR

Amazon ElastiCache is like [RDS (Relational Database Service)](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) but for cache technologies like [Redis](https://en.wikipedia.org/wiki/Redis) or [Memcached](https://memcached.org/about). It helps reduce database load for read-intensive workloads by storing commonly queried data in-memory. AWS manages ElastiCache just like RDS, handling maintenance, optimisation, and backups. However, integrating ElastiCache into your application requires significant code changes. Architecturally, ElastiCache sits between your application and the database, serving cached queries to reduce database trips. Redis and Memcached differ in features like high availability, durability, and data partitioning.

![elastiCache icon](/blog/src/images/53/53-1.png)

## Understanding Amazon ElastiCache

Amazon ElastiCache is a managed service that provides. [Redis](https://en.wikipedia.org/wiki/Redis) or [Memcached](https://memcached.org/about) as a caching solution. But what exactly are **caches**? Think of them as high-speed, in-memory databases that store frequently accessed data, reducing the need to query the main database repeatedly. This not only improves performance but also offloads the database, making it more efficient for read-heavy workloads.

![elasticCache icon for redis](/blog/src/images/53/53-2.png)
![elasticCache for Memcached](/blog/src/images/53/53-3.png)

## Integrating ElastiCache into Your Architecture

To use ElastiCache effectively, you'll need to adapt your application to query the cache before or after accessing the database. Architecturally, ElastiCache sits between your application and the database. When a query is made, ElastiCache checks if the data is already cached (a cache hit). If so, it returns the data directly, saving a trip to the database. If not (a cache miss), the data is fetched from the database and then stored in the cache for future use.

![diagram](/blog/src/images/53/53-4.png)

## Making Your Application Stateless

One significant benefit of using ElastiCache is that it helps make your application [stateless](https://www.freecodecamp.org/news/stateful-vs-stateless-architectures-explained/). For example, you can store user session data in ElastiCache, allowing users to remain logged in even when redirected to different instances of your application. This simplifies application management and enhances [scalability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/).

![diagram](/blog/src/images/53/53-5.png)

## Redis vs. Memcached: Choosing the Right Option

When deciding between [Redis](https://en.wikipedia.org/wiki/Redis) and [Memcached](https://memcached.org/about), consider their specific features and use cases. Redis offers features like Multi-AZ with Auto-Failover, Read Replicas for scalability, and data durability with backup and restore options. It's suitable for scenarios requiring high availability and data persistence. On the other hand, [Memcached](https://memcached.org/about) focuses on distributed caching with a multi-threaded architecture but lacks features like [high availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/), [data durability](<https://en.wikipedia.org/wiki/Durability_(database_systems)#:~:text=In%20database%20systems%2C%20durability%20is,including%20incidents%20and%20catastrophic%20events.>), and backup/restore capabilities.

## Conclusion

Amazon ElastiCache is valuable for optimising performance and scalability in AWS environments. By using caching technologies like Redis or Memcached, you improve application performance and reduce database load. Remember to consider factors like application architecture, data persistence, and high availability when choosing between Redis and Memcached for your caching needs.

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
- [AWS 52: RDS Proxy](https://magicishaqblog.netlify.app/2024-02-02-aws-52-RDS-Proxy/)
