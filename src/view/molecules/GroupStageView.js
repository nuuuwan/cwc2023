import { GROUP_STAGE_ODI_LIST } from "../../nonview/data/GROUP_STAGE_ODI_LIST.js";

import { Box, Typography } from "@mui/material";
import ODI from "../../nonview/core/ODI.js";
import GroupStageWeekView from "./GroupStageWeekView.js";

export default function GroupStageView({
  simulator,
  onClickODI,
  odiStateIdx,
  setSnackbarMessage,
  setRefCurrentWeek,
}) {
  return (
    <Box>
      <Typography variant="h5">Group Stage</Typography>
      {Object.entries(ODI.groupByWeek(GROUP_STAGE_ODI_LIST))
        .reverse()
        .map(function ([week, odiList]) {
          return (
            <GroupStageWeekView
              key={"week-" + week}
              week={week}
              odiList={odiList}
              simulator={simulator}
              odiStateIdx={odiStateIdx}
              onClickODI={onClickODI}
              setSnackbarMessage={setSnackbarMessage}
              setRefCurrentWeek={setRefCurrentWeek}
            />
          );
        })}
    </Box>
  );
}
