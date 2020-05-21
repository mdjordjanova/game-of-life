export interface IPattern {
  name: string;
}

export class Pattern implements IPattern {
  name: string;
  config: string[];

  constructor(name: string, config: string[]) {
    this.name = name;
    this.config = config;
  }
}
