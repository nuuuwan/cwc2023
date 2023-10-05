import { Box, Typography } from "@mui/material";
import React from "react";
import Format from "../../nonview/base/Format.js";
import {
  VERSION_DATETIME,
  LAST_COMMIT_MESSAGE,
} from "../../nonview/constants/VERSION.js";

export default function VersionView() {
  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="caption" sx={{ opacity: 0.1 }}>
        Last Updated <strong>{Format.timeStamp(VERSION_DATETIME)}</strong>- "
        {LAST_COMMIT_MESSAGE}"
      </Typography>
    </Box>
  );
}
