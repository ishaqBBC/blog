---
layout: blog
title: "AWS 16: EBS"
date: 2023-04-14T08:52:44.843Z 
---

## TLDR
date


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

## Introduction

In todays blog post, we will be going over [EC2](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) Storage Options, the most important ones being EBS (Elastic Block Store)


##  Overview
EBS stands for **Elastic Block Store** ; It's a network drive that you can attach to your [instances](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types) while they run. Essentially, EBS Volumes allow us to persist data, even after the instance is terminated. This means we can recreate an instance and mount the same EBS Volume from before to get back our data, which is incredibly helpful.

EBS Volumes are like network USB sticks that can be attached through the network and communicate with [instances](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types) using the network. As a result, there may be some latency when communicating between the instance and the EBS Volume. However, because they are a network drive, EBS Volumes can be detached from an EC2 instance and attached to another one quickly, making it very convenient for failover.

When creating an EBS Volume, you will need to provide provision capacity in advance and specify how many GBs you want and the **IOPS**(input/output operations per second) you need. In otherworld, describing the size and performance of you EBS Volume. 
You will be billed for this provisioned capacity, and you can increase it over time if you need better performance or more storage space. However this blog series uses the free tier. 

It's important to note that EBS Volumes are locked to a specific availability zone, which means that if it's created in us-east-1a, for example, it cannot be attached to us-east-1b. However, you can move a volume across different availability zones using a [snapshot](https://magicishaqblog.netlify.app/).

In terms of attaching EBS Volumes to [instances](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types), they can only be mounted to one instance at a time at the Certified Cloud Practitioner level. This means that if you create another EC2 instance, it needs to have its own EBS Volume attached to it.
However, you can attach multiple EBS Volumes to a single instance, much like plugging in multiple USB drives to a computer.

![EBS Diagram - showing the relationship of ebs volumes and instances](/blog/src/images/ebs-1.png)

Above is a diagram that shows that one instance can have multiple EBS volumes, but a EBS can only have one instance. EBS volumes can also be unattached

EBS Volumes can also be created and left unattached, meaning they don't need to be necessarily attached to an EC2 instance. This makes them very powerful as they can be attached on demand.

Finally, when creating EBS Volumes through EC2 [instances](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types), there is an attribute called "Deletes on Termination" that controls the EBS behavior when an EC2 instance is terminated. By default, the root EBS Volume is deleted alongside the instance being terminated, while any other attached EBS Volume is not deleted. However, you can enable or disable "Deletes on Termination" depending on your use case. For example, if you want to preserve the root volume when an instance is terminated to save some data, you can disable "Deletes on Termination" for the root volume.

In summary, EBS Volumes are a critical storage option for EC2 [instances](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types) that allow us to persist data even after an instance is terminated. They can only be mounted to one instance at a time, are locked to a specific availability zone, and need to be provisioned in advance. However, they can be attached on demand, detached quickly, and come with an attribute to control EBS behavior when an EC2 instance is terminated.

## Hands On
Introduction:
In this blog post, we will be discussing EBS volumes and how they are attached to an EC2 instance. We will also explore the different types of EBS volumes available and how to create and attach them to an instance. Additionally, we will look at the behavior of EBS volumes when an instance is terminated.

EBS Volumes Attached to Instance:
To view the EBS volumes attached to an EC2 instance, navigate to the instance and then go to the storage tab. Here, you will find the root device and any block devices attached to it. In our case, we have one volume of eight gigabytes currently attached to our instance. Clicking on this volume takes us to the volumes interface of AWS where we can confirm its existence and see that it's in use and attached to an instance.

Creating and Attaching EBS Volumes:
To create a new EBS volume, go to the volumes interface and click on "Create Volume." You will have several options to choose from, such as GP2, GP3, and more. For our example, we will choose GP2 of type and size two gigabytes. Additionally, we will select the same availability zone as our EC2 instance, which we can find in the networking tab of the instance. After creating the volume, we can attach it to our instance by selecting the "Attach Volume" option in the volumes interface and choosing the instance we want to attach it to. We can confirm that the volume is attached by refreshing the storage tab of our EC2 console.

Different AZs and EBS Volumes:
To demonstrate that EBS volumes are bound by specific availability zones, we can create another volume of two gigabytes but in a different AZ than our EC2 instance. We will then see that we cannot attach this volume to our instance because it's in a different AZ. Lastly, we can delete a volume by selecting the "Delete Volume" option in the volumes interface.

Terminating an Instance and EBS Volume Behavior:
When an instance is terminated, the root volume, which has the delete on termination attribute, is removed. This behavior is set by default when launching an instance, but it can be changed to keep the root volume after terminating the instance. We can confirm this attribute by going to the storage tab of our EC2 console and checking the "delete on termination" column. After terminating the instance, the root volume disappears, and only the other attached volumes remain.

Conclusion:
In conclusion, EBS volumes are an essential part of AWS and are necessary for storing data for EC2 [instances](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types). We have explored the different types of EBS volumes available, how to create and attach them to [instances](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types), and the behavior of EBS volumes when an instance is terminated. By understanding these concepts, we can effectively manage our AWS resources and optimize our workflows.

Open the AWS Management Console and navigate to your EC2 instance.
Click on the instance and then click on the "Storage" tab.
Find the root device and any block devices that are attached to your EC2 instance.
Click on a block device to access the "Volumes" interface of AWS.
Here you can see that the volume exists, and it is in use and attached to an instance.
To create a new volume, click on the "Create Volume" button and select the volume type (e.g. GP2), size (e.g. 2GB), and availability zone.
After the volume is created, click on the volume and then click on "Actions" and then "Attach Volume".
Select the instance that you want to attach the volume to and click on "Attach Volume".
To check if the new volume is attached to your EC2 instance, refresh the storage page.
To use the new block device, you need to format the EBS volume and attach it to the EC2 instance.
To delete a volume, select it in the "Volumes" interface, click on "Actions" and then "Delete Volume".
When you terminate an instance, any block devices that have the "Delete on Termination" attribute set to "Yes" will be deleted automatically. To change this attribute, you can do so in the "Advanced" section of the storage page when launching an instance.
Note: The steps to format and attach a new block device are not covered in this course. Please refer to the AWS documentation for further instructions.


So, picture this: you're cruising along on your EC2 instance with your trusty EBS volume in tow. But you know what they say about backups - they're like insurance, you never know when you'll need them, but when you do, boy are you glad you have them! That's where EBS Snapshots come in handy.

The beauty of it all is that you don't even need to detach your EBS volume from your EC2 instance to take a snapshot. But hey, it's recommended, you know, just in case. And once you've got your snapshot, you can even copy it across different Availability Zones or even different Regions! Talk about flexibility!

Let's say you've got an EC2 instance in US-EAST-1A with an EBS volume, and another instance in US-EAST-1B. You can take a snapshot of that EBS volume and then restore it in a different AZ. Boom, just like that, you've moved your EBS volume from one AZ to another.

But wait, there's more! You can also take advantage of some sweet EBS Snapshot features. First up, we've got the EBS Snapshot Archive. It's like a VIP lounge for your snapshots, and it's up to 75% cheaper than your standard snapshot storage. Just keep in mind that if you do move your snapshot to the archive tier, it'll take a bit longer (24-72 hours) to restore.

Then there's the Recycle Bin for EBS Snapshots. Instead of permanently deleting your snapshots, they get tossed in the Recycle Bin for safekeeping. It's like a safety net for those accidental deletions. And get this, you can set the retention for your Recycle Bin anywhere from one day to one year.

Last but not least, we've got Fast Snapshot Restored. This bad boy forces a full initialization of your snapshot with no latency on the first use. It's a lifesaver if you've got a ginormous snapshot and need to initialize an EBS volume or instance out of it quickly. But beware, it can cost a pretty penny, so use it wisely.

Well, that's all for now, folks! Thanks for tuning in, and I hope you got a kick out of our little chat about EBS Snapshots. Stay safe out there!







## Conclusion
Conclusion

