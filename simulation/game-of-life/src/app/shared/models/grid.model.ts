import { Cell } from '../models/cell.model';
import { Dimensions } from './dimensions.model';

export interface IGrid {
  dimensions: Dimensions;
}

export class Grid implements IGrid {
  dimensions: Dimensions;
  cells: Cell[][];

  constructor(dimensions: Dimensions) {
    this.dimensions = dimensions

    this.cells = [];
    for (var i: number = 0; i < this.dimensions.rows; i++) {
      this.cells[i] = new Array<Cell>(this.dimensions.cols);
      for (var j: number = 0; j < this.dimensions.cols; j++) {
        this.cells[i][j] = new Cell({x: i, y: j}, false)
      }
    }
  }
}