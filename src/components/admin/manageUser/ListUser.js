import * as React from 'react';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailIcon from '@mui/icons-material/ReadMore';
import UpdateIcon from '@mui/icons-material/Edit';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DetailUser from './DetailUser';
import { Button } from '@mui/material';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddUser from './AddUser';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import EditRole from './EditRole';
import { RecentActors } from '@mui/icons-material';
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));


export default function ListUser() {
  // console.log("data", data)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //récupérer la liste des boutiques
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers()
  }, []);
  let token = localStorage.getItem("tokentoken")

  const loadUsers = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
    console.log(config)
    const result = await axios.get('http://localhost:8888/api/v1/admin/usersList',config).then(res => {
        console.log("Success")
        setUsers(res.data);
    }).catch(error => {
      console.log(error)
    });
  };

  //Filtre de rechrche
  const [searchField, setsearchField] = useState('');

  const filtreruser = users.filter(local => (
    local.lastname.toLowerCase().includes(searchField.toLowerCase())
    ||
    local.firstname.toLowerCase().includes(searchField.toLowerCase())

  ));




  return (
<ThemeProvider>
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5}}>

<Grid container spacing={8}>

  <Grid item xs={12} md={4} lg={4} >
    <ListItemText primary="Liste des utilisateurs" />
  </Grid>


  <Grid item xs={12}md={4} lg={4}>
    <TextField
     onChange={(e)=>setsearchField(e.target.value)}
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
    <Button style={{borderRadius:'50%'}} >
        <AddUser></AddUser>
    </Button>
  </Grid>
  </Grid>  
  </Container>

      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableCell component="th" scope="col">
              <b>S.N</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b>Nom</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b>Prénom</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b>Email</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b> UserName</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b> Role</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b>Détails</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b> Modifer</b>
            </TableCell>
            <TableCell component="th" scope="col">
              <b>Supprimer</b>
            </TableCell>

          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filtreruser.sort((a, b) => a.lastname > b.lastname && a.firstname > b.firstname? 1 : -1).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : users
            ).map((row, index) => ( 
              <TableRow key={index}>
                <TableCell scope="row" key={index}>
                  {index + 1}
                </TableCell> 
                
                <TableCell component="th" scope="row">
                  {row.lastname}
                </TableCell>  
                <TableCell component="th" scope="row">
                  {row.firstname}
                </TableCell>   
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>                 

                {row.role=="ADMIN" ? (
                <TableCell component="th" scope="row">
                <h4 style={{color:'blue',display:'flex'}}>{row.role}<EditRole data={row.id}></EditRole></h4>
              </TableCell>
              ) : (
                <TableCell component="th" scope="row">
                <h4 style={{color:'green',display:'flex'}}>{row.role}<EditRole data={row.id}></EditRole></h4>
              </TableCell>
              ) }
      
                <TableCell component="th" scope="row">
                  <DetailUser data={row.id}></DetailUser>
                </TableCell>

                <TableCell component="th" scope="row"> 
                      <EditUser data={row.id}></EditUser>       
                </TableCell>

                <TableCell component="th" scope="row">
                 <DeleteUser data={row.id}></DeleteUser> 
                </TableCell>
              </TableRow>
            ))} 

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter style={{ width: '100%' }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'nombre de boutique par page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      </ThemeProvider>
  );
}