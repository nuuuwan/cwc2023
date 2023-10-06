import { EMOJI } from "../../nonview/constants/EMOJI";

export default function DirectionView({ dP }) {
  if (Math.abs(dP) < 0.01) {
    return null;
  }
  const directionEmoji = dP > 0 ? EMOJI.UP : EMOJI.DOWN;
  const color = dP > 0 ? "#080" : "#f00";
  return <span style={{ color, fontSize: "75%" }}>{directionEmoji}</span>;
}
