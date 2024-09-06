---
layout: blog
title: "AWS 71- Route 53 Geolocation Routing"
date: 2024-09-06T13:19:09.346Z
---

## TLDR

Geolocation routing in AWS Route 53 directs users based on their physical location, such as a continent, country, or [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions) (e.g., U.S. states). This is useful for website localisation, content restriction, or load balancing. You create geolocation records and set a default record for users who don’t match specific locations.
German users can be routed to a German server, French users to a French one, and everyone else to a default server. You can also associate health checks with these records to ensure server availability.
Testing can be done via [VPNs](https://chromewebstore.google.com/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno?hl=en) to simulate traffic from different locations.

## Intro

Twe’ll delve into geolocation-based routing in AWS Route 53, a crucial method that works quite differently from [latency-based](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/) routing. Geolocation routing directs users based on their physical location, allowing you to route traffic depending on a continent, country, or even more precise areas, such as individual U.S. states. The most specific location available is prioritised for routing.

For instance, you can configure a system where users from Germany are routed to one IP address, French users to another, and all other users to a default IP address. This is useful for scenarios such as website localisation, content restriction, or load balancing.

### Creating a Default Record

It's essential to create a default record to handle cases where no specific location matches. This default ensures that any user who doesn’t fit into a specific geolocation is still routed appropriately. This approach is often used to present a default language or version of your site. You can also associate these records with health checks to monitor the availability of your resources.
[Tutorial can be found here](https://magicishaqblog.netlify.app/2024-05-03-aws-61-Route53-Creating-First-Record/)

### Example of Geolocation Routing in Action

Let’s take the example of a map of Europe. Suppose we have specific IP addresses for German and French users. When a user from Germany accesses your site, they are directed to an IP containing the German version of your app. French users, meanwhile, are sent to an IP hosting the French version. Any user not in these specific locations would be routed to a default IP, perhaps hosting the English version of your app.

### Step-by-Step Implementation in the Console

Now, let’s put this into practice by creating a geolocation record in the AWS console:

1. **Create a Record:** Start by creating a new A-type record. Set the routing policy to ‘Geolocation’ and link it to an EC2 instance in the Asia Pacific [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions) (ap-southeast-1).
2. **Specify Locations:** The next step involves specifying [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions)s. For example, you can route all users from Asia to your ap-southeast-1 instance.

3. **Health Checks:** If necessary, associate a [health check](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/) to monitor the availability of the server in the selected [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions).

4. **Additional Records:** Now, create additional records. For example, route U.S. users to us-east-1 and provide a default IP for other users. You can label these records, such as ‘U.S.’ for the American users and ‘Default EU’ for everyone else.

Once created, you can test the setup by simulating traffic from different [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions)s. If your system routes users based on their geolocation as expected, the setup is complete.

![image of creating a record](/blog/src/images/71/71-1.png)

### Testing Geolocation Routing

After creating the geolocation records, it’s essential to test them. Suppose you are not currently in the U.S. or Asia. When you access the site, it should route you to the default European IP address, confirming that the default record is working correctly.

Next, use a [VPN](https://chromewebstore.google.com/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno?hl=en) to connect to a country in Asia, such as India. When you refresh the page, it should direct you to the Asia Pacific (ap-southeast-1) server. If the page fails to load, check your [security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups/), as these often cause issues. For instance, you may need to modify the inbound rules to allow HTTP traffic.

Once the HTTP rule is re-enabled, your traffic should route correctly to the Asia Pacific server. Finally, testing the system in the U.S. will route you to the us-east-1 instance, and accessing from a neighbouring country like Mexico, which isn't explicitly defined, will again send you to the default European server.

### Conclusion

Geolocation routing is a powerful tool for controlling how users interact with your content based on their location. With Route 53, you can easily configure and manage traffic for various [region](https://magicishaqblog.netlify.app/2023-01-23-aws-2-getting-started/#regions)s, offering a tailored user experience.

## Recap

from the previous entries in the series

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
- [AWS 27: High [availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/) and Scalability ](<https://magicishaqblog.netlify.app/section6/2023-07-28-high_[availability](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)_and_scalability/>)
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
- [AWS 38: ALB SSL Hands On](https://magicishaqblog.netlify.app/ElasticLoadBalancing/2023-10-20-aws-38-ALB-SSL-Hands-On/)
- [AWS 39: Connection Draining](https://magicishaqblog.netlify.app/2023-27-10-aws-39-connection-draining/)
- [AWS 40: Auto Scaling Groups](https://magicishaqblog.netlify.app/2023-11-10-aws-40-Auto-Scaling-Groups/)
- [AWS 41: Auto Scaling Groups : Hands On](https://magicishaqblog.netlify.app/2023-11-17-aws-41-auto-scaling-groups-hands-on/)
- [AWS 42: Auto Scaling Groups Policy](https://magicishaqblog.netlify.app/2023-11-24-aws-42-Auto-Scaling-Groups-Policy/)
- [AWS 43: Auto Scaling Groups Policy - Hands On](https://magicishaqblog.netlify.app/2023-12-01-aws-43-auto-scaling-groups-hands-on/)
- [AWS 44: Auto Scaling Groups - Instant Refresh](https://magicishaqblog.netlify.app/2023-12-08-aws-44-auto-scaling-groups-instant-refresh/)
- [AWS 45: Quiz 3](https://magicishaqblog.netlify.app/quiz-3/2023-12-15-aws-45-quiz-3/)
- [AWS 46: RDS Relational Database Service](https://magicishaqblog.netlify.app/2023-12-22-aws-46-RDS/)
- [AWS 47: RDS Read Replica Multi Az](https://magicishaqblog.netlify.app/2023-29-12-aws-47-RDS-read-replica-Multi-Az/)
- [AWS 48: RDS Hands On](https://magicishaqblog.netlify.app/2023-05-01-aws-48-RDS-Hands-On/)
- [AWS 49: Amazon Aurora](https://magicishaqblog.netlify.app/2023-01-12-aws-49-Amazon-Aurora/)
- [AWS 50: Amazon Aurora: Hands On](https://magicishaqblog.netlify.app/2024-01-19-aws-50-Amazon-Aurora-hands-on/)
- [AWS 51: Amazon RDS and Amazon Aurora Security](https://magicishaqblog.netlify.app/2024-01-26-aws-51-Amazon-RDS-and-Amazon-Aurora-Security/)
- [AWS 52: RDS Proxy](https://magicishaqblog.netlify.app/2024-02-02-aws-52-RDS-Proxy/)
- [AWS 53: ElastiCache](https://magicishaqblog.netlify.app/2024-02-09-aws-53-ElastiCache/)
- [AWS 54: ElastiCache: Hands On](https://magicishaqblog.netlify.app/StructuredClone/2024-02-16-aws-54-ElastiCache-Hands-On/)
- [AWS 55: ElastiCache Strategies](https://magicishaqblog.netlify.app/2024-01-03-aws-55-ElastiCache-Strategies/)
- [AWS 56: Amazon Memory DB for Redis](https://magicishaqblog.netlify.app/2023-03-15-aws-56-AmazonMemoryDB-for-Redis/)
- [AWS 57: Quiz 3](https://magicishaqblog.netlify.app/quiz-4/2023-03-22-aws-57-quiz-4/)
- [AWS 58: DNS Name](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/)
- [AWS 59: Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)
- [AWS 60 Route 53 Registering Domain](https://magicishaqblog.netlify.app/2024-04-26-aws-60-Route53-registering-domain/)
- [AWS 61 Route 53 Creating First Record](https://magicishaqblog.netlify.app/2024-05-03-aws-61-Route53-Creating-First-Record/)
- [AWS 62: Setting up an EC2 instance and ALB with [Route 53](https://magicishaqblog.netlify.app/2024-04-19-aws-Route53-overview/)](https://magicishaqblog.netlify.app/2024-05-10-aws-62-setting-up-ec2-instances-and-alb-with-route-53/)
- [AWS 63: Route 53 TTL (Time to Live)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/)
- [AWS 64: Route 53 CNAME and alias records](https://magicishaqblog.netlify.app/2024-05-07-aws-64-CNAME-alias-records/)
- [AWS 65: Route 53 simple routing](https://magicishaqblog.netlify.app/2024-12-07-aws-65-Route53-simple-routing/)
- [AWS 66: Route 53 weighted routing](https://magicishaqblog.netlify.app/2024-19-07-aws-route53-weighted-routing/) -[AWS 67: Route 53 Latency](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 67: Route 53 Latency Routing](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 68: Route 53 Health Checks](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/)
- [AWS 69: Route 53 Health Checks , Hands On](https://magicishaqblog.netlify.app/2024-08-16-aws-69-Health-checks-hands-on/)
- [AWS 70: Route 53 route policy failover]()
