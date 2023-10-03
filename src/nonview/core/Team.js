import { P_WINNER } from "./P_WINNER.js";
import { NAME_TO_EMOJI } from "./NAME_TO_EMOJI.js";
import { NAME_TO_ALPHA3, ALPHA3_TO_NAME } from "./NAME_TO_ALPHA3.js";
import { NAME_TO_COLOR } from "./NAME_TO_COLOR.js";
import { EMOJI } from "./EMOJI.js";
export default class Team {
  constructor(name) {
    this.name = name;
  }

  static loadFromID(id) {
    return new Team(ALPHA3_TO_NAME[id]);
  }

  get emoji() {
    return NAME_TO_EMOJI[this.name];
  }

  get alpha3() {
    return NAME_TO_ALPHA3[this.name];
  }

  get id() {
    return this.alpha3;
  }

  get label() {
    return this.emoji + " " + this.alpha3;
  }

  get pWinner() {
    return P_WINNER[this.name];
  }

  get color() {
    return NAME_TO_COLOR[this.name];
  }

  getLabel(winner) {
    const winnerEmoji = winner.id === this.id ? EMOJI.WINNER : "";
    return this.label + " " + winnerEmoji;
  }
}
