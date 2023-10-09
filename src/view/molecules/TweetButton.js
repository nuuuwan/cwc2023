import { Tooltip, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
export default function TweetButton({ tweetBody }) {
  const onClick = function () {
    const tweetText = [
      tweetBody,
      "",
      "#CWC23 @CricketWorldCup #CWC23Simulator",
      "https://nuuuwan.github.io/cwc2023",
    ].join("\n");

    const url =
      "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
    window.open(url, "_blank");
  };
  return (
    <Tooltip title="Tweet">
      <IconButton onClick={onClick}>
        <TwitterIcon sx={{ color: "#ccc" }} />
      </IconButton>
    </Tooltip>
  );
}
