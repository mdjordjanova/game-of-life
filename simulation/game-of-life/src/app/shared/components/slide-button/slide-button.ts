import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-button',
  styleUrls: ['./slide-button.scss'],
  template: `
    <input type="range">
  `
})
export class SlideButtonComponent {
  @Input() min = 0;
  @Input() max = 1;
  @Input() step = 0.05;
  @Input() value = 0.5;
}
