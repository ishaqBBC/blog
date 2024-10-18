---
layout: blog
title: "AWS 76: Domain Registar vs [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) Service"
date: 2024-10-18T08:31:59.441Z
---

### TLDR

A **domain registrar** allows you to purchase a domain name, while a **[DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) service** manages the records for that domain. You can buy your domain from any registrar (like [GoDaddy](https://wwww.godaddy.com) or [Google Domains](https://domains.squarespace.com/)) and still use a separate [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) service, such as Amazon Route 53, for management. To do this, register your domain, create a public hosted zone in Route 53, and update the name servers on your registrar's website to point to Route 53. Understanding this distinction helps you effectively manage your online presence.

### Introduction

In the world of web hosting and online presence, it's crucial to understand the difference between a domain registrar and a [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) service. This distinction can help you make informed decisions about managing your website's domain name.

### What is a Domain Registrar?

A domain registrar is a company that allows you to purchase and register a domain name. Whenever you acquire a domain, you will typically pay an annual fee to maintain ownership of that name. In this blog series, we have utilized Amazon Registrar through the Route 53 console for domain registration. However, it's important to note that you have the flexibility to choose any domain registrar that suits your needs. Popular options include GoDaddy, Google Domains (now known as squarespace), and many others.

### The Role of [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) Services

Alongside domain registration, most registrars offer [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) services to help you manage your [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) records. When you registered a domain name with Amazon, we created a Route 53 hosted zone to handle those records. However, you aren't limited to using the [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) services provided by your domain registrar. For instance, you can register a domain with GoDaddy and still utilize Amazon Route 53 for your [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) management.
How to Use Amazon Route 53 with Other Registrars

If you decide to register your domain with GoDaddy while using Amazon Route 53 to manage your [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) records, here's how you can do it:

- Register Your Domain: Start by registering your desired domain (for example, example.com) on the GoDaddy platform.

- Access Name Servers: After registration, navigate to the Name Servers section on GoDaddy’s interface, where you can specify custom name servers.

- Create a Hosted Zone in Route 53: Next, log in to Amazon Route 53 and create a public hosted zone for your domain.

- Find Your Name Servers: In the details of the hosted zone, you'll find four name servers listed on the right side of the screen. These will be the name servers you need to update on the GoDaddy website.

- Update Name Server Records on GoDaddy: Go back to GoDaddy and replace the default name servers with the four name servers provided by Amazon Route 53. This change allows GoDaddy to direct traffic to your [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) management in Route 53.

### Consulusion

In summary, if you purchase a domain from a third-party registrar, you can still leverage Amazon Route 53 as your [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) service provider. Simply create a public hosted zone in Route 53 and update the name server records on your registrar's website to point to the Route 53 name servers.

Remember, a domain registrar facilitates domain name purchases and usually includes some [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) features, while a [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) service like Route 53 provides comprehensive management of your [DNS](https://magicishaqblog.netlify.app/2024-03-12-aws-58-DNS-name/) records. Understanding these differences will empower you to manage your online presence more effectively.
