import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grid } from '../models/grid.model';
import { Cell } from '../models/cell.model';
import { clone } from '../utilities/clone.utility';

@Injectable()
export class GameOfLifeEngine {

  run(grid$: BehaviorSubject<Grid>) {

    let grid = <Grid>clone(grid$.value);
    let updatedGrid = grid$.value;

    for (let i = 0; i < grid.cells.length; i++) {
      for (let j = 0; j < grid.cells[i].length; j++) {
        let activeNeighbours = this.getActiveNeighbours(grid.cells[i][j], grid).length;

        if (grid.cells[i][j].active) {

          if (activeNeighbours != 2 && activeNeighbours != 3) {
            updatedGrid.cells[i][j].active = false;
          }

        } else {

          if (activeNeighbours === 3) {
            updatedGrid.cells[i][j].active = true;
          }
        }
      }
    }

    grid$.next(updatedGrid);
  }

  private getNeighbours(cell: Cell, grid: Grid): Cell[] {
    const x = cell.coordinates.x;
    const y = cell.coordinates.y;
    const rows = grid.dimensions.rows;
    const cols = grid.dimensions.cols;

    let neighbours = [];
    if (y != 0) neighbours.push(grid.cells[x][y - 1]);
    if (y != cols - 1) neighbours.push(grid.cells[x][y + 1]);
    if (x != 0 && y != 0) neighbours.push(grid.cells[x - 1][y - 1]);
    if (x != 0) neighbours.push(grid.cells[x - 1][y]);
    if (x != 0 && y != cols - 1) neighbours.push(grid.cells[x - 1][y + 1]);
    if (x != rows - 1 && y != 0) neighbours.push(grid.cells[x + 1][y - 1]);
    if (x != rows - 1) neighbours.push(grid.cells[x + 1][y]);
    if (x != rows - 1 && y != cols - 1) neighbours.push(grid.cells[x + 1][y + 1]);

    return neighbours;
  }

  private getActiveNeighbours(cell: Cell, grid: Grid): Cell[] {
    let neighbours = this.getNeighbours(cell, grid);
    let activeNeigbours = [];

    for (let neighbour of neighbours) {
      if (neighbour.active) activeNeigbours.push(neighbour);
    }
    return activeNeigbours;
  }

  private isActive(cell: Cell): boolean {
    return cell.active;
  }

  private isEdge(cell: Cell, grid: Grid): boolean {
    if (cell.coordinates.x === 0 || cell.coordinates.y === 0) return true;
    if (cell.coordinates.x === grid.dimensions.rows - 1 || cell.coordinates.y === grid.dimensions.cols - 1) return true;
    return false;
  }

  private isCorner(cell: Cell, grid: Grid) {
    if (
      (cell.coordinates.x === 0 && cell.coordinates.y === 0) ||
      (cell.coordinates.x === 0 && cell.coordinates.y === grid.dimensions.cols - 1) ||
      (cell.coordinates.x === grid.dimensions.rows - 1 && cell.coordinates.y === 0) ||
      (cell.coordinates.x === grid.dimensions.rows - 1 && cell.coordinates.y === grid.dimensions.cols - 1)
    ) {
      return true;
    }
    return false;
  }
}
