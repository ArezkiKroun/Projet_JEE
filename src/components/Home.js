import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import NavBar from "./NavBar";
import NavBar2 from "./NavBar2";


export default function Home() {
 
  const [displayNavbar, setDisplayNavbar] = useState(false)
  useEffect(() => {
    if(localStorage.getItem("token")){
      setDisplayNavbar(true)
    }
  }, []);

  return (
    <Box >
      {displayNavbar? (
        <NavBar></NavBar>
          ):( <NavBar2></NavBar2>)}
     </Box>
  );
}