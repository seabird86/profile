import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpParams } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { BlogService } from '@app/lib/api/blog.service';
import { BlogMetadata } from '@app/lib/api/model/blog-metadata';
import { Params } from '@app/lib/constants/constants';
import { Page } from '@app/lib/api/model/pagination';

@Component({
  selector: 'app-blog-list',
  imports: [MatCardModule, RouterLink, MatPaginatorModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'

})
export class BlogListComponent {

  blogs: WritableSignal<Page<BlogMetadata>> = signal({size: 3});

  private blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.getBlogs(1, 3);
  }
  handlePageEvent(e: PageEvent) {
    this.getBlogs(e.pageIndex + 1, e.pageSize);
  }

  getBlogs(page: number, size: number) {
    this.blogService.getBlogs(new HttpParams().set(Params.PAGE, page)
      .set(Params.SIZE, size)).subscribe({
        next: (next) => {
          this.blogs.update(val => next);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }
}
