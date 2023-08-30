import React,{Fragment} from 'react';
import {Container, Box,Button} from "@mui/material"
import {signOut} from "firebase/auth"
import {auth} from "../config/firebase"
import {Userstate} from "../context/Userprovider"


const Home = () => {
  const {user}=Userstate();
  console.log(user)

  const logouthandler=()=>{
    
    signOut(auth).then(()=>{
      alert("user sign out successfully")
    }).catch((error)=>{
      const errorCode=error.code;
      const errorMessage=error.message;
      alert(errorMessage,errorCode);
    })

  }
  return (
    <Fragment>
      <Container maxWidth="xs">
        <Box 
        sx={{
          width:300, border:"1px solid,gray", mt:5,
          backgroundColor:"blue", borderRadius:"5px"
        }}
        >
          <Button variant='container' fullWidth color='white'sx={{
            color:"white"
          }}
          onClick={logouthandler}
          >Logout</Button>
        </Box>

      </Container>

    </Fragment>
  )
}

export default Home