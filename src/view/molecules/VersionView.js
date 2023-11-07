import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import PestControlIcon from "@mui/icons-material/PestControl";
import Format from "../../nonview/base/Format.js";
import StorageIcon from "@mui/icons-material/Storage";
import {
  VERSION_DATETIME,

} from "../../nonview/constants/VERSION.js";
import HelpIcon from "@mui/icons-material/Help";
import FeedIcon from "@mui/icons-material/Feed";
import DateDeltaView from "../atoms/DateDeltaView.js";

const URL_INFO_LIST = [
  {
    url: "https://nuuuwan.github.io/cwc23/",
    Icon: RefreshIcon,
  },
  {
    url: "https://medium.com/on-arts/2023-cricket-world-cup-c588a699b5f6",
    Icon: HelpIcon,
  },
  {
    url: "https://github.com/nuuuwan/cwc23/issues/new",
    Icon: PestControlIcon,
  },

  {
    url: "https://github.com/nuuuwan/cwc23/tree/master/src/nonview/data",
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
      <Typography variant="body1" sx={{ fontSize: "50%" }}>
        {LAST_COMMIT_MESSAGE}
      </Typography>
      <DateDeltaView date={VERSION_DATETIME} />

      <Typography variant="caption" color="gray" sx={{ fontSize: "50%" }}>
        {Format.timeStamp(VERSION_DATETIME)}
      </Typography>
      <Box>{renderedIconButtons}</Box>
    </Box>
  );
}
