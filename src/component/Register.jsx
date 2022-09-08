import React, {useState} from "react";
import {  useNavigate  } from 'react-router-dom';

//Service
import AuthentificationService from './AuthentificationService.js';
import UsersDataService from "../api/UsersDataService.js";

function Register(props){

    const bcrypt = require('bcryptjs');

    const navigate = useNavigate()
    const [loginInfo,setLoginInfo] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        loginfailed: false,
        loginsccuess: false
    });
    const [infoUser,setInfoUser] = useState("")

  function handleChange(event){
    const {name,value} = event.target
    setLoginInfo((prevValue) => {
      return {
      ...prevValue,
      [name]: value
    }
    });
  }

    function hashPassword(password){
        console.log("go to hash password " + password)
        let hashed =""
        var salt = bcrypt.genSaltSync(10);
        hashed = bcrypt.hashSync(password,salt)
        return hashed;
    }


    function handleClick(event){

      event.preventDefault(); //Important
      //Empeche le reloading classic du submit


      if(loginInfo.password !== loginInfo.confirmPassword){
        setInfoUser("Les mots de passe ne correspondent pas!")
      } else {
        setInfoUser("Creation du user ...")
        const hashed = hashPassword(loginInfo.password)
        console.log(hashed);

        const user = {
            username : loginInfo.username,
            password : hashed
        }
        UsersDataService.createUser(user)
        .then(() => {
            setInfoUser("User created")

              //JWT Authenticate
              AuthentificationService
              .exectuteJWTAutheticatrionService(loginInfo.username,loginInfo.password)
              .then(
                (response) => {
                  AuthentificationService.registerSucessfullLoginForJWT(loginInfo.username,response.data.token);
                  props.majLog();
                  navigate (`/notes/${loginInfo.username}`); // On s'arrete ici car c'est un redirect
                  setLoginInfo((prevValue) => {
                    return {
                    ...prevValue,
                    loginfailed : false,
                    loginsuccess : true
                    }
                  });
                }
              ).catch(
                () => {
                  setLoginInfo((prevValue) => {
                    return {
                    ...prevValue,
                    loginfailed : true,
                    loginsuccess : false
                    }
                    });
                }
              )

        })
        .catch(() => {
            setInfoUser("Impossible de creer ce user")
        })



      }

    }

    return <div>
    <form onSubmit = {handleClick}>
    <input type= "text" placeholder= "Username" name ="username" required onChange={handleChange}  value = {loginInfo.username} ></input>
    <input type= "password" placeholder= "Password" name ="password" required onChange={handleChange}  value = {loginInfo.password}></input>
    <input type= "password" placeholder= "Confirm Password" name ="confirmPassword" required onChange={handleChange}  value = {loginInfo.confirmPassword}></input>
    <button type = "submit">register</button>
    </form>

<div> {infoUser} </div>

    {loginInfo.loginfailed && 'Invalid Login'}
    {loginInfo.loginsuccess && 'Logged OK'}
    </div>
}

export default Register ;