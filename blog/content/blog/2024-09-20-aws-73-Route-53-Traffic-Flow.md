---
layout: blog
title: "AWS 73:Route 53 Traffic Flow"
date: 2024-09-19T23:00:00.000Z
---

# Creating Geoproximity Routing Policies in AWS Route 53

## TLDR

This guide walks through setting up [geoproximity routing in AWS Route 53.](TODO) Using a visual map interface **Traffic Flow**, you can specify different geographical [regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/) and route traffic to various endpoints based on location and custom bias settings. While we explore the creation of geoproximity rules, note that deploying these policies costs, with pricing starting at $50 per month.

---

## Introduction

Geoproximity routing in AWS Route 53 allows for directing users to specific endpoints based on their physical location. This type of routing is essential for optimising latency and ensuring that users are served by the nearest possible server. Additionally, Route 53 provides the option to apply "bias" to endpoints, thereby influencing traffic distribution between [regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/).

In this post, we will create a geoproximity routing policy, configure endpoints, and explore how bias impacts the routing decisions. For visual learners, Route 53 provides a map-based feedback system, which helps in understanding the traffic distribution. Below are detailed steps to implement geoproximity routing.

## Creating a Geoproximity Rule

### Step 1: Initial Setup

Begin by creating a geoproximity routing policy in [AWS Route 53](TODO). Unlike a weighted rule where traffic is split based on weight, a geoproximity rule utilises geographic data.

To get started:

- In the right hand of the **AWS Management Console** of Route 53, Under the **Traffic Flow** heading, click on **Traffic Policy**
- Choose **Create Traffic Policy**
- Choose **Geoproximity** as your routing policy.
- Open the visual map feature to gain insights into the [regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/) you will configure.

### Step 2: Configuring the First Region

You can either enter custom coordinates or choose an AWS region. In this case, we will use `US-East-1` as the first endpoint. Follow these steps:

1. **Select US-East-1** as your region.
2. Specify a bias. For now, leave the bias as `0`, which means traffic will be distributed purely based on proximity.

> **Note**: The bias allows you to shift traffic towards a specific region even if it's not the closest physically.

### Step 3: Configuring the Second Region

Next, we'll configure a second region. For this example, we will use `AP-Southeast-1`, located in Singapore.

1. Select **AP-Southeast-1** as the second region.
2. Enter the relevant IP address or endpoint for Singapore.
3. Adjust the bias if necessary, although we'll leave it as `0` for now to balance the traffic equally.

### Step 4: Understanding the Visual Map

Now that both [regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/) are configured, we can view the routing policy on the map. The map will display which users (based on location) are routed to each instance.

- **Blue region**: Represents traffic directed to the `US-East-1` instance.
- **Orange region**: Represents traffic directed to the `AP-Southeast-1` instance.

You will notice a dividing line, indicating which areas of the world will be routed to each instance.

### Step 5: Adjusting the Bias

Adjusting the bias allows you to favour one region over another. For instance, increasing the bias of the `US-East-1` region to `34` expands the blue region, directing more traffic to the US.

Conversely, setting a negative bias will reduce the size of the blue region and shift traffic towards the Singapore instance. This feature is particularly useful when you wish to control the flow of traffic manually.

### **Geoproximity Map Example**

![Geoproximity Map Example](/blog/src/images/73/73-1.png)

## Adding Additional Endpoints

You are not limited to two [regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/). Let's add a third region, **EU-Central-1**, located in Frankfurt. As before, the map will update, showing how traffic is distributed across the three [regions](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/). You can play with the bias for each region to influence traffic routing further.

### Diagram Placeholder: **Three-Region Geoproximity Map**

![Three-Region Geoproximity Map](/blog/src/images/73/73-2.png)

## Deploying the Traffic Policy

Once the policy is created, it needs to be deployed:

1. **Deploy to Hosted Zone**: Deploy the policy to the relevant hosted zone, such as `proximity.magicishaq.com`.
2. **Set TTL (Time to Live)**: You can specify a TTL for how long the policy is cached by DNS resolvers.

> **Note**: Be aware that deploying this policy incurs a charge of $50 per month. This fee is prorated, but if you're working within the free tier, be mindful of the costs.

### Diagram Placeholder: **Traffic Policy Deployment**

![Traffic Policy Deployment](/blog/src/images/73/73-3.png)

---

## Verifying Traffic Routing

To verify that the policy works, you can test from different geographical locations. Here’s an example of what you can expect:

- If you’re in **Europe**, traffic should be routed to the **EU-Central-1** instance.
- In **Brazil**, traffic will go to the **US-East-1** instance.
- From **Asia** (e.g., Thailand), traffic will be routed to **AP-Southeast-1**.

## Key Takeaways

Before finalising any policy, remember to review the associated costs and delete unnecessary records to avoid additional charges. Geoproximity routing is a valuable tool in managing global traffic effectively, and this tutorial provided the steps to get started.

Stay tuned for further lessons on AWS certifications and hands-on labs!

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
- [AWS 60 Route 53 Registering Domain](https://magicishaqblog.netlify.app/2024-04-26-aws-60-Route53-registering-domain/)
- [AWS 61 Route 53 Creating First Record](https://magicishaqblog.netlify.app/2024-05-03-aws-61-Route53-Creating-First-Record/)
- [AWS 62: Setting up an EC2 instance and ALB with [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)](https://magicishaqblog.netlify.app/2024-05-10-aws-62-setting-up-ec2-instances-and-alb-with-route-53/)
- [AWS 63: Route 53 TTL (Time to Live)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/)
- [AWS 64: Route 53 CNAME and alias records](https://magicishaqblog.netlify.app/2024-05-07-aws-64-CNAME-alias-records/)
- [AWS 65: Route 53 simple routing](https://magicishaqblog.netlify.app/2024-12-07-aws-65-Route53-simple-routing/)
- [AWS 66: Route 53 weighted routing](https://magicishaqblog.netlify.app/2024-19-07-aws-route53-weighted-routing/) -[AWS 67: Route 53 Latency](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 67: Route 53 Latency Routing](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 68: Route 53 Health Checks](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/)
- [AWS 69: Route 53 Health Checks , Hands On](https://magicishaqblog.netlify.app/2024-08-16-aws-69-Health-checks-hands-on/)
- [AWS 70: Route 53 route policy failover](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 71: Route 53 Geolocation Routing](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 72: Route 53 Geoproximity Routing Policy](https://magicishaqblog.netlify.app/2024-11-09-aws-72-Route-53-Geoproximity-Routing-Policy/)
