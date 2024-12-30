import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import { HighlightModule } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-casourel-guide',
  imports: [HighlightModule, HighlightPlusModule, HighlightLineNumbers, CommonModule],
  templateUrl: './casourel-guide.component.html',
  styleUrl: './casourel-guide.component.scss'
})
export class CasourelGuideComponent {
  codeUrl: string = 'https://gist.githubusercontent.com/seabird86/3ca3b2c540af6719c32e4372d1ccfd6b/raw/ac03a937eed666fc38511311a84c3974f9370290/casourel.component.ts';
//   code = `
//   @Component({
//   selector: 'app-casourel-guide',
//   imports: [HighlightModule, HighlightPlusModule, CommonModule],
//   templateUrl: './casourel-guide.component.html',
//   styleUrl: './casourel-guide.component.scss'
// })
// export class CasourelGuideComponent {
// }
  
//   `;
}
