---
layout: blog
title: "AWS 24: EFS Hands on"
date: 2023-07-07T10:15:38.260Z
---

## TLDR

In this blog, I walk through the process of creating an EFS (Elastic File System) in the AWS console, explaining the different settings and options available. From choosing regional or one-zone availability to optimizing performance with different modes, such as General Purpose and Max I/O, I cover it all. I demonstrate how to mount the EFS file system onto EC2 instances and showcase the automatic configuration of security groups. By creating multiple instances, I verify that the EFS file system is accessible and synchronized across them. To clean up, I terminate the instances and delete the EFS file system.

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

## Introduction

Amazon Elastic File System (EFS) is a scalable and fully managed file storage service offered by Amazon Web Services (AWS). It provides a simple and flexible way to store and share data across multiple EC2 instances. In this blog post, we will walk you through the process of creating an EFS file system, configuring its settings, and mounting it onto EC2 instances. Let's dive in and get some hands-on practice with EFS.

## Creating the EFS File System

To begin, we'll navigate to the EFS console and create our first file system.
Search EFS while logged into AWS , then select `create file system`.

we want to explore the different options so select `customize`
![customize console](/blog/src/images/24/1.png)

In the console, we are presented with various options for customizing the file system settings. We'll explore these options to gain a better understanding of EFS.

### Name

Firstly, we are prompted to provide a name for the file system. Although optional, it's good practice to assign a meaningful name to easily identify your resources.
![name](/blog/src/images/24/2.png)

### Storage class

Next, we have to choose between a regional and one-zone EFS file system. The regional option replicates your data across multiple Availability Zones (AZs), ensuring high availability and durability, making it suitable for production environments. However, for testing purposes or to reduce costs, you can opt for a one-zone file system, which stores data redundantly within a single AZ. Keep in mind that if the chosen AZ becomes unavailable, the EFS file system will also be inaccessible.
![storage class](/blog/src/images/24/3.png)

### Automated Backups and Lifecycle Management

Moving on, we encounter settings for automated backups and lifecycle management. Enabling automated backups allows you to restore your file system to a previous state in case of data loss or corruption.

![Automated backups](/blog/src/images/24/4.png)

Lifecycle management helps optimize costs by automatically transitioning less frequently accessed files to the Standard-Infrequent Access (IA) Storage class. You can specify a period of inactivity (e.g., 30 days) after which files will be moved to the IA tier. Additionally, you have the flexibility to decide when files should transition out of IA storage.
![Lifecycle Management](/blog/src/images/24/5.png)

### Performance Settings

Choosing the right performance mode and throughput settings is crucial for optimizing EFS based on your specific use case. General Purpose mode is suitable for latency-sensitive applications like web servers and content management systems, while Max I/O mode offers high throughput and is ideal for big data workloads. Similarly, you can select between bursting and provisioned throughput modes, depending on your requirements.

![image](/blog/src/images/24/7.png)

Ensuring data security is vital, and EFS provides options for encrypting data at rest. By default, encryption is enabled, ensuring the confidentiality and integrity of your data. You can also choose to customize additional encryption settings if needed.

## Configuring Network Access and Mount Targets

Network access settings determine how your EC2 instances connect to the EFS file system. You'll need to choose a Virtual Private Cloud (VPC) and a specific subnet to establish the connection. By default, the EFS file system is configured to work across multiple AZs, with each AZ assigned to a subnet. However, you can customize these settings based on your requirements.

### Attaching a Security Group

To establish secure communication between EC2 instances and the EFS file system, you need to assign a security group. ([How to create a security group](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups)) ,

![security groups](/blog/src/images/24/9.png)
![security groups 2](/blog/src/images/24/11.png)

In our example, we created a specific security group
"efs-demo," within the EC2 console. This security group allows inbound traffic on the NFS protocol (port 2049) from the associated EC2 instances. By attaching the security group to the EFS file system, we ensure that only authorized instances can access it.

![attaching security](/blog/src/images/24/8.png)

## Reviewing and Creating the File System

Once all the settings have been configured, it's essential to review them before creating the EFS file system. Take a moment to ensure that everything aligns with your intended setup. If everything looks good, click on the "Create" button to initiate the creation process.
![reviewing file system](/blog/src/images/24/13.png)

During the file system creation, you can monitor the progress in the console. Once the file system is available, you'll see the allocated storage size, which determines the cost. With EFS, you only pay for the storage you use, so if you're not actively storing data, there are no additional charges.
![creation](/blog/src/images/24/14.png)

## Mounting the EFS File System on EC2 Instances

Now that the EFS file system is created, it's time to mount it onto EC2 instances. We'll launch two instances, Instance A and Instance B, ([How to launch instances](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/)) to demonstrate how the file system can be accessed from multiple EC2 instances.

In the EC2 console, we'll create the instances, choosing Amazon Linux 2 as the operating system. We'll also use the default the storage settings, specifying the desired capacity.

The EC2 console now provides a more straightforward way to configure EFS storage directly during instance creation, eliminating the need for manual commands or user data scripts.

![Network settings](/blog/src/images/24/15.png)

Within the EC2 console, under the file system settings, we can add an EFS file system. We'll link it to the previously created EFS file system and define the mount point as "/mnt/efs/fs1." The EC2 console automatically creates and attaches the required security groups, making the process seamless.
![file settings](/blog/src/images/24/16.png)

After launching the instances, we can verify that each instance has successfully mounted the EFS file system. We connect to the instances using EC2 Instance Connect, allowing us to access the terminal remotely. By navigating to the mount point `ls /mnt/efs/fs1`, we can confirm that the EFS file system is accessible from both instances.
![picture](/blog/src/images/24/17.png)

To demonstrate the file system's functionality, we create a file named "hello.txt" containing the text "hello world" using the bash commands:

create the file in the first instance

```bash
sudo su
echo "hello world" > /mnt/efs/fs1/hello.txt
cat /mnt/efs/fs1/hello.txt
```

check the creation of the file in the second instance

```bash
cat /mnt/efs/fs1/hello.txt
```

within the EFS file system from Instance A. We then switch to Instance B and verify that the same file is accessible from this instance as well. This confirms the successful sharing of the EFS file system across multiple EC2 instances.

![Instance A](/blog/src/images/24/20.png)
![Instance B](/blog/src/images/24/21.png)

### Terminating resources

terminate instances and delete the EFS once finished to avoid any costs by amazon

## Conclusion

In this blog post, we explored Amazon EFS and walked through the process of creating an EFS file system, configuring its settings, and mounting it onto EC2 instances. We learned about the different options available for regional and one-zone file systems, automated backups, lifecycle management, performance modes, throughput settings, and data encryption. We also examined the network access settings, including VPC and subnet selection, and discussed how security groups play a crucial role in establishing secure connections.

By following the steps outlined in this guide, you can get hands-on experience with Amazon EFS and understand its capabilities for scalable and reliable file storage in the AWS cloud. Whether you're building web servers, content management systems, or handling big data workloads, Amazon EFS provides a flexible and efficient solution to meet your storage needs.

**Remember to terminate any resources created during this exercise to avoid incurring unnecessary charges**. By effectively utilizing Amazon EFS, you can unlock the potential of scalable file storage in your AWS infrastructure.
