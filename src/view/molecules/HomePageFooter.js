import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { SIMULATOR_MODE } from "../../nonview/analytics/SimulatorMode.js";

export default function HomePageFooter({ handleDoSimulate }) {
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

  return <BottomNavigation>{simulatorButtons}</BottomNavigation>;
}
