import { Component, inject, input, signal, effect, untracked } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { BlogService } from '@lib/api/blog.service';
import { BlogMetadata } from '@lib/api/model/blog-metadata';
import { Params } from '@lib/constants/constants';
import { Page } from '@lib/api/model/pagination';
import { environment } from '@env/environment';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-blog-list',
  imports: [MatCardModule, RouterLink, MatPaginatorModule, DatePipe, MatChipsModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'

})
export class BlogListComponent {

  blogs = signal<Page<BlogMetadata>>({ number: 1, size: environment.homePageSize });
  keywords = input<string[]>([]);
  showPaginator = input(true);
  private blogService: BlogService = inject(BlogService);

  constructor() {
    effect(() => {
      const keywords = this.keywords();
      untracked(() => {
        this.getBlogs(1, keywords);
      });
    });
  }

  ngOnInit(): void {
    this.getBlogs(this.blogs().number, this.keywords());
  }
  handlePageEvent(e: PageEvent) {
    this.getBlogs(e.pageIndex + 1, this.keywords());
  }

  getBlogs(pageNumber: number, keywords: string[]) {
    let params: HttpParams = new HttpParams().set(Params.PAGE, pageNumber)
      .set(Params.SIZE, this.blogs().size);
    keywords.forEach(e => {
      params = params.append(Params.KEYWORDS, e.toLowerCase());
    });
    this.blogService.getBlogs(params).subscribe({
      next: (next) => {
        this.blogs.update(val => next);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }
}
