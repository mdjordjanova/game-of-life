import { Component, ViewChild } from '@angular/core';
import { Grid } from 'src/app/shared/models/grid.model';
import { BehaviorSubject, timer, Subscription, Observable } from 'rxjs';
import { GameOfLifeEngine } from 'src/app/shared/engines/game-of-life.engine';
import { gliderGunPattern } from 'src/app/shared/data/patterns/glider-gun';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clearPattern } from 'src/app/shared/data/patterns/clear';
import { ModalService } from 'src/app/shared/services/modal.service';
import { LocalStorage } from 'src/app/shared/utilities/object-storage';
import { translateToPattern } from 'src/app/shared/utilities/translate-to-pattern.utitlity';
import { patterns } from 'src/app/shared/data/constants/patterns';
import { Pattern } from 'src/app/shared/models/pattern.model';
import { PatternService } from 'src/app/shared/services/pattern.service';
import { LineChartComponent, IChartData } from 'src/app/shared/components/line-chart/line-chart.component';

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
  chartData: BehaviorSubject<IChartData[]> = new BehaviorSubject<IChartData[]>([]);
  @ViewChild('lineChart') lineChart: LineChartComponent;

  selectForm = this.formBuilder.group({ pattern: [new Pattern('', null)] });
  pattern = new Pattern('Gilder Gun', gliderGunPattern);
  patterns$: Observable<Pattern[]>;

  saveForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['']
  });

  constructor(
    private engine: GameOfLifeEngine,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private patternService: PatternService) {
    this.grid.next(new Grid({ rows: 30, cols: 60 }, this.pattern.config));
    this.patterns$ = this.patternService.getPatterns();
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

    this.lineChart.reset();
  }

  clear() {
    stop();

    this.time.next(0);
    this.grid.next(new Grid({ rows: 30, cols: 60 }, clearPattern));
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

  updatePattern(pattern: Pattern) {
    this.patternService.updatePattern(pattern);
  }

  deletePattern(patternId: string) {
    this.patternService.deletePattern(patternId);
  }

  resetForm(form: FormGroup) {
    form.get('name').setValue('');
  }

  collectData() {
    this.chartData.next([{
      value: this.grid.value.getCells('active').length,
      label: this.time.value
    }]);
  }
}
