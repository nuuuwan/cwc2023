import { Paper, Typography } from "@mui/material";
import MatchDateView from "../atoms/MatchDateView";
import TeamView from "../atoms/TeamView";

export default function ODIView({ odi, winner }) {
  const opacity = odi.isConcluded ? 0.2 : 1;
  return (
    <Paper
      sx={{
        margin: 0.5,
        padding: 0.5,
        borderColor: odi.getColor(winner),
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 2,
        opacity,
        width: 90,
      }}
    >
      <MatchDateView matchDate={odi.date} />

      <TeamView
        team={odi.favorite}
        isWinner={odi.favorite.id === winner.id}
        p={odi.getP(odi.favorite)}
      />
      <TeamView
        team={odi.notFavorite}
        isWinner={odi.notFavorite.id === winner.id}
        p={odi.getP(odi.notFavorite)}
      />

      <Typography variant="caption">{odi.venue.name}</Typography>
    </Paper>
  );
}
