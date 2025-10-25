import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-detail',
  imports: [MarkdownModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent {

  readonly category = signal('');
  readonly id = signal('');

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.subscribe((params) => {
      this.category.set(params['category']);
      this.id.set(params['id']);
    });
  }

}
