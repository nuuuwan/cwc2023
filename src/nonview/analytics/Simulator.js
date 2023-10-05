import { GROUP_STAGE_ODI_LIST } from "../core/GROUP_STAGE_ODI_LIST.js";
import GroupStatePointsTable from "./GroupStatePointsTable.js";
import ODI from "../core/ODI.js";
import { SIMULATOR_MODE } from "../analytics/SimulatorMode.js";
import { VENUE } from "../core/Venue.js";
export default class Simulator {
  constructor(mode, odiStateIdx) {
    this.mode = mode;
    this.odiStateIdx = odiStateIdx;
  }

  getWinner(odi) {
    const state = this.odiStateIdx[odi.id];
    if (state === 1) {
      return odi.team1;
    }
    if (state === 2) {
      return odi.team2;
    }

    switch (this.mode) {
      case SIMULATOR_MODE.RANDOM:
        return odi.randomWinner;
      case SIMULATOR_MODE.MAXIMUM_LIKELIHOOD:
        return odi.maximumLikelihoodWinner;
      case SIMULATOR_MODE.MINIMUM_LIKELIHOOD:
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
      new Date("2023-11-15 14:00"),
      teams[0],
      teams[3],
      VENUE.Mumbai
    );
    const odiSemiFinal2 = new ODI(
      "SF 2",
      new Date("2023-11-16 14:00"),
      teams[1],
      teams[2],
      VENUE.Kolkata
    );

    const winnerSemiFinal1 = this.getWinner(odiSemiFinal1);
    const winnerSemiFinal2 = this.getWinner(odiSemiFinal2);

    const odiFinal = new ODI(
      "Final",
      new Date("2023-11-19 14:00"),
      winnerSemiFinal1,
      winnerSemiFinal2,
      VENUE.Ahmedabad
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

  simulate() {
    const { resultIdx, cumInvPWinner } = this.simulateGroupStage();
    const { odiIdx, koResultIdx } = this.simulateKnockOutStage(resultIdx);
    return { resultIdx, cumInvPWinner, odiIdx, koResultIdx };
  }

}
