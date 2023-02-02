import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import CloudIcon from '@mui/icons-material/Cloud';
import GitIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';
import { Brightness4, Brightness7, Home } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SignIn from './SignIn';
import EmailIcon from '@mui/icons-material/Password';
import { InputAdornment } from '@material-ui/core';
import { MdOutlineVisibility } from 'react-icons/md';
import { MdOutlineVisibilityOff } from 'react-icons/md';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InfoIcon from '@mui/icons-material/Info';

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

const validationSchema = yup.object({
    password: yup
        .string('Veuillez saisir votre mot de passe')
        .min(5, 'Le mot de passe doit contenir au moins 5 caractères')
        .required('Veuillez remplir ce champ'),
});
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

    const formik = useFormik({
        initialValues: {
            showPassword2: false,
            password: '',
            showPassword: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            localStorage.setItem('token', values.email + values.password)

            navigate(`/navbar/`);
        },
    });

    const handleClickShowPassword = () => {
        formik.setFieldValue('showPassword', !formik.values.showPassword)

    };
    const handleClickShowPassword2 = () => {
        formik.setFieldValue('showPassword2', !formik.values.showPassword2)

        //comparer les 2 mots de passes s'il sont identiques
        var champ_1 = (document.getElementById('mdp1').value);
        var champ_2 = (document.getElementById('mdp2').value);
        if (champ_1 !== champ_2) {
            alert("Les mots de passe ne correspondent pas");
            return false;
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                <Container style={{ marginTop: '5%' }} component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <EmailIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Réinitialiser votre mot de passe
                        </Typography>
                        <Container>
                            <Typography>
                                Veuillez entrer votre nouveau mot de passe.
                            </Typography>
                        </Container>
                        <Box component="form" sx={{ mt: 1 }}>
                            <TextField
                                required
                                inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$", title: "au moins 8 caractères et au maximum 20 caractères de chiffres / miniscules / majiscules / caractère spéciaux" }}
                                margin="normal"
                                fullWidth
                                id="mdp1"
                                label=" nouveau Mot de passe"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                style={{ marginLeft: '10%', color: '#00008C' }}
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {formik.values.showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}

                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                type={formik.values.showPassword ? 'text' : 'password'}
                            />
                            <TextField
                                margin="normal"
                                required
                                inputProps={{ pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–{}:;',?/*~$^+=<>]).{8,20}$", title: "au moins 8 caractères et au maximum 20 caractères de chiffres / miniscules / majiscules / caractère spéciaux" }}
                                fullWidth
                                id="mdp2"
                                label="Confirmer le nouveau Mot de passe"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                style={{ marginLeft: '10%', color: '#00008C' }}
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword2}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {formik.values.showPassword2 ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}

                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                type={formik.values.showPassword2 ? 'text' : 'password'}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Envoyer
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default function ResetPassword() {
    return <DashboardContent />;
}