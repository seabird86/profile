---
title: "Display a code block with HighlightJs"
date: "01 Mar 2024"
readingTime: 10 min read
tags: [Angular, Directive, gist, Highlightjs, lineNumber, Copy Button]
summary: "Using Highlightjs in an Angular App to hightlight code blocks with functions such as copy and line number."
image: highlightjs.png
---

## 1. Purpose

- As an angular developer, I would like to create a directive that shows a code snippet of a file from the link <https://gist.github.com/>. It should support multiple languages to highlight syntax, display line numbers and copy button.
- There is a package ngx-highlightjs but it's hard to add **copy button** as well as support the options **fromLine** & **toLine** . So, I don't use this package and implemented another way.
- The result is:

<img src="blog/img/highlightjs.png" width="300" height="150">

## 2. How to do

- Add the following lines in the src/index.html


```html

<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/typescript.min.js"></script>
<script  src="//cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.9.0/highlightjs-line-numbers.minjs"></script>
<script src="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.js"></script>
<script>hljs.addPlugin(new CopyButtonPlugin());</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css" />
<link rel="stylesheet" href="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css"/>
```

- In the code block, I defined <code>typescript.min.js</code> in the tag &#60;script&#62; to support the language typescript in code snippet.
- We need to use the Typescript declaration file of the package <code>highlightjs</code>. So, let's install the package. 

```sh

npm install highlight.js
```

- Create a directive like the following code:

```typescript

import { Directive, input, ElementRef, SecurityContext, OnInit, Injectable, numberAttribute } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HLJSApi } from 'highlight.js';
import { StringUtils } from '@app/lib/utils/string.utils';

interface HLJSLineNumber {
  lineNumbersBlock(el: HTMLElement, option: {
    singleLine: boolean,
    startFrom: number
  }): void;
}
const hljs: HLJSApi & HLJSLineNumber = (window as any)['hljs'];
@Directive({
  selector: '[appHighlight]',
  host: {
    '[class.hljs]': 'true'
  }
})
@Injectable()
export class HighlightDirective implements OnInit {

  url = input.required<string>();
  fromLine = input<number, string>(1, { transform: numberAttribute });
  toLine = input<number, string>(0, { transform: numberAttribute });

  constructor(private eRef: ElementRef, private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url(), { responseType: 'text' }).subscribe(resp => {
      const fromIndex = (this.fromLine() == 1) ? 0 : StringUtils.indexOf(resp, '\n', this.fromLine() - 1) + 1;
      const toIndex = (this.toLine() != 0) ? StringUtils.indexOf(resp, '\n', this.toLine()) + 1 : undefined;
      const code = resp.slice(fromIndex, toIndex);
      this.eRef.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.escapeHtml(code));
      requestAnimationFrame(() => {
        hljs.highlightElement(this.eRef.nativeElement);
        hljs.lineNumbersBlock(this.eRef.nativeElement, {
          singleLine: false,
          startFrom: this.fromLine()
        });
      });
    });
  }
  escapeHtml(str: string): string {
    return str.replace(/[&<>'"]/g, x => '&#' + x.charCodeAt(0) + ';')
  }
}

```

- You need some utilities to find the index of the character <i>Line Break</i> and replace any html escape characters

```typescript

export class StringUtils {
    static indexOf(str: string, subStr: string, i: number): number {
        return str.split(subStr, i).join(subStr).length;
    }
    static escapeHtml(str: string): string {
        return str.replace(/[&<>'"]/g, x => '&#' + x.charCodeAt(0) + ';')
    }
}
```

- In the directive file, we use the function `highlightElement` for the `copy button` feature instead of using the function `highlight` as in the package ngx-highlightjs.

- Don't forget css for highlightjs-line-numbers

```css

.hljs-copy-wrapper{
    background-color: #282c34;
}

.hljs-ln-numbers {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    text-align: right;
    color: #ccc;
    border-right: 1px solid #CCC;
    vertical-align: top;
    padding-right: 10px !important
}

.hljs-ln-code {
    padding-left: 10px !important
}
```

- Finally, you can use these attributes like appHighlight, url, class, fromLine, toLine to display your code snippet. You must put them into tags <code>&#60;pre&#62;</code> and <code>&#60;code&#62;</code> to apply css of highlightjs.

```html

<pre>
    <code appHighlight url="https://gist.githubusercontent.com/seabird86/be052049a0974bab9a01e56c8b837910/raw/d919cb90dbb7999db43dcac0271b5c9ca8ec644a/highlight.directive.ts" class="language-typescript" fromLine=4 toLine="10" ></code>
</pre>
```

## 3. Conclusion

Instead of the package <code>ngx-highlightjs</code>, you can use directly the package <code>highlightjs</code> to add more the features you want. Instead of getting the file content from <a href="https://gist.github.com/">https://gist.github.com</a>, you can also customize your code to highlight the content in your tag <code>&#60;pre&#62;</code> and <code>&#60;code&#62;</code>. Good luck!

## 4. References


*Thanks for the authors who developed the below libraries, published and shared to everyone.*


- <https://highlightjs.org>
- <https://github.com/wcoder/highlightjs-line-numbers.js>
- <https://github.com/arronhunt/highlightjs-copy">
- <https://github.com/MurhafSousli/ngx-highlightjs>