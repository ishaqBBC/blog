---
layout: blog
title: "AWS 127: Cache Behaviors"
date: dateT17:08:34.142Z
---





## TLDR
Cache behaviors are routing rules that direct requests to specific origins based on URL patterns. In CloudFront, they determine whether requests go to [S3](https://magicishaqblog.netlify.app/2025-04-04-aws-87-s3-bucket-hands-on/), [application servers](https://aws.amazon.com/compare/the-difference-between-web-server-and-application-server/#:~:text=An%20application%20server%20extends%20the,like%20messaging%20systems%20and%20databases.) ; etc... They increase security through [access control](https://magicishaqblog.netlify.app/2025-28-03-aws-86-s3-security-bucket-policy/) (like signed cookies for login protection) and improve performance by routing static and dynamic content efficiently.



## Introduction

A cache stores frequently accessed data to reduce retrieval latency. In web infrastructure, caches means copies of static assets, such as images and videos, enabling faster content delivery to end users compared to retrieving files from origin servers on each request.

Cache behaviors are operational rules that govern cache functionality. They specify origin servers for content retrieval and define handling procedures for distinct request types. For instance, image requests may route to [Amazon S3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/), while API calls route to application servers.

![image of cache behaviors](/blog/src/images/127/127-1.png)

In short the URL will determine where the data is kept. examples include: 

- **Example 1:** All images (like `.jpg` files) should come from a specific storage place, like [Amazon S3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/).
- **Example 2:** All data requests (like `/api/*`) should go to your application server.
- **Example 3:** Everything else (`/*`) should go to your default storage, like another server or S3 bucket.



## Cache Behaviors in CloudFront

Let’s look at **(Amazon CloudFront)[https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/]**, a tool that helps speed up websites. (CloudFront)[https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/] uses cache behaviors to decide where to send users based on the URL they’re trying to access.

Here’s an example:

1. **For `/api/*`:** (CloudFront)[https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/] sends the request to your application server (like an EC2 instance behind a load balancer).
2. **For `/images/*`:** (CloudFront)[https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/] sends the request to an S3 bucket where your images are stored.
3. **For everything else (`/*`):** (CloudFront)[https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/] uses the **default cache behavior** and sends the request to your main server or storage.

The default cache behavior is like a safety net—it handles everything that doesn’t match a specific rule.



## Login and Signed Cookies

Let’s say you want to protect your files in an S3 bucket so only logged-in users can access them. Here’s how cache behaviors can help:

1. **Step 1: Login Page**
   - You create a cache behavior for `/login`.
   - When users visit `/login`, they’re sent to an [EC2 instance](https://magicishaqblog.netlify.app/2023-02-24-aws-10-EC2/) that generates **signed cookies** (special keys that prove they’re logged in).

2. **Step 2: Access Files**
   - Once users have signed cookies, they can access the default cache behavior (`/*`) and get files from the S3 bucket.

3. **Step 3: Block Unauthorized Access**
   - If someone tries to access the default cache behavior without logging in, [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) redirects them back to `/login`.

This way, you make sure only authorized users can access your files.

![Cache behaviors on static and dynamic distributions](/blog/src/images/127/127-2.png)
![Cache behaviors on signed in pages](/blog/src/images/127/127-3.png)

## Why Cache Behaviors?

Cache behaviors are super useful! Here are two big reasons:

1. **Better Security:** You can control who gets access to certain parts of your website, like requiring a login for sensitive files.
2. **Faster Websites:** By sending static files (like images) to S3 and dynamic requests (like API calls) to your server, you make your website faster and more efficient.



## Wrapping Up

Cache behaviors are like traffic rules for your website. They help (CloudFront)[https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/] decide where to send users based on the type of request they make. Whether it’s images, data, or login pages, cache behaviors make sure everything runs smoothly and securely.

So next time you visit a fast-loading website, you’ll know that cache behaviors might be working behind the scenes to make it happen!


