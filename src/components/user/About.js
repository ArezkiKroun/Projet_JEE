import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import InfoIcon from '@mui/icons-material/Info';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
export default function About() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemIcon>
          <Avatar sx={{ backgroundColor: 'white', color: red[600] }}>
            <InfoIcon variant="outlined" onClick={handleClickOpen}></InfoIcon>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Description du portfolio" />
      </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Description"}
        </DialogTitle>
        <DialogContent dividers style={{ color: '#0000FF' }}>
          <DialogContentText id="alert-dialog-description">
            Sur cette presente page, vous pouvez visualiser les détails de votre
            profil et les modifiers, mais aussi modifier votre mot de passe.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            D'autre part, les images affichés sur cette page sont de contenu public mais aussi privé
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ borderRadius: '12px' }} variant="outlined" color="error">Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}