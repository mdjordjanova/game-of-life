import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="main-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'game-of-life';
}
