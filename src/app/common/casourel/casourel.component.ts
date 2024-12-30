import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-casourel',
  imports: [MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './casourel.component.html',
  styleUrl: './casourel.component.scss',
  animations: [
    trigger('swap', [
      state(
        'left',
        style({
          transform: 'translateX(-100%)'
        }),

      ),
      state(
        'right',
        style({
          transform: 'translateX(100%)'
        }),
      ),
      state(
        'active',
        style({
          transform: 'translateX(0px)'
        }),
      ),
      transition('left => active', [animate('0.5s')]),
      transition('right => active', [animate('0.5s')]),
      transition('active => left', [animate('0.5s')]),
      transition('active => right', [animate('0.5s')]),
    ]),
  ],

})
export class CasourelComponent {

  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '', class: '' });
  slide: any;

  ngOnInit(): void {
    this.slides[0] = {
      src: 'home/angular.webp',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      class: 'active'
    };
    this.slides[1] = {
      src: 'home/react.webp',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      class: 'void'
    };
    this.slides[2] = {
      src: 'home/java.webp',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
      class: 'void'
    };
    this.slide = this.slides[0];
  }
  prev() {
    for (let i = 0; i < this.slides.length; i++) {
      if (this.slides[i].class === 'active') {
        this.slides[i].class = 'left';
        if (i === 0) {
          this.slides[this.slides.length - 1].class = 'right';
        } else {
          this.slides[i - 1].class = 'right';
        }
        break;
      }
    }
  }
  next() {
    for (let i = 0; i < this.slides.length; i++) {
      if (this.slides[i].class === 'active') {
        this.slides[i].class = 'right';
        if (i + 1 === this.slides.length) {
          this.slides[0].class = 'left';
        } else {
          this.slides[i + 1].class = 'left';
        }
        break;
      }
    }
  }

  onDone(event: AnimationEvent, index: number) {
    if (event.phaseName === 'done') {
      if (event.fromState === 'active' && event.toState == 'right') {
        this.slides[index].class = 'void';
      }

      if (event.fromState === 'void' && event.toState == 'left') {
        this.slides[index].class = 'active';
      }
      if (event.fromState === 'active' && event.toState == 'left') {
        this.slides[index].class = 'void';
      }

      if (event.fromState === 'void' && event.toState == 'right') {
        this.slides[index].class = 'active';
      }
    }
  }
}
