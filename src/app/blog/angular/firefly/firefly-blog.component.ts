import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HighlightDirective } from '@app/lib/directive/highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { BlogComponent } from "../../../lib/component/blog/blog.component";

@Component({
  selector: 'app-firefly-blog',
  imports: [HighlightDirective, BlogComponent, MatTabsModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './firefly-blog.component.html',
})
export class FireflyBlogComponent {

}
