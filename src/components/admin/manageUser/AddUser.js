import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { blue} from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import UpdateIcon from '@mui/icons-material/GroupAdd';

export default function AddUser() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //recuperer les champs a envoyer dans la bdd
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let token = localStorage.getItem("tokentoken")

  //endpoint qui ajoute les utilisateurs
  const onSubmit = async (e) => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    e.preventDefault();
    await axios.post(`http://localhost:8888/api/v1/admin/users`, user, config).then(res => {
      console.log("Success")
      alert("✔️ L'utilisateur a été ajouter avec succès!");
    window.location.reload()
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <div>
      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
        <UpdateIcon variant="outlined" onClick={handleClickOpen}></UpdateIcon>
      </Avatar>

      <Dialog open={open} onClose={handleClose} >
        <form onSubmit={(e) => onSubmit(e)}>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
          <DialogContent>
            <React.Fragment >

              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type={"text"}
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type={"text"}
                    id="lastname"
                    name="lastname"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    type={"email"}
                    id="address2"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$", title: "au moins 8 caractères et au maximum 20 caractères de chiffres / miniscules / majiscules / caractère spéciaux" }}
                    minlength="8"
                    maxlength="20"
                    type={"text"}
                    isRequired="true"
                    id="password"
                    name="password"
                    label="Mot de passe"
                    fullWidth
                    autoComplete="off"
                    variant="standard"
                    onChange={(e) => onInputChange(e)}
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