---
layout: blog
title: "AWS 144: ECS Solution Architectures"
date: 2026-08-19T10:45:00.000Z
---

## TLDR

Amazon [ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/) integrates with multiple AWS services to build serverless architectures. EventBridge can trigger [ECS tasks](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/) based on S3 events or scheduled intervals. SQS queues combined with ECS Service Auto Scaling enable dynamic workload processing. EventBridge also monitors the ECS task lifecycle, capturing state changes for alerting and automation. These patterns eliminate infrastructure management whilst maintaining flexibility for batch processing, event-driven workflows, and distributed systems.

## Introduction

Container orchestration isn't just about running Docker containers. The real value emerges when you connect those containers to other services—triggering them based on events, scheduling them to run periodically, or scaling them in response to workload demands.

Amazon ECS offers multiple integration patterns that transform simple container deployments into complete serverless architectures. After covering [rolling updates](https://magicishaqblog.netlify.app/2026-08-12-aws-143-ECS-rolling-updates/) in the previous post, it's time to examine practical architectures you'll encounter in production.

## Event-Driven Processing with S3 and EventBridge

Imagine this scenario: users upload files to an S3 bucket. Each file needs processing—perhaps resizing images, extracting metadata, or generating thumbnails. You could run a server that polls S3 continuously, but that wastes resources. A better approach uses events.

### How It Works

When an object lands in your S3 bucket, [S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html) can send that event to Amazon EventBridge. EventBridge then triggers an ECS task in your Fargate cluster.

The workflow looks like this:

1. User uploads a file to S3
2. S3 sends an event notification to EventBridge
3. EventBridge evaluates rules and launches an ECS task
4. The task retrieves the file from S3
5. Processing occurs inside the container
6. Results are written to DynamoDB (or another destination)

The ECS task runs with an [IAM task role](https://magicishaqblog.netlify.app/2023-02-17-aws-9-roles) that grants permissions to read from S3 and write to DynamoDB. Once the task completes, it terminates. You only pay for the seconds the container runs.

[Diagram placeholder: S3 bucket → EventBridge → ECS Fargate cluster → DynamoDB]

### Why This Matters

This architecture is fully serverless. No EC2 instances sit idle waiting for work. No polling logic wastes API calls. Events trigger containers exactly when needed.

For batch processing workloads—converting file formats, running analytics, processing uploaded documents—this pattern scales automatically. One upload triggers one task. A thousand uploads trigger a thousand tasks (within your account limits).

## Scheduled Tasks with EventBridge

Not every workflow is event-driven. Some tasks need to run on a schedule—hourly data exports, nightly backups, periodic health checks.

### Cron Jobs Without Servers

EventBridge supports [schedule expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html) using cron or rate syntax. Set a rule to run every hour, every day at midnight, or every Monday at 9am.

When the schedule triggers, EventBridge launches an ECS task. The task performs its work—perhaps downloading files from S3, processing data, and uploading results—then terminates.

Example use cases:

- Generating daily reports from database snapshots
- Cleaning up temporary files older than 24 hours
- Syncing data between systems at regular intervals
- Running batch ETL jobs overnight

The task role determines what AWS resources the container can access. Point it at S3, RDS, DynamoDB, or any service your batch job needs.

[Diagram placeholder: EventBridge Schedule (every 1 hour) → ECS Fargate cluster with task role → S3 bucket]

### Advantages Over Traditional Cron

Traditional cron jobs require a server running continuously, even when the job isn't executing. With ECS and EventBridge, infrastructure only exists during task execution. The rest of the time? Nothing runs, nothing costs money.

You also gain observability. CloudWatch captures container logs automatically. ECS tracks task execution history. EventBridge shows which rules fired and when.

## Queue-Based Processing with SQS

Event-driven tasks work for one-off processing. But what about continuous workloads where messages arrive at varying rates?

### The SQS Integration Pattern

An ECS service running multiple tasks can poll an [SQS queue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) for messages. Each task pulls messages, processes them, and deletes them from the queue.

The architecture includes:

- An SQS queue receiving messages (perhaps from API Gateway, SNS, or another service)
- An ECS service with a defined task count
- Tasks configured to poll SQS and process messages
- ECS Service Auto Scaling rules watching queue metrics

When message volume increases, CloudWatch detects the growing queue depth. Auto Scaling launches additional ECS tasks. More tasks mean faster processing. When the queue empties, Auto Scaling reduces task count.

[Diagram placeholder: SQS Queue ← Messages → ECS Service (auto-scaling) with multiple tasks]

### Scaling Based on Queue Depth

The key metric is `ApproximateNumberOfMessagesVisible`—the count of messages waiting in the queue. Configure a [target tracking scaling policy](https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-target-tracking.html) that maintains, for example, 1000 messages per task.

If 5000 messages arrive, Auto Scaling provisions five tasks. If messages drop to 500, it scales down to one task. This balances processing speed against cost.

This pattern suits workloads like:

- Image or video processing pipelines
- Data validation and transformation
- Asynchronous API request handling
- Distributed computation tasks

## Monitoring ECS with EventBridge

The previous patterns use EventBridge to trigger tasks. But EventBridge can also monitor your ECS cluster.

### ECS Task State Changes

Every ECS task transitions through states: pending, running, stopping, stopped. EventBridge captures these [state change events](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwe_events.html).

You can create rules that react to specific conditions:

- Task stopped unexpectedly (exit code non-zero)
- Task failed to start
- Task ran longer than expected
- Deployment completed

When a rule matches, EventBridge can trigger actions: send an SNS notification, invoke a Lambda function, or start another ECS task.

### Practical Alerting

Suppose a critical task keeps failing. Without monitoring, you might not notice until users complain. With EventBridge:

1. Task exits with error code
2. EventBridge detects "ECS Task State Change" event
3. Rule filters for stopped tasks with non-zero exit code
4. SNS topic sends email to operations team

The event payload includes useful details—task ARN, stopped reason, exit code, and timestamps. Operations can investigate immediately rather than discovering failures hours later.

[Diagram placeholder: ECS cluster → EventBridge (task state change) → SNS topic → Email notification]

## Choosing the Right Pattern

Each architecture serves different needs:

**S3 + EventBridge + ECS**: Use for event-driven file processing. Scales automatically based on upload volume. Ideal for image processing, document conversion, log analysis.

**EventBridge Schedule + ECS**: Use for periodic batch jobs. Replaces traditional cron jobs with serverless execution. Good for reports, backups, cleanup tasks.

**SQS + ECS + Auto Scaling**: Use for continuous message processing with variable throughput. Scales task count based on queue depth. Fits asynchronous workflows and distributed processing.

**EventBridge Monitoring**: Use for operational visibility. Captures task lifecycle events for alerting and automation. Essential for production workloads.

These patterns often combine. A scheduled task might write to SQS. SQS-processing tasks might write results to S3, triggering another task. EventBridge monitors everything, alerting when issues arise.

## Cost Considerations

Serverless doesn't mean free. Understanding costs helps you design efficiently.

With Fargate, you pay per vCPU and GB of memory per second. A task using 0.5 vCPU and 1 GB that runs for 10 seconds costs less than one running for 10 minutes.

EventBridge charges per event matched to a rule. The first million events per month are free—generous for most workloads.

SQS charges per request. Polling an empty queue generates requests. Configure tasks with appropriate polling intervals to avoid unnecessary costs.

For batch processing triggered by events, costs remain predictable: one event, one task, one charge. For queue-based processing, costs scale with workload volume—which usually aligns with business value.

## Security Through Task Roles

Every architecture discussed here uses IAM task roles. This separates infrastructure permissions from application permissions.

The ECS task execution role (used by Fargate to pull images and write logs) differs from the ECS task role (used by your container application to access AWS services).

Grant least privilege. If a task only reads from S3 and writes to DynamoDB, the task role should permit exactly those actions—nothing more.

This containment limits blast radius. A compromised container can't delete S3 buckets or terminate EC2 instances unless you explicitly granted those permissions. Design roles carefully.

## Conclusion

ECS integrates with EventBridge, SQS, S3, and other services to build sophisticated architectures without managing servers. Event-driven task execution, scheduled batch jobs, queue-based processing, and lifecycle monitoring all become straightforward.

These patterns appear frequently in AWS solutions—and in certification exams. Understanding how they fit together helps you design systems that scale efficiently, cost less to operate, and respond dynamically to changing workloads.

The serverless approach to container orchestration removes infrastructure complexity whilst preserving flexibility. You write code, package it in containers, and wire it to events. AWS handles the rest.

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
