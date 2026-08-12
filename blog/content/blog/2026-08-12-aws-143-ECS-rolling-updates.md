---
layout: blog
title: "AWS 143: ECS Service Rolling Updates"
date: 2026-08-12T14:20:00.000Z
---

## TLDR

Rolling updates in [ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/) allow you to deploy new task definition versions without downtime. Two parameters control the update process: minimum healthy percent (the lowest capacity threshold during deployment) and maximum percent (the highest capacity allowed). Setting these values determines whether tasks are terminated before new ones start or if new tasks launch before old ones stop. Understanding these parameters is essential for maintaining service availability during deployments.

## Introduction

Deploying new versions of containerised applications presents a familiar challenge: how do you update running services without causing downtime? Amazon ECS addresses this through rolling updates—a controlled deployment mechanism that gradually replaces old task versions with new ones.

In the [previous post](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/), we deployed an ECS service using Fargate. Now we'll examine what happens when you need to update that service with a new task definition version.

## How Rolling Updates Work

When you update an ECS service from version 1 to version 2, the service doesn't simply stop all containers and start new ones. Instead, it orchestrates a gradual transition based on two critical parameters.

### The Two Control Parameters

Every ECS service update relies on these settings:

**Minimum Healthy Percent** - The lowest percentage of desired capacity that must remain running during deployment.

**Maximum Percent** - The highest percentage of desired capacity allowed during deployment.

By default, these values are set to 100% and 200%, respectively. These numbers determine how aggressively ECS can deploy your updates.

## Understanding the Deployment Process

Let's say your ECS service runs nine tasks—representing 100% of your desired capacity. When you select a new task definition number and initiate an update, ECS uses those two percentages to decide its next move.

The minimum healthy percent dictates how many existing tasks can be terminated. If this value sits below 100%, ECS is permitted to stop tasks immediately, provided enough remain to satisfy the threshold.

The maximum percent controls how many new tasks can be created before old ones stop. A higher value allows ECS to provision additional capacity temporarily, enabling new tasks to run alongside older versions during the transition.

These two settings work together to orchestrate the update. ECS creates new tasks, terminates old ones, and repeats the cycle until every task runs the newer version.

## Scenario One: Conservative Capacity

Consider a service with four running tasks. You've set the minimum healthy percent to 50% and the maximum to 100%.

Here's what happens:

ECS immediately terminates two tasks, dropping capacity to 50%—the minimum threshold. With only two old tasks remaining, ECS creates two new tasks. Capacity returns to 100%.

Next, ECS terminates the two remaining old tasks. Capacity drops to 50% again. Finally, it creates two more new tasks, restoring full capacity at 100%. The update is complete.

This approach terminates tasks first, then creates replacements. Capacity dips during deployment, but you never exceed your original task count. This pattern suits environments with limited resources or strict cost constraints.

## Scenario Two: Zero-Downtime Deployment

Now consider the same four-task service, but with different settings: minimum at 100% and maximum at 150%.

The process changes significantly:

ECS cannot terminate any tasks immediately—the minimum is 100%, so all four must keep running. Instead, it creates two new tasks, bringing total capacity to 150%.

Once the new tasks are healthy and running, ECS can terminate two old tasks. Capacity returns to 100%—four tasks total, but now two are the new version.

ECS creates two more new tasks (150% capacity again), then terminates the remaining two old tasks. The update finishes with all four tasks running the latest version.

This approach prioritises availability. Capacity never drops below 100%, though it temporarily exceeds the desired count. Resource costs increase briefly during deployment, but there's no service degradation.

## Choosing Your Update Strategy

The choice between these strategies depends on your priorities:

If minimising resource consumption matters most—perhaps due to cost constraints or capacity limitations—set your maximum percent closer to 100%. You'll experience brief capacity reductions during updates, but you won't provision extra tasks.

If availability is paramount, set a higher maximum percent (150% or 200%). Your service maintains full capacity throughout the deployment, though you'll temporarily run additional tasks.

## Practical Implications

These settings matter during the AWS Certified Developer exam. Expect at least one question testing whether you understand how minimum and maximum percentages affect deployment behaviour.

More importantly, they matter in production. A poorly chosen update strategy can cause temporary outages during routine deployments. Services with tight margins might struggle if you set the maximum too high. Conversely, customer-facing applications might suffer if you allow capacity to drop during updates.

Most services work well with the defaults: 100% minimum and 200% maximum. This provides zero-downtime deployments whilst temporarily doubling task count. For larger services, that's often acceptable. For smaller services or those with strict resource limits, you might need different values.

## Conclusion

Rolling updates give you precise control over how ECS deploys new task definitions. The minimum healthy percent and maximum percent parameters determine whether ECS terminates tasks before creating new ones or provisions extra capacity during deployment.

Choose your values based on your service's availability requirements and resource constraints. Understand the trade-offs between capacity and cost. And remember: the defaults usually work, but knowing why they work helps you choose better values when they don't.

## Recap

Following the previous blogs in the series:

- [AWS 1: BookClub Overview](https://magicishaqblog.netlify.app/aws/)
- [AWS 2: Getting Started](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/)
- [AWS 10: EC2 Introduction](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/)
- [AWS 140: Docker Introduction](https://magicishaqblog.netlify.app/2026-07-24-aws-140-docker-introduction/)
- [AWS 141: Amazon ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/)
- [AWS 142: ECS Hands On](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/)
