import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { SIMULATOR_MODE } from "../../nonview/analytics/SimulatorMode.js";

export default function HomePageFooter({ myRefBigTable, handleDoSimulate }) {
  const onClickRandom = function () {
    myRefBigTable.scrollIntoView({ behavior: "smooth" });
  };

  const onClickRefresh = function () {
    window.location.reload();
  };

  const simulatorButtons = Object.values(SIMULATOR_MODE).map(function (
    simulatorMode
  ) {
    const onClick = function () {
      handleDoSimulate(simulatorMode);
    };

    return (
      <BottomNavigationAction
        key={"simulateButton-" + simulatorMode.id}
        icon={<simulatorMode.Icon />}
        onClick={onClick}
      />
    );
  });

  return (
    <BottomNavigation>
      <BottomNavigationAction icon={<RefreshIcon />} onClick={onClickRefresh} />
      <BottomNavigationAction
        icon={<TableRowsIcon />}
        onClick={onClickRandom}
      />
      {simulatorButtons}
    </BottomNavigation>
  );
}
