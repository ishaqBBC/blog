---
layout: blog
title: "Nifty Regex One liners"
date: 2023-15-02T17:08:34.142Z
---

## TLDR 
This blog post provides some nifty one-liners using RegEx to solve problems. One of the one-liners shows how to find the sum of all numbers in a string using a regex pattern. Another one-liner demonstrates how to split a string into a precise amount of chunks using regex.

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

## Splitting a string into chunks

Sometimes you need to split a string into a precise amount of chucks. the `split()` method alone cannot achieve this, Regex can be used instead

```
@ params {string} - word 
@ params {number} - chunks 
@ return {array} - the word is split by the amount of chunks, remaining spaces will be filled with '.'

const stringChunks = (word, chunks) => {
    const chunksToDots = '.'.repeat(chunks);
    const regEx = new RegExp(chunksToDots, 'g')
    return (word + chunksToDots).match(regEx) || []
}

//as a one-liner
 const stringChunks = (w,c) => (w + '.'.repeat(c)).match(new RegExp('.'.repeat(c), 'g')) || []

```

## How

`chunksToDots` creates is a series of `.`s specified by the parameter of chunks. The `.` character is used to match any single character except line terminators: like new lines and tabs.

`const regEx = new RegExp(chunksToDots, 'g')` the `g` flag means global, its used to match all instances of the `word`.


`|| []` provides a fallback, this short-circuit evaluation uses a logical Or operator, if the left side of the evaluation is false, will return `[]` as a fallback.


