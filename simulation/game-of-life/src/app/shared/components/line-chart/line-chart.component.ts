import { Component, NgZone, Input, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export interface IChartData {
  label: number;
  value: number;
}

@Component({
  selector: 'app-line-chart',
  styleUrls: ['./line-chart.component.scss'],
  template: `
    <div class="chart" id="chartdiv"></div>
  `
})
export class LineChartComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() data: BehaviorSubject<IChartData[]>;
  @Input() history: number = 40;
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      am4core.useTheme(am4themes_animated);

      this.chart = am4core.create("chartdiv", am4charts.XYChart);

      this.chart.hiddenState.properties.opacity = 0;

      this.chart.padding(0, 0, 0, 0);

      this.chart.zoomOutButton.disabled = true;

      this.reset();

      const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      // dateAxis.renderer.grid.template.location = 0;
      // dateAxis.renderer.minGridDistance = 30;
      // dateAxis.dateFormats.setKey("hour", "ss");
      // dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
      //dateAxis.dateFormats.setKey("second", "MMMM");
      dateAxis.dateFormatter.dateFormat = "ss";
      // // dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
      // // dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
      // dateAxis.renderer.inside = true;
      // dateAxis.renderer.axisFills.template.disabled = true;
      // dateAxis.renderer.ticks.template.disabled = true;

      const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.interpolationDuration = 500;
      valueAxis.rangeChangeDuration = 500;
      valueAxis.renderer.inside = true;
      valueAxis.renderer.minLabelPosition = 0.05;
      valueAxis.renderer.maxLabelPosition = 0.95;
      valueAxis.renderer.axisFills.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;
      valueAxis.min = 0;
      valueAxis.max = 200;

      const series = this.chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'label';
      series.dataFields.valueY = 'value';
      series.interpolationDuration = 500;
      series.defaultState.transitionDuration = 0;
      series.tensionX = 0.8;

      this.chart.events.on("datavalidated", function () {
        dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
      });

      dateAxis.interpolationDuration = 500;
      dateAxis.rangeChangeDuration = 500;

      LineChartComponent.setupEffects(series, this.chart.colors, dateAxis);

      this.data.subscribe(data => {
        let length = (this.chart.data.length + data.length) - this.history;

        if (length < 0) length = 0;

        this.chart.addData(data, length);
      });
    });
  }

  private static setupEffects(series: am4charts.LineSeries, colors: am4core.ColorSet, dateAxis: am4charts.DateAxis<am4charts.AxisRenderer>) {
    // all the below is optional, makes some fancy effects
    // gradient fill of the series
    series.fillOpacity = 1;
    var gradient = new am4core.LinearGradient();
    gradient.addColor(colors.getIndex(0), 0.2);
    gradient.addColor(colors.getIndex(0), 0);
    series.fill = gradient;

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

    // bullet at the front of the line
    var bullet = series.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 5;
    bullet.fillOpacity = 1;
    bullet.fill = colors.getIndex(0);
    bullet.isMeasured = false;

    series.events.on("validated", function () {
      if (series.dataItems.last) {
        bullet.moveTo(series.dataItems.last.point);
        bullet.validatePosition();
      }
    });
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
    const data = [];

    for (let index = 0; index < this.history; index++) {
      data.push({
        label: -(this.history - index),
        value: 0
      });
    }

    this.chart.data = data;
  }
}
