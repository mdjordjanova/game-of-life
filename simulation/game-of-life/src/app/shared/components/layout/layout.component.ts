import { Component } from "@angular/core";

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.component.scss'],
  template: `
    <app-header></app-header>
    <ng-content></ng-content>
    <app-footer></app-footer>
  `
})
export class LayoutComponent { }