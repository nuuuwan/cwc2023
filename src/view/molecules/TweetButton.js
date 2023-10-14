import { Tooltip, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { copyToClipboard } from "../Common.js";
import Format from "../../nonview/base/Format.js";
import DateX from "../../nonview/base/DateX.js";

export default function TweetButton({ tweetBody, setSnackbarMessage }) {
  const onClick = function () {
    copyToClipboard(tweetBody, () => {
      setSnackbarMessage("Copied tweet text to clipboard.");

      const tweetText = [
        tweetBody,
        "",
        Format.timeStamp(DateX.now().date),
        "#CWC23 @CricketWorldCup #CWC23Simulator",
        "https://nuuuwan.github.io/cwc23",
      ].join("\n");

      const url =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(tweetText);
      window.open(url, "_blank");
    });
  };
  return (
    <Tooltip title="Tweet">
      <IconButton onClick={onClick}>
        <TwitterIcon sx={{ color: "#ccc" }} />
      </IconButton>
    </Tooltip>
  );
}
