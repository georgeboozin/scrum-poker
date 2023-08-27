import { useCallback } from "react";
import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useNotification } from "../lib/notification";
import { useCopyLink } from "../lib/copy-link";
import { useMatchPage } from "../lib/match-page";

export function Layout() {
  const { notification, handleCloseNotification, updateNotification } =
    useNotification();
  const { copyLink } = useCopyLink();
  const { isRoom } = useMatchPage();
  const handleClick = useCallback(async () => {
    try {
      await copyLink();
      updateNotification({
        message: "Invitation link copied",
        isOpen: true,
      });
    } catch (e) {
      updateNotification({
        message: "Invitation link wasn't copy",
        isOpen: true,
      });
    }
  }, [updateNotification, copyLink]);

  return (
    <>
      <AppBar position="static">
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
                onClick={handleClick}
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
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
      <Snackbar
        open={notification.isOpen}
        onClose={handleCloseNotification}
        autoHideDuration={2000}
        message={notification.message}
      />
    </>
  );
}
