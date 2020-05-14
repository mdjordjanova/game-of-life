export interface IChart { }

export class LineChartSetup implements IChart {
  data: [{data: number[], label: string}];
  labels: string[];
  options: {responsive: boolean};
  colors: [{ borderColor: string, backgroundColor: string }];
  legend: boolean;
  plugins: any;
  type = 'line';

  constructor() {}
}
