---
layout: blog
title: "AWS 82: Three Tier Architecture"
date: 2025-01-17T12:02:21.210Z
---

## TLDR

AWS’s three-tier architecture involves public subnets for Elastic Load Balancers (ELBs), [private subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/) for [EC2](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) instances, and deeper [private subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/) for databases and caching solutions. It’s designed to optimise scalability, security, and performance. Understanding this architecture helps developers design robust cloud applications and ace relevant certification exams.

### The Role of VPC in AWS Architecture

A Virtual Private Cloud ([VPC](https://magicishaqblog.netlify.app/2023-11-01-aws-77-VPC-intro/)) forms the foundation of AWS network architecture, enabling you to segment and manage your cloud resources securely. Before diving into three-tier solutions, understanding [VPC](https://magicishaqblog.netlify.app/2023-11-01-aws-77-VPC-intro/)s  public and [private subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/), route tables, and gateways  is essential.

### Breaking Down the Three-Tier Architecture

Three-tier architecture is a common design pattern in cloud applications, built for scalability, fault tolerance, and enhanced security. Here’s how it works:

1. **Public Subnets: The Front Door**

   - **Elastic Load Balancer ([ELB](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/))**: Positioned in public subnets, the [ELB](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/) manages incoming traffic, distributing it across multiple availability zones (AZs).
   - **Route 53**: A DNS service directs users to the [ELB](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/) for seamless connectivity.

2. **[private subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/)**

   - **[EC2](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) Instances in Auto Scaling Groups**: These instances process requests but remain private, accessible only via the [ELB](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-08-12-aws-28-ELB/).
   - **Security**: Isolating [EC2](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) instances in [private subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/) protects them from direct internet exposure while ensuring traffic flows efficiently through route tables.

3. **Data Subnets**
   - **Amazon [RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/)**: The managed database service stores and retrieves application data.
   - **[ElastiCache](https://magicishaqblog.netlify.app/2024-02-09-aws-53-ElastiCache/)**: Acts as an in-memory data store for caching, reducing latency and offloading [RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) queries.

This structured approach isolates each layer.

### [LAMP](https://aws.amazon.com/what-is/lamp-stack/) Stack on AWS

The [LAMP](https://aws.amazon.com/what-is/lamp-stack/) stack (Linux, Apache, MySQL, PHP) illustrates how this architecture can power real-world applications. For example:

- **Linux**: Operates the underlying [EC2](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) instances.
- **Apache**: Serves as the web server.
- **MySQL**: Utilises Amazon [RDS](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/) for database management.
- **PHP**: Processes application logic and renders web pages.

Adding caching solutions like [ElastiCache](https://magicishaqblog.netlify.app/2024-02-09-aws-53-ElastiCache/) or local EBS storage further enhances performance.

![diagram of a three tier achitecture](/blog/src/images/82/82-1.png);

### Simplifying WordPress Deployment

For a WordPress deployment on AWS:

- **Load Balancer Tier**: Directs traffic to [EC2](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) instances.
- **Application Tier**: [EC2](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) instances handle requests and share user-uploaded images.
  - **EFS**: Ensures all [EC2](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) instances can access shared files like images, stored securely in a network file system.

AWS provides a detailed WordPress architecture, incorporating additional components like NAT gateways, Aurora databases, and CloudFront. While these advanced elements are beyond this discussion, they highlight the flexibility and power of AWS’s solutions.

---

## Conclusion

Understanding AWS’s [VPC](https://magicishaqblog.netlify.app/2023-11-01-aws-77-VPC-intro/) structure and three-tier architecture is foundational for developers and architects alike. By mastering these principles, you can design secure, scalable, and performant applications  whether deploying a [LAMP](https://aws.amazon.com/what-is/lamp-stack/) stack, a WordPress site, or a custom solution. Explore the diagrams and documentation to solidify these concepts and prepare for certification exams or real-world projects.

## Recap

from the previous entries in the series.

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
- [AWS 27: High availability and Scalability ](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)
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
- [AWS 53: ElastiCache](https://magicishaqblog.netlify.app/2024-02-09-aws-53-ElastiCache/)
- [AWS 54: ElastiCache: Hands On](https://magicishaqblog.netlify.app/StructuredClone/2024-02-16-aws-54-ElastiCache-Hands-On/)
- [AWS 55: ElastiCache Strategies](https://magicishaqblog.netlify.app/2024-01-03-aws-55-ElastiCache-Strategies/)
- [AWS 56: Amazon Memory DB for Redis](https://magicishaqblog.netlify.app/2023-03-15-aws-56-AmazonMemoryDB-for-Redis/)
- [AWS 57: Quiz 3](https://magicishaqblog.netlify.app/quiz-4/2023-03-22-aws-57-quiz-4/)
- [AWS 58: DNS Name](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/)
- [AWS 59: Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)
- [AWS 60 Route 53 Registering Domain](https://magicishaqblog.netlify.app/2024-04-26-aws-60-Route53-registering-domain/)
- [AWS 61 Route 53 Creating First Record](https://magicishaqblog.netlify.app/2024-05-03-aws-61-Route53-Creating-First-Record/)
- [AWS 62: Setting up an EC2 instance and ALB with Route 53](https://magicishaqblog.netlify.app/2024-05-10-aws-62-setting-up-ec2-instances-and-alb-with-route-53/)
- [AWS 63: Route 53 TTL (Time to Live)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/)
- [AWS 64: Route 53 CNAME and alias records](https://magicishaqblog.netlify.app/2024-05-07-aws-64-CNAME-alias-records/)
- [AWS 65: Route 53 simple routing](https://magicishaqblog.netlify.app/2024-12-07-aws-65-Route53-simple-routing/)
- [AWS 66: Route 53 weighted routing](https://magicishaqblog.netlify.app/2024-19-07-aws-route53-weighted-routing/)
- [AWS 67: Route 53 Latency](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 67: Route 53 Latency Routing](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 68: Route 53 Health Checks](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/)
- [AWS 69: Route 53 Health Checks , Hands On](https://magicishaqblog.netlify.app/2024-08-16-aws-69-Health-checks-hands-on/)
- [AWS 70: Route 53 route policy failover](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 71: Route 53 Geolocation Routing](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 72: Route 53 Geoproximity Routing Policy](https://magicishaqblog.netlify.app/2024-11-09-aws-72-Route-53-Geoproximity-Routing-Policy/)
- [AWS 73: Route 53 Traffic Flow](https://magicishaqblog.netlify.app/2024-09-20-aws-73-Route-53-Traffic-Flow/)
- [AWS 74: Route 53 IP Routing Policy](https://magicishaqblog.netlify.app/2024-09-27-aws-74-Route-53-IP-Routing/)
- [AWS 75: Route 53 Multi Value Routing](https://magicishaqblog.netlify.app/2024-04-10-aws-75-Route-53-muti-value-routing/)
- [Quiz 5 : Route 53](https://magicishaqblog.netlify.app/quiz-5/quiz-5/)
- [AWS 76: Domain Registar vs DNS Service](https://magicishaqblog.netlify.app/aws-76-Domain-registar-vs-dns-service/)
- [AWS 77: VPC intro](https://magicishaqblog.netlify.app/2023-11-01-aws-77-VPC-intro/)
- [AWS 78: Understanding AWS VPC and Subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/)
- [AWS 79: VPC network ACIS and security group](https://magicishaqblog.netlify.app/2023-11-22-aws-79-VPC-network-acls-and-security-groups/)
- [AWS 80: VPC Peering](https://magicishaqblog.netlify.app/2024-11-29-aws-80-VPC-peering/)
- [AWS 81: VPC Round Up](https://magicishaqblog.netlify.app/2024-10-01-aws-81-vpc-round-up/)
