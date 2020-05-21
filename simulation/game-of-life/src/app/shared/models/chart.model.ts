import { defaultOptions } from '../data/constants/charts';
import { ColorPallete } from '../data/constants/colors';

export interface IChart {
  data: ChartData[];
}

export class LineChartSetup implements IChart {
  data: ChartData[];
  labels: string[];
  options: ChartOptions;
  colors: ChartColor[];
  legend: boolean;
  plugins: any;
  type = 'line';

  constructor(data: ChartData[], labels: string[], options?: ChartOptions, colors?: ChartColor[], legend?: boolean, plugins?: any) {
      this.data = data;
      this.labels = labels;
      this.options = options ? options : defaultOptions;
      this.colors = colors ? colors : [ new ChartColor(ColorPallete.blue.tertiary, ColorPallete.blue.tertiary)];
      this.legend = legend ? legend : true;
      this.plugins = plugins ? plugins : [];
      this.type = 'line';
    }
}

export class ChartData {
  data: number[];
  label: string;

  constructor(data: number[], label: string) {
    this.data = data;
    this.label = label;
  }
}

export class ChartOptions {
  responsive?: boolean;
  legend?: { labels: any };
  scales?: { yAxes?: any; xAxes?: any };
}

export class ChartColor {
  borderColor: string;
  backgroundColor: string;

  constructor(borderColor: string, backgroundColor: string) {
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
  }
}
