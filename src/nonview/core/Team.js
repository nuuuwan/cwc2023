import { TEAM_ID_TO_P_WINNER } from "../constants/TEAM_ID_TO_P_WINNER.js";
import { TEAM_ID_TO_EMOJI } from "../constants/TEAM_ID_TO_EMOJI.js";
import { TEAM_ID_TO_COLOR } from "../constants/TEAM_ID_TO_COLOR.js";
import { CWC23_TEAM_ID_LIST } from "../constants/CWC23_TEAM_ID_LIST.js";
import { TEAM_ID_TO_NAME } from "../constants/TEAM_ID_TO_NAME.js";

export default class Team {
  constructor(id) {
    this.id = id;
  }

  get emoji() {
    return TEAM_ID_TO_EMOJI[this.id];
  }

  get name() {
    return TEAM_ID_TO_NAME[this.id];
  }

  get twitterName() {
    return this.emoji + " #" + this.name.replaceAll(" ", "");
  }

  get pWinner() {
    return TEAM_ID_TO_P_WINNER[this.id];
  }

  get color() {
    return TEAM_ID_TO_COLOR[this.id];
  }

  static initTeamIDToX(defaultValue) {
    return CWC23_TEAM_ID_LIST.reduce((acc, teamID) => {
      acc[teamID] = defaultValue;
      return acc;
    }, {});
  }

  static getTeamIdx() {
    return CWC23_TEAM_ID_LIST.reduce((idx, teamID) => {
      idx[teamID] = new Team(teamID);
      return idx;
    }, {});
  }
}

export const TEAM = Team.getTeamIdx();
