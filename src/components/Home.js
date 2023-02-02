import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import { Brightness4, Brightness7, Home} from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SignIn from './SignIn';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import { useEffect} from "react";
import {saveAs} from "file-saver";
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DownloadIcon from '@mui/icons-material/Download';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function DashboardContent() {

  const [open, setOpen] = useState(false);
  const [light, setlight] = useState(true);
console.log(setOpen)
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: light ? 'light' : 'dark',
        },
      }),
    [light]
  );

  const navigate = useNavigate();
  const downloadimage = (url,nom) => {
    saveAs(url, nom);
   }
   

  const [images, setImages] = useState([]);

  useEffect(() => {
    loadPictures()
  }, []);

  //endpoint qui recupere la liste des images
  const loadPictures = async () => {
    await axios.get('http://localhost:8888/api/v1/auth/publicImages').then(res => {  
      console.log("Success")
      setImages(res.data);
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    });
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Tooltip title="Revenir a l'acceuil">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/')}>
                <Home fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Meteo">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/homeweather')}>
                <CloudIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="A propos">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/aboutpage')}>
                <InfoIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Typography
              aria-label="open drawer"
              edge="start"
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Acceuil
            </Typography>
            <Tooltip title="Mode sombre / clair">
              <IconButton onClick={() => setlight(!light)}>
                {light ? <Brightness7 fontSize="large" /> : <Brightness4 fontSize="large" />}
              </IconButton>
            </Tooltip>
            <ListItemAvatar>
              <Tooltip title="Se connaciter">
                <SignIn></SignIn>
              </Tooltip>
            </ListItemAvatar>
          </Toolbar>
        </AppBar>
        
        <Container style={{ marginTop: '5%' }} component="main" maxWidth="50%">
        <center>
  <h2 style={{marginTop:'2%'}}>BIENVENUE</h2>
</center>
        <Grid container spacing={5}>

    {images.map((row, index) => (
    <Grid item key={index} xs={12} sm={6} md={4}>
      
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '5.25%',
            width:'100%',
            height:'40%'                 
          }}
          image={row.url}
          alt="image"
        />
        
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
          {row.title}
          </Typography>
          <Typography>
          {row.description}          
          </Typography>
          <Typography>
              <DownloadIcon style={{}} onClick={ ()=> {downloadimage(row.url,row.title);}}></DownloadIcon>
          </Typography>
          
        </CardContent>
      
    </Grid>
  ))}
</Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default function HomePage() {
  return <DashboardContent />;
}