---
layout: blog
title: "AWS 131: Quiz 17 ; Amazon Security Advanced Part 6"
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

<h4> Question: !@ A developer is looking at establishing access control for an API that connects to a Lambda function downstream.

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

<h4> Question: !@ The development team at an e-commerce company completed the last deployment for their application at a reduced capacity because of the deployment policy. The application took a performance hit because of the traffic spike due to an on-going sale.

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
  
  <h4> Question: !@ As a senior architect, you are responsible for the development, support, maintenance, and implementation of all database applications written using NoSQL technology. A new project demands a throughput requirement of 10 strongly consistent reads per second of 6KB in size each.

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
  
  <h4> Question: !@ A company uses Amazon Simple Email Service (SES) to cost-effectively send susbscription emails to the customers. Intermittently, the SES service throws the error: Throttling – Maximum sending rate exceeded.

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
  <h4> Question: !@ The development team at a multi-national retail company wants to support trusted third-party authenticated users from the supplier organizations to create and update records in specific DynamoDB tables in the company's AWS account.

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
  
  <h4> Question: !@ A business has their test environment built on Amazon EC2 configured on General purpose SSD volume.

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
  
  <h4> Question: !@ A company runs its flagship application on a fleet of Amazon EC2 instances. After misplacing a couple of private keys from the SSH key pairs, they have decided to re-use their SSH key pairs for the different instances across AWS Regions.

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
  
  <h4> Question: !@ A media publishing company is using Amazon EC2 instances for running their business-critical applications. Their IT team is looking at reserving capacity apart from savings plans for the critical instances.

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
  
  <h4> Question: !@ As an AWS certified developer associate, you are working on an AWS CloudFormation template that will create resources for a company's cloud infrastructure. Your template is composed of three stacks which are Stack-A, Stack-B, and Stack-C. Stack-A will provision a VPC, a security group, and subnets for public web applications that will be referenced in Stack-B and Stack-C.

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
  
  <h4> Question: !@ A junior developer has been asked to configure access to an Amazon EC2 instance hosting a web application. The developer has configured a new security group to permit incoming HTTP traffic from 0.0.0.0/0 and retained any default outbound rules. A custom Network Access Control List (NACL) connected with the instance's subnet is configured to permit incoming HTTP traffic from 0.0.0.0/0 and retained any default outbound rules.

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
  