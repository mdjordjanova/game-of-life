import { Pipe } from "@angular/core";
import { Time } from '../models/time.model';

@Pipe({
  name: 'time'
})
export class TimePipe {
  
  transform(seconds: number): string {
    const time = new Time(seconds);
    return time.toString();
  }
}