import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from "axios";
import CardMedia from '@mui/material/CardMedia';

export default function DetailPicture({ data }) {
  
  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    //Recuperer les donnees des utilisateurs selectionner
    const [picture, setPicture] = useState([])

    useEffect(() => {
      loadPicture();
    }, []);

    //endpoint qui recupere l'utilisateur sélectionner
    let token = localStorage.getItem("tokentoken")
    const loadPicture = async () => {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      }
      await axios.get(`http://localhost:8888/api/v1/images/${data}`, config).then(res => {
        console.log("Success")
        setPicture(res.data);
      }).catch(error => {
        console.log(error)
      });
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <center>
          <DialogTitle>Détails</DialogTitle>
          <List sx={{ pt: 0 }}>
            <CardMedia
              component="img"
              sx={{
                width: '50%',
                height: '50%'
              }}
              image={picture.url}
              alt="Privee"
            />
            <br></br>
            <h4>Titre:</h4>
            <ListItemText primary={picture.title} />
            <br></br>
            <h4>Description:</h4>
            <ListItemText primary={picture.description} />
            <br></br>
            <h4>Type:</h4>
            <ListItemText primary={picture.type} />
          </List>
        </center>
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

      <Button variant="outlined" style={{ borderRadius: '12px', backgroundColor: 'green', color: 'white' }} onClick={handleClickOpen}>
        VIEW
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}