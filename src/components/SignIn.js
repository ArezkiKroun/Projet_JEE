import React, { useEffect, useState } from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import PersonIcon from '@mui/icons-material/Person';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { makeStyles } from '@material-ui/core';
import {TextField, InputAdornment} from '@material-ui/core';
import { MdOutlineVisibility} from 'react-icons/md';
import { MdOutlineVisibilityOff} from 'react-icons/md';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputLabel from '@mui/material/InputLabel';

import IconButton from '@material-ui/core/IconButton';
import {
  useNavigate,
  useLocation,
} from "react-router-dom";


import axios from "axios";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { blue, green } from '@mui/material/colors';



import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Stack from '@mui/material/Stack';
import UpdateIcon from '@mui/icons-material/Edit';
import SnackBar from "./SnackBar";
import Dashboard from "./admin/Dashboard";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const validationSchema = yup.object({
  email: yup
    .string('Veuillez saisir votre adresse mail')
    .email('Veuillez saisir une adresse mail valide')
    .required('Veuillez remplir ce champ'),
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
  const { email, password} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
   
  };
 const[datarole,setDatarole]= useState({})
  const onSubmit = async (e,value) => {
    e.preventDefault();
    console.log(user)
    const result = await axios.post(`http://localhost:8888/api/v1/auth/authenticate`, user);
    localStorage.setItem('tokentoken', result.data.token)
    localStorage.setItem('tokenid', result.data.idUser)
    localStorage.setItem('tokenid', result.data.role)
    document.cookie = `tokentoken=${result.data.token}`;
    setDatarole(result.data.role);
    if (result.data.role === "ADMIN"){
      navigate(`/dashboard`);
    }else if(result.data.role === "USER"){
      navigate(`/navbar/${result.data.idUser}`);
    }
    
  };
console.log(datarole)
  return (
    <div>
        <Button style={{borderRadius:'80%'}} >
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
        <PersonIcon  variant="outlined" onClick={handleClickOpen}></PersonIcon >
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
          <Box component="form" onSubmit={(e) => onSubmit(e)}  noValidate sx={{ mt: 1 }}>
            <TextField
               margin="normal"
               required
               type={"email"}
               fullWidth
               label="Email"
               autoComplete="current-password"
               id="email"
               name="email"
               value={email}
               onChange={(e) => onInputChange(e)}
               variant="outlined"
               /*
               value={formik.values.email}
               onChange={formik.handleChange}
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
               */
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
              /*
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
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          */
            />
            
            <br></br>
            <br></br>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:'#CBB8F0',height:'40px',borderRadius:'5%'}}
             
            >
              Sign In
            </Button>
            <br></br>
            <br></br>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
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