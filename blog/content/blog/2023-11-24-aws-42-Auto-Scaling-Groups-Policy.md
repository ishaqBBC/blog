---
layout: blog
title: "AWS 42: Auto Scaling Groups Policy"
date: 2023-11-24T11:33:18.818Z
---

## TLDR

[Auto Scaling Group (ASG)](https://magicishaqblog.netlify.app/2023-11-17-aws-41-auto-scaling-groups-hands-on/) scaling policies come in dynamic and predictive types. Metrics like CPU utilization, request counts, and network metrics guide scaling decisions. A cooldown period follows each scaling activity, and using ready-to-use AMIs and enabling detailed monitoring enhances efficiency.

## Understanding Auto Scaling Group Scaling Policies

Today, let us delve into the intricate realm of [Auto Scaling Group (ASG)](https://magicishaqblog.netlify.app/2023-11-17-aws-41-auto-scaling-groups-hands-on/) scaling policies. As your humble guide in this digital labyrinth, I shall elucidate the two primary types of scaling policies at play: dynamic scaling policies and the avant-garde predictive scaling.

## Dynamic Scaling Policies

1. **Target Tracking Scaling:**

   - Set a target, such as maintaining 40% average CPU utilization.
   - Ensures a consistent baseline for availability.

2. **Simple and Step Scaling:**

   - Triggered by [CloudWatch alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html) based on custom rules.
   - Adjust capacity by specified units in response to CPU utilisation thresholds. (means that your system can automatically increase or decrease the number of [instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/))

3. **Scheduled Actions:**

   - Anticipate scaling based on known usage patterns.
   - Ideal for events with predictable spikes in traffic.

4. **Predictive Scaling:**
   - Harnesses machine learning to forecast scaling needs.
   - Proactively schedules scaling actions based on historical load analysis. (means predicting future patterns based on previous patterns).
     ![Predictive graph](/blog/src/images/42/42-2.png)

## Metrics for Scaling

- **CPU Utilization:**
  - Reflects [instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) workload; useful for general scaling.
- **Request Counts per Target:**
  - Application-specific metric for optimal performance.
- **Network Metrics:**
  - Scale based on average network in or out, vital for network-bound applications.
- **Custom Metrics:**
  - Tailor metrics to application specifics, pushing them to [CloudWatch](https://aws.amazon.com/cloudwatch/features/#:~:text=Amazon%20CloudWatch%20is%20a%20monitoring,cloud%20applications%20and%20infrastructure%20resources.) for scaling policies.

## Scaling Cooldown

- After a scaling activity, a default cooldown of five minutes ensues.
- During this period, ASG refrains from launching or terminating additional [instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/).
- Allows metrics to stabilize and new [instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) to take effect.

below is an exampke diagram illustrating these principles
![diagram of ASG policies in action, a flow chart](/blog/src/images/42/42-1.png)

## Pro Tips for Efficient Scaling

1. Use a ready-to-use [Amazon Machine Image (AMI)](https://magicishaqblog.netlify.app/2023-04-28-aws-18-ami/) to reduce EC2 configuration time.
2. Enable detailed monitoring for ASG to access lower-level metrics every minute.

## Conclusion

the intricacies of ASG scaling policies are a crucial aspect of maintaining a responsive and efficient system. Choose your metrics wisely, understand the cooldown period, and optimise your configuration for a seamless scaling experience.

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
