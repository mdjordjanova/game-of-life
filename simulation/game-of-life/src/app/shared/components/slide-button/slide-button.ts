import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-slide-button',
  styleUrls: ['./slide-button.scss'],
  template: `
    <input type="range">
  `
})
export class SlideButtonComponent {
  @Input() min: number = 0;
  @Input() max: number = 1;
  @Input() step: number = 0.05;
  @Input() value: number = 0.5;
}