import { Component } from "@angular/core";
import { Grid } from 'src/app/shared/models/grid.model';
import { BehaviorSubject } from 'rxjs';
import { GameOfLifeEngine } from 'src/app/shared/engines/game-of-life.engine';

@Component({
  selector: 'app-simulation',
  styleUrls: ['./simulation.component.scss'],
  templateUrl: 'simulation.component.html'
})
export class SimulationComponent {
  grid = new BehaviorSubject(null);
  dimensions = {rows: 30, cols: 30}
  running = new BehaviorSubject(false);

  constructor(private engine: GameOfLifeEngine) {
    this.grid.next(new Grid(this.dimensions));
  }

  start() {
    this.engine.run(this.grid);
  }

  stop() {
    this.running.next(false);
  }

  reset() {
    this.grid.next(new Grid(this.dimensions));
  }
 }