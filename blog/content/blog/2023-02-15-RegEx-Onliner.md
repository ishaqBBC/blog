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
    return text.split(' ').reduce((totalValue, word) => /^[0-9]+$/.test(word) ? totalValue + parseInt(word) : totalValue, 0);
}
```
### How

by using `/^[0-9]+$/` Regex looks at the start of the word, if this word is a Number of 1 or more digits , Therefore only selecting numbers in the sentence

if we find a match in the Regex `totalValue + parseInt(word)` will convert the string `word` into a number. Wrapping the statement in a ternary means the `totalValue` will only increment if the `test(word)` is evaluated as `true` . 

Everything is wrapped in a reduce function, reduce functions are powerful because the second parameter dictates the type that's returned by the function. `0` means a number will be returned. the arguments inside the callback of the reduce `a` is the `0` while `w` is the word which is obtained by *splitting* the sentence `spilt(' ')`

## Splitting a string into chucks



