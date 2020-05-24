import { Component, NgZone, Input, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export interface IChartData {
  time: number;
  live: number;
  born: number;
  died: number;
}

@Component({
  selector: 'app-line-chart',
  styleUrls: ['./line-chart.component.scss'],
  template: `
    <div #chartDiv class="chart" id="chartdiv"></div>
  `
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  @Input() data: BehaviorSubject<IChartData[]>;
  @Input() history: number = 40;
  @Input() live: boolean = false;
  @Input() died: boolean = false;
  @Input() born: boolean = false;
  @Input() fontSize: number = 11;

  private chart: am4charts.XYChart;
  @ViewChild('chartDiv') chartDiv: ElementRef<HTMLCanvasElement>;

  get zoomOutButton(): boolean {
    return !this.chart.zoomOutButton.disabled;
  }

  set zoomOutButton(value: boolean) {
    this.chart.zoomOutButton.disabled = !value;
  }

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);

      this.chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);
      this.chart.hiddenState.properties.opacity = 0;
      this.chart.padding(0, 0, 0, 0);
      this.chart.zoomOutButton.disabled = false;
      this.chart.fontSize = this.fontSize;

      this.chart.zoomOutButton.fontSize = this.fontSize;
      this.chart.zoomOutButton.marginRight = -50;

      this.chart.legend = new am4charts.Legend();
      this.chart.legend.useDefaultMarker = true;
      this.chart.legend.position = 'right';

      const marker = this.chart.legend.markers.template.children.getIndex(0);
      (marker as any).cornerRadius(12, 12, 12, 12);
      marker.strokeWidth = 2;
      marker.strokeOpacity = 1;
      marker.stroke = am4core.color("#ccc");

      this.reset();

      const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.tooltip.fontSize = this.fontSize;

      const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.interpolationDuration = 500;
      valueAxis.rangeChangeDuration = 5000;
      valueAxis.tooltip.fontSize = this.fontSize;

      valueAxis.renderer.inside = true;
      valueAxis.renderer.minLabelPosition = 0.05;
      valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis.renderer.axisFills.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;
      valueAxis.extraMin = 0.2;
      valueAxis.extraMax = 0.2;

      // valueAxis.min = -100;
      // valueAxis.max = +100;

      this.chart.cursor = new am4charts.XYCursor();
      this.chart.cursor.xAxis = dateAxis;

      if (this.live) {
        const series = this.chart.series.push(new am4charts.LineSeries());
        series.name = 'Alive';
        series.dataFields.dateX = 'time';
        series.dataFields.valueY = 'live';
        LineChartComponent.seriesStyle(series, this.fontSize, this.chart.colors.getIndex(0));
      }

      if (this.died) {
        const series = this.chart.series.push(new am4charts.LineSeries());
        series.name = 'Died';
        series.dataFields.dateX = 'time';
        series.dataFields.valueY = 'died';
        LineChartComponent.seriesStyle(series, this.fontSize, this.chart.colors.getIndex(8));
      }

      if (this.born) {
        const series = this.chart.series.push(new am4charts.LineSeries());
        series.name = 'Born';
        series.dataFields.dateX = 'time';
        series.dataFields.valueY = 'born';
        LineChartComponent.seriesStyle(series, this.fontSize, this.chart.colors.getIndex(18));
      }

      this.chart.events.on("datavalidated", function () {
        dateAxis.zoom({ start: 1 / 10, end: 1.1 }, false, true);
      });

      dateAxis.interpolationDuration = 500;
      dateAxis.rangeChangeDuration = 500;

      LineChartComponent.axisStyle(dateAxis);

      this.data.subscribe(data => {
        let length = (this.chart.data.length + data.length) - this.history;

        if (length < 0) length = 0;

        this.chart.addData(data, length);
      });
    });
  }

  private static seriesStyle(series: am4charts.LineSeries, fontSize: number, color: am4core.Color) {
    series.interpolationDuration = 500;
    series.defaultState.transitionDuration = 0;
    series.tensionX = 0.8;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.fontSize = fontSize;
    series.stroke = color;

    // all the below is optional, makes some fancy effects
    // gradient fill of the series
    series.fillOpacity = 1;
    const gradient = new am4core.LinearGradient();
    gradient.addColor(color, 0.2);
    gradient.addColor(color, 0);
    series.fill = gradient;

    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = color;
    series.tooltip.opacity = 0.6;
    series.tooltip.background.opacity = 0.6;

    // bullet at the front of the line
    var bullet = series.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 5;
    bullet.fillOpacity = 1;
    bullet.fill = color;
    bullet.isMeasured = false;

    series.events.on("validated", function () {
      if (series.dataItems.last) {
        bullet.moveTo(series.dataItems.last.point);
        bullet.validatePosition();
      }
    });
  }

  private static axisStyle(dateAxis: am4charts.DateAxis<am4charts.AxisRenderer>) {

    // this makes date axis labels to fade out
    dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
      var dataItem = target.dataItem;
      return dataItem.position;
    })
    dateAxis.renderer.labels.template.adapter.add("textOutput", (value, target: any) => {
      return `${target.dataItem.value}`;
    });

    // need to set this, otherwise fillOpacity is not changed and not set
    dateAxis.events.on("validated", function () {
      am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
        label.fillOpacity = label.fillOpacity;
      })
    })
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  reset() {
    const data: IChartData[] = [];

    for (let index = 0; index < this.history; index++) {
      data.push({
        time: -(this.history - index),
        live: 0,
        born: 0,
        died: 0
      });
    }

    this.chart.data = data;
  }
}
