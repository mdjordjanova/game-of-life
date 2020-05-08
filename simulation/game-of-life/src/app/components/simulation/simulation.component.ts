import { Component } from "@angular/core";
import { Grid } from 'src/app/shared/models/grid.model';
import { BehaviorSubject, timer, Subscription } from 'rxjs';
import { GameOfLifeEngine } from 'src/app/shared/engines/game-of-life.engine';
import { gliderGunPattern } from 'src/app/shared/data/patterns/glider-gun';
import { FormBuilder } from '@angular/forms';
import { exploderPattern } from 'src/app/shared/data/patterns/exploder';
import { favoritePattern } from 'src/app/shared/data/patterns/favorite';
import { clearPattern } from 'src/app/shared/data/patterns/clear';

@Component({
  selector: 'app-simulation',
  styleUrls: ['./simulation.component.scss'],
  templateUrl: 'simulation.component.html'
})
export class SimulationComponent {
  grid = new BehaviorSubject(null);
  time = new BehaviorSubject(0);
  timeSub = new Subscription(null);

  form = this.formBuilder.group({ pattern: [{ name: '', config: null }] });
  pattern = { name: 'gilderGun', config: gliderGunPattern };
  patterns = [
    { name: 'Gilder Gun', config: gliderGunPattern },
    { name: 'Exploder', config: exploderPattern },
    { name: 'Favorite', config: favoritePattern },
    { name: 'Clear', config: clearPattern },
  ];

  constructor(
    private engine: GameOfLifeEngine,
    private formBuilder: FormBuilder) {
    this.grid.next(new Grid({ rows: 30, cols: 60 }, this.pattern.config));
  }

  start() {
    this.timeSub = timer(0, 100).subscribe(_ => {
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
    this.grid.next(new Grid({ rows: 30, cols: 60 }, this.pattern.config));
  }

  onChange(event: any) {
    this.pattern = this.patterns[event.target.value];
    this.reset();
  }
}
