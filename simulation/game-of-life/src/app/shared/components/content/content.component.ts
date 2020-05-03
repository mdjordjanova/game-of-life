import { Component } from "@angular/core";

@Component({
  selector: 'app-content',
  styleUrls: ['./content.component.scss'],
  template: `
    <div class="content">
      <ng-content></ng-content>
    </div>
  `
})
export class ContentComponent { }