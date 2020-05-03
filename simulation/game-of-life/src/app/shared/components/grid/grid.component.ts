import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { Cell } from '../../models/cell.model';
import { Grid } from '../../models/grid.model';
import { BehaviorSubject, range } from 'rxjs';

@Component({
  selector: 'app-grid',
  styleUrls: ['./grid.component.scss'],
  template: `
    <div *ngIf="grid$ | async as grid" class="grid">
      <div class="row" *ngFor="let row of toArray(grid.rows)">
        <div class="column" *ngFor="let col of toArray(grid.cols)">
          <div
            [ngClass]="{
              'active': grid.cells[row][col].active,
              'inactive': !grid.cells[row][col].active}"
            (click)="onClick(grid, row, col)">
          </div>
        </div>
      <div>
    </div>
  `
})
export class GridComponent {
  @Input() grid$: BehaviorSubject<Grid>;

  toArray(n: number): number[] {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr[i] = i;
    }
    return arr;
  }

  onClick(grid: Grid, row: number, col: number) {
    grid.cells[row][col].active = !grid.cells[row][col].active;
    this.grid$.next(grid);
  }
}