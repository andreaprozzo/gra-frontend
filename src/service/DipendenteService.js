import axios from 'axios';

const DIPENDENTE_API_BASE_URL = "http://localhost:8080/dipendenti";
const DIPENDENTE_API_CREATE_URL = "http://localhost:8080/add-dipendente";
const DIPENDENTE_API_UPDATE_URL = "http://localhost:8080/update-dipendente";
const DIPENDENTE_API_SEARCH_URL = "http://localhost:8080/search-dipendente";



class DipendenteService {

    getDipendenti() {
        return axios.get(DIPENDENTE_API_BASE_URL);
    }

    createDipendente(dipendente) {
        return axios.post(DIPENDENTE_API_CREATE_URL, dipendente);
    }

    getDipendenteById(dipendenteId) {
        return axios.get(DIPENDENTE_API_BASE_URL + '/' + dipendenteId)
    }

    updateDipendente(dipendente) {
        return axios.post(DIPENDENTE_API_UPDATE_URL, dipendente);
    }

    deleteDipendente(dipendenteId) {
        return axios.delete(DIPENDENTE_API_BASE_URL + '/' + dipendenteId);
    }

    getLista(){
        return axios.get(DIPENDENTE_API_BASE_URL);
    }

    searchDipendente(dipendente){
        return axios.post(DIPENDENTE_API_SEARCH_URL, dipendente);
    }


}

export default new DipendenteService()