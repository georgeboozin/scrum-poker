import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useLayout } from "./Layout.hooks";

export function Main() {
  const { isRoom, isOpenNotification, handleInvite, handleCloseNotification } =
    useLayout();

  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              a: {
                textDecoration: "none",
                color: "unset",
              },
            }}
          >
            <Link to="/">
              <Typography variant="h6">Scrum Poker</Typography>
            </Link>
            {isRoom && (
              <IconButton
                onClick={handleInvite}
                sx={{
                  color: "white",
                }}
              >
                <PersonAddIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
      <Snackbar
        open={isOpenNotification}
        onClose={handleCloseNotification}
        autoHideDuration={5000}
        message="Invitation link copied"
      />
    </>
  );
}
