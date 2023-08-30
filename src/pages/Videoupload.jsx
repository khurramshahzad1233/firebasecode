import React,{Fragment,useState,useRef} from 'react';
import {Container,Box,Button,Typography} from "@mui/material";
import "../styles/videostyle.css"
import { getDownloadURL, uploadBytesResumable,ref } from 'firebase/storage';
import {storage } from "../config/firebase";
import uploadimage from "../assets/cloud-upload-regular-240.png";
import {db} from '../config/firebase';
import {doc, setDoc} from "firebase/firestore"


const Videoupload = () => {
    const imageref=useRef(null)
    const [filelist,setFilelist]=useState([]);


    
    // const uploadtodatabase=(url)=>{
    //     let docdata={
    //         name:'khurram shahzad',
    //         age:40,
    //         status:"married",
    //         videourl:url,
    //     };
    //     try {
    //         const userRef=doc(db,"user","newuser",docdata);
    //     setDoc(userRef);
    //     console.log("added successfully")
            
    //     } catch (error) {
    //         console.log(error)
            
    //     }
        
    // }

    const onselectfile=(e)=>{
        const newfile=e.target.files[0];
        if(newfile){
            const updatelist=[newfile];
            setFilelist(updatelist)
        }
    }
    const removefile=(file)=>{
        const updatelist=[...filelist];
        console.log(updatelist)
        updatelist.splice(filelist.indexOf(file),1);
        setFilelist(updatelist);
    }

    const ondragenter=()=>{
        imageref.current.classList.add("dragover")
    }
    const ondragleave=()=>{
        imageref.current.classList.remove("dragover")
    }
    const ondrop=()=>{
        imageref.current.classList.remove("dragover")
    };


    const uploadfirebase=()=>{
        if(filelist.length===0) return;

        const fileref=ref(storage,`videos/${filelist[0].name}`);
        const uploadtask=uploadBytesResumable(fileref,filelist[0]);

        uploadtask.on('state_changed',(snapshot)=>{
            let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(progress)
        },(error)=>{
            console.log(error.message)
        },()=>{
            console.log("successfull")

            getDownloadURL(uploadtask.snapshot.ref).then(downloadURL=>{
                console.log(downloadURL)
                let docdata={
                    name:'khurram shahzad',
                    age:40,
                    status:"married",
                    videourl:downloadURL,
                };
                try {
                    const userRef=doc(db,"user","newuser");
                setDoc(userRef,docdata);
                console.log("added successfully")
                    
                } catch (error) {
                    console.log(error.message)
                    
                }
            })
        })
    }
  return (
    <Fragment>
        <Container maxWidth="md" className='hellow'>
            <Box ref={imageref}
            onDragEnter={ondragenter}
            onDragLeave={ondragleave}
            onDrop={ondrop}
            bgcolor="skyblue"
            >
                <Box>
                <img src={uploadimage} alt="upload demo" />
                <Typography variant="4" color="initial" fontSize="2rem" textAlign="center">
                    Drag and Drop your Files here
                </Typography>
                </Box>
                

                <Box mt={3}>
                <input type="file"
                value=""
                onChange={onselectfile}
                />
                </Box>


            </Box>

            <Box>{
                filelist.length>0?(
                    <Box>
                        <Typography variant="body1" color="initial">
                            Ready to Upload File
                        </Typography>
                        {
                            filelist.map((item,index)=>(
                                <Box key={index}>
                                    <img src={item.type.split('/')[1]} alt="hellow" />
                                    <Box>{item.name}</Box>
                                    <Box>{item.size}</Box>
                                    <Button variant='contained' size='small'
                                    onClick={()=>removefile(item)}
                                    >Remove File</Button>
                                </Box>
                            ))
                        }
                    </Box>
                ):null
                }</Box>
          
        </Container>
        <Container maxWidth="xs">
            <Box mt={2}>
                <Button variant='contained' fullWidth 
                onClick={uploadfirebase}
                >Upload Files</Button>
            </Box>
          
        </Container>
    </Fragment>
  )
}

export default Videoupload