import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { SIMULATOR_MODE } from "../../nonview/statistics/SimulatorMode.js";
import { PAGE } from "../pages/PAGE.js";

function getPageIconpage(page) {
  switch (page.name) {
    case PAGE.PROBABILITY.name:
      return TableRowsIcon;

    case PAGE.NEXT_MATCHES.name:
      return CalendarMonthIcon;
    default:
      throw new Error("Unknown page name: " + page.name);
  }
}

function getIconColor(isActive) {
  return isActive ? "#000" : "#ccc";
}

export default function HomePageFooter({
  handleDoSimulate,
  handleSetPage,
  pageName: activePageName,
  simulatorMode: activeSimulatorMode,
}) {
  const simulatorButtons = Object.values(SIMULATOR_MODE).map(function (
    simulatorMode
  ) {
    const onClick = function () {
      handleDoSimulate(simulatorMode);
    };
    const isActive =
      activeSimulatorMode === simulatorMode &&
      activePageName === PAGE.SIMULATOR.name;
    const iconColor = getIconColor(isActive);

    return (
      <BottomNavigationAction
        key={"simulateButton-" + simulatorMode.id}
        icon={<simulatorMode.Icon sx={{ color: iconColor }} />}
        onClick={onClick}
      />
    );
  });

  const pageButtons = [PAGE.PROBABILITY, PAGE.NEXT_MATCHES].map(function (
    page
  ) {
    const onClick = function () {
      handleSetPage(page.name);
    };

    const Icon = getPageIconpage(page);

    const isActive = activePageName === page.name;
    const iconColor = getIconColor(isActive);

    return (
      <BottomNavigationAction
        key={"pageButton-" + page.name}
        icon={<Icon sx={{ color: iconColor }} />}
        onClick={onClick}
      />
    );
  });
  return (
    <BottomNavigation>
      {pageButtons}
      {simulatorButtons}
    </BottomNavigation>
  );
}
