import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PestControlIcon from "@mui/icons-material/PestControl";
import Format from "../../nonview/base/Format.js";
import { onClickRefresh } from "../Common.js";
import {
  VERSION_DATETIME,
  LAST_COMMIT_MESSAGE,
} from "../../nonview/constants/VERSION.js";

export default function VersionView() {
  const onClickBugs = function () {
    const URL = "https://github.com/nuuuwan/cwc2023/issues";
    window.open(URL, "_blank");
  };

  return (
    <Box sx={{ margin: 2, marginTop: 10, textAlign: "center" }}>
      <Typography variant="caption">
        {Format.timeStamp(VERSION_DATETIME)} -{" " + LAST_COMMIT_MESSAGE}
        <Box>
          <IconButton onClick={onClickRefresh}>
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={onClickBugs}>
            <PestControlIcon />
          </IconButton>
        </Box>
      </Typography>
    </Box>
  );
}
