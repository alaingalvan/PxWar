/**
 * Handles the management of timers.
 * Usage:
 * timer = new Timer();
 * timer.addTimer('shoot');
 * if (timer.done('shoot'))
 */
export class Timer {
  // Adds a timer with a given start time.
  addTimer(key: string, time = 1) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      writable: true,
      value: { cur: time, start: time }
    });
  }

  // Updates all the timers in this instance.
  update(deltaTime: number) {
    for (var key in this) {
      let that = this[key] as any;
      if (!isNaN(parseFloat(that.cur)) && isFinite(that.cur))
      that.cur -= deltaTime;
    }
  }

  // Checks if a given timer is done.
  done(key: string) {
    let that = this[key] as any;
    if (this[key])
      return this[key].cur <= 0;
    return false;
  }

  // Resets a timer to it's last set value.
  reset(key: string) {
    this[key].cur = this[key].start;
  }

  // Sets a timer to a given value.
  set(key: string, value: number) {
    this[key] = { cur: value, start: value };
  }

  // Gets the current value of a timer.
  get(key: string) {
    let that = this[key] as any;
    return that.cur;
  }

  remove(key: string) {
    delete this[key];
  }

}
