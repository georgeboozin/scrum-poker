import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import { Card } from "@/shared/ui/Card";
import { CARDS_SET } from "../lib/card-set";

interface Props {
  cards?: string[];
  value?: string | null;
  sx?: SxProps;
  onSelect: (value: string) => void;
}

export function CardSelector({
  cards = CARDS_SET,
  value,
  sx,
  onSelect,
}: Props) {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "space-between",
        overflow: "auto",
        padding: 2,
        overscrollBehavior: "none",
      }}
    >
      {cards.map((cardValue) => (
        <Card
          key={cardValue}
          value={cardValue}
          isSelected={cardValue === value}
          onClick={onSelect}
          sx={{
            flexShrink: 0,
            mr: 1,
          }}
        />
      ))}
    </Box>
  );
}
