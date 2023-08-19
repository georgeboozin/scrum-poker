import { useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { SxProps } from "@mui/material";

interface Props {
  value: string;
  isSelected: boolean;
  color?: string;
  sx?: SxProps;
  onClick?: (value: string) => void;
}

export function Card({
  value,
  isSelected,
  color = blue[400],
  sx,
  onClick,
}: Props) {
  const handleClick = useCallback(() => onClick?.(value), [value, onClick]);

  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 80,
        borderRadius: 2,
        border: `2px solid ${color}`,
        backgroundColor: isSelected ? color : "transparent",
      }}
      onClick={handleClick}
    >
      <Typography color={isSelected ? "white" : color} variant="h6">
        {value}
      </Typography>
    </Box>
  );
}
