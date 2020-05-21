// https://www.freecodecamp.org/news/how-to-code-your-first-algorithm-draw-a-line-ca121f9a1395/
// Bresenham’s Algorithm

import { Grid } from '../models/grid.model';

export function drawLine(x1: number, y1: number, x2: number, y2: number, invert: boolean = true) {
  // Iterators, counters required by algorithm
  let x;
  let y;
  let dx;
  let dy;
  let dx1;
  let dy1;
  let px;
  let py;
  let xe;
  let ye;
  let i;

  // Calculate line deltas
  dx = x2 - x1;
  dy = y2 - y1;

  // Create a positive copy of deltas (makes iterating easier)
  dx1 = Math.abs(dx);
  dy1 = Math.abs(dy);

  // Calculate error intervals for both axis
  px = 2 * dy1 - dx1;
  py = 2 * dx1 - dy1;

  // The line is X-axis dominant
  if (dy1 <= dx1) {

    // Line is drawn left to right
    if (dx >= 0) {
      x = x1; y = y1; xe = x2;
    } else { // Line is drawn right to left (swap ends)
      x = x2; y = y2; xe = x1;
    }

    this.cells[y][x].active = invert ? !this.cells[y][x].active : true; // Draw first pixel

    // Rasterize the line
    for (i = 0; x < xe; i++) {
      x = x + 1;

      // Deal with octants...
      if (px < 0) {
        px = px + 2 * dy1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          y = y + 1;
        } else {
          y = y - 1;
        }
        px = px + 2 * (dy1 - dx1);
      }

      // Draw pixel from line span at
      // currently rasterized position
      this.cells[y][x].active = invert ? !this.cells[y][x].active : true;
    }

  } else { // The line is Y-axis dominant

    // Line is drawn bottom to top
    if (dy >= 0) {
      x = x1; y = y1; ye = y2;
    } else { // Line is drawn top to bottom
      x = x2; y = y2; ye = y1;
    }

    this.cells[y][x].active = invert ? !this.cells[y][x].active : true; // Draw first pixel

    // Rasterize the line
    for (i = 0; y < ye; i++) {
      y = y + 1;

      // Deal with octants...
      if (py <= 0) {
        py = py + 2 * dx1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          x = x + 1;
        } else {
          x = x - 1;
        }
        py = py + 2 * (dx1 - dy1);
      }

      // Draw pixel from line span at
      // currently rasterized position
      this.cells[y][x].active = invert ? !this.cells[y][x].active : true;
    }
  }
}

export function onMouseOver(event: MouseEvent, grid: Grid, row: number, col: number) {
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

export function onClick(event: MouseEvent, grid: Grid, row: number, col: number) {
  if (this.startCol !== null && this.startRow !== null && event.shiftKey) {
    drawLine(this.startCol, this.startRow, this.lastCol, this.lastRow, false);

    this.lastRow = null;
    this.lastCol = null;
  } else {
    grid.cells[row][col].active = !grid.cells[row][col].active;
  }

  this.startRow = row;
  this.startCol = col;

  this.grid$.next(grid);
}

export function  previewLine(grid: Grid) {
  if (this.startCol !== null && this.startRow !== null) {
    this.resetLine(grid);

    this.lastRow = this.currentRow;
    this.lastCol = this.currentCol;

    drawLine(this.startCol, this.startRow, this.lastCol, this.lastRow);
  }
}

export function resetLine(grid: Grid) {
  if (this.startCol !== null && this.startRow !== null && this.lastCol !== null && this.lastRow !== null) {
    drawLine(this.startCol, this.startRow, this.lastCol, this.lastRow);

    this.lastRow = null;
    this.lastCol = null;
  }
}

export function onKeydownEvent(event: KeyboardEvent) {
  if (event.key === 'Shift') {
    this.previewLine(this.grid$.value);
  }
}

export function onKeyupEvent(event: KeyboardEvent) {
  if (event.key === 'Shift') {
    this.resetLine(this.grid$.value);
  }
}
