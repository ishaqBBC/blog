---
layout: blog
title: "AWS 32: Network Load Balancer"
date: 2023-09-08T10:01:19.482Z
---

## TLDR

The Network Load Balancer (NLB) is a layer four load balancer<sup><a href="#note1">1</a></sup> that handles TCP and UDP traffic with high performance, low latency, and static IP options. It's suitable for applications needing extreme performance, TCP/UDP traffic <sup><a href="#note1">2</a></sup>, or specific static IPs. NLB works like an Application Load Balancer [ALB](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/) , using [target groups](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-target-groups.html) to redirect traffic. Target groups can include [EC2 instances](https://magicishaqblog.netlify.app/2023-06-09-aws-20-EC2-Instance-Store/) or hardcoded private IPs. NLB can also complement ALB for fixed IPs and HTTP traffic. Health checks support TCP, HTTP, and HTTPS protocols.

### Network Load balancer

So now let's talk about the Network Load Balancer. It's a layer four load balancer<sup><a href="#note1">1</a></sup>, which means it deals with TCP and UDP traffic<sup><a href="#note2">2</a></sup>. In simpler terms, while layer seven load balancers like Application Load Balancers [(ALB)](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-18-aws-29-applicaton-load-balancer/) handle HTTP, NLB is all about the lower-level stuff: TCP and UDP traffic .

### High Performance and Low Latency

One standout feature of NLB is its exceptional performance. It can handle millions of requests per second, and when it comes to latency, it outperforms the ALB. You can expect around 100 milliseconds of latency with NLB compared to 400 milliseconds with ALB.

### Static IPs and Elastic IPs

NLB offers a unique capability of having only one static IP per availability zone [(AZ)](https://docs.aws.amazon.com/whitepapers/latest/get-started-documentdb/aws-regions-and-availability-zones.html), but you can assign Elastic IPs <sup><a href="#note3">3</a></sup> to each AZ. This feature is incredibly handy when you need to expose your application with specific static IPs, which can be Elastic IPs. So, if you ever hear terms like "extreme performance," "TCP," "UDP," or "static IPs," think Network Load Balancer.

### How It Works

Using NLB is similar to ALB. You create [target groups](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-target-groups.html) , and the NLB redirects traffic to them. You can use it to handle TCP traffic on the front end while routing it to HTTP in the backend. But what's crucial here are the target groups themselves.

### Target Groups

Target groups can consist of [EC2 instances](https://magicishaqblog.netlify.app/2023-06-09-aws-20-EC2-Instance-Store/), allowing NLB to route traffic to your EC2 instances via TCP or UDP. Additionally, you can register IP addresses in target groups, but these IPs must be hardcoded, and they must be private IPs. This feature enables you to front both your EC2 instances and servers in your own data center with the same NLB.

### Combining NLB and ALB

Surprisingly, you can also have a Network Load Balancer in front of an Application Load Balancer. This combination lets you leverage NLB's fixed IP addresses and ALB's rules for handling HTTP traffic simultaneously. It's a valid and useful approach in specific scenarios.

### Health Checks

Lastly, for your certification exam prep, know that NLB target groups support three types of health check protocols: TCP, HTTP, and HTTPS. If your application supports HTTP or HTTPS, you can define health checks based on these protocols.

In a nutshell, the Network Load Balancer is a powerful tool for handling TCP and UDP traffic with impressive performance and static IP options. Whether you're aiming for high-performance applications, specific IPs, or need to complement your HTTP traffic handling, NLB has got you covered in the world of AWS load balancing.

I hope you found this guide informative, and it helps you navigate the intricacies of the Network Load Balancer. Stay tuned for more AWS insights, and see you in the next blog post, where we get a hands on the NLB.

## Footnotes

<p  id="note1"><sup>1</sup><em> * when taking about the layers we use the OSI model (Open Systems Interconnections). its a conceptual framework used to describe how computers interact over a network. There are 7 layers see table below  </em> </p>

| Layer Number | Layer Name         | Function/Purpose                                                             |
| ------------ | ------------------ | ---------------------------------------------------------------------------- |
| 7            | Application Layer  | Provides user interface and application services.                            |
| 6            | Presentation Layer | Translates data between different formats and handles encryption/decryption. |
| 5            | Session Layer      | Manages communication sessions and connections.                              |
| 4            | Transport Layer    | Ensures data reliability, sequencing, and error correction.                  |
| 3            | Network Layer      | Routes data between different networks and devices.                          |
| 2            | Data Link Layer    | Manages data framing and error detection on the physical medium.             |
| 1            | Physical Layer     | Deals with the physical connection and raw data transmission.                |

These layers work together to facilitate communication between devices and ensure that data is transmitted reliably and efficiently across networks.

<p id="note2"><sup> 2 </sup>
The transmission control protocol (TCP) is defined as a connection-oriented communication protocol that allows computing devices and applications to send data via a network and verify its delivery, In contrast, user datagram protocol (UDP) prioritizes speed and efficiency, which are crucial to internet operations.
</p>

<p id="note3"><sup> 3 </sup>
An Elastic IP address is a static public IPv4 address associated with your AWS account in a specific Region. Unlike an auto-assigned public IP address, an Elastic IP address is preserved after you stop and start your instance in a virtual private cloud (VPC). 
</p>

[more on Elastic IPs](https://repost.aws/knowledge-center/ec2-associate-static-public-ip)

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
