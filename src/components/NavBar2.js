import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import CloudIcon from '@mui/icons-material/Cloud';
import GitIcon from '@mui/icons-material/GitHub';
import { Brightness4, Brightness7, Home } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SignIn from './SignIn';
import InfoIcon from '@mui/icons-material/Info';

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
              Dashboard
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
      </Box>
    </ThemeProvider>
  );
}

export default function NavBar2() {
  return <DashboardContent />;
}