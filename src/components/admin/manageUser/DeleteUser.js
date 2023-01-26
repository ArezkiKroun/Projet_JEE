import React from "react";

import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
export default function DeleteUser({data}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//Supprimer l'utilisateur séléctionner
const deleteShop = async (data) => {
    await axios.delete(`http://localhost:8888/api/v1/auth/admin/users/${data}`);
    alert("✔️ L'utilisateur a été supprimé avec succès!");
    window.location.reload()
  };
  return (
    <div>
        <Button style={{borderRadius:'50%' ,color: red[100]}} >
      <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
        <DeleteIcon variant="outlined" onClick={handleClickOpen}></DeleteIcon>
                </Avatar>
                </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmer la suppression?"}
        </DialogTitle>
        <DialogContent dividers style={{ color: '#0000FF'}}>
          <DialogContentText id="alert-dialog-description">
          vous êtes sur le point de supprimer un utilisateur. Cette action est irréversible.
            Souhaitez-vous confirmer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{borderRadius:'12px' }}variant="outlined" color="error">Annuler</Button>
          <Button onClick={() => deleteShop(data)} autoFocus style={{borderRadius:'12px' }}variant="outlined" color="success">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}