export interface IChart { }

export class LineChartSetup implements IChart {
  data: [{data: number[], label: string}];
  labels: string[];
  options: Options;
  colors: [{ borderColor: string, backgroundColor: string }];
  legend: boolean;
  plugins: any;
  type = 'line';

  defaultOptions = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'grey',
        fontSize: 10
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'grey',
          fontSize: 10
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'grey',
          fontSize: 10
        }
      }]
    }
  }

  constructor(data: [{data: number[], label: string}], labels: string[], options?: Options,
    colors?: [{ borderColor: string, backgroundColor: string }], legend?: boolean, plugins?: any) {
      this.data = data;
      this.labels = labels;
      this.options = options ? options : this.defaultOptions;
      this.colors = colors ? colors : [{ borderColor: '#F6F4F2', backgroundColor: '#ACBFE6' }];
      this.legend = legend ? legend : true;
      this.plugins = plugins ? plugins : [];
      this.type = 'line';
    }
}

export class Options {
  responsive?: boolean;
  legend?: { labels: any };
  scales?: { yAxes?: any; xAxes?: any };
}

export class Color {
  borderColor: string;
  backgroundColor: string;

  constructor(borderColor: string, backgroundColor: string) {
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
  }
}
