import { Directive, input, ElementRef, SecurityContext, OnInit, Injectable, numberAttribute } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HLJSApi } from 'highlight.js';
import { StringUtils } from '@app/lib/utils/string.utils';

interface HLJSLineNumber {
  lineNumbersBlock(el: HTMLElement, option: {
    singleLine: boolean,
    startFrom: number
  }): void;
}
const hljs: HLJSApi & HLJSLineNumber = (window as any)['hljs'];
@Directive({
  selector: '[appHighlight]',
  host: {
    '[class.hljs]': 'true'
  }
})
@Injectable()
export class HighlightDirective implements OnInit {

  url = input.required<string>();
  fromLine = input<number, string>(1, { transform: numberAttribute });
  toLine = input<number, string>(0, { transform: numberAttribute });

  constructor(private eRef: ElementRef, private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url(), { responseType: 'text' }).subscribe(resp => {
      const fromIndex = (this.fromLine() == 1) ? 0 : StringUtils.indexOf(resp, '\n', this.fromLine() - 1) + 1;
      const toIndex = (this.toLine() != 0) ? StringUtils.indexOf(resp, '\n', this.toLine()) + 1 : undefined;
      const code = resp.slice(fromIndex, toIndex);
      this.eRef.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, StringUtils.escapeHtml(code));
      requestAnimationFrame(() => {
        hljs.highlightElement(this.eRef.nativeElement);
        hljs.lineNumbersBlock(this.eRef.nativeElement, {
          singleLine: false,
          startFrom: this.fromLine()
        });
      });
    });
  }
  
}
