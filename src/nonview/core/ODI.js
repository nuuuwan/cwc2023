import Format from "../base/Format";
import { START_WEEK } from "../constants/CWC23_DATETIME";
import { ODI_ID_TO_TEAM_ID_TO_ODDS } from "../data/ODI_ID_TO_TEAM_ID_TO_ODDS";
import { ODI_ID_TO_WINNER } from "../data/ODI_ID_TO_WINNER";

function pWinnerToPMatch(p1Winner, p2Winner) {
  const f = (x) => x + 0.6;
  const q = f(p1Winner) / (f(p1Winner) + f(p2Winner));
  return q;
}

export default class ODI {
  constructor(id, date, team1, team2, venue) {
    this.id = id;
    this.date = date;
    this.team1 = team1;
    this.team2 = team2;
    this.venue = venue;
  }

  // Names & Flags
  get twitterName() {
    return `${this.favoriteTeam.emoji}${this.underdogTeam.emoji} #${this.favoriteTeam.twitterHandleText}vs${this.underdogTeam.twitterHandleText}`;
  }

  get title() {
    return `${this.team1.label} vs ${this.team2.label}`;
  }

  // Date/Time
  get ut() {
    return this.date.getTime() / 1000.0;
  }

  // Basic
  get weekAbsolute() {
    const SECONDS_IN_DAY = 86_400;
    return parseInt((this.ut + 3 * SECONDS_IN_DAY) / (7 * SECONDS_IN_DAY));
  }

  get week() {
    return this.weekAbsolute - START_WEEK + 1;
  }

  // Result

  get winner() {
    return ODI_ID_TO_WINNER[this.id];
  }

  get isConcluded() {
    return !!this.winner;
  }

  // Probabilities
  get p1Winner() {
    return this.team1.pWinner / (this.team1.pWinner + this.team2.pWinner);
  }

  get p2Winner() {
    return this.team2.pWinner / (this.team1.pWinner + this.team2.pWinner);
  }

  // Odds

  get hasOdds() {
    return !!ODI_ID_TO_TEAM_ID_TO_ODDS[this.id];
  }

  get odds1() {
    return ODI_ID_TO_TEAM_ID_TO_ODDS[this.id][this.team1.id];
  }

  get odds2() {
    return ODI_ID_TO_TEAM_ID_TO_ODDS[this.id][this.team2.id];
  }

  get p1Odds() {
    return 1 / this.odds1 / (1 / this.odds1 + 1 / this.odds2);
  }

  get p2Odds() {
    return 1 / this.odds2 / (1 / this.odds1 + 1 / this.odds2);
  }

  // Combined Probabilities
  get p1() {
    if (this.hasOdds) {
      return this.p1Odds;
    }
    return pWinnerToPMatch(this.p1Winner, this.p2Winner);
  }

  get p2() {
    if (this.hasOdds) {
      return this.p2Odds;
    }
    return pWinnerToPMatch(this.p2Winner, this.p1Winner);
  }

  // Predict Winner
  get randomWinner() {
    if (this.winner) {
      return this.winner;
    }
    return Math.random() < this.p1 ? this.team1 : this.team2;
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

  // Favourites and Underdogs
  get favoriteTeam() {
    return this.p1 > this.p2 ? this.team1 : this.team2;
  }

  get underdogTeam() {
    return this.p1 > this.p2 ? this.team2 : this.team1;
  }

  // Other

  getColor(winner) {
    const pWinner = winner === this.team1 ? this.p1 : this.p2;
    return Format.getPercentColor(pWinner);
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

  // static odiList methods

  static groupByWeek(odiList) {
    return odiList.reduce(function (weekToODIList, odi) {
      const week = odi.week;
      if (!weekToODIList[week]) {
        weekToODIList[week] = [];
      }
      weekToODIList[week].push(odi);
      return weekToODIList;
    }, {});
  }

  static getUnplayedMatches(odiList) {
    return odiList.filter((odi) => !odi.isConcluded);
  }

  static getNextMatches(odiList, n) {
    return ODI.getUnplayedMatches(odiList).slice(0, n);
  }
}
