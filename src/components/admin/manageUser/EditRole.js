import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import UpdateIcon from '@mui/icons-material/Edit';

export default function EditRole({ data }) {

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

  //endpoint qui modifie le role
  let token = localStorage.getItem("tokentoken")
  const onSubmit = async (e) => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    e.preventDefault();
    await axios.put(`http://localhost:8888/api/v1/admin/users/role/${data}`, user, config).then(res => {
      console.log("Success")
    }).catch(error => {
      console.log(error)
    });
    alert("✔️ Le role a été modifier avec succès!");
    window.location.reload();
  };

  //Récupérer les infos de l'utilisateur seléctionner
  const loadUser = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    const result = await axios.get(`http://localhost:8888/api/v1/users/${data}`, config).then(res => {
      console.log("Success")
      setUser(res.data);
    }).catch(error => {
      console.log(error)
    });
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
                <select name="role" style={{
                  width: '100%', height: '20px', outline: 'none', backgroundColor: 'transparent',
                  border: 'none',
                  padding: '0 1em 0 0',
                  margin: '0',
                  width: '100%',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  cursor: 'inherit',
                  lineHeight: 'inherit'
                }}
                  onChange={(e) => onInputChange(e)}>
                  <option value="">Role ...</option>
                  <option value={role}>ADMIN</option>
                  <option value={role}>USER</option>
                </select>
              </Grid>

            </Grid>
          </React.Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ borderRadius: '12px' }} variant="outlined" color="error">Annuler</Button>
          <Button onClick={onSubmit} style={{ borderRadius: '12px' }} variant="outlined" color="success">Enregistrer</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}