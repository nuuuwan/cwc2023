export default class MatchDate {
  constructor(dateStr) {
    this.date = new Date(dateStr);
  }

  get label() {
    return this.date.toLocaleDateString();
  }

  get isWeekend() {
    return this.date.getDay() === 0 || this.date.getDay() === 6;
  }
}
