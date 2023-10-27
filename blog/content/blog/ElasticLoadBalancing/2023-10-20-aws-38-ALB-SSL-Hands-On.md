---
layout: blog
title: "AWS 38: ALB SSL Hands On"
date: 2023-10-20T10:01:19.482Z
---

## TLDR

Enabling SSL/TLS certificates on AWS load balancers ([ALB](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/) and [NLB](https://magicishaqblog.netlify.app/NLB/2023-09-09-aws-32-network-load-balancer/) is crucial for securing data in transit. Here's a quick summary of the steps:

1. **ALB SSL Configuration**:

   - Add an HTTPS listener on port 443.
   - Forward requests to a specific target group.
   - Configure SSL security policies for negotiation.
   - Specify the certificate source (ACM, IAM, or import).

2. **NLB SSL Configuration**:
   - Add a TLS listener.
   - Forward requests to the desired target group.
   - Set a security policy for certificate negotiation.
   - Choose the certificate source (ACM, IAM, or import).

Ensure your SSL/TLS certificates are properly configured for enhanced security.

## Introduction

Load balancers play a crucial role in ensuring the availability and reliability of web applications and services. However, to ensure the security of data in transit, it's essential to enable SSL (Secure Sockets Layer) or TLS (Transport Layer Security) certificates on your AWS load balancers. In this tutorial, we will walk through the process of enabling SSL/TLS certificates on both the Application Load Balancer (ALB) and the Network Load Balancer (NLB).

### Enabling SSL on the Application Load Balancer (ALB)

Let's begin with the [Application Load Balancer (ALB)](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-25-aws-30-alb-hands-on/). Enabling SSL on your ALB is a straightforward process. Follow these steps:

1. **Add a Listener**: First, you need to add a listener for HTTPS. This can be done in the AWS Management Console. Specify the protocol as HTTPS, and the default port is 443. Go to your EC2 instances then to Application Load balancer

   ![ALB Listener](/blog/src/images/38/38-1.png)

2. **Forward to a Target Group**: Configure the listener to forward requests to a specific [target groups](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-target-groups.html) based on client requests to port 443 for HTTPS.

![Target group](/blog/src/images/38/38-3.png)

### Enabling SSL on the Network Load Balancer (NLB)

The process for enabling SSL on the Network Load Balancer (NLB) is similar. Here's what you need to do:

1. **Add a Listener**: In the AWS Management Console for NLB, add a listener for TLS. Specify the protocol as **TLS**.

   ![NLB Listener](/blog/src/images/38/38-4.png)

2. **Forward to a Target Group**: Configure the listener to forward incoming requests to the desired target group.

   ![Target group](/blog/src/images/38/38-3.png)

3. **Security Policy**: Set your preferred security policy. This defines how SSL/TLS certificates are negotiated.

   ![Security Policy](/blog/src/images/38/38-4.png)

4. **Certificate Source**: Choose where your SSL/TLS certificate is located. Options include ACM, IAM, or direct import.

### Conclusion

Allowing SSL/TLS certificates on your AWS load balancers is an indispensable step in ensuring the security of your applications and services. By respecting the steps outlined above, you can establish a secure connection for data in transit. Whether you are using an Application Load Balancer (ALB) or a Network Load Balancer (NLB), the process is clear and well-detailed.

I hope you found this blog helpful in securing your AWS load balancers. Don’t forget to delete any load balancers created so you don’t incur any charges. Stay tuned for more informative tutorials, and I’ll see you in the next blog!

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
- [AWS 27: High Availability and Scalability ](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)
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
