import { Component, NgZone, Input, AfterViewInit, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
export class LineChartComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() data: BehaviorSubject<IChartData[]>;
  @Input() history: number = 40;
  private chart: am4charts.XYChart;
  @ViewChild('chartDiv') chartDiv: ElementRef<HTMLCanvasElement>;

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);

      this.chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);

      this.chart.hiddenState.properties.opacity = 0;

      this.chart.padding(0, 0, 0, 0);

      //this.chart.zoomOutButton.disabled = true;

      this.reset();

      const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      // dateAxis.renderer.grid.template.location = 0;
      // dateAxis.renderer.minGridDistance = 30;
      // dateAxis.dateFormats.setKey("hour", "ss");
      // dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
      //dateAxis.dateFormats.setKey("second", "MMMM");
      // dateAxis.dateFormatter.dateFormat = "ss";
      // // dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
      // // dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
      // dateAxis.renderer.inside = true;
      // dateAxis.renderer.axisFills.template.disabled = true;
      // dateAxis.renderer.ticks.template.disabled = true;

      const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.tooltip.disabled = true;
      valueAxis.interpolationDuration = 500;
      valueAxis.rangeChangeDuration = 5000;

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

      const seriesLive = this.chart.series.push(new am4charts.LineSeries());
      seriesLive.dataFields.dateX = 'time';
      seriesLive.dataFields.valueY = 'live';

      const seriesDied = this.chart.series.push(new am4charts.LineSeries());
      seriesDied.dataFields.dateX = 'time';
      seriesDied.dataFields.valueY = 'died';

      const seriesBorn = this.chart.series.push(new am4charts.LineSeries());
      seriesBorn.dataFields.dateX = 'time';
      seriesBorn.dataFields.valueY = 'born';

      this.chart.events.on("datavalidated", function () {
        dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
      });

      dateAxis.interpolationDuration = 500;
      dateAxis.rangeChangeDuration = 500;

      LineChartComponent.seriesStyle(seriesBorn, this.chart.colors.getIndex(0));
      LineChartComponent.seriesStyle(seriesDied, this.chart.colors.getIndex(9));
      // LineChartComponent.seriesStyle(seriesDied, this.chart.colors.getIndex(9));

      LineChartComponent.axisStyle(dateAxis);

      this.data.subscribe(data => {
        let length = (this.chart.data.length + data.length) - this.history;

        if (length < 0) length = 0;

        this.chart.addData(data, length);
      });
    });
  }

  private static seriesStyle(series: am4charts.LineSeries, color: am4core.Color) {
    series.interpolationDuration = 500;
    series.defaultState.transitionDuration = 0;
    series.tensionX = 0.8;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";

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

  ngOnInit() {
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
