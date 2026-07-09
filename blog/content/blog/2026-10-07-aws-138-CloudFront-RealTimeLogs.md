---
layout: blog
title: "AWS 138: CloudFront Real-Time Logs"
date: 2026-10-07T09:15:22.440Z
---

## TLDR

CloudFront can send request logs to [Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/) in real time. This lets you monitor and analyse traffic as it happens. You can choose what percentage of requests to log and which fields to capture.

# What Are Real-Time Logs?

When people visit your website through [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/), each visit creates a request. These requests contain useful information: where the visitor came from, what they looked at, how long it took to load.

Real-time logs capture this data the moment it happens.

Unlike standard logs that arrive hours later, real-time logs appear within seconds. This speed matters when you need to spot problems quickly or track what's happening right now.

[AWS documentation on CloudFront logging](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/logging.html)

![diagram showing cloudfront real-time logs flow](/blog/src/images/138/138-1.png)

# How It Works

The process follows a clear path:

1. Users make requests to [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/)
2. CloudFront processes these requests
3. Log data flows to [Amazon Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/)
4. Your applications read from the stream

[Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/) acts as a pipeline. It receives logs from CloudFront and makes them available for processing.

The connection between CloudFront and Kinesis is direct. You don't need to set up servers or manage storage. Once configured, logs start flowing automatically.

# Processing the Logs

After logs reach [Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/), you have choices about what to do with them.

## Immediate Processing

For instant analysis, connect [AWS Lambda](https://aws.amazon.com/lambda/) to your stream.

Lambda functions run automatically when new logs arrive. They can:

- Count how many requests came from each country
- Alert you when errors spike
- Track which content is most popular
- Check response times

Because Lambda processes records individually, you get results within seconds.

## Batch Processing

Sometimes you want to collect logs over time and process them together.

In this case, add [Kinesis Data Firehose](https://aws.amazon.com/kinesis/data-firehose/) between the stream and your destination.

Firehose groups logs into batches. It then sends these batches to:

- [Amazon S3](https://magicishaqblog.netlify.app/2025-03-14-aws-84-Amazon-s3/) for long-term storage
- [Amazon OpenSearch](https://aws.amazon.com/opensearch-service/) for searching
- Other analysis tools

Batching uses less processing power than handling each log separately. It works well when you analyse trends over hours or days rather than seconds.

![diagram showing batch processing with firehose](/blog/src/images/138/138-2.png)

# Controlling What Gets Logged

Real-time logging gives you control over two important settings.

## Sampling Rate

The sampling rate is a percentage. It tells CloudFront how many requests to log.

Setting it to 100% means every single request gets logged. Setting it to 10% means one in every ten requests.

Why would you log less than everything?

Busy websites receive millions of requests. Logging all of them costs money and creates huge amounts of data.

If your site gets steady traffic, a 10% sample still gives you thousands of logs to analyse. You can spot patterns without paying to log every single click.

For smaller sites or when investigating specific problems, 100% sampling makes more sense.

## Field Selection

Each log entry can contain dozens of pieces of information, called fields.

Common fields include:

- Time of request
- Visitor's location
- URL requested
- Response time
- File size
- [Cache](https://magicishaqblog.netlify.app/2026-03-20-aws-125-Amazon-Cloudfront-Caching/) hit or miss

You choose which fields appear in your logs.

More fields mean richer data but larger log files. Fewer fields mean smaller files but less detail.

Pick the fields you actually need for your analysis.

# Path Patterns

CloudFront uses [cache behaviors](https://magicishaqblog.netlify.app/2026-04-10-aws-127-CloudFront-Cache-Behaviors/) to handle different parts of your website differently.

Real-time logs respect these behaviors.

Say your website has:

- Pages at `/pages/*`
- Images at `/images/*`
- Videos at `/videos/*`

You might only care about image requests. Configure real-time logs to capture just the `/images/*` behavior.

Now logs only include requests for images. Everything else is ignored.

This targeting saves money. You pay only for the logs you need.

# Use Cases

Real-time logs solve several problems.

## Performance Monitoring

Track how quickly CloudFront delivers content.

When response times increase, logs show:

- Which regions are slow
- What content causes delays
- Whether [caching](https://magicishaqblog.netlify.app/2026-03-20-aws-125-Amazon-Cloudfront-Caching/) is working properly

Fix problems before users complain.

## Security Analysis

Spot unusual patterns that might signal attacks.

Sudden traffic spikes from one country? A surge of requests for a specific file? Real-time logs reveal these events as they unfold.

## Content Strategy

See which pages and files attract the most visitors.

This data helps you:

- Understand what content works
- Decide what to create next
- Identify outdated pages to remove

## Cost Management

CloudFront charges based on data transfer.

Real-time logs show:

- How much data you're serving
- Where traffic comes from geographically
- Which files generate the most transfer

Use this information to control costs.

# Summary

Real-time logs turn [CloudFront](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/) into an observation tool.

Every request generates data. That data flows through [Kinesis Data Streams](https://aws.amazon.com/kinesis/data-streams/) to your analysis systems.

You control what gets logged using sampling rates and field selection. You target specific parts of your site using path patterns.

The result is a detailed, immediate picture of how people use your content.

Whether you process logs instantly with Lambda or batch them with Firehose depends on your needs. Both options work with the same stream.

Real-time logs cost extra. But for websites where every second matters, that cost brings valuable insights.

# Related Articles

- [AWS 123: Amazon Cloud Front](https://magicishaqblog.netlify.app/2026-03-06-aws-123-Amazon-CloudFront/)
- [AWS 125: Amazon CloudFront Caching](https://magicishaqblog.netlify.app/2026-03-20-aws-125-Amazon-Cloudfront-Caching/)
- [AWS 126: CloudFront Invalidations](https://magicishaqblog.netlify.app/2026-03-27-aws-126-CloudFront-cache-invalidations/)
- [AWS 127: CloudFront Cache Behaviors](https://magicishaqblog.netlify.app/2026-04-10-aws-127-CloudFront-Cache-Behaviors/)
