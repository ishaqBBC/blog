---
layout: blog
title: "AWS 41: Auto Scaling Group - Hands On"
date: 2023-11-17T17:06:05.564Z
---

## TLDR

Terminate Instances: Ensure all EC2 instances are terminated.
Create Launch Template: Generate a launch template with specifications.
Configure Auto Scaling Group: Set up the Auto Scaling group, linking it to the launch template.
Adjust Group Size: Experience scaling by updating desired capacity.
Now, let's dive into the details.

## Introduction

Following from our previous blog post [Auto Scaling Groups (ASGs)](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/) in Amazon Web Services (AWS) provide a way to automatically adjust the number of [EC2 instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) in your application based on demand. In this blog post, we'll give you a **hands on** in creating and configuring an Auto Scaling group from scratch.

### Step 1: Terminate Instances

- Before we start, make sure all EC2 instances are terminated in your EC2 dashboard to ensure a clean slate.

### Step 2: Create Launch Template

- Navigate to the EC2 Dashboard.

- Click on "Auto Scaling groups" in the left sidebar.
  ![Auto Scaling Groups](/blog/src/images/41/41-1.png)
- Create a new launch template (e.g., MyDemoTemplate).

- Configure template options, including Amazon Machine Image (Amamzon Linux 2), Instance Type (t2.micro), Key Pair (Ec2 tutorial), Security Groups,
  for the advanced details in user data use this script :

  ```bash
    #!/bin/bash
        # Use this for your user data (script from top to bottom)
        # install httpd (Linux 2 version)
        yum update -y
        yum install -y httpd
        systemctl start httpd
        systemctl enable httpd
        echo "<h1>Hello World from $(hostname -f)</h1>"> /var/www/html/index.html
  ```

  \*\*Hint, this is very similar to the previous blog posts where we created an EC2 [Tutorial Here](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/)

### Step 3: Configure Auto Scaling Group

- In the EC2 Dashboard, click on "Auto Scaling Groups."
  ![Auto Scaling Groups](/blog/src/images/41/41-1.png)
  Create a new Auto Scaling group.
- Name your group (e.g., DemoASG).
  ![Name of group](/blog/src/images/41/41-2.png)
  Choose the launch template created in Step 2.
  ![launch template](/blog/src/images/41/41-3.png)
  and click on next

- Set up instance launch options, VPC, subnets, health checks, and advanced options. such as adding an additional load balancer.
  ![Advanced Options Configuration](/blog/src/images/41/41-4.png)
  \*\*Hint : you can attach an [ALB](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-25-aws-30-alb-hands-on/)

- Define Auto Scaling group size (desired, minimum, and maximum capacity).
  ![Group Size Configuration](/blog/src/images/41/41-5.png)
  Configure scaling policies, notifications, and tags as needed.
  ![Scaling Policies Configuration](/blog/src/images/41/41-6.png)
  Review settings and create the Auto Scaling group.

Here the ASG will create an instance for us

### Step 4: Adjust Group Size

- Observe the activity in the "Activity" tab of your Auto Scaling group.
  ![Activity History](/blog/src/images/41/41-7.png)
- Update desired capacity to experience scaling. if you want to increase the number of instances

Don't forget to delete after as to not incur any charges.

## Conclusion

Congratulations! You've successfully created and configured an Auto Scaling group, allowing your application to dynamically adjust to changing demands. In the next lecture, we'll delve into automatic scaling for even more advanced configurations.

Stay tuned for more AWS tutorials!

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
