import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directive/highlight.directive';

@Component({
  selector: 'app-casourel-guide',
  imports: [CommonModule, HighlightDirective],
  templateUrl: './casourel-guide.component.html',
  styleUrl: './casourel-guide.component.scss'
})
export class CasourelGuideComponent {
}