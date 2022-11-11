import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useEffect, useRef } from "react";
import { IBodySignIn } from "services/serviceTypes";
import { useAuthActions, useAuthState } from "@store/contexts/auth.context";
import { useRouter } from "next/router";

export default function SignInForm() {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { isLoggingIn, loginError, user } = useAuthState();
  const { login } = useAuthActions();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    if (!enteredUsername || !enteredPassword) {
      return;
    }
    const user: IBodySignIn = {
      password: enteredPassword,
      username: enteredUsername,
    };
    try {
      await login(user);
      router.push("/");
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    user ? router.push("/") : null;
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            inputRef={usernameInputRef}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            type="text"
          />
          <TextField
            inputRef={passwordInputRef}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          {loginError.length ? (
            <Typography sx={{ color: "red" }}>{loginError}</Typography>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            {isLoggingIn ? <CircularProgress /> : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
