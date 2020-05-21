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
}
