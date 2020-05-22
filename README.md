# Game Of Life

[![Watch the animation](https://firebasestorage.googleapis.com/v0/b/lexi-tst.appspot.com/o/dynamic-chart.png?alt=media)](https://firebasestorage.googleapis.com/v0/b/lexi-tst.appspot.com/o/dynamic-chart.gif?alt=media)

## Rules
Game of Life is an infinite, two-dimensional grid of square cells, each of which is in one of two possible states, alive or dead, (or populated and unpopulated). Every cell interacts with its eight neighbours. At each step in time, the following transitions occur:
* Any live cell with fewer than two live neighbours dies, because of underpopulation.
* Any live cell with two or three live neighbours lives on the next generation.
* Any live cell with more than three live neighbours dies, because of overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Thus,
* Any live cell with two or three live neighbours survives.
* Any dead cell with three live neighbours becomes a live cell.
* All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Resources
* [Chart.js plugin for live streaming data.](https://nagix.github.io/chartjs-plugin-streaming/)
