---
layout: blog
title: "AWS 151: CloudFormation - Update and Delete Stacks"
date: 2026-10-10T09:49:11.647Z
---

## TLDR

Updating a [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) stack means uploading a revised template and reviewing the change set before applying it. In this hands-on example, the new template adds an Elastic IP and two [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/), passes a parameter into a security group description, and replaces the existing [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/). Deleting the stack afterwards removes the resources that [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) created, in the correct dependency order.

## Introduction

[CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) lets us manage infrastructure from a template rather than changing each resource manually in the [AWS console](https://magicishaqblog.netlify.app/2023-01-27-aws-3-UI-guide-and-walkthrough/). After creating a stack, we can update it by replacing the template with a new version. [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) then works out which resources must be added, changed or replaced to reach the desired final state.

This walkthrough updates an existing EC2 stack. The revised template contains an [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), an Elastic IP and two [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/). It also includes a parameter that is used as the description for one of the [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/).

![screenshot of a stack](/blog/src/images/151/151-1.png)

## How to Update a Stack

Open the existing stack in the [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) console and choose **Update**. [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) gives you two template options: use the current template or replace it with a new one. The current template can be reused, but it cannot describe any changes. Choose **Replace current template** and upload the updated `EC2 with SG-EIP.yaml` file.

The new template introduces several resources that will be explored in later posts. It defines an [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) with [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/) attached, an Elastic IP associated with the instance, and two [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/). It also references [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/) that are created later in the template, so [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) can build the resources in the necessary order.

After choosing **Next**, [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) asks for the `SecurityGroupDescription` parameter. Enter a value such as:

```text
This is a cool security group
```

You can use any description you like. This value will be passed into the template and used when the security group is created.

Continue through the update wizard and review the stack details. At the bottom of the review page, open the **Change set preview**. A change set is a list of the changes [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) plans to make as part of the update.

In this example, the preview shows four changes:

- An Elastic IP will be added.
- An [SSH](https://magicishaqblog.netlify.app/2023-03-17-aws-13-ssh/) security group will be added.
- A server security group will be added.
- The existing [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) will be replaced.

The replacement is shown as `Replacement: True`. This means that [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) will terminate the previous instance and create a new one in its place. When a change can be made in place, the preview may instead show `Replacement: False`. [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) determines this from the properties changed in the template. If the proposed replacement is not what you want, investigate the relevant resource property and adjust the template before submitting the change.

Submit the update. The stack will move into an **UPDATE_IN_PROGRESS** state. [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) first creates the two [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/), then creates the replacement [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) because the requested update requires a new physical resource.

![screenshot of updating a stack](/blog/src/images/151/151-2.png)

While the update is running, open **EC2** and remove any instance filters. Both the original instance and the replacement may be visible for a short time. The new instance is initially pending while [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) creates it. Once it is running, the old instance can be terminated as part of the replacement process.

[CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) also creates the Elastic IP and associates it with the new instance. The Elastic IP is automatically tagged with useful [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) metadata, including its logical ID, stack ID and stack name. The old instance is then removed because it has been replaced.

The instance now has two [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/). The SSH security group contains an inbound rule for port 22. The server security group contains the SSH and HTTP rules defined in the template. Its description is the value supplied through the `SecurityGroupDescription` parameter:

```text
This is a cool security group
```

This is the practical value of parameters: a value entered during the stack operation can be passed into a resource property when the template runs.


## How to Delete a Stack

When the update is complete, the stack's **Resources** tab shows the four resources managed by [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/): the [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/), the Elastic IP and the two [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/). No manual resource-by-resource cleanup is needed.

To remove the demonstration environment, open the stack's actions menu and choose **Delete**. Deleting the [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) directly would leave the [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/) and Elastic IP behind. Deleting the stack is the correct cleanup operation because it removes all resources created by [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/).

The stack enters **DELETE_IN_PROGRESS**. In the **Events** tab, the Elastic IP is deleted, followed by the [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) and then the [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/). [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) determines the deletion order automatically, which is important because resources can depend on one another.

Wait until the stack reaches **DELETE_COMPLETE** and confirm that the resources no longer exist in their respective [AWS console](https://magicishaqblog.netlify.app/2023-01-27-aws-3-UI-guide-and-walkthrough/)s.

![screenshot of deleting a stack](/blog/src/images/151/151-3.png)

## Conclusion

[CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) updates are driven by template changes. Replace the current template, supply any required parameters, review the change set, and submit the update. [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) calculates whether resources can be modified in place or whether they must be replaced. In this example, the [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) was replaced, while the Elastic IP and two [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/) were created and associated automatically.

Parameters make templates reusable. The `SecurityGroupDescription` value entered during the update became the description of the server security group without any manual editing in the console.

For cleanup, delete the [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) stack instead of terminating individual resources. [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) removes the resources it owns and chooses a safe dependency order. The whole workflow is therefore template-driven: update the template, let [CloudFormation](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/) reach the new final state, and delete the stack when the demonstration is finished.

## Recap


More in the AWS series

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
- [AWS 12: security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups)
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
- [AWS 27: High availability and Scalability ](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)
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
- [AWS 85: Amazon s3 Hands on](https://magicishaqblog.netlify.app/2025-03-21-aws-85-Amazon-s3-hands-on/)
- [AWS 86: s3 security bucket policy](https://magicishaqblog.netlify.app/2025-28-03-aws-86-s3-security-bucket-policy/)
- [AWS 87: S3 Buckets - Hands On](https://magicishaqblog.netlify.app/2025-04-04-aws-87-s3-bucket-hands-on/)
- [AWS 88: S3 Buckets WebHosting](https://magicishaqblog.netlify.app/2025-04-11-aws-88-s3-buckets-web-hosting/)
- [AWS 89: Amazon S3 Buckets: Hands On](https://magicishaqblog.netlify.app/2025-04-25-aws-89-s3-website-hands-on/)
- [AWS 90: Amazon S3 Buckets: Versioning](https://magicishaqblog.netlify.app/2025-05-02-aws-90-S3-versioning/)
- [AWS 91: Amazon S3 Replication](https://magicishaqblog.netlify.app/2025-05-09-aws-91-amazon-s3-replication/)
- [AWS 92: Amazon S3 Replication Rules Notes](https://magicishaqblog.netlify.app/2023-05-16-aws-92-amazon-s3-replication-notes/)
- [AWS 93: Amazon S3 Replication Hands On](https://magicishaqblog.netlify.app/2025-05-23-aws-93-amazon-s3-replication-rules-hands-on/)
- [AWS 94: Amazon S3 Storage Classes](https://magicishaqblog.netlify.app/2025-05-20-aws-94-s3-storage-classes/)
- [AWS 95: Amazon S£ Storage Classes - Hands On](https://magicishaqblog.netlify.app/2025-06-13-aws-95-storage-classes-hands-on/)
- [AWS 96: Quiz 7](https://magicishaqblog.netlify.app/quiz-7/2025-07-04-aws-quiz-7/)
- [AWS 97: EC2 Instance Metadata](https://magicishaqblog.netlify.app/2025-07-11-aws-97-ec2-instance-metadata/)
- [AWS 98: EC2 Instance Metadata hands on](https://magicishaqblog.netlify.app/2025-18-07-aws-98-ec2-instance-metadata-hands-on/)
- [AWS 99: CLI Profiles](https://magicishaqblog.netlify.app/2025-25-07-aws-99-cli-profiles/)
- [AWS 100: CLI MFA IAM](https://magicishaqblog.netlify.app/2025-08-01-aws-100-CLI-MFA-IAM/)
- [AWS 101: SDK](https://magicishaqblog.netlify.app/2025-08-08-aws-101-sdk/)
- [AWS 102: Exponential Backoff & Service Limit Increase](https://magicishaqblog.netlify.app/2025-08-15-aws-102-Exponential-Backoff-&-Service-Limit-Increase/)
- [AWS 103: Credentials-and-Provider-Chain](https://magicishaqblog.netlify.app/2025-08-22-aws-103-Credentials-and-Provider-Chain/)
- [Quiz 8](https://magicishaqblog.netlify.app/quiz-8/2025-09-05-aws-quiz-8/)
- [AWS 104: SigV4](https://magicishaqblog.netlify.app/2025-08-29-aws-104-SigV4/)
- [AWS 105: S3 Lifecycle](https://magicishaqblog.netlify.app/2025-10-17-aws-105-s3-amazon-lifecycle/)
- [AWS 106: S3 Lifecycle Hands On](https://magicishaqblog.netlify.app/2025-10-24-aws-106-lifecycles-hands-on/)
- [AWS 107: S3 Event Notification](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/)
- [AWS 108: S3 Event Notification Hands On](https://magicishaqblog.netlify.app/2025-11-07-aws-108-event-notification-hands-on/)
- [AWS 109: S3 Performance](https://magicishaqblog.netlify.app/2025-11-14-aws-109-s3-performance/)
- [AWS 110: S3 Metadata](https://magicishaqblog.netlify.app/2025-11-21-aws-110-s3-metadata/)
- [AWS 111: S3 Object Encryption](https://magicishaqblog.netlify.app/2025-12-05-aws-111-S3-Object-Encryption/)
- [AWS 112: AWS CORS](https://magicishaqblog.netlify.app/2025-12-12-aws-112-AWS-Cors/)
- [AWS 113: CORS Hands On](https://magicishaqblog.netlify.app/2025-12-17-aws-113-Cors-Hands-On/)
- [AWS 114: MFA Delete](https://magicishaqblog.netlify.app/2025-aws-114-MFA-Delete/)
- [AWS 115: MFA Delete Hands On](https://magicishaqblog.netlify.app/2026-01-06-aws-115-MFA-delete-hands-on/)
- [AWS 116: Amazon S3 Access Logs](https://magicishaqblog.netlify.app/2026-01-16-aws-116-amazon-s3-access-LOGS/)
- [AWS 117: Access Logs Hands On](https://magicishaqblog.netlify.app/2023-23-01-aws-117-access-logs-hands-on/)
- [AWS 118: Pre-Signed URLs](https://magicishaqblog.netlify.app/2026-01-30-aws-118-pre-signed-urls/)
- [AWS 119: Pre-Signed URLs Hands On](https://magicishaqblog.netlify.app/2026-06-02-aws-119-pre-signed-urls-hands-on/)
- [AWS 120: S3 Access Points](https://magicishaqblog.netlify.app/2026-12-02-13-aws-120-access-points/)
- [AWS 121: S3 Object Lambda](https://magicishaqblog.netlify.app/2026-02-20-aws-121-s3-object-lambdas/)
- [AWS 123: Amazon CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/)
- [AWS 124: CloudFront Hands On](https://magicishaqblog.netlify.app/2026-03-13-aws-124-CloudFront-HandsOn/)
- [AWS 125: Amazon CloudFront Caching](https://magicishaqblog.netlify.app/2026-03-20-aws-125-Amazon-Cloudfront-Caching/)
- [AWS 126: CloudFront Cache Invalidations](https://magicishaqblog.netlify.app/2026-03-27-aws-126-CloudFront-cache-invalidations/)
- [AWS 127: CloudFront Cache Behaviors](https://magicishaqblog.netlify.app/2026-04-10-aws-127-CloudFront-Cache-Behaviors/)
- [AWS 132: 15 Minute Lightning Revision](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/)
- [AWS 133: Caching and Invalidations Hands On](https://magicishaqblog.netlify.app/2026-06-05-aws-133-Caching-and-invalidations-hands-on/)
- [AWS 134: ALB EC2 VPC Origin](https://magicishaqblog.netlify.app/2026-06-12-aws-134-ALB-EC2-VPC-Origin/)
- [AWS 135: CloudFront Georestriction](https://magicishaqblog.netlify.app/2026-06-19-aws-135-cloudFront-georestriction/)
- [AWS 136: CloudFront Signed URL Cookie](https://magicishaqblog.netlify.app/2026-06-26-aws-136-cloudfront-signed-url-cookie/)
- [AWS 137: CloudFront Pricing](https://magicishaqblog.netlify.app/2026-03-02-aws-137-cloudfront-pricing/)
- [AWS 138: CloudFront Real Time Logs](https://magicishaqblog.netlify.app/2026-10-07-aws-138-CloudFront-RealTimeLogs/)
- [AWS 140: Docker Introduction](https://magicishaqblog.netlify.app/2026-07-24-aws-140-docker-introduction/)
- [AWS 141: AWS ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/)
- [AWS 142: ECS Hands On](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/)
- [AWS 143: ECS Rolling Updates](https://magicishaqblog.netlify.app/2026-08-12-aws-143-ECS-rolling-updates/)
- [AWS 144: ECS Solution Architectures](https://magicishaqblog.netlify.app/2026-08-19-aws-144-ECS-solution-architectures/)
- [AWS 145: ECS Task Definitions](https://magicishaqblog.netlify.app/2026-08-27-aws-145-ECS-task-definitions/)
- [AWS 146: ECS Task Definitions - Hands On](https://magicishaqblog.netlify.app/2026-09-03-aws-146-ECS-task-definition-hands-on/)
- [AWS 147: ECS Task Placement](https://magicishaqblog.netlify.app/2026-09-09-aws-147-task-placement/)
- [AWS 148: ECS Clean Up](https://magicishaqblog.netlify.app/2026-09-16-aws-148-ECS-clean-up/)
- [AWS 149: ECR](https://magicishaqblog.netlify.app/2026-09-22-aws-149-ecr/)
- [AWS 150: ECR - Hands On](https://magicishaqblog.netlify.app/2026-09-29-aws-150-ecr-hands-on/)


