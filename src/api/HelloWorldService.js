import axios from "axios"

class HelloWorldService{
    executeHelloWorldService(){
        //console.log('HelloWorldService executed')
        return axios.get('http://localhost:8080/hello-world')
    }

    executeHelloWorldObjectService(){
        return axios.get('http://localhost:8080/hello-world-object')
    }

    executeHelloWorldVariableService(name){
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}` );
    }
}
 
export default new HelloWorldService()