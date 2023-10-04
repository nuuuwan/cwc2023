import { TEAM_ID_TO_P_WINNER } from "./TEAM_ID_TO_P_WINNER.js";
import { TEAM_ID_TO_EMOJI } from "./TEAM_ID_TO_EMOJI.js";
import { TEAM_ID_TO_COLOR } from "./TEAM_ID_TO_COLOR.js";
export default class Team {
  constructor(id) {
    this.id = id;
  }

  get emoji() {
    return TEAM_ID_TO_EMOJI[this.id];
  }

  get pWinner() {
    return TEAM_ID_TO_P_WINNER[this.id];
  }

  get color() {
    return TEAM_ID_TO_COLOR[this.id];
  }

  static emptyDict() {
    return {
      AFG: 0,
      AUS: 0,
      BGD: 0,
      ENG: 0,
      IND: 0,
      LKA: 0,
      NLD: 0,
      NZL: 0,
      PAK: 0,
      ZAF: 0,
    };
  }
}

export const TEAM = {
  AFG: new Team("AFG"),
  AUS: new Team("AUS"),
  BGD: new Team("BGD"),
  ENG: new Team("ENG"),
  IND: new Team("IND"),
  LKA: new Team("LKA"),
  NLD: new Team("NLD"),
  NZL: new Team("NZL"),
  PAK: new Team("PAK"),
  ZAF: new Team("ZAF"),
};
