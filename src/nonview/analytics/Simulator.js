import { GROUP_STAGE_ODI_LIST } from "../core/GROUP_STAGE_ODI_LIST.js";
import GroupStatePointsTable from "./GroupStatePointsTable.js";
import ODI from "../core/ODI.js";

export const SimulatorMode = {
  RANDOM: "RANDOM",
  MAXIMUM_LIKELIHOOD: "MAXIMUM_LIKELIHOOD",
  MINIMUM_LIKELIHOOD: "MINIMUM_LIKELIHOOD",
};

export default class Simulator {
  constructor(mode) {
    this.mode = mode;
  }

  getWinner(odi) {
    switch (this.mode) {
      case SimulatorMode.RANDOM:
        return odi.randomWinner;
      case SimulatorMode.MAXIMUM_LIKELIHOOD:
        return odi.maximumLikelihoodWinner;
      case SimulatorMode.MINIMUM_LIKELIHOOD:
        return odi.minimumLikelihoodWinner;
      default:
        throw new Error(`Invalid mode: ${this.mode}`);
    }
  }

  simulateGroupStage() {
    const { resultIdx, cumInvPWinner } = GROUP_STAGE_ODI_LIST.reduce(
      function ({ resultIdx, cumInvPWinner }, odi) {
        const winner = this.getWinner(odi);
        const pWinner = odi.getP(winner);
        resultIdx[odi.id] = winner;
        cumInvPWinner *= 1 / pWinner;

        return { resultIdx, cumInvPWinner };
      }.bind(this),
      { resultIdx: {}, cumInvPWinner: 1 }
    );
    return { resultIdx, cumInvPWinner };
  }

  simulateKnockOutStage(resultIdx) {
    const pointsTable = new GroupStatePointsTable(resultIdx);
    const teams = pointsTable.getTeams();

    const odiSemiFinal1 = new ODI(
      "SF 1",
      "2023-11-15",
      teams[0],
      teams[3],
      "Mumbai"
    );
    const odiSemiFinal2 = new ODI(
      "SF 2",
      "2023-11-16",
      teams[1],
      teams[2],
      "Kolkata"
    );

    const winnerSemiFinal1 = this.getWinner(odiSemiFinal1);
    const winnerSemiFinal2 = this.getWinner(odiSemiFinal2);

    const odiFinal = new ODI(
      "Final",
      "2023-11-19",
      winnerSemiFinal1,
      winnerSemiFinal2,
      "Ahmedabad"
    );
    const winnerFinal = this.getWinner(odiFinal);

    const odiIdx = [odiSemiFinal1, odiSemiFinal2, odiFinal].reduce(function (
      idx,
      odi
    ) {
      idx[odi.id] = odi;
      return idx;
    },
    {});

    const koResultIdx = {
      [odiSemiFinal1.id]: winnerSemiFinal1,
      [odiSemiFinal2.id]: winnerSemiFinal2,
      [odiFinal.id]: winnerFinal,
    };

    return { odiIdx, koResultIdx };
  }
}
