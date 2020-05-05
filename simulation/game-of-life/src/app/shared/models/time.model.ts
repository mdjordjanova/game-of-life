export class Time {
  seconds: number;
  minutes: number;
  hours: number;

  constructor(seconds: number) {
    this.hours = Math.floor(seconds/3600);
    seconds = seconds - this.hours * 3600;

    this.minutes = Math.floor(seconds/60);
    this.seconds = (seconds - this.minutes * 60) % 60;
  }

  toString() {
    const hours = this.hours < 10 ? '0' + this.hours : '' + this.hours;
    const minutes = this.minutes < 10 ? '0' + this.minutes : '' + this.minutes;
    const seconds = this.seconds < 10 ? '0' + this.seconds : '' + this.seconds;

    return '' + hours + ':' + minutes + ':' + seconds;
  }
}