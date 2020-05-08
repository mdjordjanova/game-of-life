import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Cell } from '../../models/cell.model';
import { Grid } from '../../models/grid.model';
import { BehaviorSubject, range } from 'rxjs';

@Component({
  selector: 'app-grid',
  styleUrls: ['./grid.component.scss'],
  template: `
    <div *ngIf="grid$ | async as grid" class="grid">
      <div class="row" *ngFor="let row of toArray(grid.dimensions.rows)">
        <div class="column" *ngFor="let col of toArray(grid.dimensions.cols)">
          <div
            [ngClass]="{
              'active': grid.cells[row][col].active,
              'inactive': !grid.cells[row][col].active}"
            (click)="onClick($event, grid, row, col)" (mouseover)="onMouseOver($event,grid, row, col)">
          </div>
        </div>
      <div>
    </div>
  `
})
export class GridComponent {
  @Input() grid$: BehaviorSubject<Grid>;

  private startRow: number = null;
  private startCol: number = null;

  private lastRow: number = null;
  private lastCol: number = null;

  private currentRow: number = null;
  private currentCol: number = null;

  toArray(n: number): number[] {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr[i] = i;
    }
    return arr;
  }

  constructor() {
    document.addEventListener('keydown', this.onKeydownEvent.bind(this), false);
    document.addEventListener('keyup', this.onKeyupEvent.bind(this), false);
  }

  onClick(event: MouseEvent, grid: Grid, row: number, col: number) {
    if (this.startCol !== null && this.startRow !== null && event.shiftKey) {
      grid.drawLine(this.startCol, this.startRow, this.lastCol, this.lastRow, false);

      this.lastRow = null;
      this.lastCol = null;
    } else {
      grid.cells[row][col].active = !grid.cells[row][col].active;
    }

    this.startRow = row;
    this.startCol = col;

    this.grid$.next(grid);
  }



  onMouseOver(event: MouseEvent, grid: Grid, row: number, col: number) {
    this.currentRow = row;
    this.currentCol = col;

    if (event.shiftKey) {
      this.previewLine(grid);
    }

    if (event.buttons) {
      grid.cells[row][col].active = !grid.cells[row][col].active;
      this.grid$.next(grid);
    }
  }

  previewLine(grid: Grid) {
    if (this.startCol !== null && this.startRow !== null) {
      this.resetLine(grid);

      this.lastRow = this.currentRow;
      this.lastCol = this.currentCol;

      grid.drawLine(this.startCol, this.startRow, this.lastCol, this.lastRow);
    }
  }

  resetLine(grid: Grid) {
    if (this.startCol !== null && this.startRow !== null && this.lastCol !== null && this.lastRow !== null) {
      grid.drawLine(this.startCol, this.startRow, this.lastCol, this.lastRow);

      this.lastRow = null;
      this.lastCol = null;
    }
  }

  onKeydownEvent(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      this.previewLine(this.grid$.value);
    }
  }

  onKeyupEvent(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      this.resetLine(this.grid$.value);
    }
  }
}
