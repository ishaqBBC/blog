---
layout: blog
title: "CSS Selectors :Has(), :is() and the :where()"
date: 2023-03-03T17:08:34.142Z
---

Some really awesome new selectors have been added to the CSS spec. In this blog article I will give a brief overview of each.

## :Has()

A pseudo-class that is used to apply styles directly to the parent element. For example: lets say you want to apply styles to a `ul` element but only if it **has** `li` elements as **children**.

This can be achieved using the `:has()` pseudo-class

therefore the selector used will be `ul:has( > li)` . This translates to `ul` that `has` `li` as their children (`>`) means child selector.

Its a powerful new class in css and the possibilities are endless. For example, imagine that we only want to target `img` that have a `figcaption` as its sibling. We want images that contain a a caption to be round. we would use the selector: `img:has(+ figcaption)` to apply the the `border-radius : 50%;`

below are examples of using the pseudo-class for accessing the `ul` and `img` .

### Example

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="js,result" data-slug-hash="jOvrZQN" data-editable="true" data-user="ishaqbbc" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/ishaqbbc/pen/jOvrZQN">
  has selector</a> by ishaqBBC (<a href="https://codepen.io/ishaqbbc">@ishaqbbc</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## :Is()

A pseudo-class selector that lets us shorten, complex nested css styles. For example imagine we want to target elements nested within other elements.

below is an example of targeting `h2` inside of `section`, `aside` , `nav` and , `article`

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="js,result" data-slug-hash="jOvrzvy" data-editable="true" data-user="ishaqbbc" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/ishaqbbc/pen/jOvrzvy">
  :is()</a> by ishaqBBC (<a href="https://codepen.io/ishaqbbc">@ishaqbbc</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

this selector is used to condense complex nested selectors .
its important to note that `:is()` selectors cannot have a `::before` and `::after` as its arguments.

## :Where()

The where selector works the same as the `:is()` selector however there is an important distinction
**always has 0 specificity, whereas :is() takes on the specificity of the most specific selector in its arguments**

Specificity in css is a algorithm that determine which style rule to apply to a page. The higher the specificity of the selector, the more prevalence the rule has in being applied.

specificity works on a three column rule system , by applying the rules to a selector. you increase the weight of the selector. highest weights are applied to the selector.

| 100 or 1-0-0 | 10 or 0-1-0 | 1 or 0-0-1 |
| ------------ | ----------- | ---------- |
| Id           | class       | Element    |
|              | Attribute   |            |

for example the selector `#id` has a specificity of 100 or 1-0-0
and `.my-class` has a specificity of 10 or 0-1-0, having a selector of `.my-class.my-other-class` will give the specificity of 20 or 0-2-0

In the case of the `:where()` the specificity will always be 0 regardless of what is supplied in the parenthesis.

`:is()` will take the highest specificity applied in inside the parenthesis

```css
:where(#myId) {
  /*specificity of 0*/
}
:where(.my-class) p {
  /*specificity of 0-0-1*/
}
:is(#myId.my-class, .my-other-class) {
  /* specificity of 1-1-0 */
}
```

## Conclusion

There three powerful selectors of `:has()` , `:is()` and `:where()` give use extra flexibility in our styling and lets us condense error prone long selector lists.
