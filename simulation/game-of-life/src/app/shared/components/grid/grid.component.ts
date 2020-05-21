import { Component, Input } from '@angular/core';
import { Grid } from '../../models/grid.model';
import { BehaviorSubject } from 'rxjs';
import { onMouseOver, onClick, previewLine, resetLine, onKeydownEvent, onKeyupEvent } from '../../utilities/draw-line.utility';
import { toArray } from '../../utilities/array.utility';

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

  toArray = toArray;
  onMouseOver = onMouseOver;
  onClick = onClick;
  previewLine = previewLine;
  resetLine = resetLine;

  constructor() {
    document.addEventListener('keydown', onKeydownEvent.bind(this), false);
    document.addEventListener('keyup', onKeyupEvent.bind(this), false);
  }
}
