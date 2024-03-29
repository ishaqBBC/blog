---
layout: blog
title: "Debugging secrets revealed"
date: 2023-05-17T17:31:47.398Z
---

## TLDR

- Debugging can be achieved using `debugger` or breakpoints.
- You can debug your minified code using _source maps_
- `console.log` may not always be your best choice, and other options are available

## Introduction

Hey there, I'm excited to share with you a practical guide to debugging in JavaScript! Debugging is a critical process for finding and removing bugs in your code.

In this blog post, I'll define debugging and explain how you can use a debugger in JavaScript, with a demo of Chrome's debugger console. Additionally, I'll introduce you to the concept of source maps, which will allow you to debug minified JavaScript code.

But that's not all! I'll also walk you through a sample project using TypeScript and show you how to use debugging to find and correct an error. By the end of this post, you'll have a better understanding of how to improve your debugging skills, and I hope that this will be useful for you in your future coding projects.

"If debugging is the process of removing bugs. Then programming must be the process of putting them in." ~ Edsger Dijkstra

So let's dive in and get started!

### What is debugging in JavaScipt

When we run code , we can pause the execution with either a breakpoint (clicking on the line of code on your chosen editor and seeing a red dot next to that code), or using the Javascript keyword `debugger`. One paused we have different options to examine the code
below is what the debugger debugger console looks like when code is paused.
![debugger commands](/blog/src/images/debug-2.png)
from order of left to right

- Resume script execution , otherwise known as continue. **pressing this will go to the next breakpoint/debugger**, holding down the button and selecting **force script execution** will result in running the rest of the file without hitting any breakpoints.
- Step Over next function **When hitting a function, will not go inside the function and instead continue to the next line**
- Step Into function **Enters the function and therefore accesses it's scope**
- Step Out function **Exits the current function scope**
- Step **Steps through every line of synchronous code in the order ran**
- Disable all breakpoint **toggle breakpoints/debuggers on/off**

example

```
function one () {
    two() //Step into
}

function two () {
    three() //Step into
}

function three(){
console.log('print message');
}
debugger // code pauses here
one() // Step Over / Step
two() // Step Over / Step out
three()
debugger //Resume
```

What happens when we press each button in the debug terminal, **refresh the terminal after every bullet point** if you are following along.

- Resume **will hit the next debugger, ergo continues to the next breakpoint/debugger**
- Step Over **since the debugger statement is a keyword, will resume on line `one()` pressing step over a second time will not go into the scope of `one()` but continue to `two()`**.
- Step Into **When we hit the line `one()` and press the `step into` button, you will be brought inside the scope of the `one()`.** Notice how you are inside the function, from this pont the **Step out** will take you outside, while **Step in** will take you to `three()`

### Source maps

While debugging regular javascript is quite straight forward, most companies and projects use libraries that get complied and build differently than the code we write. The code we write gets transpiled into minified javascript. This simply means; transforming code into an optimised and smaller version that reduces size but makes the code almost unreadable. This is done through a pre-processor, Tools that achieve this are; babel, webpack, parcel and vite to name a few.

Chrome dev tools has recently announced authored code to help visualise code written with the source maps attributed to its creation. : open dev tools > settings > experiments > check: Group sources in by Authored / and Deployed trees.

Chrome, uses source maps. A source map is a location to your unreadable transpiled code, and the code used to create it. Using source maps means we can debug the code we wrote and not the minified transpiled version.
Chrome will actually run your minified code but the Sources panel will show you the code you author.
To see this in action, open your dev tools \*`cmd + option + c` on mac or `Ctrl + shift + c` on windows. and click to the sources panel

![sources panel](/blog/src/images/debug-3.png)

### How to use the debugger in chrome

Ok so we've got the basics now, how do we use utilise the power of the debugger for our chosen editor _google chrome_.

### Sample project

this sample project uses Typescript.

