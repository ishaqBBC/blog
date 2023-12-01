---
layout: blog
title: "AWS 43: Auto Scaling Groups Policy Hands One"
date: 2023-12-01T14:30:52.175Z
---

## TLDR

In todays blog post we'll look at Automatic Scaling Policies for your [AWS Auto Scaling Groups (ASG)](https://magicishaqblog.netlify.app/2023-11-24-aws-42-Auto-Scaling-Groups-Policy/). There are three categories: scheduled actions, predictive scaling policies, and dynamic scaling policies. Our focus will be on the dynamic scaling policies, specifically target tracking, step scaling, and simple scaling.

## Understanding Scheduled Actions

Scheduled actions allow you to proactively plan for future scaling events. You can define parameters such as desired capacity, minimum and maximum instances, recurrence schedules, and start and end times. This is particularly useful for events you can predict, like scheduled promotions or anticipated spikes in usage.
![Scheduled Actions](/blog/src/images/43/43-1.png)

## Predictive Scaling Policies

Predictive scaling policies leverage machine learning to forecast scaling needs based on historical metrics. By setting a target utilization, such as CPU utilization, you enable AWS to dynamically adjust your ASG to meet predicted demands. While a demonstration requires extensive data and usage, the setup is straightforward, involving metric specification and target utilization.
![Predictive Scaling Policies](/blog/src/images/43/43-2.png)

## Dynamic Scaling Policies in Action

Dynamic scaling policies respond to real-time changes in demand. We'll focus on simple scaling and step scaling, but our primary demonstration will be on target tracking. Target tracking policies dynamically adjust your ASG to maintain a specified metric at a target value. In our case, we'll aim for a CPU utilization of 40%.
![Dynamic Scaling Policies](/blog/src/images/43/43-3.png)

### Simple Scaling

Simple scaling involves creating a CloudWatch alarm that triggers scaling actions based on predefined conditions. You can specify capacity adjustments and incremental units, facilitating straightforward scaling in or out.

### Step Scaling

Step scaling allows you to set up multiple alarms with different scaling steps based on metric values. This flexibility is valuable for nuanced responses to varying levels of demand.

### Target Tracking

We'll create a target tracking policy to maintain a CPU utilisation of 40%. This policy automates the creation of [CloudWatch alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html) and adjusts capacity based on real-time metrics.
![Target Tracking in Action](/blog/src/images/43/43-4.png)

## Putting Target Tracking into Action

We need to increase CPU utilisation on an [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), triggering the target tracking policy to add instances dynamically. We'll explore the CloudWatch alarms generated and demonstrate the power of the ASG in responding to varying workloads.

## Scaling In

After observing the scaling out action, we'll intentionally stress the system to trigger a scale-in event. Witness the ASG intelligently scaling down as the CPU utilisation decreases. Finally, learn the importance of cleaning up resources to ensure the operation of your AWS environment.

## How to

You can mock a stress test by installing `stress.sh` on Amazon linux 2
use these bash commands on you EC2 instance using [instance connect](https://magicishaqblog.netlify.app/2023-03-24-aws-14-instance-connect)

```bash
sudo amazon-linux-extras install epel -y
sudo yum install stress -y
```

once installed use the command

```bash
stress -C 4
```

and this is going to make the CPU go to 100%
by leveraging four CPU units by making four VCPUs
being used at a time.

When you check the monitoring, you will notice an increase in CPU utilistaion
![monitoring](/blog/src/images/43/43-7.png)

We then edit the details to increase the maximum capacity so our ASG can scale after being stressed.

we can view this in the Cloudwatch (go into search bar and type in cloudwatch), then navigate to to alarms
![cloudwatch alarms](/blog/src/images/43/43-8.png)

Click and the alarm thats in `in alarm` state to see where the cpu triggered the auto scaling group policy.
![viewing alarm](/blog/src/images/43/43-9.png)

To scale in, quit the stress test in the terminal of your instance and `reboot` your instances, you should see the amount of cpu decrease and therefore the amount of instances will be decreased.

## Cleanup

Close the terminal of you instance connect to stop the stress test
and terminate and instances as to not incur any charges

## Conclusion

AWS Auto Scaling Groups help manage resources effectively. Learn about scheduling, predictive scaling, and dynamic scaling policies to optimise your infrastructure for different workloads. As you scale, ensure to clean up resources for a well-organised AWS environment.

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
