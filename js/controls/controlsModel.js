export default class ControlsModel {
  constructor(isRunning = false, time = 1000) {
    this._isRunning = isRunning;
    this._time = time;
  }

  get isRunning() {
    return this._isRunning;
  }
  set isRunning(value) {
    this._isRunning = value;
  }

  get time() {
    return this._time;
  }
  set time(value) {
    this._time = value;
  }
} 