import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import { PokerHand } from "@/components/PokerHand";

interface Props {
  hands: {
    name: string;
    value?: string | null;
    isCurrentUser?: boolean;
  }[];
  isRevealed: boolean;
  sx?: SxProps;
}

export function Seats({ hands, isRevealed, sx }: Props) {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {hands.map(({ name, value, isCurrentUser }) => (
        <PokerHand
          key={name}
          name={name}
          value={value}
          isCurrentUser={isCurrentUser}
          isRevealed={isRevealed}
        />
      ))}
    </Box>
  );
}
