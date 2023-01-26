import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeletePicture() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" style={{borderRadius:'12px',backgroundColor:'red',color:'white'}} onClick={handleClickOpen}>
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
        <DialogContent dividers style={{ color: '#0000FF'}}>
          <DialogContentText id="alert-dialog-description">
          vous êtes sur le point de supprimer un utilisateur. Cette action est irréversible.
            Souhaitez-vous confirmer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{borderRadius:'12px' }}variant="outlined" color="error">Annuler</Button>
          <Button onClick={handleClose} autoFocus style={{borderRadius:'12px' }}variant="outlined" color="success">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}