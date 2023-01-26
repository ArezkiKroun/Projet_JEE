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
import { blue, green, yellow } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Stack from '@mui/material/Stack';
import UpdateIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
export default function EditProfil({data}) {
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
  });

  const { firstname, lastname, email, } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
console.log(user.firstname)
  useEffect(() => {
    loadUser();
  }, []);

  let token = localStorage.getItem("tokentoken")
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8888/api/v1/dash/users/${data}`, user ,{
        headers: {
          Authorization: "Bearer " + token, 
        },
      }).then(res => {
          console.log("Success")
      }).catch(error => {
        console.log(error)
      });
    alert("✔️ Vos donnés sont modifer avec succès!");
    window.location.reload();

  };

  //Récupérer les infos de l'utilisateur seléctionner
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8888/api/v1/admin/users/${data}`,{
        headers: {
          Authorization: "Bearer " + token, 
        },
      }).then(res => {
          console.log("Success")
      }).catch(error => {
        console.log(error)
      });
    setUser(result.data);
  };

  return (
    <div>
        
               <ListItemButton onClick={handleClickOpen}>
      <ListItemIcon>
     
        <Avatar sx={{ backgroundColor:'white', color: yellow[600] }}>
        <UpdateIcon variant="outlined" onClick={handleClickOpen}></UpdateIcon>
                </Avatar>

      </ListItemIcon> 
      <ListItemText primary="Modifier Profil"/>
    </ListItemButton>
      <Dialog open={open} onClose={handleClose} >
      
        <div style={{ display:'flex', justifyContent:'center' }}>
        <UpdateIcon sx={{ marginTop:'3%',backgroundColor:'none', color: yellow[600] }} variant="outlined"></UpdateIcon>
              <DialogTitle > Modifier mon Profil</DialogTitle>   
              </div>
        <DialogContent>
          <React.Fragment >
      
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Nom"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastname}
            onChange={(e) => onInputChange(e)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstname"
            label="Prénom"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            name="firstname"
            value={firstname}
            onChange={(e) => onInputChange(e)}
          />
        </Grid>
       
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="email"
            label="Email"
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
          <Button onClick={onSubmit}  style={{borderRadius:'12px' }}variant="outlined" color="success">Enregistrer</Button>
        </DialogActions>
       
      </Dialog>
    </div>
  );
}