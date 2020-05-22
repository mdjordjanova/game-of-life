import { Component } from '@angular/core';
import { Grid } from 'src/app/shared/models/grid.model';
import { BehaviorSubject, timer, Subscription, Observable } from 'rxjs';
import { GameOfLifeEngine } from 'src/app/shared/engines/game-of-life.engine';
import { gliderGunPattern } from 'src/app/shared/data/patterns/glider-gun';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clearPattern } from 'src/app/shared/data/patterns/clear';
import { ModalService } from 'src/app/shared/services/modal.service';
import { LocalStorage } from 'src/app/shared/utilities/object-storage';
import { translateToPattern } from 'src/app/shared/utilities/translate-to-pattern.utitlity';
import { LineChartSetup } from 'src/app/shared/models/chart.model';
import { patterns } from 'src/app/shared/data/constants/patterns';
import { Pattern } from 'src/app/shared/models/pattern.model';
import { PatternService } from 'src/app/shared/services/pattern.service';

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

  selectForm = this.formBuilder.group({ pattern: [new Pattern('', null)] });
  pattern = new Pattern('Gilder Gun', gliderGunPattern);
  patterns$: Observable<Pattern[]>

  saveForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['']
  });

  active = [];
  activeLabels = [];
  activeLineChartSetup = new LineChartSetup([{data: [], label: 'active cells'}], [], null);

  constructor(
    private engine: GameOfLifeEngine,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private patternService: PatternService) {
    this.grid.next(new Grid({ rows: 30, cols: 60 }, this.pattern.config));
    this.patterns$ = this.patternService.getPatterns();
    this.drawCharts();
  }

  start() {
    if (this.running) { return; }

    this.running = true;

    this.timeSub = timer(0, 100).subscribe(_ => {
      this.step();
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
    this.collectData();
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
    const newPattern = new Pattern(form.get('name').value, translateToPattern(this.grid.value));
    this.patternService.createPattern(newPattern);
  }

  resetForm(form: FormGroup) {
    form.get('name').setValue('');
  }

  collectData() {
    if (this.active.length > 40 && this.activeLabels.length > 40) {
      this.active.shift();
      this.activeLabels.shift();
    }

    this.active.push(this.grid.value.getCells('active').length);
    this.activeLabels.push(this.time.value);
  }

  drawCharts() {
    this.activeLineChartSetup = new LineChartSetup([{data: this.active, label: 'active cells'}], this.activeLabels);
  }

  resetCharts() {
    this.active = [];
    this.activeLabels = [];
    this.activeLineChartSetup = new LineChartSetup([{data: [], label: 'active cells'}], []);

    this.drawCharts();
  }
}
