/**
 * Clock for managing Game Loop
 */
export class Clock {
  running: boolean;
  startTime: number;
  oldTime: number;
  elapsedTime: number;
  constructor(public autoStart = true) {
    this.running = false;
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    if (this.autoStart)
      this.start();
  }
  start() {
    this.startTime = self.performance.now();
    this.oldTime = this.startTime;
    this.running = true;
  }
  stop() {
    this.getElapsedTime();
    this.running = false;
  }
  getElapsedTime() {
    this.deltaTime();
    return this.elapsedTime;
  }
  deltaTime() {
    var diff = 0;
    if (this.autoStart && !this.running)
      this.start();
    if (this.running) {
      var newTime = self.performance.now();
      diff = 0.001 * (newTime - this.oldTime);
      this.oldTime = newTime;
      this.elapsedTime += diff;
    }
    return diff;
  }
}
