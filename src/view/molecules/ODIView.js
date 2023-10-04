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
        borderColor: odi.getColor(winner) + "8",
        borderStyle: "solid",
        borderWidth: 4,
        borderRadius: 2,
        opacity,
        width: 90,
      }}
    >
      <MatchDateView date={odi.date} />
      <TeamView
        team={odi.team1}
        isWinner={odi.team1.id === winner.id}
        p={odi.getP(odi.team1)}
      />
      <TeamView
        team={odi.team2}
        isWinner={odi.team2.id === winner.id}
        p={odi.getP(odi.team2)}
      />
      <Typography variant="body2">{odi.venue.id}</Typography>
    </Paper>
  );
}
