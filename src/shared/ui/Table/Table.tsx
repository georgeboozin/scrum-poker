import Box from "@mui/material/Box";
import { lightBlue } from "@mui/material/colors";
import { TableContent, Props as TableContentProps } from "./TableContent";

type Props = TableContentProps;

export function Table(props: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 150,
        borderRadius: 2,
        backgroundColor: lightBlue[50],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContent {...props} />
    </Box>
  );
}
