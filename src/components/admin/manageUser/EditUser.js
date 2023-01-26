import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { blue, green } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Stack from '@mui/material/Stack';
import UpdateIcon from '@mui/icons-material/Edit';
import SnackBar from "../../SnackBar";
export default function EditUser({data}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


//Modifier les informations de l'article
const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    role:"",
  });

  const { firstname, lastname, email, username, role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
console.log(user.firstname)
  useEffect(() => {
    loadUser();
  }, []);
  let token = localStorage.getItem("tokentoken")
  const onSubmit = async (e) => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    e.preventDefault();
    await axios.put(`http://localhost:8888/api/v1/users/${data}`, user,config).then(res => {
      console.log("Success")
  }).catch(error => {
    console.log(error)
  });
    alert("✔️ L'utilisateur a été modifier avec succès!");
    window.location.reload();

  };

  //Récupérer les infos de l'article seléctionner
  const loadUser = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    const result = await axios.get(`http://localhost:8888/api/v1/admin/users/${data}`,config).then(res => {
      console.log("Success")
      setUser(res.data);
  }).catch(error => {
    console.log(error)
  });
  };

  return (
    <div>
        <Button style={{borderRadius:'80%'}} >
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
        <UpdateIcon variant="outlined" onClick={handleClickOpen}></UpdateIcon>
                </Avatar>
                </Button>
      
     
      <Dialog open={open} onClose={handleClose} >
      
        <DialogTitle>Modifier un utilisateur</DialogTitle>
        <DialogContent>
          <React.Fragment >
      
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstname"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            name="firstname"
            value={firstname}
            onChange={(e) => onInputChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastname}
            onChange={(e) => onInputChange(e)}
          />
        </Grid>
       
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="email"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={email}
            onChange={(e) => onInputChange(e)}
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} style={{borderRadius:'12px' }}variant="outlined" color="error">Annuler</Button>
          <Button onClick={onSubmit}  style={{borderRadius:'12px' }}variant="outlined" color="success"><SnackBar>Enregistrer</SnackBar></Button>
        </DialogActions>
       
      </Dialog>
    </div>
  );
}