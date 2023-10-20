import { Typography } from "@mui/material";
import Format from "../../nonview/base/Format.js";

export default function DateDeltaView({ date }) {
  return <Typography variant="body2">{Format.dateDelta(date)}</Typography>;
}
