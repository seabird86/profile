---
title: Extract and display metadata of a markdown file
date: 2025-05-02
readingTime: 10 min read
tags: [Angular, Typescript, Ngx-markdown, Marked, Front-matter]
summary: Play markdown metadata with Ngx-markdown
image: ngx-markdown.png
---

## 1. Purpose

As an angular developer, I would like to display a markdown file as a blog page by using ngx-markdown <https://www.npmjs.com/package/ngx-markdown>. However, this library doesn't support metadata directly. So, we can use front-matter in order to extract as well as hook to display the metadata in a blog page.

An example of markdown metadata is:

<img src="blog/img/ngx-markdown-content.png" width="300" height="200">

The result is:

<img src="blog/img/ngx-markdown.png" width="300" height="200">

## 2. How to do

 You need to follow the page of ngx-markdown to implement it into an angular application.
 
 I assume that you have a file `blog/angular/firefly.md` in the folder `public`. When you deploy, you refer to this file to display it as a blog page in your application. Ngx-markdown will parse the markdown file into html file to display it content with some features like `highlight code blog`, `copy button`.

```html

<markdown clipboard src="blog/angular/firefly.md" />

```

 You need to create the below service `BlogMetadata` that implement the interface of `marked`. Ngx-markdown uses the library `marked` to convert a markdown file to html file. The method `hooks` allows to make a preprocess. In this method, you parse metadata as well as body from the content of this markdown file. You convert the metadata into html code and merge this section into the body of markdown file.
 


```typescript

import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import fm, { FrontMatterResult } from 'front-matter';
import { MarkedExtension } from 'marked';


function parseHeader(attributes: any): string {
    return `# ${attributes.title}
<center><i class="material-icons">calendar_today</i> ${formatDate(attributes.date, "dd MMM yyyy","en-US")} &nbsp; | &nbsp; <i class="material-icons">import_contacts</i> ${attributes.readingTime}</center>

`;
};

@Injectable()
export class BlogMetadata implements MarkedExtension {
    hooks = {
        preprocess(markdown: string) {
            const { attributes, body }: FrontMatterResult<any> = fm(markdown);
            return parseHeader(attributes) + body;
        }
    }
};
```

The final step, you inject this class into the parameter of the method `provideMarkdown` in the file `app.config.ts` when you define `ngx-markdown`

```typescript

export const appConfig: ApplicationConfig = {
  providers: [
    BlogMetadata,
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideMarkdown({
      markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: () => inject(BlogMetadata), multi: true }]
    }),
    provideZonelessChangeDetection(),
  ]
};

```


## 3. Conclusion

In this guidelines, you learn how to use `hooks` and `front-matter` to extract the markdown metadata as well as display it with its content. My block is using this way to display this page. The metadata will include some information like `readingTime`, `tags`, `image` and `title` . Good luck!