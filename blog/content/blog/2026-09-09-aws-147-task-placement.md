---
layout: blog
title: "AWS 147: Task Placement"
date: 2026-09-09T09:30:00.000Z
---

## TLDR

When Amazon ECS runs tasks on the EC2 launch type, it must decide which container instance should run each task. It checks the task's CPU, memory, and port requirements, applies any placement constraints, and then uses a placement strategy to choose the best available instance. The main strategies are **binpack**, **random**, and **spread**. Placement constraints, such as `distinctInstance` and `memberOf`, narrow the set of instances ECS is allowed to use.

These settings apply to [ECS on EC2](https://magicishaqblog.netlify.app/2026-07-31-aws-141-aws-ECS/). They do not apply to Fargate in the same way because AWS manages the underlying compute capacity for you.

## Why Task Placement Matters

An ECS task is not placed arbitrarily. When a service needs to start a new task, ECS has to find an EC2 container instance with enough available capacity. That means checking the requirements in the [task definition](https://magicishaqblog.netlify.app/2026-08-27-aws-145-ECS-task-definitions/), including:

- CPU
- Memory
- Host ports

Imagine an ECS cluster with three EC2 instances. Each instance already runs a different set of tasks. When the service scales out, ECS must decide where the next task belongs. When the service scales in, it must also decide which task to stop.

Task placement strategies and constraints control both decisions. A strategy helps ECS choose between eligible instances, while a constraint prevents ECS from using instances that do not meet a particular rule.

## The Placement Process

ECS follows a straightforward sequence when it places a task:

1. It identifies container instances with enough CPU, memory, and port capacity for the task definition.
2. It applies the task placement constraints.
3. It evaluates the placement strategy and selects the best remaining instance.
4. It starts the task on that instance.

Placement strategies are best-effort. They describe the preferred distribution, but they cannot override a lack of resources or a placement constraint. Constraints are the stronger rule: an instance that fails a constraint is not eligible, even if the strategy would otherwise prefer it.

## Task Placement Strategies

### Binpack

The `binpack` strategy places tasks on the instances with the least available CPU or memory. The intention is to fill one instance as much as possible before using another.

For example, a memory-based strategy looks like this:

```json
[
  {
    "type": "binpack",
    "field": "memory"
  }
]
```

ECS keeps adding tasks to the instance with the least remaining memory until the next task no longer fits. It then moves to another instance.

This is useful when cost matters. By concentrating tasks, ECS can leave other EC2 instances empty and make it possible to scale them down. The trade-off is that a failure on a busy instance can affect more tasks at once.

### Random

The `random` strategy places tasks randomly among the eligible container instances:

```json
[
  {
    "type": "random"
  }
]
```

There is no balancing or consolidation logic here. It is simple and can work well when the exact distribution of tasks is not important, but it offers less control than the other strategies.

### Spread

The `spread` strategy distributes tasks across a specified value. Common values include the instance ID and the Availability Zone.

For example, to distribute tasks across Availability Zones:

```json
[
  {
    "type": "spread",
    "field": "attribute:ecs.availability-zone"
  }
]
```

With three Availability Zones, ECS aims to place tasks in a pattern such as AZ-A, AZ-B, AZ-C, then back to AZ-A. The goal is resilience: a problem in one Availability Zone should affect as few tasks as possible.

You can combine strategies. For example, you might spread tasks across Availability Zones first and then use `binpack` by memory within each zone. The order matters because ECS evaluates the strategies in sequence.

## Placement Constraints

Constraints limit where ECS may place a task. They are different from strategies: a strategy expresses a preference, while a constraint defines an eligibility rule.

### `distinctInstance`

The `distinctInstance` constraint tells ECS to place each task on a different container instance:

```json
[
  {
    "type": "distinctInstance"
  }
]
```

If a service runs three tasks with this constraint, ECS tries to place them on three separate EC2 instances. This can reduce the impact of an instance failure, provided the cluster has enough instances and capacity.

### `memberOf`

The `memberOf` constraint uses an expression written in the ECS cluster query language. It allows you to restrict placement to instances with specific attributes.

For example, this constraint limits placement to instances whose type is `t2`:

```json
[
  {
    "type": "memberOf",
    "expression": "attribute:ecs.instance-type == t2.*"
  }
]
```

The expression language can be more advanced than this example, but the exam-level idea is simple: `memberOf` lets you select a particular group of container instances based on their attributes.

## Placement Strategies and Fargate

Task placement strategies and constraints are primarily relevant to the EC2 launch type. With EC2, you manage the instances in the cluster, so ECS needs rules for choosing among them.

With [Fargate](https://aws.amazon.com/fargate/), you choose the task size and networking configuration, while AWS manages the underlying servers. You do not select a backend EC2 instance for each task. The practical distinction is worth remembering for the exam: task placement is an EC2 concern, not a Fargate configuration exercise.

## Exam Summary

The key differences are:

- **Binpack** fills instances as much as possible, reducing the number of active instances and potentially lowering cost.
- **Random** chooses an eligible instance without a distribution rule.
- **Spread** distributes tasks across a chosen value, such as an Availability Zone or instance ID.
- **`distinctInstance`** keeps tasks on separate container instances.
- **`memberOf`** restricts tasks to instances matching a cluster query expression.

For more context, see the earlier posts on [ECS architecture](https://magicishaqblog.netlify.app/2026-08-19-aws-144-ECS-solution-architectures/), [ECS task definitions](https://magicishaqblog.netlify.app/2026-08-27-aws-145-ECS-task-definitions/), and [task definition hands-on work](https://magicishaqblog.netlify.app/2026-09-03-aws-146-ECS-task-definition-hands-on/).

## Conclusion

Task placement is ECS's way of deciding where work should run inside an EC2-backed cluster. ECS first checks whether an instance has the required resources, then applies constraints, and finally uses the placement strategy to make the choice.

Remember the central distinction: **strategies express preference; constraints enforce limits**. Once that is clear, binpack, spread, random, `distinctInstance`, and `memberOf` become much easier to recognise in an exam question or a real ECS configuration.
