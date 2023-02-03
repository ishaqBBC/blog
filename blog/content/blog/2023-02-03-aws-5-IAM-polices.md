---
layout: blog
title: "AWS 4: IAM Polices"
date: 2023-02-03T10:35:28.085Z
---

## Recap

Following the previous blogs in the series.

- [AWS 1: BookClub Overview](https://magicishaqblog.netlify.app/aws/)
- [AWS 2: Getting Started](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/)
- [AWS 3: UI Guide and Walk through](https://magicishaqblog.netlify.app/2023-01-27-aws-3-UI-guide-and-walkthrough)

- [AWS 4: IAM Creating Users and Groups](https://magicishaqblog.netlify.app/2023-01-28-aws-4-IAM)


In todays blog; IAM Policies

## IAM Policies in AWS: Understanding the Basics

IAM policies are a critical component of security in the AWS cloud. They allow you to control access to AWS resources, so it's essential to have a solid understanding of how they work. In this blog post, we'll dive into IAM policies in-depth and help you understand their structure and how they get applied.

## Policy Inheritance:

IAM policies can be attached to groups, users, and roles. When a policy is attached to a group, it gets applied to all members of the group. For example, in our scenario, Alice, Bob, and Charles belong to a group of developers and have a policy attached to the group. As a result, they all inherit the policy and get access to the resources defined in the policy.

## Inline Policies:

Inline policies are policies that are attached directly to a user. In other words, they're not attached to a group or role. This means that a user can have its own unique policy, which is different from the policies attached to the groups they belong to. For example, if Fred is a user, it can have an inline policy that's not attached to any group.

## Policy Inheritance from Multiple Sources:

It's possible for a user to belong to multiple groups, each with a different policy. In that case, the user will inherit all policies from all groups they belong to. For example, if Charles and David belong to the audit team and the operations team, they'll inherit the policies from both groups.

## Policy Structure:

IAM policies have a specific structure, and it's crucial to understand it to effectively create policies. The structure consists of a version number, an ID (optional), and one or multiple statements. A statement has several parts, including the statement ID (optional), effect (allow or deny), principle (user, role, or account), action (list of API calls), and resource (list of resources to which the actions will be applied).

In conclusion, IAM policies are a critical component of security in AWS, and it's crucial to have a solid understanding of how they work. In this blog post, we've discussed policy inheritance, inline policies, policy inheritance from multiple sources, and the policy structure. By understanding these concepts, you'll be able to create effective IAM policies for your AWS environment.