import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import { Hand } from "@/components/Hand";

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
        <Hand
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
