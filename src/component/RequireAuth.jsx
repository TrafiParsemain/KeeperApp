import React from 'react';
import {  Navigate , Outlet } from 'react-router-dom';

//Service
import AuthentificationService from './AuthentificationService.js';

function RequireAuth () {
        if (AuthentificationService.isUserLoggedIn()) {
            return <Outlet/>
        } else {
            return <Navigate to ='/login'/>
        }
} 

export default RequireAuth ;