import { useCallback } from "react";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Grid from "@mui/material/Grid";
import { useLogin, useForm, TypeConncetion } from "./Login.hooks";

export function Login() {
  const { roomId, createRoom, joinRoom } = useLogin();
  const {
    values,
    handleNameChange,
    handleRoomIdChange,
    handleTypeConncetionChange,
  } = useForm();

  const handleCopy = useCallback(
    () => navigator.clipboard.writeText(roomId),
    [roomId]
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (values.typeConncetion === TypeConncetion.host) {
        createRoom(values.name);
      } else {
        joinRoom(values.roomId);
      }
    },
    [values]
  );

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
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={values.typeConncetion}
            onChange={handleTypeConncetionChange}
          >
            <FormControlLabel value="host" control={<Radio />} label="Host" />
            <FormControlLabel
              value="participant"
              control={<Radio />}
              label="Participant"
            />
          </RadioGroup>
        </Grid>

        {values.typeConncetion === TypeConncetion.participant && (
          <Grid item xs={12}>
            <TextField
              id="roomId"
              label="Room ID"
              variant="outlined"
              value={values.roomId}
              onChange={handleRoomIdChange}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained" size="large">
            {values.typeConncetion === TypeConncetion.participant
              ? "Join"
              : "Create Room"}
          </Button>
        </Grid>
      </Grid>
      your id: {roomId}
      <Button onClick={handleCopy}>Copy</Button>
    </form>
  );
}
