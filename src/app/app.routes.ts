import { Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { CasourelBlogComponent } from '@app/blog/angular/casourel/casourel-blog.component';
import { HighlightjsBlogComponent } from '@app/blog/angular/highlightjs/highlightjs-blog.component';
import { ContentTableBlogComponent } from '@app/blog/angular/content-table/content-table-blog.component';
import { FireflyBlogComponent } from '@app/blog/angular/firefly/firefly-blog.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'blog/angular/casourel', component: CasourelBlogComponent },
    { path: 'blog/angular/highlightjs', component: HighlightjsBlogComponent },
    { path: 'blog/angular/content-table', component: ContentTableBlogComponent },
    { path: 'blog/angular/firefly', component: FireflyBlogComponent }
];