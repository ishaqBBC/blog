---
layout: blog
title: "AWS 15 - EC2 Instance Purchasing Options"
date: 2023-03-31T10:22:29.842Z
---

## TLDR

Quick overview of all the purchasing options when it comes EC2 Instances

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

## Summary of EC2 Instances Purchasing Options

- On-demand: Pay for what you use, highest cost, no upfront payments or long-term commitments. Suitable for short-term, uninterrupted workloads.

- Reserved Instances: Discounts up to 72%, reserve specific instance attributes for 1 or 3 years. Useful for steady-state usage applications like databases. Or for applications you plan on running continuously ont he server for more than a year.

- Convertible Reserved Instances: Allows changing instance type, family, OS, scope, and tenancy, with discounts up to 66%. More flexibility than standard reserved instances.

- Savings Plans: Commit to a specific amount of usage in dollars for 1 or 3 years, discounts up to 70%. Locked to specific instance family and region, but flexible across instance sizes, OS, and tenancy.

- Spot Instances: Aggressive discounts up to 90%, but instances can be lost at any time. Suitable for batch jobs, data analysis, distributed workloads, and flexible start/end time workloads.

- Dedicated Hosts: Book an entire physical server, control instance placements, useful for compliance requirements, and server-bound software licenses. Can be on-demand or reserved.

- Dedicated Instances: Runs on dedicated hardware, but no control over instance placements. Useful for compliance requirements and bring-your-own-license software.

- Capacity Reservations: Reserve on-demand instances in a specific Amazon zone for any duration, no billing discounts. Suitable for short-term uninterrupted workloads.

**Remember that the exam will test you on which EC2 purchasing option is suitable for different workloads. By understanding the differences and use cases for each option, you'll be well-prepared to answer these questions.**
