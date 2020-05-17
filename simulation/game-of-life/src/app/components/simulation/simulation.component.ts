import { Component } from '@angular/core';
import { Grid } from 'src/app/shared/models/grid.model';
import { BehaviorSubject, timer, Subscription } from 'rxjs';
import { GameOfLifeEngine } from 'src/app/shared/engines/game-of-life.engine';
import { gliderGunPattern } from 'src/app/shared/data/patterns/glider-gun';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { exploderPattern } from 'src/app/shared/data/patterns/exploder';
import { favoritePattern } from 'src/app/shared/data/patterns/favorite';
import { clearPattern } from 'src/app/shared/data/patterns/clear';
import { ModalService } from 'src/app/shared/services/modal.service';
import { LocalStorage } from 'src/app/shared/utilities/object-storage';
import { translateToPattern } from 'src/app/shared/utilities/translate-to-pattern.utitlity';
import { tenCellInfiniteGrowth } from 'src/app/shared/data/patterns/10-cell-infiinite-growth';
import { oneHundredOnePattern } from 'src/app/shared/data/patterns/101';
import { smallExploderPattern } from 'src/app/shared/data/patterns/small-exploder';
import { glidersPattern } from 'src/app/shared/data/patterns/gliders';
import { seventeenC45Reaction } from 'src/app/shared/data/patterns/17c45_reaction';
import { twoFumaroles } from 'src/app/shared/data/patterns/fumaroles';
import { pattern_22p36 } from 'src/app/shared/data/patterns/22p36';
import { LineChartSetup } from 'src/app/shared/models/chart.model';

@Component({
  selector: 'app-simulation',
  styleUrls: ['./simulation.component.scss'],
  templateUrl: 'simulation.component.html'
})
export class SimulationComponent {
  grid = new BehaviorSubject<Grid>(null);
  time = new BehaviorSubject(0);
  timeSub = new Subscription(null);
  running = false;

  selectForm = this.formBuilder.group({ pattern: [{ name: '', config: null }] });
  pattern = { name: 'Gilder Gun', config: gliderGunPattern };
  patterns = [
    { name: 'Gilder Gun', config: gliderGunPattern },
    { name: 'Exploder', config: exploderPattern },
    { name: 'Small Exploder', config: smallExploderPattern },
    { name: 'Gliders', config: glidersPattern },
    { name: '10 Cell Infinite Growth', config: tenCellInfiniteGrowth },
    { name: '101', config: oneHundredOnePattern },
    { name: '17c45 Reaction', config: seventeenC45Reaction },
    { name: '2 Fumaroles', config: twoFumaroles },
    { name: '22p36', config: pattern_22p36 },
    { name: 'Clear', config: clearPattern },
  ];

  saveForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['']
  });

  active = [];
  activeLabels = [];
  activeLineChartSetup = new LineChartSetup([{data: [], label: 'active cells'}], [], null,
    [{ borderColor: '#ACBFE6', backgroundColor: '#ACBFE6' }]);

  inactive = [];
  inactiveLabels = [];
  inactiveLineChartSetup = new LineChartSetup([{data: [], label: 'inactive cells'}], [], null,
    [{ borderColor: '#F8E5E5', backgroundColor: '#F8E5E5' }]);

  constructor(
    private engine: GameOfLifeEngine,
    private formBuilder: FormBuilder,
    private modalService: ModalService) {
    this.grid.next(new Grid({ rows: 30, cols: 60 }, this.pattern.config));
    this.patterns = this.patterns.concat(LocalStorage.getItem('patterns', []));
    this.drawCharts();
  }

  start() {
    if (this.running) { return; }

    this.running = true;

    this.timeSub = timer(0, 100).subscribe(_ => {
      this.time.next(this.time.value + 1);
      this.engine.run(this.grid);
      this.collectData();
    });
  }

  stop() {
    this.timeSub.unsubscribe();
    this.running = false;
  }

  reset() {
    stop();

    this.time.next(0);
    this.grid.next(new Grid({ rows: 30, cols: 60 }, this.pattern.config));

    this.resetCharts();
  }

  clear() {
    stop();

    this.time.next(0);
    this.grid.next(new Grid({ rows: 30, cols: 60 }, clearPattern));

    this.resetCharts();
  }

  step() {
    this.time.next(this.time.value + 1);
    this.engine.run(this.grid);
  }

  onChange(event: any, patterns: any) {
    this.pattern = patterns[event.target.value];
    this.reset();
  }

  openModal(id: string) {
    this.resetForm(this.saveForm);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  savePattern(form: FormGroup) {
    const newPattern = {name: form.get('name').value, config: translateToPattern(this.grid.value)};

    const customPatterns = LocalStorage.getItem('patterns', []);

    customPatterns.push(newPattern);
    LocalStorage.setItem('patterns', customPatterns);

    this.patterns.push(newPattern);
  }

  resetForm(form: FormGroup) {
    form.get('name').setValue('');
  }

  collectData() {
    this.active.push(this.grid.value.getCells('active').length);
    this.activeLabels.push(this.time.value);

    this.inactive.push(this.grid.value.getCells('inactive').length);
    this.inactiveLabels.push(this.time.value);
  }

  drawCharts() {
    this.activeLineChartSetup = new LineChartSetup([{data: this.active, label: 'active cells'}], this.activeLabels);
    this.activeLineChartSetup.colors = [{ borderColor: '#ACBFE6', backgroundColor: '#ACBFE6' }];

    this.inactiveLineChartSetup = new LineChartSetup([{data: this.inactive, label: 'inactive cells'}], this.inactive);
    this.inactiveLineChartSetup.colors = [{ borderColor: '#F8E5E5', backgroundColor: '#F8E5E5' }];
  }

  resetCharts() {
    this.active = [];
    this.activeLabels = [];
    this.activeLineChartSetup = new LineChartSetup([{data: [], label: 'active cells'}], []);
    this.activeLineChartSetup.colors = [{ borderColor: '#ACBFE6', backgroundColor: '#ACBFE6' }];

    this.inactive = [];
    this.inactiveLabels = [];
    this.inactiveLineChartSetup = new LineChartSetup([{data: [], label: 'inactive cells'}], []);
    this.inactiveLineChartSetup.colors = [{ borderColor: '#F8E5E5', backgroundColor: '#F8E5E5' }];

    this.drawCharts();
  }
}
