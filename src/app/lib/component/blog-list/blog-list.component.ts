import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpParams } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { BlogService } from '@app/lib/api/blog.service';
import { BlogMetadata } from '@app/lib/api/model/blog-metadata';
import { Params } from '@app/lib/constants/constants';

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
    this.blogService.getBlogs(new HttpParams().set(Params.PAGE, 1).set(Params.SIZE, 10)).subscribe({
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
