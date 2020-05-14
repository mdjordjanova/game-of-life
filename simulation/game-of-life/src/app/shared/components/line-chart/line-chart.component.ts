import { Component, Input } from '@angular/core';
import { LineChartSetup } from '../../models/chart.model';

@Component({
  selector: 'app-line-chart',
  styleUrls: ['./line-chart.component.scss'],
  template: `
    <div>
      <canvas baseChart
        [datasets]="setup.data"
        [labels]="setup.labels"
        [options]="setup.options"
        [colors]="setup.colors"
        [legend]="setup.legend"
        [chartType]="setup.type"
        [plugins]="setup.plugins">
      </canvas>
    </div>
  `
})
export class LineChartComponent {
  @Input() setup: LineChartSetup;
}
