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
export default function EditRole({data}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


//Modifier les informations de l'article
const [user, setUser] = useState({
    role: "",
  });

  const { role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8888/api/v1/auth/admin/users/role/${data}`, user);
    alert("✔️ Le role a été modifier avec succès!");
    window.location.reload();
  };

  //Récupérer les infos de l'article seléctionner
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8888/api/v1/auth/admin/users/${data}`);
    setUser(result.data);
  };

  return (
    <div>
        

        <UpdateIcon variant="outlined" onClick={handleClickOpen}></UpdateIcon>
      <Dialog open={open} onClose={handleClose} >
      
        <DialogTitle>Modifier le Role</DialogTitle>
        <DialogContent>
          <React.Fragment >
      
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="role"
            label="Role"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            name="role"
            value={role}
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