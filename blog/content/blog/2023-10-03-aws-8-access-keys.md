---
layout: blog
title: "AWS 8: Creating Access Keys"
date: 2023-03-10T17:15:34.142Z
---

## Recap

Following the previous blogs in the series.

- [AWS 1: BookClub Overview](https://magicishaqblog.netlify.app/aws/)
- [AWS 2: Getting Started](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/)
- [AWS 3: UI Guide and Walk through](https://magicishaqblog.netlify.app/2023-01-27-aws-3-UI-guide-and-walkthrough)
- [AWS 4: IAM Creating Users and Groups](https://magicishaqblog.netlify.app/2023-01-28-aws-4-IAM)
- [AWS 5: IAM Policies](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices)
- [AWS 6: Quiz 1 ](https://magicishaqblog.netlify.app/aws-quiz-one)
- [AWS 7: AWS CLI , How to install the CLI](https://magicishaqblog.netlify.app/2023-10-03-aws-8-access-keys)

## Introduction
Hey there fellow coders! Today I want to show you how to create and use access keys in AWS. Let's dive right in!

## How to access the CLI
First, we'll head to the Security Credentials section under our AWS account. From there, we'll create an access key. AWS provides recommendations based on our specific use case, but for now, we'll use the CLI and proceed with creating the key.
On the access management console , go to IAM and select a [user](https://magicishaqblog.netlify.app/2023-01-28-aws-4-IAM) Click on the tab `Security Credentials` and scroll down to the `Access Keys` section 

![Access keys](/blog/src/images/access-keys-1.png)
Do not share keys, these are personal- treat them like passwords

Next, we'll configure our AWS CLI by running the 

```
aws configure

```
 command. Here, we'll enter our access key ID and secret access key, as well as the default region name (I'll be using Global for my tutorials).

With our CLI configured, we can start testing it out. We'll run the 

```
aws iam list-users

```
which returns a JSON in the command line similar to this: 

```json
AWS Access Key ID [None]: <access key id>
AWS Secret Access Key [None]: <your secret access key >
Default region name [None]: Global
Default output format [None]: 

user ~ % aws iam list-users

{
    "Users": [
        {
            "Path": "/",
            "UserName": "ishaq",
            "UserId": "XXXXXXXXXXXXXXXXXXXXX",
            "Arn": "arn:aws:iam::XXXXXXXXXXXX:user/ishaq",
            "CreateDate": "2023-02-03T11:10:26+00:00"
        }
    ]
}
```
command to see all the users in our account and see that it returns the same information as the IAM management console.

We'll then demonstrate what happens when we remove permissions from a user. 

in the root account , go to the IAM > User groups > admin 
![groups](/blog/src/images/groups-admin.png)

then click on `remove users` from the admin

If we try to run the 
``` 
aws iam list-users 
```
command after removing permissions, we'll see that it is denied just as it would be in the IAM console.


## Closing Thoughts
Access keys and secret access keys allow us to access AWS through the CLI, with permissions being the same as those in the IAM console. I hope you found this helpful, and don't forget to add your user back to their group! See you in the next tutorial.