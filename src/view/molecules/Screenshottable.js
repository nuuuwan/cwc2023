import { useScreenshot } from "use-react-screenshot";
import { Grid, Tooltip, IconButton } from "@mui/material";
import React from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TweetButton from "./TweetButton.js";

export default function Screenshottable({ label, tweetContent, children }) {
  const ref = React.useRef(null);

  const takeScreenshot = useScreenshot()[1];
  const imageFile = `${label}.png`;
  const download = function (image) {
    const link = document.createElement("a");
    link.href = image;
    link.download = imageFile;
    link.click();
  };

  const onClick = function () {
    takeScreenshot(ref.current).then(download);
  };

  return (
    <div style={{ width: "fit-content" }}>
      <div ref={ref}>{children}</div>
      <Grid container justifyContent="flex-end" sx={{ paddingRight: 1 }}>
        <Tooltip title="Download Image">
          <IconButton onClick={onClick} color="primary">
            <CloudDownloadIcon sx={{ color: "#ccc" }} />
          </IconButton>
        </Tooltip>
        {tweetContent ? <TweetButton tweetBody={tweetContent} /> : null}
      </Grid>
    </div>
  );
}
