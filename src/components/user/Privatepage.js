import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DownloadIcon from '@mui/icons-material/Download';
import ListItemText from '@mui/material/ListItemText';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DetailPicture from './../admin/managePicture/DetailPicture';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from "file-saver";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from "react";
import axios from "axios";
import ZoomImage from './../admin/managePicture/ZoomImage'

function DashboardContent() {

    const downloadimage = (url, nom) => {
        saveAs(url, nom);
    }

    const [images, setImages] = useState([]);

    useEffect(() => {
        loadPictures()
    }, []);

    let token = localStorage.getItem("tokentoken")

    //endpoint qui recupere la liste des images
    const loadPictures = async () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }
        console.log(config)
        await axios.get('http://localhost:8888/api/v1/imagesList', config).then(res => {

            console.log("Success")
            setImages(res.data);
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        });

    };

    //Filtre de rechrche
    const [searchField, setsearchField] = useState('');

    const filterimages = images.filter(local => (
        local.title.toLowerCase().includes(searchField.toLowerCase())
    ));

    return (

        <ThemeProvider>
            <Container sx={{ py: 1 }} maxWidth="100%">
                <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} md={4} lg={4} >
                            <ListItemText primary="Liste des images" />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4}>
                            <TextField
                                onChange={(e) => setsearchField(e.target.value)}
                                label="Recherche"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>

                <Grid container spacing={5}>

                    {filterimages.sort((a, b) => a.title > b.title ? 1 : -1).map((row, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>

                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '16.25%',
                                    width: '100%',
                                    height: '40%'
                                }}
                                image={row.url}
                                alt="image"
                            />
                            <ZoomImage data={row.id}></ZoomImage>

                            <CardContent>
                                <DetailPicture data={row.id}></DetailPicture>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {row.title}
                                </Typography>
                                <Typography>
                                    <DownloadIcon style={{}} onClick={() => { downloadimage(row.url, row.title); }}></DownloadIcon>
                                </Typography>
                            </CardContent>

                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default function PrivatePage() {
    return <DashboardContent />;
}