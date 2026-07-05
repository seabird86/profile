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
export class BlogService implements MarkedExtension {
    hooks = {
        preprocess(markdown: string) {
            const { attributes, body }: FrontMatterResult<any> = fm(markdown);
            return parseHeader(attributes) + body;
        }
    }
};