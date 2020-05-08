import { Coordinates } from './dimensions.model';

export interface ICell {
  active?: boolean;
}

export class Cell implements ICell {
  coordinates: Coordinates;
  active?: boolean;

  constructor(coordinates: Coordinates, active: boolean) {
    this.coordinates = coordinates;
    this.active = active;
  }

  toString() {
    return '{active: ' + this.active + '}';
  }
}
