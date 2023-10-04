import Team from "./Team";
import Venue from "./Venue";
import Format from "../base/Format";
import MatchDate from "./MatchDate";

export default class ODI {
  constructor(
    id,
    date,
    team1,
    team2,
    venue,
    winner = null,
    odds1 = null,
    odds2 = null
  ) {
    this.id = id;
    this.date = new MatchDate(date);
    this.team1 = new Team(team1);
    this.team2 = new Team(team2);
    this.venue = new Venue(venue);
    this.winner = winner ? new Team(winner) : null;
    this.odds1 = odds1;
    this.odds2 = odds2;
  }

  get title() {
    return `${this.team1.label} vs ${this.team2.label}`;
  }

  get pBothWinner() {
    return this.team1.pWinner + this.team2.pWinner;
  }

  get p1Winner() {
    return this.team1.pWinner / this.pBothWinner;
  }

  get p2Winner() {
    return this.team2.pWinner / this.pBothWinner;
  }

  get p1Odds() {
    return this.odds2 / (this.odds1 + this.odds2);
  }

  get p2Odds() {
    return this.odds1 / (this.odds1 + this.odds2);
  }

  get hasOdds() {
    return this.odds1 !== null && this.odds2 !== null;
  }

  get p1() {
    if (this.hasOdds) {
      return this.p1Odds;
    }
    return this.p1Winner;
  }

  get p2() {
    if (this.hasOdds) {
      return this.p2Odds;
    }
    return this.p2Winner;
  }

  get odds() {
    return `${Format.percent(this.p1)} to ${Format.percent(this.p2)}`;
  }

  get randomWinner() {
    if (this.winner) {
      return this.winner;
    }
    const f = (x) => x + 0.5;
    const q = f(this.p1) / (f(this.p1) + f(this.p2));
    return Math.random() < q ? this.team1 : this.team2;
  }

  get maximumLikelihoodWinner() {
    if (this.winner) {
      return this.winner;
    }
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

  get isConcluded() {
    return !!this.winner;
  }

  getColor(winner) {
    const pWinner = winner === this.team1 ? this.p1 : this.p2;
    if (pWinner <= 0.33) {
      return "#f00";
    }
    if (pWinner >= 0.67) {
      return "#080";
    }
    return "#f80";
  }

  getP(team) {
    if (team === this.team1) {
      return this.p1;
    }
    if (team === this.team2) {
      return this.p2;
    }
    throw new Error("Invalid team");
  }
}
