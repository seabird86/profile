import { Component, signal, computed } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BlogListComponent } from '@app/lib/component/blog-list/blog-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Builder } from '@app/lib/utils/builder.utils';

export interface keywordOption {
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-blog',
  imports: [MarkdownModule, BlogListComponent, MatCheckboxModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  keywordOptions = signal<keywordOption[]>(['Java', 'Typescript', 'Angular', 'Spring Boot', 'OnBase']
    .map(e => Builder<keywordOption>().value(e).selected(false).build()));
  selectedKeywords = computed<string[]>(() => this.keywordOptions().filter(e => e.selected).map(e => e.value));

  selectKeyword(isSelected: boolean, index: number) {
    this.keywordOptions.update(options => {
      options[index].selected = isSelected;
      return [...options];
    });
  }
}
