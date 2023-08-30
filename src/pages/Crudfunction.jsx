import React,{Fragment} from 'react';
import {db} from "../config/firebase";
import {collection,addDoc,getDocs,doc,setDoc,updateDoc, serverTimestamp,deleteDoc, deleteField} from "firebase/firestore"
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"








const Crudfunction = () => {

  // create new document

  const adddatahandler=async()=>{
    try {
      const document=await addDoc(collection(db,"users"),{
        name:"khurram",
        lastName:"shahzad",
        city:"islamabad",
        dob:"20/2/2002",
      });
      console.log(document);
      alert("document created successfully")
    } catch (error) {
      console.log(error.message,error.code)
      
    }
  };

  // get all data from database

  const getalldatahandler=async()=>{
    try {
      const alldocument=await getDocs(collection(db,"users"));
    const filterdocument=alldocument.docs.map((doc)=>({
      ...doc.data(),id:doc.id,
    }));
    console.log(filterdocument);
    alert("get all data successfully")
      
    } catch (error) {
      alert(error.message,error.code)
    }
    

  };

  // Add or sec Document Nested

  const setdochandler=async()=>{
    try {
      const document=setDoc(doc(db,"cities","Lahore"),{
        name:"khurram",
        citizen:"paksitani",
        country:"pak"
      });
      console.log(document);
      alert("new document added successfully");
      
    } catch (error) {
      alert(error.message,error.code)
      
    }
  };

  // Add or merge Field in data
  const mergeadddatahandler=()=>{
    try {
      const document=doc(db,"cities","Lahore");
      setDoc(document,{capital:"karachi",
      dateExample: new Date("December 10, 1815"),
      dateExampele2:new Date(Date.now())
    },
      {merge:true});
      alert("new field added successfully")
      
    } catch (error) {
      alert(error.message,error.code)
      
    }
  };

  const updatedocumentfieldhandler=async()=>{
    try {
      const updatedocument=doc(db,"cities","Lahore");
      await updateDoc(updatedocument,{
        capitals:"shahzad"
      });
      alert("updated successfully")
      
    } catch (error) {
      alert(error.message,error.code)
    }
  }

  // add time stamp field 
  const addtimestamphandler=async()=>{
    try {
      const documentref=doc(db,"cities","Lahore");
      await updateDoc(documentref,{
        timestamp:serverTimestamp()
      });
      alert("updated successfully")
      
    } catch (error) {
      alert(error.message,error.code)
      
    }
  }

  // create nested document 
  const createnesteddocument=async()=>{
    try {
      const nesteddocument=setDoc(doc(db,"countries","cities","town","village"),{
        name:"khurram",
        city:"rawalpindi",
        town:"dhagal",
        village:"jhatla"
      });
      console.log(nesteddocument)
      alert("created successfully")
      
    } catch (error) {
      alert(error.message,error.code)
      
    }
  }

  // update nested field handler 
  const updatenestedfieldhandler=async()=>{
    try {
      const docref=doc(db,"users","frank");
      await updateDoc(docref,{
        "favorites.color":"white"
      });
      
      
      alert("updated successfully")
      
    } catch (error) {
      alert(error.message,error.code)
      
    }
  };

  // delete field from a document 
  const deletefieldhandler=async()=>{
    try {
      const docRef=doc(db,"countries","cities","town","village");
    await updateDoc(docRef,{
      name:deleteField()
    });
    alert("deleted successfully")
      
    } catch (error) {
      alert(error.message,error.code)
      
    }
    
  };

  // delte a document 
  const deletedocumenthandler=async()=>{
    try {
      await deleteDoc(doc(db,"users","XaXH9WpMdOlhOlxLxR5o"));
      alert ("delted successfully")
      
    } catch (error) {
      alert(error.message,error.code)
      
    }
  }

  return (
    <Fragment>
      <Container maxWidth="md">
        <Box>
          <Button variant='contained' fullWidth size='medium'
          onClick={adddatahandler}
          >
            Add data In to Firebase Firestore
          </Button>
        </Box>

        
      </Container>

      <Container maxWidth="xs">
        <Box mt={5}>
          <Button variant='contained' fullWidth
          onClick={getalldatahandler}
          >Get All Data</Button>
        </Box>
        
      </Container>

      <Container maxWidth="md">
        <Box mt={5}>
          <Button
          variant='contained' fullWidth
          onClick={setdochandler}
          >Add or set Document Nested</Button>
        </Box>
        
      </Container>

      <Container maxWidth="md">
        <Box mt={5}>
          <Button
          variant='contained' fullWidth
          onClick={mergeadddatahandler}
          >Add or merge new field in Data</Button>
        </Box>
      </Container>

      <Container maxWidth="sm">
        <Box mt={5}>
          <Button variant='contained' fullWidth
          onClick={updatedocumentfieldhandler}
          >
            Update a field of Document
          </Button>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box mt={5}>
          <Button variant='contained' fullWidth
          onClick={addtimestamphandler}
          > Add Time Stamp in a document</Button>
        </Box>
        
      </Container>

      <Container maxWidth="xs">
        <Box mt={5}>
          <Button variant='contained' fullWidth
          onClick={createnesteddocument}
          >
            created nested documents
          </Button>
        </Box>
        
      </Container>

      <Container maxWidth="lg">
        <Box mt={5}>
          <Button variant='contained' fullWidth
          onClick={updatenestedfieldhandler}
          >update nested field inside document</Button>
        </Box>
        
      </Container>

      <Container maxWidth="xs">
        <Box mt={5}>
          <Button variant='contained' fullWidth
          onClick={deletefieldhandler}
          >
            Delete a field
          </Button>
        </Box>
        
      </Container>

      <Container maxWidth="md">
        <Box mt={5}>
          <Button variant='contained' fullWidth
          onClick={deletedocumenthandler}
          >
            Delete a document
          </Button>
        </Box>
        
      </Container>
    </Fragment>
  )
}

export default Crudfunction