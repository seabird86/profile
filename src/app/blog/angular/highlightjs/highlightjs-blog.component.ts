import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HighlightDirective } from '@app/lib/directive/highlight.directive';
import { BlogComponent } from "../../../lib/component/blog/blog.component";

@Component({
  selector: 'blog-highlightjs',
  imports: [HighlightDirective, BlogComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './highlightjs-blog.component.html'
})
export class HighlightjsBlogComponent {

}
