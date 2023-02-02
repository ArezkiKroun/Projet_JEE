import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteUser({ data }) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //endpoint de la suppression de l'utilisateur selectionner
  let token = localStorage.getItem("tokentoken")
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  }
  const deletepicture = async (data) => {
    await axios.delete(`http://localhost:8888/api/v1/admin/images/${data}`, config).then(res => {
      console.log("Success")
      alert("✔️ L'image a été supprimé avec succès!");
      window.location.reload()
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <div>
      <Button variant="outlined" style={{ borderRadius: '12px', backgroundColor: 'red', color: 'white' }} onClick={handleClickOpen}>
        DELETE
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
        <DialogContent dividers style={{ color: '#0000FF' }}>
          <DialogContentText id="alert-dialog-description">
            vous êtes sur le point de supprimer un utilisateur. Cette action est irréversible.
            Souhaitez-vous confirmer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ borderRadius: '12px' }} variant="outlined" color="error">Annuler</Button>
          <Button onClick={() => deletepicture(data)} autoFocus style={{ borderRadius: '12px' }} variant="outlined" color="success">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}