- go to [this Github and clone the repository](https://github.com/ishaqBBC/example)
- run `npm i` to install all the dependencies
- open the repo in VS code and use the command `npm run start` and open a browser in `http://localhost:3000`

This project is a simple app that displays a random dog image along with the name of the dog
![dog screenshot](/blog/src/images/dog.png)

### Using the power of debugging

Currently there is a problem with the name of the dog being displayed, **we will use our new debugging skills** to find and correct the error.

- [On line 18](https://github.com/ishaqBBC/example/blob/main/src/components/Dog.tsx#L18) of the `src/comoponents/Dog.tsx` file , uncomment the code and therefore placing a debugger;
- In chrome, with the dev tools opened the `debugger` will create pause execution.
- In the console, type in the `pathname` to get access to variable that is now in scope.
- We can see that this pathname contains the correct dog but it returning another part of the string.
- type in `dogNames` in the console to see the whole array. Optionally you can hover over the array.
- we can see the array in position `2` contains the dog name.
- change the position in the return statement of the function `getDogName` to reflect position `2`

![dog console variables](/blog/src/images/dog-2.png)

### Tips and tricks

Different types of breakpoints

- Log points - will automatically log the expression. (thing of this as a console.log)

- Conditional breakpoints - will only hit a breakpoint if a condition is met.

when creating a breakpoint, right click to gain access to different types of breakpoints

### Console

"Coding is not about typing. It’s about solving!" `console.log` has been a tried a tested method in debugging but there are other methods of debugging

#### Destructing

the console is an object in javascript and therefore we can use the power of destructuring to grab methods out of the console.

```
const {log: print, dir, trace, group, groupEnd, time , timeEnd, timeLog, count} = console;
print('hello world'); // changed log to print;

```

#### console.group and console.groupEnd

A powerful way of splitting logs into groups for ordering and displaying your console messages

```
const {group, groupEnd, log } = console;

const label1 = 'group one';
const label2 = 'group two';

group(label1) // start of the group
log(`message from group: ${label1}`)
log(`second message from : ${label1}`)
groupEnd(label1)

group(label2)
log('hello world')
groupEnd(label2)
```

![console.group result](/blog/src/images/debug.png)
as we can see, the `console.group` accepts a string as a label . This will group all log statements into a accordion in the terminal, the default is an opened accordion. The default behavior can be changed by using `console.groupCollapsed` instead of `console.group`.

### Console.time , timeEnd and timeLog

the `time` and `timeEnd` methods great for measuring performance. Call `console.time()` to start the timer. the method accepts a label parameter -

```
function logsTimer (timer, label) {
    console.time(label)
    setTimeout(() => {
        console.timeEnd(label)
    }, timer)
}
const takesASecond = logsTimer(1000, 1) // 1: 1000.000 ms
const takesTWoSeconds = logsTimer(2000, 2) // 2: 2000.000 ms
```

use `console.time` to measure how long a function takes to run, or a promise request, the `console.timeLog` method accepts the label from `console.time` so you can check on the status of the timer.

### Console.trace

for when you want to find out where your code is being called from. You might of seen something similar with finding an error in the console, the error will normally be followed by a trace to that error. `console.trace()` works in the same manner.

### Console.count, console.dir and console.table

`console.count` keeps tracks of the number of times a message is inputted to the console

```

console.count('Marco')
console.count('Polo')
console.count('Marco')
console.count('Polo')
// Marco: 1
 // Polo: 1
 // Marco: 2
 // Polo: 2
```

`console.table` is for formatting arrays or objects into key/value tables. The key for the array will be the index.
`console.dir` lists the methods of an object. treating it slightly differently than `console.log`

### Conclusion

As Linus's Law states "Given enough eyeballs, all bugs are shallow." Having a diverse set of tools at our disposal, means we have more 'eyeballs on the bugs' . In addition according to the The Law of the Instrument- "If all you have is a hammer, everything starts looking like a nail". These methods will increase the tools.
Debugging is a powerful tool, and one that can be used to find hard to sport bugs, play around and get comfortable in the uncomfortable, break the problem down and work in small steps. These are just tools, ones that can help enhance a coders toolkit. "

I'll leave you with another quote from my one of favorite JS devs, Kyle Simpson: "code that you cannot trust is code that you do not understand. The reverse is true also: code that you don’t understand is code you can’t trust."
