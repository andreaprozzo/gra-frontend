import axios from 'axios';

const UTENTE_API_URL = "http://localhost:8080/utente";


class UtenteService {

    doLogin(utente) {
        console.log("passo per il service utente, login")
        return axios.post(UTENTE_API_URL + "/login", utente);
    }


    userSignin(utente){
        return axios.post(UTENTE_API_URL + "/saveUtente" , utente);
    }

    getUtenti(){
        return axios.get(UTENTE_API_URL + "/doUtenteList");
    }

    getUtenteById(idUtente) {
        console.log("sono nel recupera utente del front end " + JSON.stringify(idUtente));
        // return axios.get(UTENTE_API_URL + '/' +id );
        return axios.get(`${UTENTE_API_URL}/recuperaUtente/${idUtente}`);
    }

    updateUtente(id,utente){
        return axios.put(`${UTENTE_API_URL}/updateUtente/${id}`,utente);
    }

    eliminaUtente(idUtente){ 
        console.log("sono in delete utente" + idUtente);
        return axios.delete(`${UTENTE_API_URL}/deleteUtente/${idUtente}`);
    }
}


export default new UtenteService()