import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BlogService } from '@app/lib/api/blog.service';
import { BlogMetadata } from '@app/lib/api/model/blog-metadata';

@Component({
  selector: 'app-blog-list',
  imports: [MatCardModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
  
})
export class BlogListComponent {

  blogs: WritableSignal<BlogMetadata[]> = signal([]);

  private blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe({
      next: (next) => {
        this.blogs.update(val => next);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    }
    );
  }


}
