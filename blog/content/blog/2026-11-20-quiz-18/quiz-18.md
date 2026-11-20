---
layout: blog
title: "AWS 131: Quiz 17 ; Amazon Security Advanced Part 7"
date: 2026-11-20T12:05:33.279Z
---



<style>
  .correct{
        color: #9C27B0;
    -webkit-box-shadow: 5px 5px 20px 5px #FF19FD;
    box-shadow: 0px 2px 11px 4px #FF19FD;
    border-radius: 10%;
    margin: 14px;
  }

</style>

## Introduction

Todays quiz is a continuation of the previous advanced security [Quizzes](https://magicishaqblog.netlify.app/?s=security+quiz) 

<h4> Question: 1 A developer is looking at establishing access control for an API that connects to a Lambda function downstream.

Which of the following represents a mechanism that CANNOT be used for authenticating with the API Gateway? </h4>
    
  <details>
  <summary>Lambda Authorizer</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Standard AWS IAM roles and policies</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Cognito User Pools</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>AWS Security Token Service (STS)</summary>
  <p><span class="correct">Correct:</span> :

Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale. API developers can create APIs that access AWS or other web services, as well as data stored in the AWS Cloud.

How API Gateway Works:

via - https://aws.amazon.com/api-gateway/

AWS Security Token Service (STS) - AWS Security Token Service (AWS STS) is a web service that enables you to request temporary, limited-privilege credentials for AWS Identity and Access Management (IAM) users or for users that you authenticate (federated users). However, it is not supported by API Gateway.

API Gateway supports the following mechanisms for authentication and authorization:

via - https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html

Incorrect options:

Standard AWS IAM roles and policies - Standard AWS IAM roles and policies offer flexible and robust access controls that can be applied to an entire API or individual methods. IAM roles and policies can be used for controlling who can create and manage your APIs, as well as who can invoke them.

Lambda Authorizer - Lambda authorizers are Lambda functions that control access to REST API methods using bearer token authentication—as well as information described by headers, paths, query strings, stage variables, or context variables request parameters. Lambda authorizers are used to control who can invoke REST API methods.

Cognito User Pools - Amazon Cognito user pools let you create customizable authentication and authorization solutions for your REST APIs. Amazon Cognito user pools are used to control who can invoke REST API methods.

References:

https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html

https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html
 </p>
  </details>

<h4> Question: 2 The development team at an e-commerce company completed the last deployment for their application at a reduced capacity because of the deployment policy. The application took a performance hit because of the traffic spike due to an on-going sale.

Which of the following represents the BEST deployment option for the upcoming application version such that it maintains at least the FULL capacity of the application and MINIMAL impact of failed deployment? </h4>
    
  <details>
  <summary>Deploy the new application version using 'All at once' deployment policy</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Deploy the new application version using 'Rolling' deployment policy</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Deploy the new application version using 'Immutable' deployment policy</summary>
  <p><span class="correct">Correct:</span> :

Deploy the new application version using 'Immutable' deployment policy

With Elastic Beanstalk, you can quickly deploy and manage applications in the AWS Cloud without having to learn about the infrastructure that runs those applications. Elastic Beanstalk reduces management complexity without restricting choice or control. You simply upload your application, and Elastic Beanstalk automatically handles the details of capacity provisioning, load balancing, scaling, and application health monitoring.

How Elastic BeanStalk Works:

via - https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html

The 'Immutable' deployment policy ensures that your new application version is always deployed to new instances, instead of updating existing instances. It also has the additional advantage of a quick and safe rollback in case the deployment fails. In an immutable update, a second Auto Scaling group is launched in your environment and the new version serves traffic alongside the old version until the new instances pass health checks. In case of deployment failure, the new instances are terminated, so the impact is minimal.

Overview of Elastic Beanstalk Deployment Policies:

via - https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html

Incorrect options:

Deploy the new application version using 'All at once' deployment policy - Although 'All at once' is the quickest deployment method, but the application may become unavailable to users (or have low availability) for a short time. Also in case of deployment failure, the application sees a downtime, so this option is not correct.

Deploy the new application version using 'Rolling' deployment policy - This policy avoids downtime and minimizes reduced availability, at a cost of a longer deployment time. However in case of deployment failure, the rollback process is via manual redeploy, so it's not as quick as the Immutable deployment.

Deploy the new application version using 'Rolling with additional batch' deployment policy - This policy avoids any reduced availability, at a cost of an even longer deployment time compared to the Rolling method. Suitable if you must maintain the same bandwidth throughout the deployment. However in case of deployment failure, the rollback process is via manual redeploy, so it's not as quick as the Immutable deployment.

References:

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html
 </p>
  </details>
  
  <details>
  <summary>Deploy the new application version using 'Rolling with additional batch' deployment policy</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <h4> Question: 3 As a senior architect, you are responsible for the development, support, maintenance, and implementation of all database applications written using NoSQL technology. A new project demands a throughput requirement of 10 strongly consistent reads per second of 6KB in size each.

How many read capacity units will you need when configuring your DynamoDB table? </h4>
    
  <details>
  <summary>30</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>60</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>10</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>20</summary>
  <p><span class="correct">Correct:</span> :

Before proceeding with the calculations, please review the following:





via - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughput.html

20

One read capacity unit represents one strongly consistent read per second for an item up to 4 KB in size. If you need to read an item that is larger than 4 KB, DynamoDB will need to consume additional read capacity units.

1) Item Size / 4KB, rounding to the nearest whole number.

