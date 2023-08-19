import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useJoinRoom } from "@/shared/lib/use-cases/join-room";
import { useForm } from "../lib/form";

export function JoinRoom() {
  const { joinRoom } = useJoinRoom();
  const { values, handleNameChange, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(({ name }) => joinRoom(name))}>
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
          <Button type="submit" variant="contained" size="large" fullWidth>
            Join Room
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
