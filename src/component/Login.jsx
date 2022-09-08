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

      ////Basic Auth
      // AuthentificationService
      // .exectuteBasicAutheticatrionService(loginInfo.username,loginInfo.password)
      // .then(
      //    () => {
      //     AuthentificationService.registerSucessfullLogin(loginInfo.username,loginInfo.password);
      //     props.majLog();
      //     navigate (`/notes/${loginInfo.username}`); // On s'arrete ici car c'est un redirect
      //     //Utiliser les apostrophe italique (touche 7) pour résoudre une variable
      //     setLoginInfo((prevValue) => {
      //       return {
      //       ...prevValue,
      //       loginfailed : false,
      //       loginsuccess : true
      //       }
      //     });
      //    }
      // ).catch(
      //   () => {
      //     setLoginInfo((prevValue) => {
      //       return {
      //       ...prevValue,
      //       loginfailed : true,
      //       loginsuccess : false
      //       }
      //       });
      //   }
      // )

      //JWT Authenticate
      AuthentificationService
      .exectuteJWTAutheticatrionService(loginInfo.username,loginInfo.password)
      .then(
         (response) => {
          AuthentificationService.registerSucessfullLoginForJWT(loginInfo.username,response.data.token);
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

    return (
    <div className = "view--login">
      <form onSubmit = {handleClick} className = "form-container">
        <input type= "text" placeholder= "Username" name ="username" required onChange={handleChange}  value = {loginInfo.username} ></input>
        <input type= "password" placeholder= "Password" name ="password" required onChange={handleChange}  value = {loginInfo.password}></input>
        <button type = "submit">login</button>
      </form>

      {
        loginInfo.loginfailed && 
        <div className="errors">Invalid Login</div>
      }
      {
        loginInfo.loginsuccess &&
         <div className="success">Logged OK</div>
        }
    </div>
    )
}

export default Login ;