So, in the above case, 6KB / 4 KB = 1.5 or 2 read capacity units.

2) 1 read capacity unit per item (since strongly consistent read) × No of reads per second

So, in the above case, 2 x 10 = 20 read capacity units.

Incorrect options:

60

30

10

These three options contradict the details provided in the explanation above, so these are incorrect.

Reference:

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughput.html
 </p>
  </details>
  
  <h4> Question: 4 A company uses Amazon Simple Email Service (SES) to cost-effectively send susbscription emails to the customers. Intermittently, the SES service throws the error: Throttling – Maximum sending rate exceeded.

As a developer associate, which of the following would you recommend to fix this issue? </h4>
    
  <details>
  <summary>Implement retry mechanism for all 4xx errors to avoid throttling error</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Use Exponential Backoff technique to introduce delay in time before attempting to execute the operation again</summary>
  <p><span class="correct">Correct:</span> :

Use Exponential Backoff technique to introduce delay in time before attempting to execute the operation again - A “Throttling – Maximum sending rate exceeded” error is retriable. This error is different than other errors returned by Amazon SES. A request rejected with a “Throttling” error can be retried at a later time and is likely to succeed.

Retries are “selfish.” In other words, when a client retries, it spends more of the server's time to get a higher chance of success. Where failures are rare or transient, that's not a problem. This is because the overall number of retried requests is small, and the tradeoff of increasing apparent availability works well. When failures are caused by overload, retries that increase load can make matters significantly worse. They can even delay recovery by keeping the load high long after the original issue is resolved.

The preferred solution is to use a backoff. Instead of retrying immediately and aggressively, the client waits some amount of time between tries. The most common pattern is an exponential backoff, where the wait time is increased exponentially after every attempt.

A variety of factors can affect your send rate, e.g. message size, network performance or Amazon SES availability. The advantage of the exponential backoff approach is that your application will self-tune and it will call Amazon SES at close to the maximum allowed rate.

Incorrect options:

Configure Timeout mechanism for each request made to the SES service - Requests are configured to timeout if they do not complete successfully in a given time. This helps free up the database, application and any other resource that could potentially keep on waiting to eventually succeed. But, if errors are caused by load, retries can be ineffective if all clients retry at the same time. Throttling error signifies that load is high on SES and it does not make sense to keep retrying.

Raise a service request with Amazon to increase the throttling limit for the SES API - If throttling error is persistent, then it indicates a high load on the system consistently and increasing the throttling limit will be the right solution for the problem. But, the error is only intermittent here, signifying that decreasing the rate of requests will handle the error.

Implement retry mechanism for all 4xx errors to avoid throttling error - 4xx status codes indicate that there was a problem with the client request. Common client request errors include providing invalid credentials and omitting required parameters. When you get a 4xx error, you need to correct the problem and resubmit a properly formed client request. Throttling is a server error and not a client error, hence retry on 4xx errors does not make sense here.

References:

https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/

