---
layout: blog
title: "AWS 33: Network Load Balancer (Hands On)"
date: 2023-09-15T10:01:19.482Z
---

# TLDR

In this tutorial, we will guide you through the process of creating a [Network Load Balancer (NLB)](https://magicishaqblog.netlify.app/NLB/2023-09-09-aws-32-network-load-balancer/) on AWS. We will cover setting up a security group, defining listeners and routing rules, creating a target group, and troubleshooting common issues.

---

# Creating an AWS Network Load Balancer (NLB)

Load balancing is a crucial part of modern web applications, ensuring high availability and efficient distribution of incoming traffic. Amazon Web Services (AWS) offers a [Network Load Balancer (NLB)](https://magicishaqblog.netlify.app/NLB/2023-09-09-aws-32-network-load-balancer/) service that can help achieve these goals. In this hands on, we'll walk you through the process of creating an NLB on AWS.

## Step 1: Creating the Network Load Balancer

Okay, so let's go ahead and practice creating a network load balancer. Follow these steps:

1. **Navigate to the NLB Creation Page:** Sign in to your AWS Management Console, go to the EC2 dashboard, and select "Load balancers." Click the "Create Load Balancer" button. and then on "Network load Balancer" create button.
   ![NLB create button](/blog/src/images/32/32-1.png)

2. **Configure Basic Settings:** Enter a name for your NLB, e.g., "DemoNLB." Choose an internet-facing load balancer for IPv4.
   ![NLB create button](/blog/src/images/32/32-2.png)

3. **Network Mapping:** Select your Virtual Private Cloud (VPC) and enable all the availability zones (AZs) you want to use. Each AZ will have a fixed IPv4 address assigned by AWS.
   ![NLB create button](/blog/src/images/32/32-3.png)

## Step 2: Attaching a Security Group

It is recommended to attach a security group to your NLB to control traffic. Follow these steps:

1. **Create a Security Group:** In the EC2 dashboard, navigate to "Security Groups" and create a new security group, e.g., "demo-sg-nlb."
   ![NLB create button](/blog/src/images/32/32-4.png)

2. **Define Inbound Rules:** Allow incoming traffic on port 80 (HTTP) from anywhere. Leave the outbound rules as default.
   ![NLB create button](/blog/src/images/32/32-6.png)

3. **Associate Security Group:** In your NLB settings, refresh the page, and select "demo-sg-nlb" as the security group, removing the default one. This ensures that traffic is properly controlled.
   ![NLB create button](/blog/src/images/32/32-7.png)
   ![NLB create button](/blog/src/images/32/32-8.png)

## Step 3: Configuring Listeners and Routing

In this step, you will set up the protocol and routing rules for your NLB:

1. **Define Listeners:** Choose the protocol (TCP, TCP_UDP, TLS, or UDP) and port (e.g., TCP on port 80).

2. **Create a Target Group:** Configure a target group specifically for your NLB. Name it, set the protocol (TCP on port 80), and choose the VPC.
   ![NLB create button](/blog/src/images/32/32-9.png)

3. **Configure Health Checks:** Use HTTP for health checks if you have an HTTP application running on your EC2 instances. Set the healthy threshold to 2, timeout to 2 seconds, and interval to 5 seconds.

![NLB create button](/blog/src/images/32/32-11.png)

4. **Register Targets:** Select the instances you want to include in your target group and create it.

## Step 4: Verifying and Troubleshooting

After creating your NLB, you might face issues with your instances being marked as unhealthy. Here's how to troubleshoot:

1. **Check Security Group Rules:** Make sure your EC2 instances [(these where the one created in the Application Load Balancer)](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance)' security group allows HTTP traffic from both your NLB security group and your Application Load Balancer (ALB) security group if applicable.

2. **Update Security Group Rules:** If needed, modify your EC2 security group to allow traffic from the NLB.
   ![NLB create button](/blog/src/images/32/32-16.png)
   ![NLB create button](/blog/src/images/32/32-12.png)
3. **Wait and Refresh:** After making these adjustments, wait for the instances to become healthy. You should see your instances responding to health checks.
   ![NLB create button](/blog/src/images/32/32-17.png)

4. **Test the NLB:** Access your NLB's URL in your web browser. You should see your application distributed across instances.
   ![NLB create button](/blog/src/images/32/32-15.png)
   ![NLB create button](/blog/src/images/32/32-18.png)

## Conclusion and Cleanup

That's it! You've successfully created and configured an AWS Network Load Balancer. To avoid unnecessary costs, remember to delete the load balancer, target group, and security groups when you no longer need them. This practice helps keep your AWS environment clean and cost-efficient.

We hope you found this hands-on guide helpful. Stay tuned for more AWS tutorials, and happy load balancing!

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
