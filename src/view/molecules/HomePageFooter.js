import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import { PAGE } from "../pages/PAGE.js";

function getIconColor(isActive) {
  return isActive ? "#000" : "#ccc";
}

export default function HomePageFooter({
  handleSetPageName,
  pageName: activePageName,
}) {
  const pageButtons = Object.values(PAGE).map(function (page) {
    const onClick = function () {
      handleSetPageName(page.name);
    };

    const Icon = page.Icon;

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
  return <BottomNavigation>{pageButtons}</BottomNavigation>;
}
