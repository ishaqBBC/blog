---
layout: blog
title: "AWS 85: Amazon s3 hands on"
date: 2025-03-21T12:19:22.409Z
---

## TLDR
Today I will walk through the process of using [Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) to create a bucket, upload files, and manage settings. Key steps include selecting a region, naming your bucket (which must be unique), and configuring security options like blocking public access and enabling encryption. After uploading files, you can view and organize them into folders. Access to files is secured by default, but you can use pre-signed URLs for personal access. The post also covers how to delete files and folders in S3.


### Amazon S3

 Amazon Simple Storage Service ([Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/)), which provides a scalable, durable, and low-latency object storage service. For those of us accustomed to traditional file storage systems, S3 can seem a bit intimidating at first. However, with a few simple steps, you can effectively manage your data using S3.

In this blog post, we'll take a detailed walk through the process of creating a bucket, uploading files, and understanding the various settings in [Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/). Whether you're new to AWS or simply looking to refine your skills, these steps will provide you with a solid foundation.

### 1. How to Create

The first step in using [Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) is to create a bucket. A bucket is essentially a container for your data, and each bucket must have a unique name across all AWS accounts and regions. When creating your bucket, be sure to choose the correct region. For example, I’ve selected **Europe, Stockholm (eu-north-1)**, but depending on your geographical location, you might select a different region.

You may also notice different types of buckets available for creation. At the time of writing, [Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) offers **General Purpose** buckets by default, with the option for **Directory Buckets** available in certain regions. For most use cases, the General Purpose option will be the one you need.

If you don’t see the bucket type option, rest assured that the system will automatically select **General Purpose** for you. If you do see it, simply choose **General Purpose**. Directory Buckets are specialized and typically not relevant for most users, so we'll focus on the General Purpose option.

![general purpose](/blog/src/images/85/85-1.png)


### 2. **Choosing a Bucket Name**

Once you’ve selected the region, the next critical step is choosing your bucket name. Amazon requires that your bucket name be globally unique, meaning no other AWS user across the world can have the same name. If the name you choose is already taken, you'll receive an error, and you’ll need to select a different name.

To avoid conflicts, I typically opt for something personal and unique, such as **stephane-demo-s3-v5**. The versioning here (v5) helps track iterations of my bucket names, especially when I’m creating and testing them frequently. If you encounter an error, simply modify the name until you find an available one.

### 3. **Configuring Bucket Settings**

Once you’ve chosen your bucket name, it’s time to configure some basic settings:

- **Object Ownership:** By default, [Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) disables **Access Control Lists (ACLs)**, which is the recommended security setting. This helps ensure that only authorized users can access your objects.
  
- **Public Access Settings:** For security reasons, it’s a good practice to **block all public access** to your bucket unless you explicitly want to share the data with others. This prevents unauthorized access to your objects.

- **Bucket Versioning:** While versioning can be useful for maintaining multiple versions of your files, it’s typically best to leave it disabled at first. We’ll cover versioning in later tutorials.

- **Encryption:** For security, you should always enable encryption for the data you upload. [Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) offers **server-side encryption** with an **S3-managed key** (SSE-S3) to automatically encrypt your data at rest.

![encryption](/blog/src/images/85/85-2.png)

- **Bucket Key:** Enabling the bucket key helps to reduce the cost of encryption by enabling a simpler encryption model.

### 4. **Uploading Files to Your Bucket**

Once your bucket is set up, it's time to upload files. Let's start by uploading a simple file, such as an image. To do this, click on your newly created bucket, then select the **Upload** button. You’ll be prompted to choose the files you want to upload. For this example, let’s use **coffee.jpg**, a 100 KB image file.

After selecting your file, click **Upload**, and [Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) will take care of the rest. Once the upload is complete, you’ll see your file listed under the **Objects** section of your bucket.



### 5. **Accessing Uploaded Files**

Once your file is uploaded, you can easily view its details by clicking on it. You’ll see essential information like file size, type, and a URL that links to the object.

However, you might encounter an **Access Denied** message if you attempt to access the object using the public URL. This is because, by default, all objects uploaded to S3 are private. To access the file, you’ll need to use a **pre-signed URL**. This URL contains an authentication signature that verifies your identity and grants access to the file.

![accessing files](/blog/src/images/85/85-3.png)


### 6. **Organizing Files with Folders**

To keep your S3 bucket organized, you can create folders within the bucket. This will help categorize your files, similar to how you might organize documents on your computer. For example, you might create a folder named **Images** and upload a **beach.jpg** file into it.

### 7. **Deleting Files and Folders**

S3 also provides a simple way to delete files and folders. To delete a file, simply navigate to the object, and click on **Delete**. If you want to delete an entire folder, you’ll be asked to confirm by typing “permanently delete” into a text box. Be careful, though, as this action cannot be undone.

### Conclusion

By now, you should have a solid understanding of how to create buckets, upload files, and organize your data in [Amazon s3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/). Whether you’re looking to store a few documents or manage a large-scale cloud storage solution, S3 provides the tools necessary to keep your data safe, secure, and easily accessible.

While this post covered some of the basics, we’ll dive deeper into advanced features, such as versioning, lifecycle policies, and access control, in future blog posts. Stay tuned, and happy cloud storage management!

