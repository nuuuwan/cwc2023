import { START_WEEK } from "../constants/CWC23_DATETIME";
export default class DateX {
  constructor(date) {
    this.date = date;
  }

  get ut() {
    return this.date.getTime() / 1000.0;
  }

  get weekAbsolute() {
    const SECONDS_IN_DAY = 86_400;
    return parseInt((this.ut + 3 * SECONDS_IN_DAY) / (7 * SECONDS_IN_DAY));
  }

  get week() {
    return this.weekAbsolute - START_WEEK + 1;
  }

  static now() {
    return new DateX(new Date());
  }
}
