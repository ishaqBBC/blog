---
layout: blog
title: "Nifty Regex One liners"
date: 2023-15-02T17:08:34.142Z
---


Here are some nifty one liners using RegEx (Regular Expressions) to solve some problems

## Finding the some of all numbers in a string
when given a string such as `If I have 7 dogs and 3 sheep , how many animals to I have` we want a function that takes the numbers in the string and returns them added.
### solution
```
@ params {string} - text
@ returns {number}
function allNumbers(text) {
    return text.split(' ').reduce((a, w) => /^[0-9]+$/.test(w) ? a + parseInt(w) : a, 0);
}
```
### How
