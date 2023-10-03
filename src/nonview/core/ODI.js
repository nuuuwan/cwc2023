import Team from "./Team";
import Venue from "./Venue";
import Format from "../base/Format";
import MatchDate from "./MatchDate";

export default class ODI {
  constructor(id, date, team1, team2, venue) {
    this.id = id;
    this.date = new MatchDate(date);
    this.team1 = new Team(team1);
    this.team2 = new Team(team2);
    this.venue = new Venue(venue);
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
    const q = Math.sqrt(this.p1) / (Math.sqrt(this.p1) + Math.sqrt(this.p2));
    return Math.random() < q ? this.team1 : this.team2;
  }

  get maximumLikelihoodWinner() {
    return this.p1 > this.p2 ? this.team1 : this.team2;
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

  get favorite() {
    return this.p1 > this.p2 ? this.team1 : this.team2;
  }
  get notFavorite() {
    return this.p1 > this.p2 ? this.team2 : this.team1;
  }
}
