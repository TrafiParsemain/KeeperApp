import axios from "axios"

class AuthentificationService {


    
    createBasicAuthToken(username,password){
        return "Basic " + window.btoa(username + ":" + password) 
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

    
    registerSucessfullLogin(username,password){
        console.log('User logged in sucessfull');
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosIntereceptors(this.createBasicAuthToken(username,password))
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
    setupAxiosIntereceptors(basicAuthHeader){

        //const username = 'me'
        //const password = 'admin'

        //const basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        
        //Intercepte les request et ajoute le headers
        axios.interceptors.request.use(
            (config)=> {
                if(this.isUserLoggedIn){
                    config.headers.authorization = basicAuthHeader 
                }
                return config
            }
        )
    }
}
    

export default new AuthentificationService()