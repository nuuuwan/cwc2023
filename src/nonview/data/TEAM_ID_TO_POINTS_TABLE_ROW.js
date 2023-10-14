import { POINTS_TABLE } from "./POINTS_TABLE";

export const TEAM_ID_TO_POINTS_TABLE_ROW = Object.fromEntries(
  POINTS_TABLE.map(function (row) {
    return [row.team.id, row];
  })
);
