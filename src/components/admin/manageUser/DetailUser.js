import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import { blue, green, yellow } from '@mui/material/colors';
import axios from "axios";

export default function DetailUser({ data }) {
  console.log(data)
  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    //Recuperer les donnees des utilisateurs selectionner
    const [user, setUser] = useState({
      id: "",
      lastname: "",
      firstname: "",
      email: "",
      username: "",
      role: "",
    })

    useEffect(() => {
      loadUser();
    }, []);

    //endpoint qui recupere l'utilisateur sélectionner
    let token = localStorage.getItem("tokentoken")
    const loadUser = async () => {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      }
      await axios.get(`http://localhost:8888/api/v1/users/${data}`, config).then(res => {
        console.log("Success")
        setUser(res.data);
      }).catch(error => {
        console.log(error)
      });
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Mon compte {user.role}</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nom:" />
              <ListItemText primary={user.lastname} />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Prénom:" />
              <ListItemText primary={user.firstname} />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: yellow[100], color: yellow[600] }}>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email: " />
              <ListItemText primary={user.email} />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
      </Typography>
      <Button style={{ borderRadius: '50%' }} >
        <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
          <PersonIcon variant="outlined" onClick={handleClickOpen}>
          </PersonIcon>
        </Avatar>
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}