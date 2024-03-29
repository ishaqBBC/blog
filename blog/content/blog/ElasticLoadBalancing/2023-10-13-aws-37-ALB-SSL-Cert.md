---
layout: blog
title: "AWS 37: ELB - SSL Certificates"
date: 2023-10-13T10:01:19.482Z
---

<style>

.content {white-space: nowrap; }

</style>

## TLDR:

Secure your website with SSL (Secure Sockets Layer) and TLS (Transport Layer Security) certificates to encrypt traffic, protect sensitive data, and ensure a safe browsing experience for your visitors. Learn how these certificates work, the role of Certificate Authorities, and the importance of Server Name Indication (SNI) for serving multiple SSL certificates on a single web server.

## Introduction

<div class="content">
Firstly, let's talk about SSL and TLS Certificates. So this is a dumb down version of how this works. This is obviously way more complicated, but I;</br>
really want to introduce you to the concepts in case you don't know it. And even if you do know SSL and TLS, please watch this lecture. I'm going to</br>
explain SNI and I'm going to talk about the integrations with load balancers. So bear with me please.</br>
Every SSL certificate allows the traffic between your clients and your load balancer to be encrypted while in transit. </br>
Pronounced in-flight encryption.So that means the data as it goes through </br>
a network is going to be encrypted and only going to be able to be decrypted by the sender and the receiver. So, SSL refers to Secure Sockets </br>
Layer and it's used to encrypt transfer connections. And TLS is the newer version of SSL and it refers to Transport Layer Security. </br>
Except the thing is, nowadays, TLS certificates are the ones that are mainly used, but people, including myself, I will still refer this as SSL. </br>
So I'm making a mistake, but I'm making it on purpose, okay? So it's better to say a </br>
TLS certificate than SSL certificates, but for many reasons, </br>
I'm still gonna say it's SSL because it's easier to understand. So public SSL certificates are issued by Certificate Authorities, </br>
Note services like: Comodo, Symantec, GoDaddy, GlobalSign, Digicert, Letsencrypt, and so on. And using this public SSL certificate attached to our load balancer, we're able to </br>
encrypt the connection between the clients and the load balancer.

</div>

So whenever you go to a website, for example google.com or anything, any other website, and you have a lock or a green lock that means that your traffic is encrypted. And if traffic is not encrypted, you'll have a red sign saying, "Hey, traffic is not encrypted. Don't put your credit card details. Don't put your login information because it's not secure."

So the SSL certificates, they have an expiration date that you set and they must be renewed regularly to make sure that they're authentic, okay?

So how does it work from a load balancer perspective? Users connect over HTTPS, and it's S because it's using SSL certificates and it's encrypted. It's secure, and it connects over the public internet to your load balancer. And internally, your load balancer does something called SSL certificate termination. And in the backend, it can talk to your EC2 instance using HTTP, so not encrypted, but the traffic goes over your VPC, which is a private traffic network. And that is somewhat secure.

![Diagram of the SSL](/blog/src/images/37/37-1.png);

So the load balancer will load an X.509 certificate, which is called an SSL or TLS server certificate. And you can manage these SSL certificates in AWS using ACM, meaning AWS Certificate Manager. Now, you can also upload your own certificates to ACM if you wanted to. And when you set up an HTTPS listener, you must specify a default certificate. Then you can add an optional list of certs to support multiple domains, and clients can use something called SNI or Server Name Indication to specify the hostname they reach.

Now don't worry, I'm going to explain what SNI is in detail in the next slide because it is really, really important for you to understand what it means. That means that, and you can also, finally for HTTPS, set a specific security policy if you wanted to support all their versions of SSL and TLS, called also legacy clients.

## Server Name Indication

Okay, so let's talk about SNI 'cause it is so important. SNI solves a very important problem, which is how do you load multiple SSL certificates onto one web server in order for that web server to serve multiple websites? And there's a newer protocol that now requires the client to indicate the hostname of the target server in the initial SSL handshake. So the client will say, "I want to connect to this website." And the server will know what certificate to load. And so, this is a newer protocol and this is something new. Not every client supports this. So it only works when you use the application load balancer and the network load balancer, so the newer generations, or CloudFront. And we'll see what CloudFront is later in this course. And it does not work when you use the classic load balancer because it is older generation. So anytime you see multiple SSL certificates onto your load balancer, think ALB or NLB.

![Diagram of the SSL](/blog/src/images/37/37-2.png);

So as a diagram, what does it look like? We have our ALB here and we have two target groups. The first one is www.mycorp.com, and the second one is Domain1.example.com. So the ALB will be routing to these target groups based on some rules and the rules may be directly linked, in this case to the hostname. So the ALB will have two SSL certificates: Domain1.example.com and www.mycorp.com, which corresponds to the corresponding target groups.

Now the clients connect to our ALB and say, "I would like www.mycorp.com", and that is part of server name indication. And the ALB says, "Okay, I've seen that you want mycorp.com. Let me use the correct SSL certificates to fulfill that request." So it's going to take the right SSL certificates, encrypt the traffic, and then thanks to the routes, it's going to know to redirect to the correct target group, mycorp.com. And obviously, if you have another client connecting to your ALB for Domain1.example.com, then you will be able to pull the right SSL certificate again and connect to the right target group. So using SNI or server name indication, you are able to have multiple target groups for different websites using different SSL certificates.

Excellent. So finally, what is supported for SSL certificates? For the classic load balancer, you can only support one SSL certificate. And if you want multiple hostnames with multiple SSL certificates, the best way is to use multiple classic load balancers. For ALB, the v2, you can support multiple listeners with multiple SSL certificates, and it uses SNI to make it work. And we just saw what it is. For the NLB or network load balancer, it supports, again, multiple listeners with multiple SSL certificates, and it will use SNI again to make it work.

## Conculsion

SSL and TLS certificates are essential for website security. They ensure that data is encrypted, protecting sensitive information and offering a secure browsing experience. Server Name Indication (SNI) is a crucial technology for serving multiple SSL certificates on a single web server. Understanding these concepts is vital for anyone responsible for web server management and security.

By implementing these security measures, you can bolster the trust of your website visitors and protect your data from potential threats. So, don't delay—secure your website with SSL and TLS certificates today.

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
