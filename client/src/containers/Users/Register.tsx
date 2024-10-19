import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { RegisterMutation } from '../../types';
import { Avatar, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { selectRegisterError } from '../../store/users/usersSlice.ts';
import {useAppDispatch, useAppSelector} from "../../store/store-hooks.ts";
import {register} from "../../store/users/usersThunk.ts";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    username: '',
    avatar: null,
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
    navigate('/');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
              <TextField
                label="Email"
                name="email"
                autoComplete="new-username"
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
              <TextField
                name="displayName"
                label="Display Name"
                type="displayName"
                value={state.username}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('displayName'))}
                helperText={getFieldError('displayName')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
              <FileInput label="Avatar" onChange={fileInputChangeHandler} name="avatar" type="image/*" />
            </Grid>

            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