https://aws.amazon.com/blogs/messaging-and-targeting/how-to-handle-a-throttling-maximum-sending-rate-exceeded-error/
 </p>
  </details>
  
  <details>
  <summary>Raise a service request with Amazon to increase the throttling limit for the SES API</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Configure Timeout mechanism for each request made to the SES service</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  <h4> Question: 5 The development team at a multi-national retail company wants to support trusted third-party authenticated users from the supplier organizations to create and update records in specific DynamoDB tables in the company's AWS account.

As a Developer Associate, which of the following solutions would you suggest for the given use-case? </h4>
    
  <details>
  <summary>Use Cognito User pools to enable trusted third-party authenticated users to access DynamoDB</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Create a new IAM user in the company's AWS account for each of the third-party authenticated users from the supplier organizations. The users can then use the IAM user credentials to access DynamoDB</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Use Cognito Identity pools to enable trusted third-party authenticated users to access DynamoDB</summary>
  <p><span class="correct">Correct:</span> :

Use Cognito Identity pools to enable trusted third-party authenticated users to access DynamoDB

Amazon Cognito identity pools (federated identities) enable you to create unique identities for your users and federate them with identity providers. With an identity pool, you can obtain temporary, limited-privilege AWS credentials to access other AWS services. Amazon Cognito identity pools support the following identity providers:

Public providers: Login with Amazon (Identity Pools), Facebook (Identity Pools), Google (Identity Pools), Sign in with Apple (Identity Pools).

Amazon Cognito User Pools

Open ID Connect Providers (Identity Pools)

SAML Identity Providers (Identity Pools)

Developer Authenticated Identities (Identity Pools)

Exam Alert:

Please review the following note to understand the differences between Cognito User Pools and Cognito Identity Pools:

via - https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html

Incorrect options:

Use Cognito User pools to enable trusted third-party authenticated users to access DynamoDB - A user pool is a user directory in Amazon Cognito. With a user pool, your users can sign in to your web or mobile app through Amazon Cognito, or federate through a third-party identity provider (IdP). Cognito User Pools cannot be used to obtain temporary AWS credentials to access AWS services, such as Amazon S3 and DynamoDB.

Create a new IAM user in the company's AWS account for each of the third-party authenticated users from the supplier organizations. The users can then use the IAM user credentials to access DynamoDB

Create a new IAM group in the company's AWS account for each of the third-party authenticated users from the supplier organizations. The users can then use the IAM group credentials to access DynamoDB

Both these options involve setting up IAM resources such as IAM users or IAM groups just to provide access to DynamoDB tables. As the users are already trusted third-party authenticated users, Cognito Identity Pool can address this use-case in an elegant way.

Reference:

https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html
 </p>
  </details>
  
  <details>
  <summary>Create a new IAM group in the company's AWS account for each of the third-party authenticated users from the supplier organizations. The users can then use the IAM group credentials to access DynamoDB</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <h4> Question: 6 A business has their test environment built on Amazon EC2 configured on General purpose SSD volume.

At which gp2 volume size will their test environment hit the max IOPS? </h4>
    
  <details>
  <summary>5.3 TiB</summary>
  <p><span class="correct">Correct:</span> :

The performance of gp2 volumes is tied to volume size, which determines the baseline performance level of the volume and how quickly it accumulates I/O credits; larger volumes have higher baseline performance levels and accumulate I/O credits faster.

5.3 TiB - General Purpose SSD (gp2) volumes offer cost-effective storage that is ideal for a broad range of workloads. These volumes deliver single-digit millisecond latencies and the ability to burst to 3,000 IOPS for extended periods of time. Between a minimum of 100 IOPS (at 33.33 GiB and below) and a maximum of 16,000 IOPS (at 5,334 GiB and above), baseline performance scales linearly at 3 IOPS per GiB of volume size.

Maximum IOPS vs Volume Size for General Purpose SSD (gp2) volumes:

via - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html

Incorrect options:

10.6 TiB - As explained above, this is an incorrect option.

16 TiB - As explained above, this is an incorrect option.

2.7 TiB - As explained above, this is an incorrect option.

Reference:

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html
 </p>
  </details>
  
  <details>
  <summary>10.6 TiB</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>2.7 TiB</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>16 TiB</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <h4> Question: 7 A company runs its flagship application on a fleet of Amazon EC2 instances. After misplacing a couple of private keys from the SSH key pairs, they have decided to re-use their SSH key pairs for the different instances across AWS Regions.

