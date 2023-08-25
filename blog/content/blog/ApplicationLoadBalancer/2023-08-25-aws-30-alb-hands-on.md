---
layout: blog
title: "AWS 30: Application Load Balancer Hands On"
date: 2023-08-25T13:27:36.370Z 
---

## TLDR
Create Instances, create security groups, create ALB and configure all to distribute traffic among your EC2 instances. 

## Introduction
We will be having a hands on look on how to create an [**Application Load Balancer**](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/)


## Launch EC2 Instances:
1. **Creating your Instance**   
    - Go to your AWS Management Console.
   - Navigate to the EC2 Dashboard.
   - Click on "Launch Instances" to create two EC2 instances. 
   [How to create your instance refresher](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/#instance)
![lauching an instance](/blog/src/images/30/alb1.png)

2. **Configure EC2 Instances:**
   - In the instance launch wizard, select "Amazon Linux 2" as the Amazon Machine Image (AMI).
   - Choose the instance type as "t2.micro."
   - Skip the key pair selection since SSH access isn't needed.
   - For network settings, select the existing security group "Launch Wizard 1" that allows HTTP and SSH traffic.
   ![key pair](/blog/src/images/30/alb2.png)

3. **Add EC2 User Data:**
   - In advanced details, scroll down and find the user data section.
   ![advanced details](/blog/src/images/30/alb3.png)
   - Copy and paste the provided EC2 user data script below to configure instances.
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
   - Launch both instances with these settings.
   ![launching instances](/blog/src/images/30/5.png)

4. **Rename Instances:**
   - Once instances are running, go to the EC2 Dashboard.
   - Rename the instances: "My First Instance" and "My Second Instance."
   ![renaming instances](/blog/src/images/30/6.png)

5. **Access Instances:**
   - Copy the IPv4 address of the first instance.
   - Paste it in a browser to verify you get a "hello world" message. use the protocol `http` NOT `https`
   - Repeat for the second instance.
   ![hello message](/blog/src/images/30/7.png)

## Application Load Balancer

6. **Create an Application Load Balancer (ALB):**
   - In the EC2 Dashboard, scroll down to "Load Balancers" and click "Create Load Balancer."
   ![alb](/blog/src/images/30/8.png)
   - Choose "Application Load Balancer."
   - Name your ALB (e.g., "DemoALB").
   ![alb name](/blog/src/images/30/9.png)
   - Select "Internet-facing" and choose "IPv4" as the address type.
   - For availability zones, deploy the ALB in all available zones.

7. **Configure Security Group for ALB:**
   ![security groups](/blog/src/images/30/10.png)
   - Create a new security group for the ALB (e.g., "demo-sg-load-balancer"). [refresher on security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups)
   - Configure inbound rules to allow HTTP traffic from anywhere.
   ![http traffic](/blog/src/images/30/11.png)
   ![create security group](/blog/src/images/30/13.png)

8. **Configure Listener and Target Group:**
   - Under listeners and routing, configure a listener for port 80 (HTTP).
   ![inbound rules](/blog/src/images/30/12.png)
   - Create a new target group (e.g., "demo-tg-alb") for HTTP on port 80.
    ![target group](/blog/src/images/30/15.png)
   - Configure health checks for the target group.

9. **Register Targets:**
   - Register both EC2 instances with the created target group on port 80.
   ![register](/blog/src/images/30/16.png)
    ![target groups](/blog/src/images/30/17.png)

10. **Complete ALB Setup:**
    - Once registered, go back to the ALB configuration page.
    - Your ALB should now be provisioned and active.
    - Find the DNS name associated with the ALB and copy it.
11. **Test Load Balancing:**
    - Paste the ALB's DNS name in a browser.
![dns name](/blog/src/images/30/alb20.png)
    - Refresh the page multiple times to observe load balancing between instances.
    - Verify that the ALB is distributing traffic between instances.

12. **Testing Unhealthy Instances:**
    - In the EC2 Dashboard, stop one of the instances.
    - Wait for the instance to become unhealthy in the target group.
    - Refresh the ALB's DNS name to observe load balancing with only the healthy instance.
    - Restart the stopped instance and verify it becomes healthy again in the target group.

Congratulations! You've successfully created an Application Load Balancer and configured it to distribute traffic among your EC2 instances. This setup provides improved availability and scalability for your blog application.


![hello message](/blog/src/images/30/7.png)

## Clean up
Instances cost money when they run, so please remember to terminate all instance to avoid extra costs. 


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
- [AWS 30: Application Load Balancer](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/)


