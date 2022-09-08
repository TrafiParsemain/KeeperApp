import axios from "axios"

class UsersDataService{

    createUser(user){
        return axios.post(`http://localhost:8080/jpa/bdusers`,user)
    }
}

export default new UsersDataService()