import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { blue, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";

function getBackgroundColor(selected: boolean, isRevealed?: boolean) {
  if (isRevealed && selected) {
    return "white";
  }
  if (selected) {
    return blue[400];
  }

  return grey[300];
}

interface Props {
  name: string;
  value?: string | null;
  isCurrentUser?: boolean;
  isRevealed?: boolean;
}

export function PokerHand({ name, isCurrentUser, value, isRevealed }: Props) {
  const borderColor = isRevealed && Boolean(value) ? blue[400] : grey[300];
  const backgroundColor = getBackgroundColor(Boolean(value), isRevealed);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 30,
          height: 60,
          borderRadius: 1,
          border: `1px solid ${borderColor}`,
          backgroundColor,
        }}
      >
        {isRevealed && value && (
          <Typography color={blue[400]} variant="body1">
            {value}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {isCurrentUser && (
          <PersonIcon
            color="primary"
            sx={{
              height: 14,
              width: 14,
            }}
          />
        )}
        <Typography color={grey[600]} variant="caption">
          {name}
        </Typography>
      </Box>
    </Box>
  );
}
