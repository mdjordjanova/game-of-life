import { Cell } from '../models/cell.model';
import { Dimensions } from './dimensions.model';
import { clone } from '../utilities/clone.utility';

export interface IGrid {
  dimensions: Dimensions;
}

export class Grid implements IGrid {
  dimensions: Dimensions;
  cells: Cell[][];

  constructor(dimensions: Dimensions, pattern: string[] = null) {
    this.dimensions = dimensions;

    this.cells = [];
    for (let i = 0; i < this.dimensions.rows; i++) {
      this.cells[i] = new Array<Cell>(this.dimensions.cols);
      for (let j = 0; j < this.dimensions.cols; j++) {
        this.cells[i][j] = new Cell({ x: i, y: j }, pattern[i][j] !== '.');
      }
    }
  }

  getCells(condition: string): Cell[] {
    return condition === 'active' ? this.getActiveCells() : this.getInactiveCells();
  }

  getActiveCells(): Cell[] {
    const cells = clone(this.cells);
    const selectedCells = [];

    for (let i = 0; i < this.dimensions.rows; i++) {
      for (let j = 0; j < this.dimensions.cols; j++) {
        if (cells[i][j].active) {
          selectedCells.push(cells[i][j]);
        }
      }
    }

    return selectedCells;
  }

  getInactiveCells(): Cell[] {
    const cells = clone(this.cells);
    const selectedCells = [];

    for (let i = 0; i < this.dimensions.rows; i++) {
      for (let j = 0; j < this.dimensions.cols; j++) {
        if (!cells[i][j].active) {
          selectedCells.push(cells[i][j]);
        }
      }
    }

    return selectedCells;
  }

  // https://www.freecodecamp.org/news/how-to-code-your-first-algorithm-draw-a-line-ca121f9a1395/
  // Bresenham’s Algorithm
  drawLine(x1: number, y1: number, x2: number, y2: number, invert: boolean = true) {
    // Iterators, counters required by algorithm
    let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;

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

}
