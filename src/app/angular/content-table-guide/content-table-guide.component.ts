import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HighlightDirective } from '@app/lib/directive/highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { BlogComponent } from "../../lib/component/blog/blog.component";


@Component({
  selector: 'app-content-table-guide',
  imports: [HighlightDirective, BlogComponent, MatTabsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './content-table-guide.component.html',
})
export class ContentTableGuideComponent {

}
