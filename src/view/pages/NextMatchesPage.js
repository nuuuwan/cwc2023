import NextMatchView from "../molecules/NextMatchView";
import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export default class NextMatchesPage extends Component {
  static name = "NextMatchesPage";
  static Icon = CalendarMonthIcon;

  render() {
    const {
      simulator,
      odiStateIdx,
      bigTable,
      onClickODI,
      setSnackbarMessage,
      onClickTeam,
    } = this.props;

    return (
      <Box>
        <Typography variant="h5">#CWC23 - Next</Typography>
        {bigTable.odiStats.nextODIList.map(function (nextODI) {
          return (
            <NextMatchView
              key={"next-odi-" + nextODI.id}
              simulator={simulator}
              odiStateIdx={odiStateIdx}
              bigTable={bigTable}
              onClickODI={onClickODI}
              setSnackbarMessage={setSnackbarMessage}
              onClickTeam={onClickTeam}
              nextODI={nextODI}
            />
          );
        })}
      </Box>
    );
  }
}
