import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../models/time.model';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(seconds: number): string {
    const time = new Time(seconds);
    return time.toString();
  }
}
