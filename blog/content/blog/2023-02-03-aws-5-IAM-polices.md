---
layout: blog
title: "AWS 5: IAM Polices"
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

IAM policies can be attached to groups, users, and roles. When a policy is attached to a group, it gets applied to all members of the group. For example, in our scenario, Tony, Steve and Natasha belong to a group of developers and have a policy attached to the group. As a result, they all inherit the policy and get access to the resources defined in the policy.

![IAM policies](/blog/src/images/iam-11.png)

## Inline Policies:

Inline policies are policies that are attached directly to a user. In other words, they're not attached to a group or role. This means that a user can have its own unique policy, which is different from the policies attached to the groups they belong to. For example, if Peter is a user, he can have an inline policy that's not attached to any group. 

![Inline Policy](/blog/src/images/iam-13.png)


## Policy Inheritance from Multiple Sources:

It's possible for a user to belong to multiple groups, each with a different policy. In that case, the user will inherit all policies from all groups they belong to. For example, if Peter is part of the developer team and and has his own policy, he'll inherit the policies from both.
![Policy Inheritance](/blog/src/images/iam-12.png)

## Policy Structure:

IAM policies have a specific structure in a JSON format, and it's crucial to understand it to effectively create policies. The structure consists of a version number, an ID (optional), and one or multiple statements. A statement has several parts, including the statement ID (optional), effect (allow or deny), principle (user, role, or account), action (list of API calls), and resource (list of resources to which the actions will be applied).

## Finding Where The Policies Are:

Following the [previous blog](https://magicishaqblog.netlify.app/2023-01-28-aws-4-IAM) Where we created a user. We already gave them the policy of "AdministratorAccess"

### Adding A Policy:  

Click on the group in the IAM section of AWS, and navigate over to the permissions tab. 
![Group section](/blog/src/images/iam-16.png)
Here you can see the policy attached. Clicking on Users or Roles and doing the same steps can be used to add or remove policies.

## Viewing/Creating A Policy
As you might of noticed AWS comes with allot of built in policies already, Don't worry we will explain more of them in the series. But for now we will create a new one. 

Click in the `Polices` section of the IAM dashboard, then `Create Policy`
![IAM Policies](/blog/src/images/iam-17.png)

Policies are JSON documents, but AWS has a wizard that helps build one. Called the visual editor. The visual editor is handy because it provides a drop down list of all the services and their actions. Building in this view will change the JSON
![visual editor](/blog/src/images/iam-18.png)



If we go back to the polices tab, we can click into `AdministratorAccess` polices and view the JSON.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
```
The Effect is `Allow` on All actions (the `*` selects everything)
The Resource is also on all. 


## Conclusion

IAM policies are a critical component of security in AWS, and it's crucial to have a solid understanding of how they work. In this blog post, we've discussed policy inheritance, inline policies, policy inheritance from multiple sources, and the policy structure. By understanding these concepts, you'll be able to create effective IAM policies for your AWS environment.