As a Developer Associate, which of the following would you recommend to address this use-case? </h4>
    
  <details>
  <summary>It is not possible to reuse SSH key pairs across AWS Regions</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Generate a public SSH key from a private SSH key. Then, import the key into each of your AWS Regions</summary>
  <p><span class="correct">Correct:</span> :

Generate a public SSH key from a private SSH key. Then, import the key into each of your AWS Regions

Here is the correct way of reusing SSH keys in your AWS Regions:


Generate a public SSH key (.pub) file from the private SSH key (.pem) file.
Set the AWS Region you wish to import to.
Import the public SSH key into the new Region.


Incorrect options:

It is not possible to reuse SSH key pairs across AWS Regions - As explained above, it is possible to reuse with manual import.

Store the public and private SSH key pair in AWS Trusted Advisor and access it across AWS Regions - AWS Trusted Advisor is an application that draws upon best practices learned from AWS' aggregated operational history of serving hundreds of thousands of AWS customers. Trusted Advisor inspects your AWS environment and makes recommendations for saving money, improving system performance, or closing security gaps. It does not store key pair credentials.

Encrypt the private SSH key and store it in the S3 bucket to be accessed from any AWS Region - Storing private key to Amazon S3 is possible. But, this will not make the key accessible for all AWS Regions, as is the need in the current use case.

Reference:

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html
 </p>
  </details>
  
  <details>
  <summary>Encrypt the private SSH key and store it in the S3 bucket to be accessed from any AWS Region</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Store the public and private SSH key pair in AWS Trusted Advisor and access it across AWS Regions</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <h4> Question: 8 A media publishing company is using Amazon EC2 instances for running their business-critical applications. Their IT team is looking at reserving capacity apart from savings plans for the critical instances.

As a Developer Associate, which of the following reserved instance types you would select to provide capacity reservations? </h4>
    
  <details>
  <summary>Neither Regional Reserved Instances nor Zonal Reserved Instances</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Regional Reserved Instances</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Both Regional Reserved Instances and Zonal Reserved Instances</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Zonal Reserved Instances</summary>
  <p><span class="correct">Correct:</span> :

When you purchase a Reserved Instance for a specific Availability Zone, it's referred to as a Zonal Reserved Instance. Zonal Reserved Instances provide capacity reservations as well as discounts.

Zonal Reserved Instances - A zonal Reserved Instance provides a capacity reservation in the specified Availability Zone. Capacity Reservations enable you to reserve capacity for your Amazon EC2 instances in a specific Availability Zone for any duration. This gives you the ability to create and manage Capacity Reservations independently from the billing discounts offered by Savings Plans or regional Reserved Instances.

Regional and Zonal Reserved Instances:

via - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html

High Level Overview of EC2 Instance Purchase Options:

via - https://aws.amazon.com/ec2/pricing/

Incorrect options:

Regional Reserved Instances - When you purchase a Reserved Instance for a Region, it's referred to as a regional Reserved Instance. A regional Reserved Instance does not provide a capacity reservation.

Both Regional Reserved Instances and Zonal Reserved Instances - As discussed above, only Zonal Reserved Instances provide capacity reservation.

Neither Regional Reserved Instances nor Zonal Reserved Instances - As discussed above, Zonal Reserved Instances provide capacity reservation.

References:

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html
 </p>
  </details>
  
  <h4> Question: 9 As an AWS certified developer associate, you are working on an AWS CloudFormation template that will create resources for a company's cloud infrastructure. Your template is composed of three stacks which are Stack-A, Stack-B, and Stack-C. Stack-A will provision a VPC, a security group, and subnets for public web applications that will be referenced in Stack-B and Stack-C.

After running the stacks you decide to delete them, in which order should you do it? </h4>
    
  <details>
  <summary>Stack A, then Stack B, then Stack C</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Stack C then Stack A then Stack B</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>Stack B, then Stack C, then Stack A</summary>
  <p><span class="correct">Correct:</span> :

AWS CloudFormation gives developers and businesses an easy way to create a collection of related AWS and third-party resources and provision them in an orderly and predictable fashion.

How CloudFormation Works:

via - https://aws.amazon.com/cloudformation/

Stack B, then Stack C, then Stack A

