import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue, green ,yellow} from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from "axios";
const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function DetailCurrentUser({ data }) {
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

   //Recuperer les donnees des utilisateurs selectionner
   const [user, setUser] = useState({
    id:"",
    lastname: "",
    firstname: "",
    email: "",
    username: "",
    role:"",
   })

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8888/api/v1/auth/admin/users/${data}`);
    setUser(result.data);
    console.log(result.data)
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Details</DialogTitle>
      <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText  primary="Nom:" />
              <ListItemText  primary={user.lastname} />
            </ListItemButton>
            </ListItem>
            <ListItem disableGutters>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText  primary="Prénom:" />
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
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  

  return (
    <div>
      <Typography variant="subtitle1" component="div">
      </Typography>
      <Button style={{borderRadius:'50%'}} >
      <Avatar onClick={handleClickOpen} sx={{ bgcolor: green[100], color: green[600] }}>
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