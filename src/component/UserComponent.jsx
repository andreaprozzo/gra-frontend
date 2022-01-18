import React, { Component } from 'react';
import DipendenteService from '../service/DipendenteService';


export default class ListaDipendenteComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idSearch:"",
            nomeSearch: "",
            cognomeSearch: "",
            nascitaSearch: "",
            repartoSearch: "",
            assunzioneSearch: "",
            ruoloSearch: "",
            creazioneSearch: "",
            dipendenti: [] 
        }

        //if(localStorage.getItem('utente.profiloUtente !== 1')) {
        // this.props.history.push('/login');
        // }

        this.idSearchHandler = this.idSearchHandler.bind(this);
        this.nomeSearchHandler = this.nomeSearchHandler.bind(this);
        this.cognomeSearchHandler = this.cognomeSearchHandler.bind(this);
        this.nascitaSearchHandler = this.nascitaSearchHandler.bind(this);
        this.repartoSearchHandler = this.repartoSearchHandler.bind(this);
        this.assunzioneSearchHandler = this.assunzioneSearchHandler.bind(this);
        this.ruoloSearchHandler = this.ruoloSearchHandler.bind(this);
        this.creazioneSearchHandler = this.creazioneSearchHandler.bind(this);
        this.editDipendente = this.editDipendente.bind(this);
        this.addDipendente = this.addDipendente.bind(this);
        this.deleteDipendente = this.deleteDipendente.bind(this);
    }

    componentDidMount() {
        DipendenteService.getDipendenti().then((res) => {
            this.setState({dipendenti: res.data});
            console.log("stampo i dipendenti: " + JSON.stringify(this.state.dipendenti));
        });
    }

    editDipendente(id) {
       this.props.history.push(`/update-dipendente/${id}`);
       console.log("sei entrato in modifica id ->: " + id);
    }

    addDipendente() {
        this.props.history.push('/add-dipendente');
    }

    deleteDipendente(idDipendente) {
        DipendenteService.deleteDipendente(idDipendente).then(res=> {
            this.setState({dipendenti: this.state.dipendenti.filter(dipendente => dipendente.idDipendente !== idDipendente)});
            console.log("hai eliminanto il dipendente -> " + idDipendente);
        });
    }

    resetFiltro(){
        this.setState({idSearch: ""});
        this.setState({nomeSearch: ""});
        this.setState({cognomeSearch:""});
        this.setState({nascitaSearch: ""});
        this.setState({repartoSearch: ""});
        this.setState({assunzioneSearch: ""});
        this.setState({ruoloSearch: ""});
        this.setState({creazioneSearch: ""});
    }

    idSearchHandler = (event) => {
        // console.log("idSearchHandler => " + event.target.value );
            this.setState({idSearch: event.target.value});        
    }
    
    nomeSearchHandler = (event) => {
        // console.log("nomeSearchHandler => " + event.target.value );
        this.setState({nomeSearch: event.target.value });        
    }

    cognomeSearchHandler = (event) => {
        // console.log("cognomeSearchHandler => " + event.target.value );
        this.setState({cognomeSearch: event.target.value});        
    }

    nascitaSearchHandler = (event) => {
        // console.log("nascitaSearchHandler => " + event.target.value );
        this.setState({nascitaSearch: event.target.value});        
    }

    repartoSearchHandler = (event) => {
        // console.log("repartoSearchHandler => " + event.target.value );
        this.setState({repartoSearch: event.target.value});        
    }

    assunzioneSearchHandler = (event) => {
        // console.log("assunzioneSearchHandler => " + event.target.value );
        this.setState({assunzioneSearch: event.target.value});        
    }

    ruoloSearchHandler = (event) => {
        // console.log("ruoloSearchHandler => " + event.target.value );
        this.setState({ruoloSearch: event.target.value});        
    }

    creazioneSearchHandler = (event) => {
        // console.log("creazioneSearchHandler => " + event.target.value );
        this.setState({creazioneSearch: event.target.value});        
    }

    render() {
        

        return (

            <div className="row col-12 container shadow-lg p-3 mb-5 bg-white" >
                {/* Parte relativa alla bara di ricerca del search */}
                <h2  style = {{marginLeft: "-30px"}} className="text-center">Lista dei Dipendenti</h2>
               
            
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Data di Nascita</th>
                            <th>Data di Assunzione</th>
                            <th>Reparto</th>
                            <th>Ruolo</th>
                            <th>Data Creazione R</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.dipendenti.map(
                                dipendente => 
                                <tr key = {dipendente.idDipendente}>
                                    <td>{dipendente.idDipendente}</td>
                                    <td>{dipendente.nome}</td>
                                    <td>{dipendente.cognome}</td>
                                    <td>{dipendente.dataNascita}</td>
                                    <td>{dipendente.dataAssunzione}</td>
                                    <td>{dipendente.reparto}</td>
                                    <td>{dipendente.idRuolo.nomeRuolo}</td>
                                    <td>{dipendente.idRuolo.dataCreazione}</td>
                                    
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <h5 style = {{marginLeft: "400px"}}>Effettua il Logout per tornare alla HomePage</h5>
            </div>
        </div>
        )
    }
}
