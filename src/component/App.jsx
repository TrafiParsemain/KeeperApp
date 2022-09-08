import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Import du même dossier
import Heading from "./Heading";
import Notes from "./Notes";
import Footer from "./Footer";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import NotFound from "./NotFound";
import RequireAuth from './RequireAuth';
import Register from './Register';
import Pdf from './Pdf';

//Service
import AuthentificationService from './AuthentificationService.js';

//JS map pour boucler sur l'array notesInfos

function App(){

  const [isUserLoggedIn,setLogged] = React.useState(AuthentificationService.isUserLoggedIn())

  const majLog = () => {
      setLogged(AuthentificationService.isUserLoggedIn())
  }

    return (
        <div>
    <BrowserRouter>
    <Heading  
        isUserLoggedIn = {isUserLoggedIn}
        majLog = {majLog}
    />
        <Routes>
            <Route path= "/login" element ={<Login majLog = {majLog} />} />
            <Route path= "/register" element ={<Register majLog = {majLog} />} />
            <Route element= { <RequireAuth />}>
              <Route path= "/" element ={<Home/>} />
              <Route path= "/logout" element ={<Logout/>} />
              <Route path= "/notes/:name" element ={<Notes/>} />
              <Route path= "/notes" element ={<Notes/>} />
              <Route path= "/pdf" element ={<Pdf/>} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
    <Footer/>

    </div>
    );
}

export default App ;