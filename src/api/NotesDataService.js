import axios from "axios"

class NotesDataService{

    RetrieveAllNotes(name,statut){
        return axios.get(`http://localhost:8080/jpa/users/${name}/notes/${statut}`)
    }

    deleteNote(name,id){
        return axios.delete(`http://localhost:8080/jpa/users/${name}/notes/${id}`)
    }

    updateNote(name,id,note){
        return axios.put(`http://localhost:8080/jpa/users/${name}/notes/${id}`,note)
    }
    
    createNote(name,note){
        return axios.post(`http://localhost:8080/jpa/users/${name}/notes`,note)
    }

    DownloadNotes(name){
        return axios.get(`http://localhost:8080/dlnotes`,{responseType: 'blob'})
    }

}

export default new NotesDataService()