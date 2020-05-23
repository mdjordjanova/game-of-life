import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  styleUrls: ['./line-chart.component.scss'],
  template: `
    <div></div>
  `
})
export class LineChartComponent {
  @Input() data: BehaviorSubject<any[]>;

  ngOnInit() {
    this.data.subscribe(data => {
      console.log(data);
    });
  }

  reset() {

  }
}
