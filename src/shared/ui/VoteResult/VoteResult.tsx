import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@/shared/ui/Card";
import { groupVotes } from "./lib/group-votes";
import { calcAverage } from "./lib/calc-average";

interface Props {
  votes: string[];
}

export function VoteResult({ votes }: Props) {
  const groupedVotes = groupVotes(votes);
  const average = calcAverage(votes);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body1" color="gray">
          Average:
        </Typography>
        <Typography variant="h4">{average}</Typography>
      </Box>
      <Box display="flex" mt={2}>
        {Object.entries(groupedVotes).map(([value, count]) => (
          <Box
            key={value}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mr: 2,
            }}
          >
            <Card
              value={value}
              isSelected={false}
              color="black"
              sx={{
                flexShrink: 0,
              }}
            />
            <Typography mt={1} variant="body2">
              {count} Vote
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
