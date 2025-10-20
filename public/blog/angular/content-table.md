---
title: "Display a Table of Contents"
date: "01 Aug 2024"
readingTime: 5 min read
tags: [Angular, viewChild, Depth-first Search, scrollIntoView]
summary: "Table of Contents lists all links of headings in a blog."
image: content-table.png
---

## 1. Purpose

As an angular developer, I would like to show a <b>Table of Contents</b>. It will automatically find and show all heading tags in a HTML element as a table of contents and allow user to scroll to its content. We won't use the URI fragments to scroll. Instead of that, we will find all heading tags and scroll to this element.

<img src="blog/img/content-table.png" width="200" height="100">

## 2. How to do

 - Create an angular component `blog.component`. You will need to customize your scss file `blog.component.scss`


> blog.component.ts

```typescript

import { Component, ElementRef, viewChild, signal } from '@angular/core';

interface Scroll {
  behavior: string;
}

interface Element {
  childNodes: Element[];
  localName: string;
  innerText: string;
  scrollIntoView(scroll: Scroll): void;
}

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  blogContent = viewChild<ElementRef>('blogContent');
  nodes = signal<Element[]>([]);

  getHeaders(root: Element) {
    if (root) {
      if (['h2', 'h3', 'h4'].includes(root.localName)) {
        this.nodes.update(e => { e.push(root); return e; });
      } else if (root.childNodes) {
        const nodes: Element[] = root.childNodes;
        nodes.forEach(element => this.getHeaders(element));
      }
    }
  }

  ngAfterViewInit() {
    const root = this.blogContent()?.nativeElement;
    this.getHeaders(root);
  }

  scrollTo(e?: Element) {
    e?.scrollIntoView({ behavior: 'smooth' });
  }
}
```

> blog.component.html

```html

<br/>
<h1>
    <ng-content select="blog-header"></ng-content>
</h1>
<div>
    <h3>Table of Contents</h3>
    @for (node of nodes(); track $index) {
        <a (click)="scrollTo(node)" class="{{node.localName}}">{{node.innerText}}</a>
    }
</div>
<div #blogContent>
    <ng-content select="blog-content"></ng-content>
</div>
```

 - In the method `ngAfterViewInit`, it will loop all tags in the `#blogContent` to find headings `<h2> <h3> <h4`. The tag `<ng-content>` is replaced by your actual content.
 - In the `blog.component.html`, the loop `for` will show a list of your headings under the tag `<h3>Table of Contents</h3>`
 - If a reader clicks into a link in the Table of Contents, The method `scrollTo(e?: Element)` will scroll to the content that user want to see.            
 - Finally, you will use this component to wrap the page you want to show the Table of Contents. The content of page is in the tag `<blog-content>`

```html

<app-blog>
    <blog-header>Table of Contents</blog-header>
    <blog-content>
        <h2>1. Purpose</h2>
        ...
        <h2>2. How to do</h2>
        ...
        <h2>3. Conclusion</h2>
        ...
    </blog-content>
</app-blog>

```

## 3. Conclusion
In this guidelines, you learn how to use `viewChild` to get the RefElement. I use the agorithm Depth-first Search - DFS to find all tags in this RefElement. You've known the way to scroll to a content by using method `scrollIntoView` as well as using the `<ng-content>`. There is also a solution to scroll a placeholder with URI fragements in a web page. But we shouldn't use it because it's an Angular app.