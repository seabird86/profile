import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '@app/lib/directive/highlight.directive';

@Component({
  selector: 'blog-casourel',
  imports: [CommonModule, HighlightDirective],
  templateUrl: './casourel-blog.component.html'
})
export class CasourelBlogComponent {
}