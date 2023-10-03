import { GROUP_STAGE_ODI_LIST } from "./GROUP_STAGE_ODI_LIST.js";

export default class Simulator {
  getRandomResultIdx() {
    return GROUP_STAGE_ODI_LIST.reduce(function (idx, odi) {
      const winner = odi.randomWinner;
      idx[odi.id] = winner;
      return idx;
    }, {});
  }
}
