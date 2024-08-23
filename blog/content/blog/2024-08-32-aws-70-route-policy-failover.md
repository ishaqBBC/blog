---
layout: blog
title: "AWS 70: Route 53 Policy - Failover"
date: 2024-08-23T12:10:52.650Z
---

## TLDR

Failover routing with AWS [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) ensures your services stay online by automatically switching traffic from a failed primary server to a backup. You set it up by linking your primary EC2 [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) to a [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/) and creating a secondary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) as a backup. If the primary fails, [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) redirects traffic to the secondary, keeping your service up and running. It's a simple, yet powerful way to ensure high [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) for your applications.

### Introduction

In todays blog, we delve into the intricacies of routing policies, with a particular focus on implementing failover using AWS Route 53. The discussion will guide you through the process of setting up a robust failover mechanism that ensures high [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) and reliability for your applications.

#### What is Failover Routing?

Failover routing is a critical feature for maintaining the uptime of your services. It enables automatic redirection of traffic from an unhealthy primary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) to a healthy secondary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), ensuring continuous service [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/).

In this scenario, we use AWS Route 53, a scalable [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) and domain name registration service, to manage this failover process effectively. The setup involves:

- **Primary EC2 Instance**: The main [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) where traffic is directed under normal circumstances.
- **Secondary EC2 Instance**: A backup [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) activated only when the primary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) becomes unavailable.

#### Key Steps in Setting Up Failover Routing

1. **Associate Primary Record with Health Check**:

   - The primary EC2 [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) must be linked to a [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/). This is mandatory to enable automatic failover.
   - If the [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/) fails (i.e., the [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) becomes unhealthy), [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) will redirect traffic to the secondary EC2 [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/).

2. **Create the Failover Record in Route 53**:

   - Begin by creating an A record in your hosted zone. For example, `failover.magicishaq.com`.
   - Set the first value to your primary EC2 [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), say the one in the EU-central-1 region.
   - Configure the routing policy as a failover, with a [Time-To-Live (TTL)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/) of 60 seconds.
   - Define this record as the primary and associate it with the [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/) for the EU-central-1 [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/).
     ![screenshot of creating the first failover record](/blog/src/images/70/70-1.png)

3. **Configure the Secondary Record**:

   - Create another A record with the same name, `failover.magicishaq.com`.
   - Set this to point to your secondary EC2 [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), for example, the one in US-east-1.
   - Again, configure the TTL to 60 seconds and set the routing policy to secondary.
   - Optionally, you can associate this record with a [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/), but it's not obligatory.
     ![screenshot of creating the second failover record](/blog/src/images/70/70-2.png)

4. **Testing the Failover**:

   - To test, manually trigger a failure on the primary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) by altering its security group settings to block traffic. This will cause the [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/) to fail.
   - As a result, [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) should automatically redirect traffic to the secondary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/).
   - Verify this by accessing `failover.magicishaq.com` and ensuring that it now points to the secondary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/).
     ![screenshot of testing the failovers](/blog/src/images/70/70-3.png)

5. **Restoring the Primary Instance**:
   - To revert to the primary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), simply restore the security group settings to allow traffic. The [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/) will pass, and [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) will switch back to routing traffic to the primary [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/).

#### Conclusion

The failover routing policy in AWS [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/) is an essential tool for maintaining high [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/). By correctly associating [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/)s with your primary and secondary EC2 [instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/)s, you can ensure that your application remains accessible even in the event of a failure.

In the hands-on portion of your configuration, you learned how to create and test these records, validating the effectiveness of your failover strategy. This seamless failover mechanism underscores the reliability and robustness of AWS infrastructure in supporting critical applications.

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