All of the imports must be removed before you can delete the exporting stack or modify the output value. In this case, you must delete Stack B as well as Stack C, before you delete Stack A.


via - https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html

Incorrect options:

Stack A, then Stack B, then Stack C - All of the imports must be removed before you can delete the exporting stack or modify the output value. In this case, you cannot delete Stack A first because that's being referenced in the other Stacks.

Stack A, Stack C then Stack B - All of the imports must be removed before you can delete the exporting stack or modify the output value. In this case, you cannot delete Stack A first because that's being referenced in the other Stacks.

Stack C then Stack A then Stack B - Stack C is fine but you should delete Stack B before Stack A because all of the imports must be removed before you can delete the exporting stack or modify the output value.

Reference:
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html
 </p>
  </details>
  
  <details>
  <summary>Stack A, Stack C then Stack B</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <h4> Question: 10 A junior developer has been asked to configure access to an Amazon EC2 instance hosting a web application. The developer has configured a new security group to permit incoming HTTP traffic from 0.0.0.0/0 and retained any default outbound rules. A custom Network Access Control List (NACL) connected with the instance's subnet is configured to permit incoming HTTP traffic from 0.0.0.0/0 and retained any default outbound rules.

Which of the following solutions would you suggest if the EC2 instance needs to accept and respond to requests from the internet? </h4>
    
  <details>
  <summary>An outbound rule on the security group has to be configured, to allow the response to be sent to the client on the HTTP port</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>An outbound rule must be added to the Network ACL (NACL) to allow the response to be sent to the client on the ephemeral port range</summary>
  <p><span class="correct">Correct:</span> :

An outbound rule must be added to the Network ACL (NACL) to allow the response to be sent to the client on the ephemeral port range

Security groups are stateful, so allowing inbound traffic to the necessary ports enables the connection. Network ACLs are stateless, so you must allow both inbound and outbound traffic. By default, each custom Network ACL denies all inbound and outbound traffic until you add rules.

To enable the connection to a service running on an instance, the associated network ACL must allow both:
1. Inbound traffic on the port that the service is listening on
2. Outbound traffic to ephemeral ports

When a client connects to a server, a random port from the ephemeral port range (1024-65535) becomes the client's source port.

The designated ephemeral port becomes the destination port for return traffic from the service. Outbound traffic to the ephemeral port must be allowed in the network ACL.

Incorrect options:

The configuration is complete on the EC2 instance for accepting and responding to requests - As explained above, this is an incorrect statement.

An outbound rule on the security group has to be configured, to allow the response to be sent to the client on the HTTP port - Security groups are stateful. Therefore you don't need a rule that allows responses to inbound traffic.

Outbound rules need to be configured both on the security group and on the NACL for sending responses to the Internet Gateway* - Security Groups are stateful. Hence, return traffic is automatically allowed, so there is no need to configure an outbound rule on the security group.

References:

https://aws.amazon.com/premiumsupport/knowledge-center/resolve-connection-sg-acl-inbound/

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports
 </p>
  </details>
  
  <details>
  <summary>Outbound rules need to be configured both on the security group and on the NACL for sending responses to the Internet Gateway</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  
  <details>
  <summary>The configuration is complete on the EC2 instance for accepting and responding to requests</summary>
  <p><span class="incorrect">Incorrect </span> </p>
  </details>
  

  ## Conclusion
  How did you do ?

Further reading can be found below

  - [Control access to an API in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html)
  - [Elastic Beanstalk deployment policies](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html)
  - [Provisioned throughput in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ProvisionedThroughput.html)
  - [Retries and exponential backoff](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html)
  - [Amazon Cognito identity pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html)
  - [Amazon EBS volume types and performance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html)
  - [Amazon EC2 key pairs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)
  - [Regional and zonal Reserved Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/reserved-instances-scope.html)
  - [CloudFormation stack exports and imports](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-exports.html)
  - [Network ACLs and ephemeral ports](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports)

  ## Recap
