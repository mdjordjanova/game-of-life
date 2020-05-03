import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { Cell } from '../../models/cell.model';
import { Grid } from '../../models/grid.model';

@Component({
  selector: 'app-grid',
  styleUrls: ['./grid.component.scss'],
  template: `
    <div class="grid">
      <div class="row" *ngFor="let row of toArray(updatedGrid?.rows)">
        <div class="column" *ngFor="let col of toArray(updatedGrid?.cols)">
          <div class="cell" (click)="onClick(grid.cells[row][col])">
          </div>
        </div>
      <div>
    </div>
  `
})
export class GridComponent implements OnChanges {
  @Input() grid: Grid = new Grid(20, 20);

  updatedGrid: Grid;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (this.grid) {
      this.updatedGrid = this.grid;
    }
  }

  toArray(n: number): number[] {
    return Array(n);
  }

  onClick(cell: Cell) {
    console.log('onClick', cell)
  }
}