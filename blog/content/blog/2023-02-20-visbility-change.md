---
layout: blog
title: "SpotLight: Visibility change"
date: 2023-02-18T17:08:34.142Z
---

## Page Visibility API

In certain scenarios, it is crucial to monitor when users leave a web page. Being aware of this event can help us halt fetch requests, send analytics data when a user 'ends' their session, or stop video playback.

The `visibilitychange` event is one of the last observable events that occur when a user leaves a webpage. By combining this event with a check on the `document.visibilityState` state, we can determine whether a user has left the page.

The following CodePen example demonstrates the usage of the visibilitychange event:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="js,result" data-slug-hash="VwGeKrW" data-editable="true" data-user="ishaqbbc" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/ishaqbbc/pen/VwGeKrW">
  visibilityChange</a> by ishaqBBC (<a href="https://codepen.io/ishaqbbc">@ishaqbbc</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

To prevent unnecessary fetch requests or polling when the user is no longer on the page, we can use the [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) interface in conjunction with the `visibilitychange` event. This approach can significantly reduce the load on the server and the client.