## Recap

from the previous entries in the series.

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
- [AWS 27: High availability and Scalability ](<https://magicishaqblog.netlify.app/section6/2023-07-28-high_[availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)_and_scalability/>)
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
- [AWS 48: RDS Hands On](https://magicishaqblog.netlify.app/2023-05-01-aws-48-RDS-Hands-On/)
- [AWS 49: Amazon Aurora](https://magicishaqblog.netlify.app/2023-01-12-aws-49-Amazon-Aurora/)
- [AWS 50: Amazon Aurora: Hands On](https://magicishaqblog.netlify.app/2024-01-19-aws-50-Amazon-Aurora-hands-on/)
- [AWS 51: Amazon RDS and Amazon Aurora Security](https://magicishaqblog.netlify.app/2024-01-26-aws-51-Amazon-RDS-and-Amazon-Aurora-Security/)
- [AWS 52: RDS Proxy](https://magicishaqblog.netlify.app/2024-02-02-aws-52-RDS-Proxy/)
- [AWS 53: ElastiCache](https://magicishaqblog.netlify.app/2024-02-09-aws-53-ElastiCache/)
- [AWS 54: ElastiCache: Hands On](https://magicishaqblog.netlify.app/StructuredClone/2024-02-16-aws-54-ElastiCache-Hands-On/)
- [AWS 55: ElastiCache Strategies](https://magicishaqblog.netlify.app/2024-01-03-aws-55-ElastiCache-Strategies/)
- [AWS 56: Amazon Memory DB for Redis](https://magicishaqblog.netlify.app/2023-03-15-aws-56-AmazonMemoryDB-for-Redis/)
- [AWS 57: Quiz 3](https://magicishaqblog.netlify.app/quiz-4/2023-03-22-aws-57-quiz-4/)
- [AWS 58: DNS Name](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/)
- [AWS 59: Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)
- [AWS 60 Route 53 Registering Domain](https://magicishaqblog.netlify.app/2024-04-26-aws-60-Route53-registering-domain/)
- [AWS 61 Route 53 Creating First Record](https://magicishaqblog.netlify.app/2024-05-03-aws-61-Route53-Creating-First-Record/)
- [AWS 62: Setting up an EC2 instance and ALB with Route 53](https://magicishaqblog.netlify.app/2024-05-10-aws-62-setting-up-ec2-instances-and-alb-with-route-53/)
- [AWS 63: Route 53 TTL (Time to Live)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/)
- [AWS 64: Route 53 CNAME and alias records](https://magicishaqblog.netlify.app/2024-05-07-aws-64-CNAME-alias-records/)
- [AWS 65: Route 53 simple routing](https://magicishaqblog.netlify.app/2024-12-07-aws-65-Route53-simple-routing/)
- [AWS 66: Route 53 weighted routing](https://magicishaqblog.netlify.app/2024-19-07-aws-route53-weighted-routing/)
- [AWS 67: Route 53 Latency](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 67: Route 53 Latency Routing](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 68: Route 53 Health Checks](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/)
- [AWS 69: Route 53 Health Checks , Hands On](https://magicishaqblog.netlify.app/2024-08-16-aws-69-Health-checks-hands-on/)
- [AWS 70: Route 53 route policy failover](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 71: Route 53 Geolocation Routing](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 72: Route 53 Geoproximity Routing Policy](https://magicishaqblog.netlify.app/2024-11-09-aws-72-Route-53-Geoproximity-Routing-Policy/)
- [AWS 73: Route 53 Traffic Flow](https://magicishaqblog.netlify.app/2024-09-20-aws-73-Route-53-Traffic-Flow/)
- [AWS 74: Route 53 IP Routing Policy](https://magicishaqblog.netlify.app/2024-09-27-aws-74-Route-53-IP-Routing/)
- [AWS 75: Route 53 Multi Value Routing](https://magicishaqblog.netlify.app/2024-04-10-aws-75-Route-53-muti-value-routing/)
- [Quiz 5 : Route 53](https://magicishaqblog.netlify.app/quiz-5/quiz-5/)
- [AWS 76: Domain Registar vs DNS Service](https://magicishaqblog.netlify.app/aws-76-Domain-registar-vs-dns-service/)
- [AWS 77: VPC intro](https://magicishaqblog.netlify.app/2023-11-01-aws-77-VPC-intro/)
- [AWS 78: Understanding AWS VPC and Subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/)
- [AWS 79: VPC network ACIS and security group](https://magicishaqblog.netlify.app/2023-11-22-aws-79-VPC-network-acls-and-security-groups/)
- [AWS 80: VPC Peering](https://magicishaqblog.netlify.app/2024-11-29-aws-80-VPC-peering/)
- [AWS 81: VPC Round Up](https://magicishaqblog.netlify.app/2024-10-01-aws-81-vpc-round-up/)
- [AWS 82: Three Tier Architecture](https://magicishaqblog.netlify.app/2025-17-01-aws-82-three-tier-architecture/)
- [AWS 83: Quiz 6 VPC](https://magicishaqblog.netlify.app/quiz-6/2025-02-24-aws-83-quiz-6/)
- [AWS 84: Amazon S3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/)


