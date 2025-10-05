import { Component } from '@angular/core';

import { HighlightDirective } from '@app/lib/directive/highlight.directive';

@Component({
  selector: 'blog-casourel',
  imports: [HighlightDirective],
  templateUrl: './casourel-blog.component.html'
})
export class CasourelBlogComponent {
}