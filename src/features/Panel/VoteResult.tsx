import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "@/components/Card";
import { CARDS_SET } from "@/constants";

function calcAverage(votes: string[]) {
  const formattedVotes = votes
    .filter((value) => value !== "?")
    .map((value) => Number(value));

  const average =
    formattedVotes.reduce((acc, cur) => acc + cur, 0) / formattedVotes.length;
  // const fibSequence = CARDS_SET.filter((value) => value !== "?").map((value) =>
  //   Number(value)
  // );
  // const diffFib = fibSequence.reduce((acc, cur) => {
  //   const diff = cur - average;
  //   if (Math.abs(diff) < Math.abs(acc)) {
  //     return diff;
  //   }
  //   return acc;
  // }, fibSequence[fibSequence.length - 1]);

  // return average + diffFib;
  return Math.round(average * 100) / 100;
}

function groupVotes(votes: string[]) {
  return votes.reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur]++;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });
}

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
