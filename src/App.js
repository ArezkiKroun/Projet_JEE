import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/admin/Dashboard';
import HomeUser from './components/admin/manageUser/HomeUser';
import ListUser from './components/admin/manageUser/ListUser';
import AddUser from './components/admin/manageUser/AddUser';
import NavBar from './components/NavBar';
import NavBar2 from './components/NavBar2';
import Home from './components/Home'
import EditUser from './components/admin/manageUser/EditUser';
import HomePicture from './components/admin/managePicture/HomePicture';
import DetailPicture from './components/admin/managePicture/DetailPicture';
import Weather from './components/meteo/Weather';
import EditPicture from './components/admin/managePicture/EditPicture';
import DeletePicture from './components/admin/managePicture/DeletePicture';
import CurrentUser from './components/admin/CurrentUser';
import AddPicture from './components/admin/managePicture/AddPicture';
import HomeComponents from './components/meteo/Components/Home';
import DetailUser from './components/admin/manageUser/DetailUser';
import DeleteUser from './components/admin/manageUser/DeleteUser';
import SnackBar from './components/SnackBar';
import EditPassword from './components/user/EditPassword';
import EditProfil from './components/user/EditProfil';
import About from './components/user/About';
import DetailCurrentUser from './components/user/DetailCurrentUser';
import EditRole from './components/admin/manageUser/EditRole';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/inscription" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard" element={<CurrentUser />} />
        <Route exact path="/navbar/:id" element={<NavBar />} />
        <Route exact path="/navbar2" element={<NavBar2 />} />
        <Route exact path="/homemeteo" element={<HomeComponents />} />
        <Route exact path="/snackbar" element={<SnackBar />} />

        <Route exact path="/homeuser" element={<HomeUser />} />
        <Route exact path="/listuser" element={<ListUser />} />
        <Route exact path="/adduser" element={<AddUser />} />
        <Route exact path="/edituser" element={<EditUser/>} />
        <Route exact path="/deleteuser" element={<DeleteUser/>} />
        <Route exact path="/detailuser" element={<DetailUser/>} />
        <Route exact path="/editrole" element={<EditRole/>} />

        <Route exact path="/picture" element={<HomePicture/>} />
        <Route exact path="/detailpicture" element={<DetailPicture/>} />
        <Route exact path="/editpicture" element={<EditPicture/>} />
        <Route exact path="/deletepicture" element={<DeletePicture/>} />
        <Route exact path="/addpicture" element={<AddPicture/>} />

        <Route exact path="/weather" element={<Weather/>} />
       
        <Route exact path="/editpassword" element={<EditPassword/>} />
        <Route exact path="/editpassword" element={<EditProfil/>} />
        <Route exact path="/detailcurrentuser" element={<DetailCurrentUser/>} />
        <Route exact path="/about" element={<About/>} />

        <Route exact path="/" element={<Home />} />
        
      
      </Routes>
    </Router>
  </div>
  );
}

export default App;
