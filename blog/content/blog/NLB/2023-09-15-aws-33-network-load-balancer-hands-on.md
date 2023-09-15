---
layout: blog
title: "AWS 32: Network Load Balancer"
date: 2023-09-15T10:01:19.482Z
---



## TL;DR:** 


In this tutorial, we will guide you through the process of creating a Network Load Balancer (NLB) on AWS. We will cover setting up a security group, defining listeners and routing rules, creating a target group, and troubleshooting common issues.

---

# Creating an AWS Network Load Balancer (NLB) - A Step-by-Step Guide

Load balancing is a crucial part of modern web applications, ensuring high availability and efficient distribution of incoming traffic. Amazon Web Services (AWS) offers a Network Load Balancer (NLB) service that can help achieve these goals. In this tutorial, we'll walk you through the process of creating an NLB on AWS, step by step.

## Step 1: Creating the Network Load Balancer

Okay, so let's go ahead and practice creating a network load balancer. Follow these steps:

1. **Navigate to the NLB Creation Page:** Sign in to your AWS Management Console, go to the EC2 dashboard, and select "Load balancers." Click the "Create Load Balancer" button.

2. **Configure Basic Settings:** Enter a name for your NLB, e.g., "DemoNLB." Choose an internet-facing load balancer for IPv4.

3. **Network Mapping:** Select your Virtual Private Cloud (VPC) and enable all the availability zones (AZs) you want to use. Each AZ will have a fixed IPv4 address assigned by AWS.

## Step 2: Attaching a Security Group

It is recommended to attach a security group to your NLB to control traffic. Follow these steps:

1. **Create a Security Group:** In the EC2 dashboard, navigate to "Security Groups" and create a new security group, e.g., "demo-sg-nlb."

2. **Define Inbound Rules:** Allow incoming traffic on port 80 (HTTP) from anywhere. Leave the outbound rules as default.

3. **Associate Security Group:** In your NLB settings, refresh the page, and select "demo-sg-nlb" as the security group, removing the default one. This ensures that traffic is properly controlled.

## Step 3: Configuring Listeners and Routing

In this step, you will set up the protocol and routing rules for your NLB:

1. **Define Listeners:** Choose the protocol (TCP, TCP_UDP, TLS, or UDP) and port (e.g., TCP on port 80).

2. **Create a Target Group:** Configure a target group specifically for your NLB. Name it, set the protocol (TCP on port 80), and choose the VPC.

3. **Configure Health Checks:** Use HTTP for health checks if you have an HTTP application running on your EC2 instances. Set the healthy threshold to 2, timeout to 2 seconds, and interval to 5 seconds.

4. **Register Targets:** Select the instances you want to include in your target group and create it.

## Step 4: Verifying and Troubleshooting

After creating your NLB, you might face issues with your instances being marked as unhealthy. Here's how to troubleshoot:

1. **Check Security Group Rules:** Make sure your EC2 instances' security group allows HTTP traffic from both your NLB security group and your Application Load Balancer (ALB) security group if applicable.

2. **Update Security Group Rules:** If needed, modify your EC2 security group to allow traffic from the NLB.

3. **Wait and Refresh:** After making these adjustments, wait for the instances to become healthy. You should see your instances responding to health checks.

4. **Test the NLB:** Access your NLB's URL in your web browser. You should see your application distributed across instances.

## Conclusion and Cleanup

That's it! You've successfully created and configured an AWS Network Load Balancer. To avoid unnecessary costs, remember to delete the load balancer, target group, and security groups when you no longer need them. This practice helps keep your AWS environment clean and cost-efficient.

We hope you found this hands-on guide helpful. Stay tuned for more AWS tutorials, and happy load balancing!