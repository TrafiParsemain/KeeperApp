import axios from "axios"

class AuthentificationService {


    
    createBasicAuthToken(username,password){
        return "Basic " + window.btoa(username + ":" + password) 
    }

    createJWTToken(token){
        return "Bearer " + token
    }

    //Test avec l'api l'authentification du user password
    exectuteBasicAutheticatrionService(username,password){
        return axios.get('http://localhost:8080/basicauth',
        {
            headers : {
                authorization : this.createBasicAuthToken(username,password)
            }
        })
    }


    //JWT Authenticate (Response token)
    exectuteJWTAutheticatrionService(username,password){
        return axios.post('http://localhost:8080/authenticate',
        {
            username,
            password
        })
    }
    
    registerSucessfullLogin(username,password){
        console.log('User logged in sucessfull');
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosIntereceptors(this.createBasicAuthToken(username,password))
    }

    registerSucessfullLoginForJWT(username,token){
        console.log('User logged in sucessfull with token');
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosIntereceptors(this.createJWTToken(token))
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null)  return false;
        return true ;
    }

    getLoggedUsername(){
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null)  return '';
        return user ;
    }


    //Configuration de axios intercepteur
    //BasicauthHeader pour que le basic (param)
    //token pour le token
    setupAxiosIntereceptors(token){

        //const username = 'me'
        //const password = 'admin'

        //const basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        
        //Intercepte les request et ajoute le headers
        axios.interceptors.request.use(
            (config)=> {
                if(this.isUserLoggedIn){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}
    

export default new AuthentificationService()