import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useForm } from "./JoinRoom.hooks";

export function JoinRoom() {
  const { values, handleNameChange, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit}>
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
            Join
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
