---
layout: layouts/base.njk
pageClass: posts
---

<p class="date">
  Posted on <time datetime="{{ date }}">{{ date | dateDisplay }}</time>
</p>
<main>
  {{ content | safe }}
</main>
