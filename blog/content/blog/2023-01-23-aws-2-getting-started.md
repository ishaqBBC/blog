---
layout: blog
title: "AWS 2: Getting Started"
date: 2023-01-23T10:35:28.085Z
---

## Recap

Welcome back to the ongoing series; known as AWS Book club.
your one stop place to get the Developer Associate Certification.

Following from blog post 1 [Click HERE for Introduction](https://magicishaqblog.netlify.app/aws/)

## TLDR

This blog post is all about getting started with Amazon Web Services (AWS) and specifically focusing on the Identity and Access Management (IAM) feature. It's like a quick refresher on the history of AWS, discussing the different use cases and the massive global infrastructure including availability zones, regions, and edge locations. Also, it's a step-by-step guide on how to create your own AWS account, complete with the free tier and all the details on how to utilize the root user account for IAM. Overall, it's your one-stop-shop for all things AWS and getting certified as a developer associate.

## The history of AWS (Amazon Web Service)

AWS was first launched in 2002 by amazon. 2004 - launched [SQS](https://aws.amazon.com/sqs/features/?trk=a7f57dee-fc58-4084-9037-cb552d58a5d5&sc_channel=ps&s_kwcid=AL!4422!3!637214078377!!!g!!&ef_id=EAIaIQobChMI--PQwvjn_AIVQuztCh0V4wtqEAAYASAAEgI-l_D_BwE:G:s), 2006 re-launched SQS, s3 and ec2

AWS accounts for 47% of the market in 2019, it's the pioneer and leader in AWS Cloud Market for the 9th consecutive year, with over 1,000,000 active users.

## Use Cases

AWS lets you build complex and scalable applications. which is applicable to a diverse set of industries; Such as McDonald's, 20th Century Fox , Activision and Netflix. \
\
Use of using AWS include: Enterprise IT; Backups , Big Data analytics, Website hosting, Mobile and Social Apps and Gaming to name a few.

## AWSs infrastructure is massive

AWS is global we have;

- AWS Regions. Each region is split up into Availability zones - the min amount per region is 3, while the max is 6. An example is Sydney.
- AWS Availability Zones. (are named by the [continent]-[compass-position]-[num] such as `eu-west-2` europe west 2 - or london , but `eu-west-1` is Ireland while `us-east-2` is Ohio. If Sydney is the region; the availability zones are `ap-southeast-2a`, `ap-southeast-2b` and, `ap-southeast-2c`. Each zone is separate from each other so if one fails, the others still work.
- AWS Edge Locations/ Points of Presence . We will learn more about Points of presence later in the series - Just know but that AWS has more than 200 points of presence in 84 cities across 42 countries.

And this will be very helpful when we deliver content

![aws regions](/blog/src/images/screenshot-2023-01-25-at-11.26.44.png)

You can find more about the regions and availability zone here\
<https://aws.amazon.com/about-aws/global-infrastructure/regions_az/>

## How to install AWS

**Note, We will be using the free tier of AWS but credit card must be provided**

1). Go to AWS [sign In Page](https://portal.aws.amazon.com/billing/signup?refid=ce1f55b8-6da8-4aa2-af36-3f11e9a449ae&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start/email) . Create an Account by giving a root user email address and AWS account name.

![aws sign up](/blog/src/images/awsSignup.png)

2.) Enter email address and give yourself AWS account name

3.) Once you have confirmed email address. choose the free account

4.) Next time you log into AWS, use the Root account

![root account image](/blog/src/images/sign-in-page.png)

**Root accounts can hold multiple instances of IAM (Identify and Access Management) Accounts**

The root user account should not be shared with others. Later in the series I will go over [IAM](https://magicishaqblog.netlify.app/2023-01-28-aws-4-IAM)

**Congrats, you have set up an AWS account**

Stay tuned for the next blog post, where we will be going over the UI of AWS...
