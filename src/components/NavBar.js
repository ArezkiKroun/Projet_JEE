import * as React from 'react';
import { useEffect } from "react";

import axios from "axios";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {Tooltip} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link, useParams } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//import NotificationsIcon from '@mui/icons-material/Notifications';
import DeconnexionIcon from '@mui/icons-material/Login';
import CloudIcon from '@mui/icons-material/Cloud';
import GitIcon from '@mui/icons-material/GitHub';
import { mainListItems, secondaryListItems } from './admin/listItems';
import Button from '@mui/material/Button';
import { Brightness4, Brightness7, Home, Menu } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeComponents from './meteo/Components/Home';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { blue, green ,yellow} from '@mui/material/colors';
import SignIn from './SignIn';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import { Navigate, NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import EditPassword from './user/EditPassword';
import EditProfil from './user/EditProfil';
import About from './user/About';
import DetailCurrentUser from './user/DetailCurrentUser';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        <GitIcon/>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
const [light, setlight] = useState(true);

const darkTheme = useMemo(
  () =>
    createTheme({
      palette: {
        mode: light ? 'light' : 'dark',
      },
    }),
  [light]
);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  let navigate = useNavigate();
  const handleClose = () => {
    navigate("/login");
    setAnchorEl(null);
  };

  const Tabs = styled(NavLink)`
  color: black;
  margin-right: 20px;
  text-decoration: none;
  font-size: 20px;
`;

const deleteoken = () => {
  localStorage.clear()
  this.setState({});
};
const { id } = useParams();

//recuperer le user actuel
const [user, setUser] = useState([]);

useEffect(() => {
  loadUser();
}, []);

const loadUser = async () => {
  const result = await axios.get(`http://localhost:8888/api/v1/auth/admin/users/${id}`);
  setUser(result.data);
  console.log(result.data)
};

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
        <Tooltip title="Revenir a l'acceuil">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/navbar2')}>
                <Home fontSize="large"/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Meteo">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/navbar2')}>
                <CloudIcon fontSize="large"/>
              </IconButton>
            </Tooltip>
            
            <Typography
            aria-label="open drawer"
            edge="start"
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 100 }}             
            >
              Dashboard
            </Typography>
            <DetailCurrentUser data={id}></DetailCurrentUser>
      <ListItemText primary="HELLO"></ListItemText>
      <ListItemText primary={user.email}/>
   
            <Tooltip title="Mode sombre / clair">
            <IconButton onClick={() => setlight(!light)}>
              {light ? <Brightness7 fontSize="large"/> : <Brightness4 fontSize="large"/>}
            </IconButton>
            </Tooltip>
            
            <ListItemAvatar>
            <Tooltip title="deonnaciter">
            <Tabs to="/" style={{color:'white'}} onClick={ ()=> {
              deleteoken();
            }}><LogoutTwoToneIcon fontSize="large"></LogoutTwoToneIcon> 
            </Tabs>  
                </Tooltip>
            </ListItemAvatar>
             
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" style = {{backgroundColor: '#FFFFFF', border:'1px',}} open={open}>
          <Toolbar
            sx={{
              border:'1px',
            Color:'#666666',
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
          <center>
          <Avatar sx={{ bgcolor:blue[100], color: blue[600] }}>
        <PersonIcon ></PersonIcon>
                </Avatar></center>
            <Divider sx={{ my: 1 }} />
           <EditPassword data={id}></EditPassword> 
           <EditProfil data={id}></EditProfil>
            <Divider sx={{ my: 1 }} />
            <h5>Voir plus</h5>
            <Divider sx={{ my: 1 }} />
            <About></About>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
              
             
                <div style={{marginTop:'-5%',marginLeft:'10%'}} >
                <HomeComponents></HomeComponents>
                <iframe seamless width="888" height="336" frameborder="0" src="https://www.infoclimat.fr/public-api/mixed/iframeSLIDE?_ll=48.85341,2.3488&_inc=WyJQYXJpcyIsIjQyIiwiMjk4ODUwNyIsIkZSIl0=&_auth=VU8FEgR6AyEHKgQzUyVXflY%2BVGFZL1N0AX0CYVo%2FVShUPwNiVjYEYgNtUi8EK1VjVHkEZ11mBDQHbAN7DH4HZlU%2FBWkEbwNkB2gEYVN8V3xWeFQ1WXlTdAFmAmNaKVU3VD4DZFYrBGcDclI3BD1VflR4BGVdZAQ7B2ADYQxpB2ZVNwVnBGQDfgd3BGBTYFc3VmVUNVluU2IBYQIxWmJVZ1Q3AzZWPQR4A2xSMAQ3VWlUZgRmXWQEPwd7A3sMGAcXVSsFIQQlAzQHLgR7UzZXPVYx&_c=8930841d420ed487e7c8b0c18fa92ef6"></iframe>
                </div>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function NavBar() {
  return <DashboardContent />;
}