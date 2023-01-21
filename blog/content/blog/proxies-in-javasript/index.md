---
layout: blog
title: Proxy Objects In Javascript!
date: "2015-05-06T23:46:37.121Z"
---


In JavaScript, the Proxy API allows you to create a "proxy" object that can intercept and modify operations on another object. This allows you to add custom behavior to operations such as property access, assignment, and method invocation, or to implement additional functionality such as logging or data validation.

A proxy object is created using the Proxy constructor, which takes two arguments: the target object and a handler object. The target object is the object that the proxy will be "proxying" for, and the handler object contains the methods that will be called to intercept and modify operations on the target object.

The handler object can contain several methods to trap various operations on the target object. The most commonly used traps are:

get(): called when an object property is accessed
set(): called when an object property is set
apply(): called when a function is called
construct(): called when the proxy is used in a "new" statement
has(): called when the in operator is used
deleteProperty(): called when a property is deleted.
Here is an example of using a proxy to log every time a property is accessed on an object:

```
const handler = {
    get: function(target, prop) {
        console.log(`Accessing property ${prop}`);
        return target[prop];
    }
};

const target = { a: 1, b: 2 };
const proxy = new Proxy(target, handler);
console.log(proxy.a); // logs "Accessing property a" and returns 1
```
It's worth noting that Proxies are a relatively new feature in JavaScript, and may not be supported by all browsers or environments. They also have performance overhead as they are intercepting each operation on the object.