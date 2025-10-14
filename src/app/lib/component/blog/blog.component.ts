import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog',
  imports: [MarkdownModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

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
