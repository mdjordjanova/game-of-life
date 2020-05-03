import { Component } from "@angular/core";
import { Grid } from 'src/app/shared/models/grid.model';

@Component({
  selector: 'app-simulation',
  styleUrls: ['./simulation.component.scss'],
  templateUrl: 'simulation.component.html'
})
export class SimulationComponent {
  grid = new Grid(30, 50);
}