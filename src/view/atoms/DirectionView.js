import { EMOJI } from "../../nonview/constants/EMOJI";

export default function DirectionView({ d }) {
  if (Math.abs(d) < 0.01) {
    return null;
  }
  const directionEmoji = d > 0 ? EMOJI.UP : EMOJI.DOWN;
  const color = d > 0 ? "#080" : "#f00";
  return <span style={{ color, fontSize: "75%" }}>{directionEmoji}</span>;
}
