import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import axios from "axios";
import CardMedia from '@mui/material/CardMedia';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

export default function ZoomImage({ data }) {
    console.log(data)
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
                console.log(res.data)
            }).catch(error => {
                console.log(error)
            });
        };

        return (
            <Dialog onClose={handleClose} open={open}>
                <center>
                    <List sx={{ pt: 0 }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: '100%',
                                height: '100%'
                            }}
                            image={picture.url}
                            alt="Privee"
                        />
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
            <ZoomInIcon variant="outlined" onClick={handleClickOpen}>
            </ZoomInIcon>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}