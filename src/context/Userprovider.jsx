import React,{createContext,useContext,useState,useEffect} from 'react'
import {auth} from "../config/firebase"
import {onAuthStateChanged} from "firebase/auth"

const Usercontext=createContext()
const Userprovider = ({children}) => {

    const [user,setUser]=useState(null);

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user!=null){
          setUser(user)
        }else{
          setUser(null)
        }
      })
    },[])
  return (
    <Usercontext.Provider value={{user,setUser}}>
        {children}
    </Usercontext.Provider>
  )
}

export const Userstate=()=>{
    return useContext(Usercontext)
}

export default Userprovider