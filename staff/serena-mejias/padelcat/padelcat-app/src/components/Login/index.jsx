import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";
import styles from "./index.module.scss";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin } = props;

  const handleSubmit = event => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <Grid item className={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          className={styles.inputContainer}
          label="Email"
          margin="normal"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          className={styles.inputContainer}
          label="Password"
          margin="normal"
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </Grid>
  );
};

export default Login;
