import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

export interface Props {
  isSelected: boolean;
  isRevealed: boolean;
  isHost: boolean;
  onRevealCards: () => void;
  onNewVoting: () => void;
}

export function TableContent({
  isSelected,
  isRevealed,
  isHost,
  onRevealCards,
  onNewVoting,
}: Props) {
  if (isRevealed && isHost) {
    return (
      <Button variant="contained" onClick={onNewVoting}>
        New voting
      </Button>
    );
  }

  if (isSelected && isHost) {
    return (
      <Button variant="contained" onClick={onRevealCards}>
        Reveal cards
      </Button>
    );
  }

  if (isSelected && !isHost) {
    return (
      <Typography color={grey[600]} variant="caption">
        Wait participants
      </Typography>
    );
  }
  return (
    <>
      <Typography color={grey[600]} variant="caption">
        Pick your card
      </Typography>
    </>
  );
}
