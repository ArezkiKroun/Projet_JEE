import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import AddPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
import { Input, NativeSelect } from "@mui/material";

export default function AddPicture() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [fil, setFil] = useState('')

  const handleImage = (e) => {
    console.log(e.target.files, "$$$$$")
    setFil(e.target.files[0])
  }

  console.log(fil)

  //recuperer les champs a envoyer dans la bdd
  const [image, setImage] = useState({
    description: "",
    title: "",
    type: "",
  });

  const onInputChange = (e) => {
    setImage({ ...image, [e.target.name]: e.target.value });
  };

  let token = localStorage.getItem("tokentoken")

  console.log(fil)
  console.log(image)


  let file = new FormData();
  file.append('file', fil)
  let c = new Blob([JSON.stringify(image)], { type: 'application/json' })
  file.append('image', c)


  //endpoint qui ajoute les utilisateurs
  const onSubmit = async (e) => {

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'

      }
    }
    e.preventDefault();
    console.log(Array.from(file))
    await axios.post(`http://localhost:8888/api/v1/admin/upload`, file, config).then(res => {
      console.log("Success")
      alert("✔️ L'image a été ajouter avec succès!");
      window.location.reload()
    }).catch(error => {
      console.log(error)
      alert(" La taille de l'image ne doit pas dépasser 10 MO");
    });

  };

  return (
    <div>
      <AddPhotoIcon variant="outlined" onClick={handleClickOpen}>
      </AddPhotoIcon>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e) => onSubmit(e)}>
          <DialogTitle>Ajouter une image</DialogTitle>
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
                    maxlength="500"
                    variant="standard"
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
                    onChange={(e) => onInputChange(e)}
                  />
                </Grid>
                <br></br>
                <br></br>
                <Grid item xs={6} >
                  <NativeSelect
                    name="type"
                    style={{
                      width: '100%', height: '20px',
                      border: 'none',
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      marginTop: '8%',
                    }}
                    onChange={(e) => onInputChange(e)}>
                      <option >TYPE ----</option>
                    <option >PRIVATE</option>
                    <option >PUBLIC</option>
                  </NativeSelect>
                </Grid>

                <Grid item xs={12}>
                  <Input style={{
                    border: 'none',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    marginTop: '4%'
                  }}
                    name="file" type="file" onChange={(e) => handleImage(e)} />
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