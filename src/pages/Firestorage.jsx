import React,{Fragment,useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import { Button,Box } from '@mui/material';
import {storage} from "../config/firebase"
import {ref,uploadBytes,getDownloadURL,listAll} from "firebase/storage"
import {v4} from "uuid"

const Firestorage = () => {

    const [imageupload,setImageupload]=useState(null);
    const [imageurls,setImageurls]=useState([])

    const uploadimagehandler=()=>{
        if(imageupload==null){return};
        const imageRef=ref(storage,`image/${imageupload.name+v4()}`);
        uploadBytes(imageRef,imageupload).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                setImageurls((prev)=>[...prev,url])
            })
        })

    };

    useEffect(()=>{
        const imageRef=ref(storage,"image/");
        listAll(imageRef).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageurls((prev)=>[...prev,url])
                })
            })
        })
    },[])
  return (
    <Fragment>
        <Container maxWidth="md">
            <Box mt={2}>
                <input type="file"
                required
                onChange={(e)=>setImageupload(e.target.files[0])}
                />
                <Button variant="contained" color='success' size='medium'
                onClick={uploadimagehandler}
                >
                    Upload Image
                </Button>
            </Box>
          
        </Container>
        <Container maxWidth="md">
            <Box mt={5}>
                {
                    imageurls.map((url)=>{
                        return <img src={url} width="500px" alt='hellow'/>
                    })
                }
            </Box>
          
        </Container>
    </Fragment>
  )
}

export default Firestorage