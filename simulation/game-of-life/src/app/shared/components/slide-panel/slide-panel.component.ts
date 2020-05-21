import { Component, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

type PaneType = 'left' | 'right';

@Component({
  selector: 'app-slide-panel',
  styleUrls: ['./slide-panel.component.scss'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
  ])],
  template: `
    <div class="panes" [@slide]="activePane">
      <div><ng-content select="[leftPane]"></ng-content></div>
      <div><ng-content select="[rightPane]"></ng-content></div>
    </div>
  `
})
export class SlidePanelComponent {
  @Input() activePane: PaneType = 'left';
}
