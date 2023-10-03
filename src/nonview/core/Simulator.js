import { GROUP_STAGE_ODI_LIST } from "./GROUP_STAGE_ODI_LIST.js";
import GroupStatePointsTable from "./GroupStatePointsTable.js";
import ODI from "./ODI.js";

export default class Simulator {
  simulateGroupStage() {
    return GROUP_STAGE_ODI_LIST.reduce(function (idx, odi) {
      const winner = odi.randomWinner;
      idx[odi.id] = winner;
      return idx;
    }, {});
  }

  simulateKnockOutStage(resultIdx) {
    const pointsTable = new GroupStatePointsTable(resultIdx);
    const teams = pointsTable.getTeams();

    const odiSemiFinal1 = new ODI(
      "SF 1",
      "2023-11-15",
      teams[0].name,
      teams[3].name,
      "Mumbai"
    );
    const odiSemiFinal2 = new ODI(
      "SF 2",
      "2023-11-16",
      teams[1].name,
      teams[2].name,
      "Kolkata"
    );

    const winnerSemiFinal1 = odiSemiFinal1.randomWinner;
    const winnerSemiFinal2 = odiSemiFinal2.randomWinner;

    const odiFinal = new ODI(
      "Final",
      "2023-11-19",
      winnerSemiFinal1.name,
      winnerSemiFinal2.name,
      "Ahmedabad"
    );
    const winnerFinal = odiFinal.randomWinner;

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
