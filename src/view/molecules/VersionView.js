import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PestControlIcon from "@mui/icons-material/PestControl";
import Format from "../../nonview/base/Format.js";
import StorageIcon from "@mui/icons-material/Storage";
import {
  VERSION_DATETIME,
  LAST_COMMIT_MESSAGE,
} from "../../nonview/constants/VERSION.js";
import HelpIcon from "@mui/icons-material/Help";
import FeedIcon from "@mui/icons-material/Feed";

const URL_INFO_LIST = [
  {
    url: "https://nuuuwan.github.io/cwc2023/",
    Icon: RefreshIcon,
  },
  {
    url: "https://github.com/nuuuwan/cwc2023/issues/new",
    Icon: PestControlIcon,
  },
  {
    url: "https://medium.com/on-arts/2023-cricket-world-cup-c588a699b5f6",
    Icon: HelpIcon,
  },
  {
    url: "https://github.com/nuuuwan/cwc2023/actions/workflows/update_data-cron.yml",
    Icon: StorageIcon,
  },
  {
    url: "https://www.google.com/search?client=firefox-b-d&q=cricket+world+cup",
    Icon: FeedIcon,
  },
];

export default function VersionView() {
  const renderedIconButtons = URL_INFO_LIST.map(function (
    { url, Icon },
    iIconButton
  ) {
    const onClick = function () {
      window.open(url, "_blank");
    };

    return (
      <IconButton onClick={onClick} key={"icon-button-" + iIconButton}>
        <Icon />
      </IconButton>
    );
  });

  return (
    <Box sx={{ margin: 2, marginTop: 10, textAlign: "center" }}>
      <Typography variant="caption">
        {Format.timeStamp(VERSION_DATETIME)} -{" " + LAST_COMMIT_MESSAGE}
        <Box>{renderedIconButtons}</Box>
      </Typography>
    </Box>
  );
}