More in the AWS series

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
- [AWS 12: security groups](https://magicishaqblog.netlify.app/2023-03-10-aws-12-security-groups)
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
- [AWS 27: High availability and Scalability ](https://magicishaqblog.netlify.app/section6/2023-07-28-high_availability_and_scalability/)
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
- [AWS 62: Setting up an EC2 instance and ALB with Route 53](https://magicishaqblog.netlify.app/2024-05-10-aws-62-setting-up-ec2-instances-and-alb-with-route-53/)
- [AWS 63: Route 53 TTL (Time to Live)](https://magicishaqblog.netlify.app/2024-05-17-aws-63-Route53-TTL/)
- [AWS 64: Route 53 CNAME and alias records](https://magicishaqblog.netlify.app/2024-05-07-aws-64-CNAME-alias-records/)
- [AWS 65: Route 53 simple routing](https://magicishaqblog.netlify.app/2024-12-07-aws-65-Route53-simple-routing/)
- [AWS 66: Route 53 weighted routing](https://magicishaqblog.netlify.app/2024-19-07-aws-route53-weighted-routing/)
- [AWS 67: Route 53 Latency](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 67: Route 53 Latency Routing](https://magicishaqblog.netlify.app/2024-07-26-aws-67-route53-latency-routing/)
- [AWS 68: Route 53 Health Checks](https://magicishaqblog.netlify.app/2024-09-08-aws-68-Route-53-Health-checks/)
- [AWS 69: Route 53 Health Checks , Hands On](https://magicishaqblog.netlify.app/2024-08-16-aws-69-Health-checks-hands-on/)
- [AWS 70: Route 53 route policy failover](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 71: Route 53 Geolocation Routing](https://magicishaqblog.netlify.app/2024-06-09-aws-71-Route-53-Geolocation-Routing/)
- [AWS 72: Route 53 Geoproximity Routing Policy](https://magicishaqblog.netlify.app/2024-11-09-aws-72-Route-53-Geoproximity-Routing-Policy/)
- [AWS 73: Route 53 Traffic Flow](https://magicishaqblog.netlify.app/2024-09-20-aws-73-Route-53-Traffic-Flow/)
- [AWS 74: Route 53 IP Routing Policy](https://magicishaqblog.netlify.app/2024-09-27-aws-74-Route-53-IP-Routing/)
- [AWS 75: Route 53 Multi Value Routing](https://magicishaqblog.netlify.app/2024-04-10-aws-75-Route-53-muti-value-routing/)
- [Quiz 5 : Route 53](https://magicishaqblog.netlify.app/quiz-5/quiz-5/)
- [AWS 76: Domain Registar vs DNS Service](https://magicishaqblog.netlify.app/aws-76-Domain-registar-vs-dns-service/)
- [AWS 77: VPC intro](https://magicishaqblog.netlify.app/2023-11-01-aws-77-VPC-intro/)
- [AWS 78: Understanding AWS VPC and Subnets](https://magicishaqblog.netlify.app/2023-15-11-aws-78-VPC/)
- [AWS 79: VPC network ACIS and security group](https://magicishaqblog.netlify.app/2023-11-22-aws-79-VPC-network-acls-and-security-groups/)
- [AWS 80: VPC Peering](https://magicishaqblog.netlify.app/2024-11-29-aws-80-VPC-peering/)
- [AWS 81: VPC Round Up](https://magicishaqblog.netlify.app/2024-10-01-aws-81-vpc-round-up/)
- [AWS 82: Three Tier Architecture](https://magicishaqblog.netlify.app/2025-17-01-aws-82-three-tier-architecture/)
- [AWS 83: Quiz 6 VPC](https://magicishaqblog.netlify.app/quiz-6/2025-02-24-aws-83-quiz-6/)
- [AWS 84: Amazon S3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/)
- [AWS 85: Amazon s3 Hands on](https://magicishaqblog.netlify.app/2025-03-21-aws-85-Amazon-s3-hands-on/)
- [AWS 86: s3 security bucket policy](https://magicishaqblog.netlify.app/2025-28-03-aws-86-s3-security-bucket-policy/)
- [AWS 87: S3 Buckets - Hands On](https://magicishaqblog.netlify.app/2025-04-04-aws-87-s3-bucket-hands-on/)
- [AWS 88: S3 Buckets WebHosting](https://magicishaqblog.netlify.app/2025-04-11-aws-88-s3-buckets-web-hosting/)
- [AWS 89: Amazon S3 Buckets: Hands On](https://magicishaqblog.netlify.app/2025-04-25-aws-89-s3-website-hands-on/)
- [AWS 90: Amazon S3 Buckets: Versioning](https://magicishaqblog.netlify.app/2025-05-02-aws-90-S3-versioning/)
- [AWS 91: Amazon S3 Replication](https://magicishaqblog.netlify.app/2025-05-09-aws-91-amazon-s3-replication/)
- [AWS 92: Amazon S3 Replication Rules Notes](https://magicishaqblog.netlify.app/2023-05-16-aws-92-amazon-s3-replication-notes/)
- [AWS 93: Amazon S3 Replication Hands On](https://magicishaqblog.netlify.app/2025-05-23-aws-93-amazon-s3-replication-rules-hands-on/)
- [AWS 94: Amazon S3 Storage Classes](https://magicishaqblog.netlify.app/2025-05-20-aws-94-s3-storage-classes/)
- [AWS 95: Amazon S£ Storage Classes - Hands On](https://magicishaqblog.netlify.app/2025-06-13-aws-95-storage-classes-hands-on/)
- [AWS 96: Quiz 7](https://magicishaqblog.netlify.app/quiz-7/2025-07-04-aws-quiz-7/)
- [AWS 97: EC2 Instance Metadata](https://magicishaqblog.netlify.app/2025-07-11-aws-97-ec2-instance-metadata/)
- [AWS 98: EC2 Instance Metadata hands on](https://magicishaqblog.netlify.app/2025-18-07-aws-98-ec2-instance-metadata-hands-on/)
- [AWS 99: CLI Profiles](https://magicishaqblog.netlify.app/2025-25-07-aws-99-cli-profiles/)
- [AWS 100: CLI MFA IAM](https://magicishaqblog.netlify.app/2025-08-01-aws-100-CLI-MFA-IAM/)
- [AWS 101: SDK](https://magicishaqblog.netlify.app/2025-08-08-aws-101-sdk/)
- [AWS 102: Exponential Backoff & Service Limit Increase](https://magicishaqblog.netlify.app/2025-08-15-aws-102-Exponential-Backoff-&-Service-Limit-Increase/)
- [AWS 103: Credentials-and-Provider-Chain](https://magicishaqblog.netlify.app/2025-08-22-aws-103-Credentials-and-Provider-Chain/)
- [Quiz 8](https://magicishaqblog.netlify.app/quiz-8/2025-09-05-aws-quiz-8/)
- [AWS 104: SigV4](https://magicishaqblog.netlify.app/2025-08-29-aws-104-SigV4/)
- [AWS 105: S3 Lifecycle](https://magicishaqblog.netlify.app/2025-10-17-aws-105-s3-amazon-lifecycle/)
- [AWS 106: S3 Lifecycle Hands On](https://magicishaqblog.netlify.app/2025-10-24-aws-106-lifecycles-hands-on/)
- [AWS 107: S3 Event Notification](https://magicishaqblog.netlify.app/2025-10-31-aws-107-aws-S3-event-notification/)
- [AWS 108: S3 Event Notification Hands On](https://magicishaqblog.netlify.app/2025-11-07-aws-108-event-notification-hands-on/)
- [AWS 109: S3 Performance](https://magicishaqblog.netlify.app/2025-11-14-aws-109-s3-performance/)
- [AWS 110: S3 Metadata](https://magicishaqblog.netlify.app/2025-11-21-aws-110-s3-metadata/)
- [AWS 111: S3 Object Encryption](https://magicishaqblog.netlify.app/2025-12-05-aws-111-S3-Object-Encryption/)
- [AWS 112: AWS CORS](https://magicishaqblog.netlify.app/2025-12-12-aws-112-AWS-Cors/)
- [AWS 113: CORS Hands On](https://magicishaqblog.netlify.app/2025-12-17-aws-113-Cors-Hands-On/)
- [AWS 114: MFA Delete](https://magicishaqblog.netlify.app/2025-aws-114-MFA-Delete/)
- [AWS 115: MFA Delete Hands On](https://magicishaqblog.netlify.app/2026-01-06-aws-115-MFA-delete-hands-on/)
- [AWS 116: Amazon S3 Access Logs](https://magicishaqblog.netlify.app/2026-01-16-aws-116-amazon-s3-access-LOGS/)
- [AWS 117: Access Logs Hands On](https://magicishaqblog.netlify.app/2023-23-01-aws-117-access-logs-hands-on/)
- [AWS 118: Pre-Signed URLs](https://magicishaqblog.netlify.app/2026-01-30-aws-118-pre-signed-urls/)
- [AWS 119: Pre-Signed URLs Hands On](https://magicishaqblog.netlify.app/2026-06-02-aws-119-pre-signed-urls-hands-on/)
- [AWS 120: S3 Access Points](https://magicishaqblog.netlify.app/2026-12-02-13-aws-120-access-points/)
- [AWS 121: S3 Object Lambda](https://magicishaqblog.netlify.app/2026-02-20-aws-121-s3-object-lambdas/)
- [AWS 123: Amazon CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/)
- [AWS 124: CloudFront Hands On](https://magicishaqblog.netlify.app/2026-03-13-aws-124-CloudFront-HandsOn/)
- [AWS 125: Amazon CloudFront Caching](https://magicishaqblog.netlify.app/2026-03-20-aws-125-Amazon-Cloudfront-Caching/)
- [AWS 126: CloudFront Cache Invalidations](https://magicishaqblog.netlify.app/2026-03-27-aws-126-CloudFront-cache-invalidations/)
- [AWS 127: CloudFront Cache Behaviors](https://magicishaqblog.netlify.app/2026-04-10-aws-127-CloudFront-Cache-Behaviors/)
- [AWS 132: 15 Minute Lightning Revision](https://magicishaqblog.netlify.app/2026-05-29-aws-132-15-min-lightning/)
- [AWS 133: Caching and Invalidations Hands On](https://magicishaqblog.netlify.app/2026-06-05-aws-133-Caching-and-invalidations-hands-on/)
- [AWS 134: ALB EC2 VPC Origin](https://magicishaqblog.netlify.app/2026-06-12-aws-134-ALB-EC2-VPC-Origin/)
- [AWS 135: CloudFront Georestriction](https://magicishaqblog.netlify.app/2026-06-19-aws-135-cloudFront-georestriction/)
- [AWS 136: CloudFront Signed URL Cookie](https://magicishaqblog.netlify.app/2026-06-26-aws-136-cloudfront-signed-url-cookie/)
- [AWS 137: CloudFront Pricing](https://magicishaqblog.netlify.app/2026-03-02-aws-137-cloudfront-pricing/)
- [AWS 138: CloudFront Real Time Logs](https://magicishaqblog.netlify.app/2026-10-07-aws-138-CloudFront-RealTimeLogs/)
- [AWS 140: Docker Introduction](https://magicishaqblog.netlify.app/2026-07-24-aws-140-docker-introduction/)
- [AWS 141: AWS ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/)
- [AWS 142: ECS Hands On](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/)
- [AWS 143: ECS Rolling Updates](https://magicishaqblog.netlify.app/2026-08-12-aws-143-ECS-rolling-updates/)
- [AWS 144: ECS Solution Architectures](https://magicishaqblog.netlify.app/2026-08-19-aws-144-ECS-solution-architectures/)
- [AWS 145: ECS Task Definitions](https://magicishaqblog.netlify.app/2026-08-27-aws-145-ECS-task-definitions/)
- [AWS 146: ECS Task Definitions - Hands On](https://magicishaqblog.netlify.app/2026-09-03-aws-146-ECS-task-definition-hands-on/)
- [AWS 147: ECS Task Placement](https://magicishaqblog.netlify.app/2026-09-09-aws-147-task-placement/)
- [AWS 148: ECS Clean Up](https://magicishaqblog.netlify.app/2026-09-16-aws-148-ECS-clean-up/)
- [AWS 149: ECR](https://magicishaqblog.netlify.app/2026-09-22-aws-149-ecr/)
- [AWS 150: ECR - Hands On](https://magicishaqblog.netlify.app/2026-09-29-aws-150-ecr-hands-on/)
- [AWS 151: CloudFormation - Update and Delete Stack](https://magicishaqblog.netlify.app/2026-10-10-aws-151-Update-and-delete-stack-hands-on/)
- [AWS 152: Quiz 6 AWS Advanced security part 5](https://magicishaqblog.netlify.app/quiz-16/2026-11-06-quiz-16/)
- [AWS 153: Quiz 7 AWS Advanced secuity part 6](https://magicishaqblog.netlify.app/quiz-17/2026-11-11-quiz-17/)


