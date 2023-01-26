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
import UpdateIcon from '@mui/icons-material/Key';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
export default function EditPassword({data}) {
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
console.log(user.oldPassword)
  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8888/api/v1/auth/dash/users/password/${data}`, user);
    alert("✔️ Le mot de passe a été modifier avec succès!");
    window.location.reload();

  };

  //Récupérer les infos de l'article seléctionner
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8888/api/v1/auth/admin/users/${data}`);
    setUser(result.data);
  };

  return (
    <div>
       <ListItemButton onClick={handleClickOpen}>
      <ListItemIcon>
     
        <Avatar sx={{ backgroundColor:'white', color: blue[600] }}>
        <UpdateIcon variant="outlined" onClick={handleClickOpen}></UpdateIcon>
                </Avatar>

      </ListItemIcon>
      <ListItemText primary="Modifier Mot de passe"/>
    </ListItemButton>
      
     
      <Dialog open={open} onClose={handleClose} >
      
      <div style={{ display:'flex', justifyContent:'center' }}>
        <UpdateIcon sx={{ marginTop:'4%',backgroundColor:'none', color: blue[600] }} variant="outlined"></UpdateIcon>
              <DialogTitle > Modifier mon Mot de passe</DialogTitle>   
              </div>
        <DialogContent>
          <React.Fragment >
      
      <Grid container spacing={3}>
      
        <Grid item xs={12}>
          <TextField
            required
            id="oldPassword"
            name="oldPassword"
            label="Ancien motde passe"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={oldPassword}
            onChange={(e) => onInputChange(e)}
          />
        </Grid>
       
        <Grid item xs={12}>
          <TextField
          required
            id="newPassword"
            name="newPassword"
            label="Nouveau mot de passe"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={newPassword}
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