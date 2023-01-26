import * as React from 'react';
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
import Link from '@mui/material/Link';
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

const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
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
              sx={{ flexGrow: 1 }}
              
            >
              Dashboard
            </Typography>
            <Tooltip title="Mode sombre / clair">
            <IconButton onClick={() => setlight(!light)}>
              {light ? <Brightness7 fontSize="large"/> : <Brightness4 fontSize="large"/>}
            </IconButton>
            </Tooltip>
            <ListItemAvatar>
            <Tooltip title="Se connaciter">
            <SignIn></SignIn>
                
                </Tooltip>
              </ListItemAvatar>
          </Toolbar>
        </AppBar>
       
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
                </div>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function NavBar2() {
  return <DashboardContent />;
}