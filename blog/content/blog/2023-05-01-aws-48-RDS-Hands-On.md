---
layout: blog
title: "AWS: 48 RDS Hands on"
date: 2024-01-05T14:05:45.868Z
---

## TLDR

Here is a step-by-step guide on creating an Amazon RDS database instance using [MySQL](https://simple.wikipedia.org/wiki/Structured_Query_Language). It covers accessing the RDS dashboard, selecting database options, configuring instance settings, connectivity, additional options, and reviewing before launch. The post also guides on connecting to and managing the database, with a detailed recap of the entire AWS blog series. The conclusion celebrates successfully creating and managing the RDS instance, emphasizing security practices.

## Introduction

Welcome to this instructional guide on creating your first [Amazon RDS (Relational Database Service) database](<(https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/)>) instance. In this tutorial, we'll walk through the process of setting up an Amazon RDS database using MySQL as the database engine. This guide aims to cover all the necessary options, giving you a comprehensive understanding, making it suitable for exam preparation.

### Step 1: Accessing Amazon RDS Dashboard

1. Navigate to the Amazon RDS dashboard by using the search bar in AWS.
2. Click on "Databases" on the left-hand side.
3. Select "Create database."

### Step 2: Choosing Database Engine and Creation Method

1. Choose "Standard create" for a detailed walkthrough (or "Easy create" for a quicker setup).
2. Select the database engine. For this guide, choose MySQL 8.0.28.

### Step 3: Configuring Database Options

1. Choose a use-case template (e.g., Free tier, Dev/Test, or Production). We'll use "Production" and modify options for the Free tier.
2. Configure Availability and Durability:
   - Select "Single DB instance" for Free tier.
   - Set the DB identifier to "database-1."
   - Set credentials (e.g., username: `admin`, password: `your-choice`).

### Step 4: Configuring Instance, Storage, and Connectivity

1. Instance Configuration:

   - Choose a burstable class (e.g., `db.t2.micro`) to stay within the Free tier.
   - Select storage type (e.g., gp2) and allocate storage (e.g., 10-20GB).
   - Enable storage autoscaling if needed.

2. Connectivity:

   - Choose to connect an EC2 compute resource or deploy in a specified `VPC`.
   - Specify a `subnet group` and choose whether to allow public access.

3. Create a new security group:
   - Name it (e.g., demo-database-mysql).
   - Allow inbound traffic on port 3306.

### Step 5: Additional Configuration Options

1. Choose initial database name (e.g., mydb).
2. Configure backup settings:

   - Enable/disable automatic backups.
   - Set backup retention period (e.g., 7 days).
   - Specify a backup window.

3. Optional Configurations:
   - Enable monitoring (enhanced monitoring for 60-second granularity).
   - Specify additional database configurations.

### Step 6: Review and Launch

1. Review your configuration settings.
2. Ensure the estimated cost is within the Free tier (even if it displays a cost).

### Step 7: Database Creation

1. Click "Create database."
2. Wait for the database to be created.

Below is what your database set up should look like
![Screenshot of the database options](/blog/src/images/48/48-1.png)

### Step 8: Connecting to the Database

1. Download and install a [SQL](https://simple.wikipedia.org/wiki/Structured_Query_Language) client, such as [SQL Electron](https://github.com/sqlectron/sqlectron-gui/releases/tag/v1.38.0).
2. Use SQL Electron to connect to the database using the provided endpoint, port, username, and password.

### Step 9: Database Management and Exploration

1. Explore options like creating read replicas, monitoring, and taking snapshots.
2. Utilize monitoring features to understand resource utilization.
3. Create snapshots for backup and restoration purposes.

### Step 10: Deleting the Database

1. Before deletion, disable termination protection in the modify settings (if that is selected).
2. Once protection is disabled, delete the database.
3. Confirm the deletion, acknowledging the loss of all data.

## Conclusion

Congratulations! You've successfully created, connected to, and managed your first Amazon RDS database instance. This guide covers key steps for exam preparation and hands-on experience with Amazon RDS. Always ensure proper security configurations and adhere to best practices. Happy learning!

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
- [AWS 43: Auto Scaling Groups Policy - Hands On](https://magicishaqblog.netlify.app/2023-12-01-aws-43-auto-scaling-groups-hands-on/)
- [AWS 44: Auto Scaling Groups - Instant Refresh](https://magicishaqblog.netlify.app/2023-12-08-aws-44-auto-scaling-groups-instant-refresh/)
- [AWS 45: Quiz 3](https://magicishaqblog.netlify.app/quiz-3/2023-12-15-aws-45-quiz-3/)
- [AWS 46: RDS Relational Database Service](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/)
- [AWS 47: RDS Read Replica Multi Az](https://magicishaqblog.netlify.app/2023-29-12-aws-47-RDS-read-replica-Multi-Az/)
