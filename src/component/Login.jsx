import React, {useState} from "react";
import {  useNavigate  } from 'react-router-dom';

//Service
import AuthentificationService from './AuthentificationService.js';

function Login(props){

    const navigate = useNavigate()
  const [loginInfo,setLoginInfo] = useState({
    username: "",
    password: "",
    loginfailed: false,
    loginsccuess: false
  });

  function handleChange(event){
    const {name,value} = event.target
    setLoginInfo((prevValue) => {
      return {
      ...prevValue,
      [name]: value
    }
    });
  }


    function handleClick(event){

      event.preventDefault(); //Important
      //Empeche le reloading classic du submit

      /*if((loginInfo.username === 'me' && loginInfo.password === 'admin') ||
       (loginInfo.username === 'Trafi' && loginInfo.password === 'admin'))  {

        AuthentificationService.registerSucessfullLogin(loginInfo.username,loginInfo.password);
        props.majLog();
        navigate (`/notes/${loginInfo.username}`); // On s'arrete ici car c'est un redirect
        //Utiliser les apostrophe italique (touche 7) pour résoudre une variable
        setLoginInfo((prevValue) => {
        return {
        ...prevValue,
        loginfailed : false,
        loginsuccess : true
        }
        });
      } else {
        setLoginInfo((prevValue) => {
        return {
        ...prevValue,
        loginfailed : true,
        loginsuccess : false
        }
        });
      }*/

      AuthentificationService
      .exectuteBasicAutheticatrionService(loginInfo.username,loginInfo.password)
      .then(
         () => {
          AuthentificationService.registerSucessfullLogin(loginInfo.username,loginInfo.password);
          props.majLog();
          navigate (`/notes/${loginInfo.username}`); // On s'arrete ici car c'est un redirect
          //Utiliser les apostrophe italique (touche 7) pour résoudre une variable
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
    }

    return <div>
    <form onSubmit = {handleClick}>
    <input type= "text" placeholder= "Username" name ="username" required onChange={handleChange}  value = {loginInfo.username} ></input>
    <input type= "password" placeholder= "Password" name ="password" required onChange={handleChange}  value = {loginInfo.password}></input>
    <button type = "submit">login</button>
    </form>

    {loginInfo.loginfailed && 'Invalid Login'}
    {loginInfo.loginsuccess && 'Logged OK'}
    </div>
}

export default Login ;