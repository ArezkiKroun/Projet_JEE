import * as React from 'react';
import { useEffect } from "react";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link, useParams } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudIcon from '@mui/icons-material/Cloud';
import GitIcon from '@mui/icons-material/GitHub';
import { Brightness4, Brightness7, Home, Menu } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeComponents from '.././meteo/Components/Home';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { blue } from '@mui/material/colors';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import EditPassword from '.././user/EditPassword';
import EditProfil from '.././user/EditProfil';
import About from '.././user/About';
import DetailCurrentUser from '.././user/DetailCurrentUser';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                <GitIcon />
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


export default function PrivateWeather() {

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

    let navigate = useNavigate();

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
    console.log(id)
    //recuperer le user actuel
    const [user, setUser] = useState({
        email: ""
    }
    );

    useEffect(() => {
        loadUser();
    }, []);

    //endpoint qui récupére les information de lùutilisateur séléctionner
    let token = localStorage.getItem("tokentoken")
    const loadUser = async () => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }
        await axios.get(`http://localhost:8888/api/v1/users/${iduser}`, config).then(res => {
            console.log("Success")
            setUser(res.data);
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        });
    };
    console.log(user.email)
    let iduser = localStorage.getItem("tokenid");

    if (localStorage.getItem("tokentoken") === null) {
        navigate('/')

    } else {

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
                                <IconButton sx={{ mr: 1 }} onClick={() => navigate('/navbar')}>
                                    <Home fontSize="large" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Meteo">
                                <IconButton sx={{ mr: 1 }} onClick={() => navigate('/privateweather')}>
                                    <CloudIcon fontSize="large" />
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

                            <Tooltip title="Mode sombre / clair">
                                <IconButton onClick={() => setlight(!light)}>
                                    {light ? <Brightness7 fontSize="large" /> : <Brightness4 fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                            <DetailCurrentUser data={iduser}></DetailCurrentUser>
                            <ListItemText primary="HELLO"></ListItemText>
                            <ListItemText primary={user.email} />

                            <ListItemAvatar>
                                <Tooltip title="déconnexion">
                                    <Tabs to="/" style={{ color: 'white' }} onClick={() => {
                                        deleteoken();
                                    }}><LogoutTwoToneIcon fontSize="large"></LogoutTwoToneIcon>
                                    </Tabs>
                                </Tooltip>
                            </ListItemAvatar>
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
                            <center>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon ></PersonIcon>
                                </Avatar></center>
                            <Divider sx={{ my: 1 }} />
                            <EditPassword data={iduser}></EditPassword>
                            <EditProfil data={iduser}></EditProfil>
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
                                <div style={{ marginTop: '-5%', marginLeft: '10%' }} >
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
}