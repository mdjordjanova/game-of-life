import { Component } from "@angular/core";
import { Grid } from 'src/app/shared/models/grid.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-simulation',
  styleUrls: ['./simulation.component.scss'],
  templateUrl: 'simulation.component.html'
})
export class SimulationComponent {
  grid = new BehaviorSubject(null);

  constructor() {
    this.grid.next(new Grid(30, 30));
  }
}