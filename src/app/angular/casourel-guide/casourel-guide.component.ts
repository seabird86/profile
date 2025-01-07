import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '@app/lib/directive/highlight.directive';

@Component({
  selector: 'app-casourel-guide',
  imports: [CommonModule, HighlightDirective],
  templateUrl: './casourel-guide.component.html'
})
export class CasourelGuideComponent {
}