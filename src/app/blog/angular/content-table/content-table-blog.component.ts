import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HighlightDirective } from '@app/lib/directive/highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { BlogComponent } from "../../../lib/component/blog/blog.component";


@Component({
  selector: 'blog-content-table',
  imports: [HighlightDirective, BlogComponent, MatTabsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './content-table-blog.component.html',
})
export class ContentTableBlogComponent {

}
