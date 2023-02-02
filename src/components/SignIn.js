import React, { useState } from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import PersonIcon from '@mui/icons-material/Person';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import { MdOutlineVisibility } from 'react-icons/md';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { useFormik } from 'formik';
import * as yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { blue } from '@mui/material/colors';

const theme = createTheme();

const validationSchema = yup.object({
  password: yup
    .string('Veuillez saisir votre mot de passe')
    .min(5, 'Le mot de passe doit contenir au moins 5 caractères')
    .required('Veuillez remplir ce champ'),
});

export default function SignIn() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  let navigate = useNavigate();
  let location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      localStorage.setItem('token', values.email + values.password)

      navigate(`/navbar/` + location.search);
    },
  });

  const handleClickShowPassword = () => {
    formik.setFieldValue('showPassword', !formik.values.showPassword)

  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e, value) => {
    e.preventDefault();
    await axios.post(`http://localhost:8888/api/v1/auth/authenticate`, user).then(res => {
      console.log("Success")
      localStorage.setItem('tokentoken', res.data.token)
      localStorage.setItem('tokenid', res.data.idUser)
      console.log(res.data)
      if (res.data.role === "ADMIN") {
        navigate(`/dashboard`);
      } else if (res.data.role === "USER") {
        navigate(`/navbar`);
      }
    }).catch(error => {
      localStorage.clear()
      alert("utilisateur ou mot de passe incorrect")
    });
  };

  return (
    <div>
      <Button style={{ borderRadius: '80%' }} >
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
          <PersonIcon variant="outlined" onClick={handleClickOpen}></PersonIcon >
        </Avatar>
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogContent>
          <React.Fragment >
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Se connaicter
                </Typography>
                <Box component="form" onSubmit={((e) => onSubmit(e))} sx={{ mt: 1 }}>
                  <TextField
                    required
                    type={"email"}
                    id="address2"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="outlined"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    onChange={(e) => onInputChange(e)}
                    label="Password"
                    id="password"
                    variant="outlined"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            style={{ marginLeft: '10%', color: '#00008C' }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {formik.values.showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}

                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    type={formik.values.showPassword ? 'text' : 'password'}
                  />
                  <br></br>
                  <br></br>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: '#CBB8F0', height: '40px', borderRadius: '5%' }}
                  >
                    Se connaicter
                  </Button>
                  <br></br>
                  <br></br>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/forgetpassword" variant="body2">
                        Mot de passe oublié?
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </React.Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
}