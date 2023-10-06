import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { SIMULATOR_MODE } from "../../nonview/statistics/SimulatorMode.js";
import { PAGE } from "../pages/PAGE.js";

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

    const Icon = page.icon;

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
