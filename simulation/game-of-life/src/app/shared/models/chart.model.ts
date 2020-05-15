export interface IChart { }

export class LineChartSetup implements IChart {
  data: [{data: number[], label: string}];
  labels: string[];
  options: {responsive: boolean};
  colors: [{ borderColor: string, backgroundColor: string }];
  legend: boolean;
  plugins: any;
  type = 'line';

  constructor(data: [{data: number[], label: string}], labels: string[], options?: {responsive: boolean},
    colors?: [{ borderColor: string, backgroundColor: string }], legend?: boolean, plugins?: any) {
      this.data = data;
      this.labels = labels;
      this.options = options ? options : {responsive: true};
      this.colors = colors ? colors : [{ borderColor: '#F6F4F2', backgroundColor: '#ACBFE6' }];
      this.plugins = plugins ? plugins : [];
      this.type = 'line';
    }
}
