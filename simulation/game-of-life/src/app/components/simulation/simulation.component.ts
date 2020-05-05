import { Component } from "@angular/core";
import { Grid } from 'src/app/shared/models/grid.model';
import { BehaviorSubject, timer, Subscription } from 'rxjs';
import { GameOfLifeEngine } from 'src/app/shared/engines/game-of-life.engine';

@Component({
  selector: 'app-simulation',
  styleUrls: ['./simulation.component.scss'],
  templateUrl: 'simulation.component.html'
})
export class SimulationComponent {
  grid = new BehaviorSubject(null);
  time = new BehaviorSubject(0);
  timeSub = new Subscription(null);

  constructor(private engine: GameOfLifeEngine) {
    this.grid.next(new Grid({rows: 30, cols: 30}));
  }

  start() {
    this.timeSub = timer(0, 1000).subscribe(_ => {
      this.time.next(this.time.value + 1);
      this.engine.run(this.grid);
    });
  }

  stop() {
    this.timeSub.unsubscribe();
  }

  reset() {
    this.timeSub.unsubscribe();
    this.time.next(0);
    this.grid.next(new Grid({rows: 30, cols: 30}));
  }
 }