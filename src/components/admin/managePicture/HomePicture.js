import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeconnexionIcon from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';
import { mainListItems, secondaryListItems } from '.././listItems';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DetailPicture from './DetailPicture';
import EditPicture from './EditPicture';
import DeletePicture from './DeletePicture';
import { Brightness4, Brightness7, Home, Menu } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material'
import { saveAs } from "file-saver";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddPicture from './AddPicture';
import EditUser from '../manageUser/EditUser';
import DetailUser from '../manageUser/DetailUser';
import EditPasswordAdmin from '../manageUser/EditPasswordAdmin';
import { useEffect } from "react";
import axios from "axios";
import ZoomImage from './ZoomImage';

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function DashboardContent() {

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      }),
    [dark]
  );

  const navigate = useNavigate();

  const downloadimage = (url, nom) => {
    saveAs(url, nom);
  }


  const deletetoken = () => {
    localStorage.clear()
    navigate('/')
    this.setState({});
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    loadPictures()
  }, []);

  let token = localStorage.getItem("tokentoken")
  let iduser = localStorage.getItem("tokenid");

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

    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton

              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/dashboard')}>
                <Home />
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
              Dashboard
            </Typography>

            <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <DetailUser data={iduser}></DetailUser>

            <IconButton style={{ color: 'white' }} onClick={() => {
              deletetoken();
            }}>
              <DeconnexionIcon />

            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" style={{ backgroundColor: '#FFFFFF', border: '1px', }} open={open}>
          <Toolbar
            sx={{
              border: '1px',
              Color: '#666666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
            <EditUser data={iduser}></EditUser>
            <EditPasswordAdmin data={iduser}></EditPasswordAdmin>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container sx={{ py: 8 }} maxWidth="md">
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

                <Grid item xs={12} md={4} lg={4} >
                  <Button>
                    <AddPicture></AddPicture>
                  </Button>
                </Grid>
              </Grid>
            </Container>

            <Grid style={{ marginTop: '-12%' }} container spacing={5}>

              {filterimages.sort((a, b) => a.title > b.title ? 1 : -1).map((row, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>

                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                      width: '100%',
                      height: '70%'
                    }}
                    image={row.url}
                    alt="image"
                  />

                  <ZoomImage data={row.id}></ZoomImage>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {row.title}
                    </Typography>
                    <Typography>
                      <DownloadIcon style={{}} onClick={() => { downloadimage(row.url, row.title); }}></DownloadIcon>
                    </Typography>
                  </CardContent>
                  <CardActions style={{width:'10%'}}>
                    <DetailPicture data={row.id}></DetailPicture>
                    <EditPicture data={row.id}></EditPicture>
                    <DeletePicture data={row.id}></DeletePicture>
                  </CardActions>

                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function HomePicture() {
  return <DashboardContent />;
}