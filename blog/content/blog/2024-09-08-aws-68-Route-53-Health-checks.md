---
layout: blog
title: "AWS 68: Route 53 - Health Checks"
date: 2024-08-09T10:07:09.171Z
---

## TLDR

This blog post goes over what a Route 53 health check is and how it plays a role in maintaining healthy and avialable infrastructure.
when creating a load balancer in multiple [regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/)s, the health checks decide on where to DNS route to the correct load balancer to avoid any downtime.

### Introduction

When managing a robust, multi-[regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/) architecture in AWS, ensuring the health and [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) of your resources is paramount. [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/), AWS's scalable [DNS Service](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/), provides a powerful feature to monitor the health of your resources: Health Checks. In this blog, we will delve into how health checks function within [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) and their importance in maintaining a reliable and highly available infrastructure.

#### The Role of Health Checks

Health checks in [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) are essential tools for assessing the status of your resources, particularly public ones. These checks ensure that your users are always directed to healthy endpoints, thereby avoiding downtime and enhancing user experience.

Consider a scenario where you have two [load balancers](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/) distributed across different AWS [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/)s—let’s say, one in `us-east-1` and another in `eu-west-1`. These [load balancers](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/) front your application, running in a multi-[regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/) setup to ensure high [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/). Users accessing your service via a domain like `mydomain.com` should ideally be directed to the closest or fastest load balancer, depending on the configuration—often managed using latency-based routing.

However, what happens if one of these[regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/)s goes down? Without proper health checks, users could be directed to the failed [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/), leading to service disruptions. This is where [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) health checks come into play.

#### Setting Up Health Checks

To avoid sending traffic to an unhealthy [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/), [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) allows you to create health checks for your resources. In our example, we would create health checks for the [load balancers](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/) in both `us-east-1` and `eu-west-1`. These checks will continuously monitor the health of your endpoints and automatically adjust DNS routing if one of them fails, ensuring seamless failover and maintaining high [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/).

[Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) supports three types of health checks:

1. **Endpoint Health Checks**: These monitor the status of a public endpoint, such as an application, server, or another AWS resource. AWS deploys around 15 health checkers globally to send requests to your endpoint. If they receive a `200 OK` or another success code (like `2xx` or `3xx`), the resource is deemed healthy.

2. **Calculated Health Checks**: These allow you to combine the results of multiple health checks into a single one. For example, if you have health checks for three [EC2 instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), a calculated health check can aggregate these into a single check using logical operations (AND, OR, NOT).

3. **Health Checks Linked to CloudWatch Alarms**: This type is particularly useful for monitoring private resources, such as instances within a VPC that aren’t accessible from the public internet. By linking a health check to a CloudWatch Alarm, you can monitor metrics such as CPU utilisation or network traffic, and determine the health of private resources based on these metrics.

#### Global Monitoring and Advanced Configuration

AWS's health checkers operate globally, ensuring that your endpoints are checked from multiple locations around the world. This global reach means that your endpoint's health is validated from diverse network conditions, providing a robust check on its [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/). [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) allows you to configure health checks with thresholds for determining when an endpoint is considered unhealthy and specify the frequency of these checks—ranging from every 30 seconds to every 10 seconds for more sensitive monitoring.

Moreover, health checks support various protocols, including HTTP, HTTPS, and TCP, offering flexibility depending on your application’s needs. You can also fine-tune health checks by setting up [response codes](https://http.dog/) and even verifying specific content within the response body.

#### Monitoring Private Resources

Monitoring private resources can be challenging, given that [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) health checkers reside on the public internet. However, by leveraging CloudWatch Metrics and Alarms, you can create health checks for private [EC2 instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) or other resources within a VPC. By monitoring relevant CloudWatch metrics, such as instance status or custom application metrics, and triggering alarms when thresholds are breached, you can effectively manage the health of private resources.

#### Conclusion

Health checks in [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) are a vital component of maintaining a resilient and highly available AWS infrastructure. By carefully configuring and monitoring these checks, you can ensure that your users are always directed to healthy resources, minimising downtime and maximising the reliability of your services.

This concludes our discussion on health checks in [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/). Stay frosty for more insights in our next post, where we will explore additional features of AWS that help in building robust cloud architectures.

## Recap

from the previous entries in the series

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
- [AWS 27: High [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) and Scalability ](<https://magicishaqblog.netlify.app/section6/2023-07-28-high_[availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)_and_scalability/>)
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
- [AWS 60: Route 53 Registering Domain](https://magicishaqblog.netlify.app/2024-04-26-aws-60-Route53-registering-domain/)
- [AWS 61: Route 53 Creating First Record](https://magicishaqblog.netlify.app/2024-05-03-aws-61-Route53-Creating-First-Record/)
- [AWS 62: Setting up an EC2 instance and ALB with [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)](https://magicishaqblog.netlify.app/2024-05-10-aws-62-setting-up-ec2-instances-and-alb-with-route-53/)
- [AWS 63: Route 53 TTL (Time to Live)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/)
- [AWS 64: Route 53 CNAME and alias records](https://magicishaqblog.netlify.app/2024-05-07-aws-64-CNAME-alias-records/)
- [AWS 65: Route 53 simple routing](https://magicishaqblog.netlify.app/2024-12-07-aws-65-Route53-simple-routing/)
- [AWS 66: Route 53 weighted routing](https://magicishaqblog.netlify.app/2024-19-07-aws-route53-weighted-routing/) -[AWS 67: Route 53 Latency](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 67: Route 53 Latency routing](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
