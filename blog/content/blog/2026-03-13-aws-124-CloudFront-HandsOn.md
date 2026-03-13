---
layout: blog
title: "AWS 124: CloudFront - Hands On"
date: 2026-03-13T12:07:18.069Z
---

## TLDR
Amazon [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/), combined with S3, lets you serve webpages faster  by caching and increasing security. This guide covers setting up an S3 bucket, creating a [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) distribution, and configuring private access. [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) caches files at edge locations, improving global performance while keeping S3 objects private. Ideal for hosting websites and static content.

The basic process is: 

1. Create an S3 bucket and upload files
2. Create a [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) distribution
3. Configure the bucket as the origin
4. Allow private access through a [bucket policy](https://magicishaqblog.netlify.app/2025-28-03-aws-86-s3-security-bucket-policy/)

# Deploying a Website with Amazon CloudFront and S3

One of the most common ways to use Amazon [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) is to deliver files stored in Amazon S3. This setup allows you to keep your files private while still serving them quickly to users around the world.

In this guide, we walk through a  example of creating an S3 bucket, uploading files, and connecting it to [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/).

## Create an S3 Bucket for Store Files


In the Amazon S3 console:

1. Click **Create Bucket**
2. Enter a bucket name, such as `demo-cloudfront-example`
3. Leave the default settings
4. Click **Create Bucket**

Once the bucket is created, upload the files you want to serve through [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/).

![image of s3 bucket being created](/blog/src/images/124/124-1.png)

For example:

* `index.html`
* `coffee.jpg`
* `beach.jpeg`

After uploading, these files will appear in the bucket's object list.

![image of files in the bucket list of an s3](/blog/src/images/124/124-2.png)

## Private Objects in S3

By default, objects in S3 are **private**.

If you try to open a file directly using its object URL, you may see an **Access Denied** message.

This happens because the object is not publicly accessible.

However, the console provides another option called a **[pre-signed URL](https://magicishaqblog.netlify.app/2026-01-30-aws-118-pre-signed-urls/)**. This generates a temporary link that allows access to the object.

For example, opening `index.html` with a [pre-signed URL](https://magicishaqblog.netlify.app/2026-01-30-aws-118-pre-signed-urls/) might show the page content, but images inside the page may still fail to load because those image files are also private.

Instead of making the files public, we can solve this problem using [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/).

## Step 3: Create a CloudFront Distribution

Next, open the [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) console and create a new distribution.

During the setup process:

1. Choose a plan. The **Free plan** is enough for this blog.
2. Enter a name for the distribution.
3. Select **Amazon S3** as the origin type.
4. Choose the S3 bucket you created earlier.

[CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) will ask if it should allow private access to the S3 bucket. Choose the recommended option.

This setting allows [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) to retrieve files from the bucket even though they are private.

You can leave the default recommended cache settings as they are.

There are also optional features such as:

* Web Application Firewall
* Advanced security protection
* Additional traffic protection

These are not required for this basic example.

Once everything is reviewed, click **Create Distribution**.

![Create distribution image](/blog/src/images/124/124-3.png)

## Automatic Bucket Policy Setup

When [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) connects to your S3 bucket, AWS automatically creates a **[bucket policy](https://magicishaqblog.netlify.app/2025-28-03-aws-86-s3-security-bucket-policy/)**.

This policy allows [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) to access your bucket securely.

The important detail is that:

* The bucket remains **private**
* Only [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) is allowed to read the files

This is a common security practice because it prevents users from bypassing [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) and accessing the bucket directly.

## Accessing Files Through CloudFront

Once the distribution is ready, [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) provides a **domain name**.

Opening that domain alone may show an **Access Denied** page. This is normal because no file path was specified.

To access files, you include their paths:

* `/coffee.jpg`
* `/beach.jpeg`
* `/index.html`

For example:

* `https://your-distribution-domain/coffee.jpg`
* `https://your-distribution-domain/index.html`

Now the files load successfully, even though the S3 bucket objects are private.

Your webpage will display the HTML content along with the images.

## Conclusion

After the first request, [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) stores the files in edge caches.

This means future requests are served much faster because the files are delivered from a nearby edge location instead of the origin.

For example:

* The first request retrieves the file from S3
* Later requests are served directly from the [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) cache

This dramatically improves loading speed for users around the world.

Amazon [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) can securely deliver files stored in an S3 bucket without making them public.


Once deployed, [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) serves your files through its global network and caches them at edge locations for faster delivery.

This combination of **S3 storage and [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) caching** is a common pattern for hosting websites and static content on AWS.
