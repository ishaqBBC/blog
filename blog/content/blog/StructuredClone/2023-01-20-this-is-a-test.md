---
layout: blog
title: This is a test
date: 2023-01-20T17:08:34.142Z
---

## Structured Clone in JavaScript

In JavaScript, the structured clone algorithm is used to create a deep copy of an object or array. This algorithm is used by various methods such as postMessage, IndexedDB, and localStorage, to transfer data between different contexts, such as between different windows or web workers.

The structured clone algorithm creates a copy of the original object or array, including all its properties and nested objects. However, it does not copy over any non-enumerable properties, such as those that are created by a Symbol, and it also does not copy over any functions or other non-primitive values.

To create a deep copy of an object or array using the structured clone algorithm, you can use the JSON.parse(JSON.stringify(obj)) method. This method first converts the object or array to a JSON string using JSON.stringify(), and then parses that string back into an object using JSON.parse().

```
let original = { a: 1, b: { c: 2 } };
let copy = JSON.parse(JSON.stringify(original));
console.log(copy); // { a: 1, b: { c: 2 } }
It's important to note that this method has some limitations, such as JSON.stringify can't stringify function, undefined, Symbol and Infinity and -Infinity and NaN.
```

Another way to create a deep copy is using the Object.assign() method to create a new object and then assign the properties of the original object to it.

```
let original = { a: 1, b: { c: 2 } };
let copy = Object.assign({}, original);
console.log(copy); // { a: 1, b: { c: 2 } }
It's worth noting that this method will not copy over any properties that are not enumerable, as well as it will not copy over any properties that are inherited from the prototype.
```

In addition, there are other libraries like lodash and ramda that provide utility functions for creating deep copies of objects, such as \_.cloneDeep() and R.clone().

In summary, the structured clone algorithm is a powerful tool for creating deep copies of objects and arrays in JavaScript, but it has some limitations and there are other ways to achieve the same result.

Entering the [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) HTML DOM API.
where by letting us create deep copies of objects that hold the name data values. Take for example:

```
const obj = {name: 'Peter', time: new Date() , job: {salary: '$7.00', title: 'Photographer'}};
const DeepCopy = structuredClone(obj) // name: 'Peter', time: new Date() , job: {salary: '$7.00', title: 'Photographer'}}
```
