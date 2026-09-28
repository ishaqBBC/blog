---
layout: blog
title: "AWS 150: ECR - Hands On"
date: 2026-10-02T09:30:00.000Z
---

## TLDR

This hands-on guide moves a Docker image from [Docker Hub](https://hub.docker.com/) into a private [Amazon Elastic Container Registry (ECR)](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html) repository. Create the repository, authenticate Docker with `aws ecr get-login-password`, pull and tag an image, then push it to ECR. If a push or pull fails, check the Region, repository URI, and [IAM permissions](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices/) first.

## Introduction

The [previous ECR post](https://magicishaqblog.netlify.app/2026-09-22-aws-149-ecr/) explained why a container registry matters. This time, the theory becomes a small but complete workflow: take the `nginxdemos/hello` image used in the earlier [ECS hands-on deployment](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/), place it in a private ECR repository, and make it ready for an ECS task definition.

The task is straightforward, but each command has a distinct purpose. Docker first needs permission to talk to AWS. The image then needs a new name containing the ECR registry URI. Only after that does `docker push` know where to send it.

## Before You Start

You need the AWS CLI and Docker installed and running locally. Confirm that Docker can respond before continuing:

```bash
docker version
```

Your AWS CLI credentials must point to the AWS account and Region where the repository will live. The identity also needs permission to authenticate to ECR and upload image layers. The [AWS CLI post](https://magicishaqblog.netlify.app/2023-10-03-aws-7-cli/) and the [IAM policies guide](https://magicishaqblog.netlify.app/2023-02-03-aws-5-IAM-polices/) are useful checks if the local configuration is not yet in place.

For this example, replace these values with your own:

```text
ACCOUNT_ID=123456789012
REGION=eu-west-1
REPOSITORY=demostephane
IMAGE=nginxdemos/hello
TAG=latest
```

## Step 1: Create a Private Repository

Open the **Amazon ECR** console, select **Private repositories**, then choose **Create repository**. Enter a repository name such as `demostephane` and create it.

The console also offers a few decisions worth understanding:

- **Tag immutability** prevents a tag from being overwritten after it has been pushed. This is useful when a release tag must always refer to the same image.
- **Image scanning** can identify known vulnerabilities. AWS now recommends configuring enhanced scanning through [Amazon Inspector](https://docs.aws.amazon.com/inspector/latest/user/scanning-ecr.html) at registry level where appropriate.
- **Encryption** can use the default server-side encryption or an AWS KMS key when the organisation needs control over that key.

For a first test, the defaults are enough. A private repository means that an image can only be pulled by identities with the required IAM or repository-policy permissions. A public ECR repository, by contrast, can be made available to anyone.

When the repository opens, it will show zero images. Select **View push commands**. AWS provides commands tailored to your operating system; the Mac and Linux version is used below.

## Step 2: Authenticate Docker to ECR

Run the ECR login command, using the Region and registry URI shown in the console:

```bash
aws ecr get-login-password --region eu-west-1 \
  | docker login --username AWS --password-stdin \
    123456789012.dkr.ecr.eu-west-1.amazonaws.com
```

On success, Docker reports `Login Succeeded`.

The AWS CLI obtains a temporary ECR authorisation token. Its output is passed directly to `docker login`, which stores credentials for the ECR registry in Docker's local credential configuration. The token is not an image password that needs to be copied into source code or a task definition. The [AWS CLI reference for `get-login-password`](https://docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html) documents the command in detail.

Authentication is bound to the registry and is temporary. A later `no basic auth credentials` message commonly means that the login has expired, the Region is wrong, or Docker was authenticated to a different registry URI.

## Step 3: Pull the Source Image

The ECS example used `nginxdemos/hello`, a public image from Docker Hub. Pull it to the local Docker cache:

```bash
docker pull nginxdemos/hello:latest
```

Docker will download the image the first time. If it has already been pulled, it may simply report that the image is up to date. Check the local image list with:

```bash
docker images
```

At this point, Docker knows the image as `nginxdemos/hello:latest`. That name still points to Docker Hub, so it must be tagged with the ECR destination before it can be pushed.

## Step 4: Tag the Image for ECR

Tagging does not rebuild or duplicate the image layers. It adds another local reference to the same image, this time with the full ECR repository URI:

```bash
docker tag nginxdemos/hello:latest \
  123456789012.dkr.ecr.eu-west-1.amazonaws.com/demostephane:latest
```

The destination follows this format:

```text
<account-id>.dkr.ecr.<region>.amazonaws.com/<repository>:<tag>
```

This is the crucial change. When Docker sees the ECR registry hostname at the beginning of the image name, it sends the image to that private AWS repository rather than to Docker Hub.

## Step 5: Push the Image

Push the newly tagged image:

```bash
docker push 123456789012.dkr.ecr.eu-west-1.amazonaws.com/demostephane:latest
```

Docker uploads the image manifest and any layers that ECR does not already have. Once the command completes, refresh the ECR repository page. The image should appear with the `latest` tag, its digest, size, and push time.

If the push is rejected, do not assume Docker is at fault. Check that the repository exists in the specified Region, that the account ID and repository name are exact, and that the IAM identity has ECR permissions. The identity normally needs an authorisation token plus repository actions such as `ecr:InitiateLayerUpload`, `ecr:UploadLayerPart`, `ecr:CompleteLayerUpload`, and `ecr:PutImage`. The [ECR push documentation](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) lists the complete workflow.

## Step 6: Use the ECR Image in ECS

The ECR image can now replace the Docker Hub image in an [ECS task definition](https://magicishaqblog.netlify.app/2026-08-27-aws-145-ECS-task-definitions/). Set the container image URI to:

```text
123456789012.dkr.ecr.eu-west-1.amazonaws.com/demostephane:latest
```

When ECS starts the task, it pulls the image from ECR. The permissions are different from the permissions used on your laptop to push the image: ECS uses the task execution role, or the EC2 container-instance role for an EC2 launch type. The [ECS task-definition hands-on post](https://magicishaqblog.netlify.app/2026-09-03-aws-146-ECS-task-definition-hands-on/) explains where that execution role is configured.

For production deployments, consider using a release tag such as `1.0.0`, or an image digest, instead of relying on `latest`. A fixed reference makes it much easier to establish precisely which image was tested and deployed.

## Conclusion

The practical route into ECR is short: create a private repository, authenticate Docker with the AWS CLI, pull or build an image, tag it with the ECR URI, and push it. The registry URI is more than a label; it tells Docker where the image belongs.

Once the image is in ECR, ECS can pull it as part of a task launch, keeping the image alongside the account, permissions, and deployment controls that run it. When the process fails, the most useful first checks are the repository Region, the complete image URI, and the IAM identity doing the work.

## Recap

More in the AWS series

- [AWS 140: Docker Introduction](https://magicishaqblog.netlify.app/2026-07-24-aws-140-docker-introduction/)
- [AWS 141: AWS ECS](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/)
- [AWS 142: ECS Hands On](https://magicishaqblog.netlify.app/2026-08-07-aws-142-ECS-hands-on/)
- [AWS 145: ECS Task Definitions](https://magicishaqblog.netlify.app/2026-08-27-aws-145-ECS-task-definitions/)
- [AWS 146: ECS Task Definitions - Hands On](https://magicishaqblog.netlify.app/2026-09-03-aws-146-ECS-task-definition-hands-on/)
- [AWS 149: ECR](https://magicishaqblog.netlify.app/2026-09-22-aws-149-ecr/)
