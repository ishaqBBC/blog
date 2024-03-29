---
layout: blog
title: "AWS 31: Application Load balancer hands On (part 2)"
date: 2023-09-01T10:01:19.482Z
---

## TLDR 
In this advanced concepts discussion about load balancers, we explore two key areas: network security and application load balancer rules.
we explore advanced concepts for load balancers, focusing on network security and custom routing rules. By restricting direct access to EC2 instances and configuring rules based on specific conditions, we can enhance security and have more control over application routing. Load balancers are essential components in modern infrastructure setups, providing efficient traffic distribution and advanced functionality.

# Introduction
[Following from the previous blog post](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-25-aws-30-alb-hands-on/)
Load balancers are a crucial component in modern infrastructure setups, allowing for efficient distribution of traffic across multiple servers. In this blog post, we will explore some advanced concepts for load balancers that can enhance network security and give you more control over your application routing.

## Enhancing Network Security

 When setting up load balancers we must think of network security. By default, load balancers allow traffic from any source to reach your EC2 instances. However, it may be preferable to restrict access to your instances through the load balancer only. Let's see how we can achieve this.

To begin, we need to modify the security group settings for our EC2 instances. Security groups act as virtual firewalls, controlling inbound and outbound traffic. Currently, we have a security group for our load balancer and another one for our EC2 instances. 
![security groups](/blog/src/images/31/31-1.png)

To restrict access to the EC2 instances, we can edit the inbound rules of the EC2 instance security group. Specifically, we want to modify the HTTP rule. By default, this rule allows traffic from any source.
![deleting rule security group](/blog/src/images/31/31-2.png)

To change this, we first delete the existing rule and then add a new one. Instead of specifying a CIDR block (range of IP addresses), we can select a security group as the source. In this case, we want to allow traffic only from the security group of the [load balancer created in the previous blog](https://magicishaqblog.netlify.app/ApplicationLoadBalancer/2023-08-25-aws-30-alb-hands-on/).
![security groups with load balancer](/blog/src/images/31/31-3.png)
![save rules button](/blog/src/images/31/31-4.png)

By saving this rule, we effectively restrict direct access to the EC2 instances. If we try to access the instances directly, we will encounter a timeout error. However, the load balancer can still access the instances because we have allowed inbound traffic from the load balancer's security group.

With this simple configuration change, we have significantly tightened network security for our EC2 instances.

## Advanced Routing with Application Load Balancer Rules

Load balancers not only distribute traffic but also allow for advanced routing based on specific conditions. Let's explore how we can configure these rules using an application load balancer.

Within the load balancer settings, we can define listener rules. These rules determine how incoming requests are handled. By default, the listener forwards requests to a specific target group. However, we can add custom rules to make the routing more complex.
![load balancer settings ](/blog/src/images/31/31-5.png)

For example, let's say we want to create a rule that handles requests with a specific path. We can add a condition based on the path value, such as "/error". This means that if the request path matches "/error", this rule will be triggered.


Conditions can also be based on host headers, HTTP request methods, source IP addresses, query strings, or HTTP headers. This provides flexibility in defining routing rules based on different criteria.

Once we have defined the condition, we need to specify the action to take when the condition is met. This can include forwarding to specific target groups, redirecting to a different URL, or returning a fixed response.

In our example, we choose to return a fixed response of "404 Not Found" when the request path is "/error". This allows us to handle specific error scenarios with a customized response.

![load balancer listener rules ](/blog/src/images/31/31-6.png)
![conditions ](/blog/src/images/31/31-7.png)
![path ](/blog/src/images/31/31-9.png)
![actions](/blog/src/images/31/31-8.png)
![overview](/blog/src/images/31/31-10.png)

It's worth noting that rules have priorities, allowing us to define the order in which they are evaluated. The rule with the highest priority will take precedence if multiple rules match the condition. This gives us fine-grained control over the routing logic.

By utilizing these advanced routing capabilities, we can create complex routing scenarios tailored to our application's needs.

## Testing the Configuration

To ensure our configuration works as expected, let's test it out. We can obtain the DNS name of the load balancer and append "/error" to the URL. This should trigger our custom rule and return the "404 Not Found" response.

By following these steps, we have successfully implemented advanced security measures and routing capabilities in our load balancer setup.
![testing error path](/blog/src/images/31/31-11.png)
## Conclusion

 load balancers are powerful tools that go beyond simple traffic distribution. By leveraging advanced concepts like network security settings and custom routing rules, we can enhance the performance, reliability, and security of our applications. Stay tuned for more exciting topics in our AWS series!



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