export interface ICell {
  active?: boolean;
}

export class Cell implements ICell {
  active?: boolean;

  constructor(active: boolean) {
    this.active = active;
  }

  toString() {
    return '{active: ' + this.active + '}';
  }
}