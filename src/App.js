import React from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Home from './pages/Home'
import About from "./pages/About"
import Signup from './pages/Signup'
import Login from "./pages/Login"
import Crudfunction from "./pages/Crudfunction";
import Firestorage from './pages/Firestorage'
import Videoupload from './pages/Videoupload'
import Rules from './pages/Rules'

const App = () => {
  return (
    <Router>

      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/crud' element={<Crudfunction/>}/>
        <Route path='/storage' element={<Firestorage/>}/>
        <Route path='/videoupload' element={<Videoupload/>}/>
        <Route path='/rules' element={<Rules/>}/>
      </Routes>
    </Router>
  )
}

export default App