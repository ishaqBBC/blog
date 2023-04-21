---
layout: blog
title: "AWS 17: EBS Snapshots"
date: 2023-04-21T16:26:31.945Z 
---

## TLDR

EBS snapshots are backups of EBS volumes that allow you to create a point-in-time backup that can be restored later if needed. EBS snapshots can be created without detaching the EBS volume from the EC2 instance and can be done through the AWS Management Console, CLI, or programmatically. EBS snapshots can be copied across different availability zones or regions and can be moved to an archive tier that is cheaper but takes 24 to 72 hours to restore. If you accidentally delete an EBS snapshot, AWS provides a Recycle Bin for EBS snapshots, and fast snapshot restore is a feature that can initialise a snapshot without latency on the first use, but it is expensive. The post includes a step-by-step guide on how to create an EBS snapshot.


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

## Introduction
EBS snapshots are a backup at any point in time of your EBS volume. They are an important aspect of data protection and disaster recovery, as they allow you to create a point-in-time backup of your EBS volume, which you can restore later if needed.

In this post, we will discuss EBS snapshots in detail, including their features, benefits, and how to use them.

## Creating EBS Snapshots

To create an EBS snapshot, you don't have to detach your EBS volume from your EC2 instance, but it's recommended. You can create a snapshot from the AWS Management Console, the AWS CLI, or programmatically using the AWS SDKs. Once created, EBS snapshots are stored in Amazon S3, which provides durability by storing data across multiple devices in multiple facilities.

## Copying EBS Snapshots

One of the advantages of EBS snapshots is that you can copy them across different availability zones or even across different regions. For example, let's say you have an EC2 instance with an EBS volume in US-EAST-1A and another EC2 instance in US-EAST-1B. You can take a snapshot of the EBS volume and restore it in another AZ. This is how you would transfer an EBS volume from one AZ to another.

## EBS Snapshot Archive

The EBS Snapshot Archive is a feature that allows you to move a snapshot to an "archive tier" that is up to 75% cheaper. However, it takes 24 to 72 hours to restore an archived snapshot. This feature can be useful if you have infrequently accessed data that you want to keep for a long time at a lower cost.

## Recycle Bin for EBS Snapshots

If you accidentally delete an EBS snapshot, you don't have to worry about losing it permanently. AWS provides a Recycle Bin for EBS Snapshots. Instead of being permanently deleted, deleted snapshots land in the Recycle Bin, where you can recover them from an accidental deletion. The retention for your Recycle Bin can be set anywhere between one day to one year.

## Fast Snapshot Restored

The Fast Snapshot Restored is a feature that forces a full initialization of your snapshot to have no latency on the first use. This feature can be helpful if your snapshot is very large and needs to initialise an EBS volume or instance quickly. However, this feature is expensive, so use it carefully.


## ECS Snapshots hands on
- Navigate to your EC2 console and locate the gp2 EBS volume you want to snapshot.
- Click on the volume and select "Actions".
- Select "Create Snapshot".
![snapshots actions](/blog/src/images/ss-1.png)
- Add a description for the snapshot (e.g. "demo snapshots").
![snapshots description](/blog/src/images/ss-2.png)
- Click on "Create Snapshot".
- To view your snapshots, click on "Snapshots" on the left-hand side menu.
![snapshots pane](/blog/src/images/ss-3.png)
- To copy a snapshot to another region, right-click on the snapshot and select "Copy Snapshots".
- Choose the destination region and click on "Copy Snapshots". See how now we can move to different regions
![copy snapshots](/blog/src/images/ss-4.png)
![copy snapshots inside the right click](/blog/src/images/ss-4.2.png)
- To recreate a volume from a snapshot, select "Actions" and then "Create Volume from Snapshots".
- Choose the snapshot and select the volume size and target availability zone.
- You can also encrypt the volume and add tags.
- Click on "Create Volume".
![create volume](/blog/src/images/ss-5.png)
- To protect your snapshots from accidental deletion, create a retention rule.
- The snapshots will be saved in the recycle bin . > go to snapshots and click on recycle bin
![recycle bin](/blog/src/images/ss-6.png)
- Select "Create Retention Rule" and choose the rule parameters (e.g. one day after deletion).
![retention rules](/blog/src/images/ss-10.png)
- To move the storage tier, archive the snapshot.
- To delete a snapshot, select it and click on "Delete Snapshot".
![delete snapshot](/blog/src/images/ss-7.png)
- To recover a snapshot, go to the recycle bin and click on "Recover Resources".


## Conclusion

EBS snapshots are an important aspect of data protection and disaster recovery in AWS. They allow you to create a point-in-time backup of your EBS volume, which we can restore later if needed. EBS snapshots have several features that can be beneficial, including the ability to copy them across different availability zones or regions, the EBS Snapshot Archive, the Recycle Bin for EBS Snapshots, and the Fast Snapshot Restored. It's essential to use these features carefully to optimise your costs and ensure your data is protected.


