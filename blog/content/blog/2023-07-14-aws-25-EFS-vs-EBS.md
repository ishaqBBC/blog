---
layout: blog
title: "AWS 25: EFS vs EBS"
date: 2023-07-13T12:39:21.560Z
---

## TLDR

- EBS volumes: attached to one instance at a time, locked at AZ level, IO scaling varies.
- EFS file systems: shared among multiple instances, ideal for Linux-based apps.
- EFS costs more but offers cost-saving features like EFS-IA.
- Instant store storage tied to EC2 instances.
- Clean up EFS resources, instances, volumes, snapshots, and security groups for a fresh start.

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

## Introduction

Following from the previous blog posts we talked about EFS [Elastic File System](https://magicishaqblog.netlify.app/2023-06-30-aws-23-EFS-Elastic-File-System) and EBS [Elastic Block Store](https://magicishaqblog.netlify.app/2023-04-14-aws-16-EBS-Overview-and-Hands-On/). Todays readings will look at these two services comparatively.

## Exploring the Differences: EBS Volumes and EFS File Systems

Hey there, fellow developers! Today, we're diving into the exciting world of cloud storage and exploring the differences between two key offerings: EBS volumes and EFS file systems. So, grab your coffee and let's get started!

## EBS Volumes: Scaling with Flexibility

First up, we have EBS volumes. These volumes are designed to be attached to one instance at a time, except for the unique case of using the multi-attach feature available for io1 and io2 volume types. However, multi-attach is typically reserved for specific use cases.

It's important to note that EBS volumes are locked at the availability zone (AZ) level. Picture this scenario: you have an EC2 instance in AZ1 with an EBS volume attached to it. Unfortunately, that volume cannot be attached to an EC2 instance in AZ2. AZ-level limitations are a factor to consider when working with EBS volumes.

When it comes to performance, there are differences between gp2 and io1 volume types. For gp2 volumes, the IO increases proportionally as the disk size increases. On the other hand, io1 volumes allow you to independently increase IO without altering the disk size. This flexibility is particularly handy for optimizing performance according to your specific requirements.

Migrating an EBS volume across AZs involves taking a snapshot, which places it in the EBS snapshots repository. From there, you can restore the snapshot into another AZ, effectively moving your data from one AZ to the next. Keep in mind that EBS volume backups utilize IO, so running them during high traffic periods may impact overall performance.

A default behavior worth mentioning is that the root EBS volumes of EC2 instances get terminated alongside the instance itself. However, you can disable this behavior if it doesn't align with your requirements.

## EFS File Systems: Shared Storage for the Masses

Now, let's shift our focus to EFS file systems. Unlike EBS volumes, EFS operates as a network file system and is designed to be attached to multiple instances across availability zones. This key distinction makes EFS an excellent choice for scenarios where you need to share a file system among several instances.

With a single EFS file system, you can have different mount targets in various AZs, allowing multiple instances to share the same file system. This flexibility proves incredibly valuable, especially when dealing with applications like WordPress that rely on the POSIX system and are limited to Linux instances.

While EFS offers excellent flexibility and scalability, it comes at a higher price point compared to EBS. However, fear not! You can leverage the EFS-IA (Infrequent Access) feature to optimize costs while still benefiting from the power of EFS.

## Final Thoughts: The Instant Store Consideration

Before we conclude our exploration, it's essential to touch upon the instant store aspect. Instant store storage is physically attached to the EC2 instance itself, meaning that if you lose the EC2 instance, you also lose the storage. This consideration highlights the importance of planning your storage strategy and ensuring appropriate backups and redundancy measures are in place.

## Time for Cleanup: A Fresh Start

Now that we've covered the ins and outs of EBS volumes and EFS file systems, it's time to tidy up and prepare for our next adventure.

To clean up EFS resources, head over to the Actions menu of your file system and select the option to delete it. You'll need to enter the file system ID, so copy and paste it for convenience. With a click, your file system will be gone, and you'll have a fresh slate for future projects.

Next, let's handle EC2 instances. Make sure to terminate any running instances, ensuring a clean environment. Additionally, don't forget to clear up any associated volumes. Simply right-click on each volume and select the delete option. With this step complete, you're one step closer to a pristine setup.

Snapshots are another item to address. Go back to your snapshot repository and delete each snapshot you've created. This ensures you won't be paying for any unnecessary storage going forward.

Lastly, security groups. Unless they are essential to your infrastructure, go ahead and delete any unnecessary security groups. Remember to keep the default security group intact, as it serves as a baseline for your setup. Note that security groups associated with running EC2 instances may not be deleted immediately, so be patient and try again until all instances are terminated.

And voila! With everything cleaned up, you're now ready for the next exciting section of your journey.

Stay tuned for more tips, tricks, and insights tailored to professional young sexy developers like you. Happy coding!
