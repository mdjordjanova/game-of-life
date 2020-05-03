import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-grid',
  styleUrls: ['./grid.component.scss'],
  template: `
    <div class="grid">
      <div class="row" *ngFor="let row of toArray(rows)">
        <div class="column" *ngFor="let col of toArray(cols)">
          <div class="cell" (click)="onClick()">
          </div>
        </div>
      <div>
    </div>
  `
})
export class GridComponent {
  @Input() rows: number = 40;
  @Input() cols: number = 60;

  toArray(n: number): number[] {
    return Array(n);
  }

  onClick() {
    console.log('cell clicked')
  }
}