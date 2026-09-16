---
layout: blog
title: "AWS 148: ECS - Clean Up"
date: 2026-09-18T09:30:00.000Z
---

## TLDR

An Amazon ECS demonstration is not complete until the resources it created have been removed. Stop the [ECS service](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/) first by setting its desired task count to zero, then delete the service. Wait for the service and its stack-managed infrastructure to disappear before deleting the cluster. Task definitions can remain registered because they do not run containers or incur compute charges, although deregistering unused revisions keeps the account tidy.

## Introduction

The [previous post on ECS task placement](https://magicishaqblog.netlify.app/2026-09-09-aws-147-task-placement/) examined how ECS decides where work should run. This final step is less glamorous but just as important: removing the demonstration environment safely.

The hands-on deployment created a Fargate task definition, an ECS service, a cluster and an Application Load Balancer. It also introduced supporting resources such as a listener, target group and security group. Leaving those resources behind can create unnecessary charges and make the account harder to audit.

The safest approach is to work from the top of the dependency chain down. Stop the service, remove the service, confirm the infrastructure has been cleaned up, and only then remove the cluster.

## Step 1: Stop the ECS Service

Begin in the ECS console. Open **Clusters**, choose the demo cluster, and select the service created in the [ECS hands-on deployment](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/).

Before deleting anything, check the service's running task count. A service with active tasks is still doing exactly what ECS was designed to do: maintaining its desired capacity. To stop those tasks cleanly:

1. Choose **Update service**.
2. Set **Desired tasks** to `0`.
3. Submit the update and wait for the running task count to reach zero.

This is also where the [rolling update settings](https://magicishaqblog.netlify.app/2026-08-12-aws-143-ECS-rolling-updates/) matter. ECS may take a short time to drain the task and deregister it from the load balancer. Do not move on until the service shows no running tasks.

## Step 2: Delete the Service

Once the service has no running tasks, choose **Delete service**. Confirm the action by entering `delete` when the console asks for confirmation.

Deleting the service removes the ECS scheduler's responsibility for the application. It does not mean that every related AWS resource vanishes immediately. The service may have been created as part of a CloudFormation-managed deployment, in which case CloudFormation must complete its own deletion process.

For the demo built in the [ECS architecture overview](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/), check CloudFormation after deleting the service. Depending on how the resources were created, the stack can remove:

- The ECS service
- The Application Load Balancer listener
- The Application Load Balancer
- The target groups
- The security group created for the service

The exact list depends on the stack template and on any resources created separately. CloudFormation is authoritative for stack-managed resources, so use the CloudFormation console to follow the deletion rather than assuming that the ECS console has finished the entire job.

## Step 3: Wait for Infrastructure Deletion

CloudFormation may need several minutes to delete the stack. The process can take longer when a load balancer, network interface or security group still has a dependency.

Wait until the stack reaches **DELETE_COMPLETE**. If it reaches **DELETE_FAILED**, open the stack's events and identify the resource that remains. Common causes include a resource created outside the stack, a dependency that was not removed, or a security group still attached to a network interface.

This pause is not administrative ceremony. It is the point at which you confirm that the public endpoint, networking components and load-balancing resources from the [solution architecture examples](https://magicishaqblog.netlify.app/2026-08-19-aws-144-ECS-solution-architectures/) are no longer active.

## Step 4: Delete the ECS Cluster

After the service and its infrastructure have been removed, return to **ECS**, select the demo cluster, and choose **Delete cluster**. Confirm the cluster name when prompted.

Deleting the cluster can trigger another CloudFormation operation when the cluster was created from an infrastructure template. In the demo environment, that stack may contain:

- The ECS cluster
- The capacity provider
- The Auto Scaling group
- The launch template

The [ECS introduction](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/) explains the difference between EC2-backed ECS and Fargate. That distinction matters during cleanup: an EC2-based cluster may own instances and capacity infrastructure, while a Fargate cluster does not require you to remove EC2 instances. In either case, confirm the related CloudFormation stack has finished deleting.

## What About Task Definitions?

Task definitions are configuration records. They describe the image, resource limits, ports, IAM roles and logging settings ECS needs to start a task. The [task definition guide](https://magicishaqblog.netlify.app/2026-08-27-aws-145-ECS-task-definitions/) and its [hands-on follow-up](https://magicishaqblog.netlify.app/2026-09-03-aws-146-ECS-task-definition-hands-on/) cover those settings in detail.

You can leave the task definitions registered. They do not run containers, consume Fargate capacity or generate compute charges simply by existing. Keeping a definition can even be useful as a record of the deployment.

If you no longer need the records, open **Task Definitions**, select a task-definition family and revision, choose **Actions**, then choose **Deregister**. Deregistering prevents that revision from being used for new tasks, but it does not delete the underlying container image from a registry or remove logs from CloudWatch.

## Final Verification

A short final audit prevents an apparently clean shutdown from becoming a month of forgotten resources:

- The ECS service has zero running tasks and has been deleted.
- The service's CloudFormation stack is `DELETE_COMPLETE`, where applicable.
- The ECS cluster has been deleted.
- Any cluster stack has been deleted successfully.
- No Application Load Balancer, listener or target group remains for the demo.
- No unused security group, network interface or Auto Scaling group remains.
- CloudWatch log groups and container images have been reviewed separately.

The last point is easy to miss. CloudFormation may remove the infrastructure that launched the task, but it will not necessarily delete every log group, ECR image or manually created resource associated with the application. Those resources need their own retention and deletion decisions.

## Conclusion

Clean-up is part of an ECS deployment, not an afterthought. Reduce the service's desired count to zero, wait for tasks to stop, delete the service, and allow CloudFormation to finish removing the resources it owns. Once that work is complete, delete the cluster and review the remaining task definitions and supporting services.

The result is a controlled shutdown rather than a partially abandoned environment. It also closes the loop on the series: from [ECS architecture](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/), through deployment and [task definitions](https://magicishaqblog.netlify.app/2026-08-27-aws-145-ECS-task-definitions/), to placement decisions and the final removal of the infrastructure.
