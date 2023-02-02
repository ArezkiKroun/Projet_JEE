import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { blue, green } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import UpdateIcon from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@material-ui/core';
import { MdOutlineVisibility } from 'react-icons/md';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function EditPasswordAdmin({ data }) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //Modifier les informations de l'article
  const [user, setUser] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { oldPassword, newPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  let token = localStorage.getItem("tokentoken")
  //endpoint qui permet de modifier un motde passe
  const onSubmit = async (e) => {
    //comparer les 2 mots de passes s'il sont identiques
    var champ_1 = (document.getElementById('mdp1').value);
    var champ_2 = (document.getElementById('mdp2').value);
    if (champ_1 !== champ_2) {
      e.preventDefault();
      alert("Les 2 nouveaux mots de passe ne sont pas identiques");

    } else {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      }
      e.preventDefault();
      await axios.put(`http://localhost:8888/api/v1/users/password/${data}`, user, config).then(res => {
        console.log("Success")
        alert("✔️ Le mot de passe a été modifier avec succès!");
        window.location.reload();
      }).catch(error => {
        alert(" Veuillez saisir le bon mot de passe actuel!");
        console.log(error)
      });
    }
  };

  const validationSchema = yup.object({
    password: yup
      .string('Veuillez saisir votre mot de passe')
      .min(5, 'Le mot de passe doit contenir au moins 5 caractères')
      .required('Veuillez remplir ce champ'),
  });

  const handleClickShowPassword = () => {
    formik.setFieldValue('showPassword', !formik.values.showPassword)

  };
  const handleClickShowPassword2 = () => {
    formik.setFieldValue('showPassword2', !formik.values.showPassword2)
  };
  const handleClickShowPassword3 = () => {
    formik.setFieldValue('showPassword3', !formik.values.showPassword3)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      showPassword2: false,
      showPassword3: false,
      password: '',
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('token', values.email + values.password)
    },
  });

  //Récupérer les infos de l'utilisateur seléctionner
  const loadUser = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    await axios.get(`http://localhost:8888/api/v1/users/${data}`, config).then(res => {
      console.log("Success")
      setUser(res.data);
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <div>
      <Button style={{ borderRadius: '80%' }} >
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
          <UpdateIcon variant="outlined" onClick={handleClickOpen}></UpdateIcon>
        </Avatar>
      </Button>

      <Dialog open={open} onClose={handleClose} >
        <form onSubmit={(e) => onSubmit(e)}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <UpdateIcon sx={{ marginTop: '3%', backgroundColor: 'none', color: blue[600] }} variant="outlined"></UpdateIcon>
            <DialogTitle > Modifier mon Mot de passe</DialogTitle>
          </div>
          <DialogContent>
            <React.Fragment >

              <Grid container spacing={3}>

                <Grid item xs={12}>
                  <TextField
                    required
                    inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$", title: "au moins 8 caractères et au maximum 20 caractères de chiffres / miniscules / majiscules / caractère spéciaux" }}
                    id="oldPassword"
                    name="oldPassword"
                    label="Mot de passe actuel"
                    fullWidth
                    isRequired="true"
                    autoComplete="off"
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            style={{ marginLeft: '10%', color: '#00008C' }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword3}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {formik.values.showPassword3 ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    type={formik.values.showPassword3 ? 'text' : 'password'}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$", title: "au moins 8 caractères et au maximum 20 caractères de chiffres / miniscules / majiscules / caractère spéciaux" }}
                    id="mdp1"
                    name="newPassword"
                    label="Nouveau mot de passe"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                    value={newPassword}
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
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$", title: "au moins 8 caractères et au maximum 20 caractères de chiffres / miniscules / majiscules / caractère spéciaux" }}
                    id="mdp2"
                    label="Nouveau mot de passe"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            style={{ marginLeft: '10%', color: '#00008C' }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {formik.values.showPassword2 ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    type={formik.values.showPassword2 ? 'text' : 'password'}
                  />
                </Grid>

              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ borderRadius: '12px' }} variant="outlined" color="error">Annuler</Button>
            <Button type="submit" style={{ borderRadius: '12px' }} variant="outlined" color="success">Enregistrer</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}