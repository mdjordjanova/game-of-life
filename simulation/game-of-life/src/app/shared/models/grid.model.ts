import { Cell } from '../models/cell.model';

export interface IGrid {
  rows: number;
  cols: number;
}

export class Grid implements IGrid {
  rows: number;
  cols: number;
  cells: Cell[];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;

    this.cells = [];
    for (var i: number = 0; i < this.rows; i++) {
      this.cells[i] = [];
      for (var j: number = 0; j < this.cols; j++) {
        this.cells[i][j] = new Cell(false)
      }
    }
  }
}