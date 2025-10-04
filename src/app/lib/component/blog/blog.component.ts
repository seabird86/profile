import { Component, ElementRef, viewChild, signal } from '@angular/core';

interface Scroll {
  behavior: string;
}

interface Element {
  childNodes: Element[];
  localName: string;
  innerText: string;
  scrollIntoView(scroll: Scroll): void;
}

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  blogContent = viewChild<ElementRef>('blogContent');
  nodes = signal<Element[]>([]);

  getHeaders(root: Element) {
    if (root) {
      if (['h2', 'h3', 'h4'].includes(root.localName)) {
        this.nodes.update(e => { e.push(root); return e; });
      } else if (root.childNodes) {
        const nodes: Element[] = root.childNodes;
        nodes.forEach(element => this.getHeaders(element));
      }
    }
  }

  ngAfterViewInit() {
    const root = this.blogContent()?.nativeElement;
    this.getHeaders(root);
  }

  scrollTo(e?: Element) {
    e?.scrollIntoView({ behavior: 'smooth' });
  }
}
