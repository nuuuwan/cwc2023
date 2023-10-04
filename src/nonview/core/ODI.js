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
    this.team1 = team1;
    this.team2 = team2;
    this.venue = new Venue(venue);
    this.winner = winner ? winner : null;
    this.odds1 = odds1;
    this.odds2 = odds2;
  }

  get title() {
    return `${this.team1.label} vs ${this.team2.label}`;
  }

  get hasWinner() {
    return !!this.winner;
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
    return 1 / this.odds1 / (1 / this.odds1 + 1 / this.odds2);
  }

  get p2Odds() {
    return 1 / this.odds2 / (1 / this.odds1 + 1 / this.odds2);
  }

  get hasOdds() {
    return this.odds1 !== null && this.odds2 !== null;
  }

  get p1() {
    if (this.hasWinner) {
      return this.winner === this.team1 ? 1 : 0;
    }
    if (this.hasOdds) {
      return this.p1Odds;
    }
    return this.p1Winner;
  }

  get p2() {
    if (this.hasWinner) {
      return this.winner === this.team2 ? 1 : 0;
    }
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

  get minimumLikelihoodWinner() {
    if (this.winner) {
      return this.winner;
    }
    return this.p1 > this.p2 ? this.team2 : this.team1;
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
    if (pWinner <= 0.2) {
      return "#f00";
    }
    if (pWinner >= 0.8) {
      return "#080";
    }
    if (pWinner <= 0.4) {
      return "#f004";
    }
    if (pWinner >= 0.6) {
      return "#0804";
    }

    return "#00f1";
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
