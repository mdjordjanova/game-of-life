import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grid } from '../models/grid.model';
import { Cell } from '../models/cell.model';
import { clone } from '../utilities/clone.utility';

export interface IStats {
  live: number;
  born: number;
  died: number;
}

@Injectable()
export class GameOfLifeEngine {

  run(grid$: BehaviorSubject<Grid>) {
    const stats: IStats = {
      live: 0,
      born: 0,
      died: 0
    };

    const grid = clone(grid$.value) as Grid;
    const updatedGrid = grid$.value;

    for (let i = 0; i < grid.cells.length; i++) {
      for (let j = 0; j < grid.cells[i].length; j++) {
        const activeNeighbours = this.getActiveNeighbours(grid.cells[i][j], grid).length;
        const updatedCell = updatedGrid.cells[i][j];

        if (grid.cells[i][j].active) {

          if (activeNeighbours !== 2 && activeNeighbours !== 3) {
            if (updatedCell.active) stats.died++;

            updatedGrid.cells[i][j].active = false;
          }

        } else {

          if (activeNeighbours === 3) {
            if (!updatedCell.active) stats.born++;

            updatedCell.active = true;
          }
        }

        if (updatedCell.active) stats.live++;
      }
    }

    grid$.next(updatedGrid);

    return stats;
  }

  private getNeighbours(cell: Cell, grid: Grid): Cell[] {
    const x = cell.coordinates.x;
    const y = cell.coordinates.y;
    const rows = grid.dimensions.rows;
    const cols = grid.dimensions.cols;

    const neighbours = [];
    if (y !== 0) { neighbours.push(grid.cells[x][y - 1]); }
    if (y !== cols - 1) { neighbours.push(grid.cells[x][y + 1]); }
    if (x !== 0 && y !== 0) { neighbours.push(grid.cells[x - 1][y - 1]); }
    if (x !== 0) { neighbours.push(grid.cells[x - 1][y]); }
    if (x !== 0 && y !== cols - 1) { neighbours.push(grid.cells[x - 1][y + 1]); }
    if (x !== rows - 1 && y !== 0) { neighbours.push(grid.cells[x + 1][y - 1]); }
    if (x !== rows - 1) { neighbours.push(grid.cells[x + 1][y]); }
    if (x !== rows - 1 && y !== cols - 1) { neighbours.push(grid.cells[x + 1][y + 1]); }

    return neighbours;
  }

  private getActiveNeighbours(cell: Cell, grid: Grid): Cell[] {
    const neighbours = this.getNeighbours(cell, grid);
    const activeNeigbours = [];

    for (const neighbour of neighbours) {
      if (neighbour.active) { activeNeigbours.push(neighbour); }
    }
    return activeNeigbours;
  }

  private isActive(cell: Cell): boolean {
    return cell.active;
  }

  private isEdge(cell: Cell, grid: Grid): boolean {
    if (cell.coordinates.x === 0 || cell.coordinates.y === 0) { return true; }
    if (cell.coordinates.x === grid.dimensions.rows - 1 || cell.coordinates.y === grid.dimensions.cols - 1) { return true; }
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
