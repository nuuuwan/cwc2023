import { TEAM_ID_TO_P_WINNER } from "./TEAM_ID_TO_P_WINNER.js";
import { TEAM_ID_TO_EMOJI } from "./TEAM_ID_TO_EMOJI.js";
import { TEAM_ID_TO_COLOR } from "./TEAM_ID_TO_COLOR.js";
import { CWC2023_TEAM_ID_LIST } from "./CWC2023_TEAM_ID_LIST.js";

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

  static initTeamIDToX(defaultValue) {
    return CWC2023_TEAM_ID_LIST.reduce((acc, teamID) => {
      acc[teamID] = defaultValue;
      return acc;
    }, {});
  }

  static getTeamIdx() {
    return CWC2023_TEAM_ID_LIST.reduce((idx, teamID) => {
      idx[teamID] = new Team(teamID);
      return idx;
    }, {});
  }
}

export const TEAM = Team.getTeamIdx();
