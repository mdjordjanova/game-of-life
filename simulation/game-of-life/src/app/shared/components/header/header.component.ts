import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="header">
      <div class="row">
        <div class="slot start"></div>
        <div class="slot main"></div>
        <div class="slot end"></div>
      </div>
    </div>
  `
})
export class HeaderComponent { }