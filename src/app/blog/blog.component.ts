import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BlogListComponent } from '@app/lib/component/blog-list/blog-list.component';

@Component({
  selector: 'app-blog',
  imports: [MarkdownModule, BlogListComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  constructor() {
  }

}
