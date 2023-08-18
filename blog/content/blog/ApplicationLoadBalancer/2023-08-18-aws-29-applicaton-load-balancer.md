---
layout: blog
title: "AWS 29: Application Load Balancer"
date: 2023-08-18T08:34:27.473Z
---

## TLDR
Application Load Balancers (ALB) control traffic to the correct target group, therefore balancing the load coming into an application. 



Welcome back to our aws blog. Last time, we talked about load balancers and how they help spread out internet traffic. Now, get ready to dive into the world of "application load balancers" (ALBs), which are like traffic directors for websites and apps.

## ALBs: The Traffic Directors

Imagine you're in charge of a big parade with lots of different floats. Each float represents a different website or app. Now, you need a way to make sure the parade goes smoothly, with each float getting its turn in the spotlight. That's where an ALB comes in. It's like a super-smart parade director that makes sure all the floats (websites and apps) get seen by the crowd (internet users).

![application load balancer](/blog/src/images/29/alb.png)

## Meet the Target Groups: (The Float Categories)

Think of a parade where you have different categories of floats: funny ones, cool ones, and even some with animals. These categories are like "target groups" for ALBs. Each target group holds a bunch of floats (websites or apps) that belong together. The ALB knows which float should go where, just like it knows which website or app should get the internet traffic.
 
 the types of target groups are:

- **EC2 Instances**: These are virtual servers in Amazon's Elastic Compute Cloud (EC2) service. ALBs can route traffic to target groups made up of EC2 instances, allowing you to balance load among different instances to ensure efficient handling of requests.

- **Auto Scaling Groups**: Auto Scaling is a feature that automatically adjusts the number of EC2 instances based on demand. ALBs can manage target groups of EC2 instances within Auto Scaling Groups, dynamically scaling resources up or down as needed.

- **Amazon ECS Tasks**: Amazon Elastic Container Service (ECS) allows you to run applications in containers. ALBs can route traffic to target groups of ECS tasks, providing load balancing for containerized applications.

- **Lambda Functions**: AWS Lambda enables you to run code without provisioning or managing servers. Surprisingly, ALBs can also be used in front of Lambda functions, allowing you to distribute incoming traffic to different functions. (we will do a deep drive later in the series regarding lambdas) but essentially it turns a HTTP request into a JSON object.  

- **Private IP Addresses**: ALBs can route traffic to target groups consisting of private IP addresses. This is useful for scenarios where you want to route traffic to resources in your own data center or private network.

Each of these target group types serves a specific purpose and allows ALBs to efficiently manage and distribute traffic to different types of resources based on your application architecture and requirements.


## Smart Routing: (Directing the Floats)

Now, let's talk about how ALBs route or direct the floats. Picture this: you have a map of the parade route, and you can decide which float goes which way. ALBs do something similar with internet traffic. They can route traffic based on different things, like the name of the float (domain name)
```
 (https://magicishaqblog.netlify.app/) 2023-01-23-aws-2-getting-started/, 
 ```
 the type of float (URL path), and even what people are looking for (query strings)
 ```
  https://magicishaqblog.netlify.app/ (2023-01-23-aws-2-getting-started/) .
  ```
  or event the query string
  ```
  https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started?(id=ishaq)
  ```
  ![diagram of ALB](/blog/src/images/29/1.png)
 

## ALBs: The Friendly Intermediaries

When someone wants to see a float in the parade (visit a website or app), they talk to the ALB first. The ALB is like the gatekeeper. It takes notes about who wants to see the float (the client's IP address), what kind of float they want to see (the URL), and even the best way to get there (the protocol).

## Conclusion

 In our next chapter, we'll roll up our sleeves and create our very own application load balancer. You'll get to see how ALBs work their magic, making sure all the floats (websites and apps) get their time to shine.

## Recap

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
