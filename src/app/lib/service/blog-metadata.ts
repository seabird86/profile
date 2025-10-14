import { Injectable } from '@angular/core';
import fm, { FrontMatterResult } from 'front-matter';
import { MarkedExtension } from 'marked';

function parseHeader(attributes: any): string {
    return `# ${attributes.title}
<center><i class="material-icons">calendar_today</i> ${attributes.date} &nbsp; | &nbsp; <i class="material-icons">import_contacts</i> ${attributes.readingTime}</center>

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