import { useCallback } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useCreateRoom } from "@/shared/lib/use-cases/create-room";
import { useCloseConnections } from "@/shared/lib/use-cases/close-connections";
import { useForm } from "../lib/form";

export function CreateRoom() {
  const { createRoom } = useCreateRoom();
  const { name, handleNameChange } = useForm();
  useCloseConnections();

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      createRoom(name);
    },
    [name, createRoom]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container rowGap={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            fullWidth
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained" size="large">
            Create Room
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
