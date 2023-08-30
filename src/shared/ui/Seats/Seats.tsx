import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import { Children, ReactElement, cloneElement } from "react";

interface Props {
  isRevealed: boolean;
  sx?: SxProps;
  children: ReactElement[];
}

export function Seats({ isRevealed, sx, children }: Props) {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {Children.map(children, (child) =>
        cloneElement(child, { ...child.props, isRevealed })
      )}
    </Box>
  );
}
