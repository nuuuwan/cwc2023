import { Paper, Typography } from "@mui/material";
import MatchDateView from "../atoms/MatchDateView";

export default function ODIView({ odi, winner }) {
  const opacity = odi.isConcluded ? 0.2 : 1;
  return (
    <Paper
      sx={{
        margin: 1,
        padding: 1,
        borderColor: winner.color,
        borderStyle: "solid",
        borderWidth: 3,
        borderRadius: 6,
        opacity,
      }}
    >
      <MatchDateView matchDate={odi.date} />

      <Typography variant="h6">{odi.favorite.getLabel(winner)}</Typography>
      <Typography variant="h6">{odi.notFavorite.getLabel(winner)}</Typography>

      <Typography variant="caption">{odi.venue.name}</Typography>
    </Paper>
  );
}
