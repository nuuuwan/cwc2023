import Team from "./Team";
import Venue from "./Venue";
import Format from "../base/Format";
import MatchDate from "./MatchDate";

export default class ODI {
  constructor(date, team1, team2, venue) {
    this.date = new MatchDate(date);
    this.team1 = new Team(team1);
    this.team2 = new Team(team2);
    this.venue = new Venue(venue);
  }

  get id() {
    return `${this.date.label}-${this.team1.alpha3}-${this.team2.alpha3}`;
  }

  get title() {
    return `${this.team1.label} vs ${this.team2.label}`;
  }

  get pBoth() {
    return this.team1.pWinner + this.team2.pWinner;
  }

  get p1() {
    return this.team1.pWinner / this.pBoth;
  }

  get p2() {
    return this.team2.pWinner / this.pBoth;
  }

  get odds() {
    return `${Format.percent(this.p1)} to ${Format.percent(this.p2)}`;
  }

  get randomWinner() {
    return Math.random() < this.p1 ? this.team1 : this.team2;
  }

  getOther(winner) {
    if (winner === this.team1) {
      return this.team2;
    }
    if (winner === this.team2) {
      return this.team1;
    }
    throw new Error("Invalid winner");
  }
}
