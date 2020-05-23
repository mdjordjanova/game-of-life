export class ChartData {
  data: number[];
  label: string;

  constructor(data: number[], label: string) {
    this.data = data;
    this.label = label;
  }
}

export class ChartColor {
  borderColor: string;
  backgroundColor: string;

  constructor(borderColor: string, backgroundColor: string) {
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
  }
}
