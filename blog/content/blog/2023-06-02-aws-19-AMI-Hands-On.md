---
layout: blog
title: "AMI - Hands On"
date: 2023-06-02T10:40:08.282Z
---

## TLDR

Practical guide on creating an AMI Amazon Machine Image.
Launch an instance then create an image from that instance . The image can be used to create further instances at a quicker rate.

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

## Introduction

Following from the [previous](https://magicishaqblog.netlify.app/2023-04-28-aws-18-ami) post in the series, we covered what an AMI (Amazon Machine Image) is. In this post, today we will be getting a hands on approach to using an AMI
AMIs allow us to save the state of our EC2 instances, including the installed software and configurations, and reuse them for future deployments. By leveraging AMIs, we can significantly reduce the time required for setting up new instances, making it a powerful tool in our AWS toolkit.

Let's get started:

## Launching an Instance

Inside the `EC2` service of AWS click on the instance you want to turn into an AMI and then on `launch instance`. Below the image has red circles, click in order from left to right.

![Instance launch](/blog/src/images/amih-1.png)

To begin, we'll launch an instance on AWS using the AMI feature. Follow the steps below:

- Scroll down and select "Amazon Linux 2" as the operating system.
  ![amazon linux 2](/blog/src/images/amih-2.png)
- Choose an appropriate instance type, such as "G2 micro."
- Select your preferred key pair for SSH access. such as the [EC2 created in the previous blogs](https://magicishaqblog.netlify.app/2023-03-03-aws-11-EC2-View-and-instance-types)
  ![key pair for SSH](/blog/src/images/amih-3.png)
- Edit the network settings and choose an existing security group.
  ![network settings](/blog/src/images/amih-4.png)
- Keep the storage settings as per your requirements.
- Scroll down to the `Advanced Details` section and focus on the `User Data` field.

## Configuring User Data:

In the "User Data" field, we will include the necessary commands to install the Apache web server (HTTPD). Below is the code you need to copy inside the `Advanced Details` section.

```bash
#!/bin/bash
    # Use this for your user data (script from top to bottom)
    # install httpd (Linux 2 version)
    yum update -y
    yum install -y httpd
    systemctl start httpd
    systemctl enable httpd
```

![user data](/blog/src/images/amih-5.png)

## Launching the Instance:

Click on the launch button to initiate the instance creation process. It may take a few minutes for the instance to launch and for the EC2 user data script to run. Once the instance is running, give it a bit of time for the script to execute and set up the Apache web server.
![launch instance](/blog/src/images/amih-6.png)

## Verifying the Installation:

After a couple of minutes, refresh the page and access the public IPv4 address of the instance. Ensure you're using the HTTP protocol by changing the web address to `http://`.

![ami running](/blog/src/images/amih-7.png)

Initially, you may encounter connection errors, but as the instance completes the setup, you will see the basic Apache test page. This confirms that the web server has been installed successfully.
![confirmation it works](/blog/src/images/amih-8.png)

## Creating an AMI

To save the current state of our EC2 instance as an AMI for future use, right-click on the instance, navigate to "Image and Templates," and select "Create Image." Provide a name for the AMI, such as "Demo Image," and keep the default settings. Click on "Create Image" to initiate the creation process.

![create image](/blog/src/images/amih-9.png)

6. Launching Instances from the AMI:

Once the AMI creation is complete, you can launch new instances using it. To do this:

- Click on "AMIs" in the left-hand menu.
  ![ami left menu](/blog/src/images/amih-11.png)
- Select the AMI you just created.
  ![selection](/blog/src/images/amih-16.png)

- Scroll down and configure the instance launch settings, such as key pair, network settings, and user data.
  The user data doesn't need to create an apache server like before, and therefore the code is:

```bash
#!/bin/bash
    # Use this for your user data (script from top to bottom)
    # install httpd (Linux 2 version)
echo "<h1>Hello World from $(hostname -f)</h1>"> /var/www/html/index.html
```

![bash script](/blog/src/images/amih-13.png)

- Launch the instance.
  ![launch instance](/blog/src/images/amih-14.png)

## Faster Boot-up with AMIs:

As the instance launches from the AMI, you'll notice a significant reduction in boot-up time. Since the AMI already contains the Apache web server, there's no need to reinstall it, resulting in a quicker deployment. This highlights the power of AMIs in expediting the setup process.

![completed page](/blog/src/images/amih-17.png)

## Conclusion

We explored the capabilities of Amazon Machine Images (AMI) in AWS. By utilising AMIs, we can capture the state of our instances, including software installations and configurations, and reuse them for future deployments. This approach greatly reduces the time required for setting up instances and enables faster boot-up times, making it an invaluable tool for developers and system administrators.
