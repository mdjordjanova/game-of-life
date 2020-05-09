import { Grid } from '../models/grid.model';

export function translateToPattern(grid: Grid): string[] {
  const pattern = [];

  for (let i = 0; i < grid.dimensions.rows; i++) {
    let row = '';
    for (let j = 0; j < grid.dimensions.cols; j++) {
      row = row.concat(grid.cells[i][j].active ? 'X' : '.');
    }
    pattern.push(row);
  }

  return pattern;
}
