
import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NativeSelect } from "@mui/material";
export default function EditPicture({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //recuperer les champs a envoyer dans la bdd
  const [image, setImage] = useState({
    description: "",
    title: "",
    type: "",
  });
  console.log(image)
  const { description, title, type } = image;

  const onInputChange = (e) => {
    setImage({ ...image, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadPicture();
  }, []);

  let token = localStorage.getItem("tokentoken")

  //endpoint qui modifie les images
  const onSubmit = async (e) => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    e.preventDefault();
    await axios.put(`http://localhost:8888/api/v1/admin/images/${data}`, image, config).then(res => {
      console.log("Success")
      alert("✔️ L'image a été modifier avec succès!");
      window.location.reload()
    }).catch(error => {
      console.log(error)
    });

  };

  //Récupérer les infos de l'image seléctionner
  const loadPicture = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    await axios.get(`http://localhost:8888/api/v1/images/${data}`, config).then(res => {
      console.log("Success")
      setImage(res.data);
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <div>
      <Button variant="outlined" style={{ borderRadius: '12px', backgroundColor: 'blue', color: 'white' }} onClick={handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e) => onSubmit(e)}>
          <DialogTitle>Modifier l'image</DialogTitle>
          <DialogContent>
            <React.Fragment>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="description"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={description}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="title"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    value={title}
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <br></br>
                <br></br>
                <Grid item xs={6} >
                  <NativeSelect
                    name="type" style={{
                      width: '100%', height: '20px',
                      border: 'none',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      marginTop: '8%',

                    }}
                    defaultValue={type}
                    onChange={(e) => onInputChange(e)}>
                    <option >PRIVATE</option>
                    <option >PUBLIC</option>
                  </NativeSelect>
                </Grid>
              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ borderRadius: '12px' }} variant="outlined" color="error">Annuler</Button>
            <Button type="submit" style={{ borderRadius: '12px' }} variant="outlined" color="success">Enregistrer</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}