import axios from 'axios';

const DIPENDENTE_API_RUOLO_URL = "http://localhost:8080/ruolo/doRuoloList";
// const DIPENDENTE_API_RUOLOBYID_URL = "http://localhost:8080/ruolo/recuperaRuolo";



class RuoloService {

    getListaRuoli(){
        return axios.get(DIPENDENTE_API_RUOLO_URL);
    }

    // getRuoloById(idRuolo){
    //     return axios.get(DIPENDENTE_API_RUOLOBYID_URL + "/" + idRuolo);
    // }



}

export default new RuoloService()