import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useCreateRoom } from "@/shared/lib/use-cases/create-room";
import { useCloseConnections } from "@/shared/lib/use-cases/close-connections";
import { useLoginForm } from "@/shared/lib/login-form";

export function CreateRoom() {
  const { createRoom } = useCreateRoom();
  const { values, handleNameChange, handleSubmit } = useLoginForm();
  useCloseConnections();

  return (
    <form onSubmit={handleSubmit(({ name }) => createRoom(name))}>
      <Grid container rowGap={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={values.name}
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
