import { P_WINNER } from "./P_WINNER.js";
import { NAME_TO_EMOJI } from "./NAME_TO_EMOJI.js";
import { NAME_TO_ALPHA3 } from "./NAME_TO_ALPHA3.js";

export default class Team {
  constructor(name) {
    this.name = name;
  }

  get emoji() {
    return NAME_TO_EMOJI[this.name];
  }

  get alpha3() {
    return NAME_TO_ALPHA3[this.name];
  }

  get label() {
    return this.emoji + " " + this.alpha3;
  }

  get pWinner() {
    return P_WINNER[this.name];
  }
}
