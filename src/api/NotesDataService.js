import axios from "axios"

class NotesDataService{

    RetrieveAllNotes(name){
        return axios.get(`http://localhost:8080/users/${name}/notes`)
    }

    deleteNote(name,id){
        return axios.delete(`http://localhost:8080/users/${name}/notes/${id}`)
    }

    updateNote(name,id,note){
        return axios.put(`http://localhost:8080/users/${name}/notes/${id}`,note)
    }
    
    createNote(name,note){
        return axios.post(`http://localhost:8080/users/${name}/notes`,note)
    }

}

export default new NotesDataService()