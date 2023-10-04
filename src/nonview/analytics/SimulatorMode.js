import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CasinoIcon from "@mui/icons-material/Casino";

export default class SimulatorMode {
  constructor(id, message, subMessage, color, Icon) {
    this.id = id;
    this.message = message;
    this.subMessage = subMessage;
    this.color = color;
    this.Icon = Icon;
  }
}

export const SIMULATOR_MODE = {
  RANDOM: new SimulatorMode(
    "RANDOM",
    "Random Outcome",
    "if the outcome of each match is randomly selected based on passed outcomes",
    "#f80",
    CasinoIcon
  ),
  MAXIMUM_LIKELIHOOD: new SimulatorMode(
    "MAXIMUM_LIKELIHOOD",
    "Most likely outcome",
    "if every match is won by the favourite.",
    "#080",
    ThumbUpIcon
  ),
  MINIMUM_LIKELIHOOD: new SimulatorMode(
    "MINIMUM_LIKELIHOOD",
    "Least likely Outcome",
    "if every match is won by the underdog.",
    "#f00",
    ThumbDownIcon
  ),
};
