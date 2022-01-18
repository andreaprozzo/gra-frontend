import React, { Component } from 'react'
import $ from 'jquery';
import RuoloService from '../service/RuoloService';
// import DipendenteService from "../service/DipendenteService";
// import ListaDipendenteComponent from './ListaDipendenteComponent';

export default class RicercaDipendenteComponent extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            nome: "",
            cognome: "",
            dataNascita: "",
            reparto: "",
            dataAssunzione: "",
            ruoli: [],
            idRuolo: null,
        };


    this.changeNomeHandler = this.changeNomeHandler.bind(this);
    this.changeCognomeHandler = this.changeCognomeHandler.bind(this);
    this.changeDataNascitaHandler = this.changeDataNascitaHandler.bind(this);
    this.changeDataAssunzioneHandler = this.changeDataAssunzioneHandler.bind(this);
    this.changeDataAssunzioneHandler = this.changeDataAssunzioneHandler.bind(this);
    this.searchDipendente = this.searchDipendente.bind(this);
  
    }

    componentDidMount() {
        RuoloService.getListaRuoli().then((response) => {
          console.log("tutti i ruoli  in response : " + JSON.stringify(response));
          this.setState({ ruoli: response.data });

          $("#campi-ruolo").append(
            "<option value= Ruolo" +
              ">Ruolo" +
              "</option>"
          );
          
          for(var i=0;i<this.state.ruoli.length;i++){
  
          $("#campi-ruolo").append(
              "<option value=" + JSON.stringify(this.state.ruoli[i]) + ">" + 
                 JSON.stringify(this.state.ruoli[i].nomeRuolo) + "</option>" 
          ); 
        }  
      });
    }
    

      changeNomeHandler = (event) => {
        this.setState({ nome: event.target.value });
      };

      changeCognomeHandler = (event) => {
        this.setState({ cognome: event.target.value });
      };

      changeDataNascitaHandler = (event) => {
        this.setState({ dataNascita: event.target.value });
      };

      changeDataAssunzioneHandler = (event) => {
        this.setState({ dataAssunzione: event.target.value });
      };

      changeRepartoHandler = (event) => {
        this.setState({ reparto: event.target.value });
      };
    
      changeSelect(e) {
        this.setState({ idRuolo: JSON.parse(e.target.value) });
        console.log("siamo in changeSelect " + JSON.stringify(this.state.idRuolo));
      }


      onSubmit(e) {
        e.preventDefault();
      }
    

      searchDipendente(){
       
        console.log("searchDipendente function");
        //alert("yufguiegs")
        let dipendente= "";

        dipendente = {
            nome: $("#nome").val(),
            cognome: $("#cognome").val(),
            dataNascita: $("#dataNascita").val(),
            dataAssunzione: $("#dataAssunzione").val(),
            reparto: $("#reparto").val(),
            idRuolo: this.state.idRuolo
          };

          console.log("searchDipendente function " + JSON.stringify(dipendente)) ;

          localStorage.setItem("dipendenti",JSON.stringify(dipendente));

          console.log("searchDipendente oggetto local storage " + JSON.stringify(localStorage.getItem("dipendenti")));
          this.props.history.push('/dipendenti');
          // DipendenteService.searchDipendente(dipendente).then((response) => {
          //   console.log("dati dipendente registrato: " + JSON.stringify(response));
          //  // this.props.history.push('/dipendenti');
          // });

      }

      cancel() {
        this.props.history.push("/dipendenti");
      }
    

      render() {
        return (
         <div>               
            <div className="container">
               <div className="card col-md-6 offset-md-3 offset-md-3">
                  <h3 className="text-center">Ricerca Dipendente</h3>
                    <div className="card-body">
                      <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-group">
                            <label>Nome: </label>
                            <input
                            name="nome"
                            id="nome"
                            className="form-control"
                            value={this.state.nome}
                            onChange={this.changeNomeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label>Cognome: </label>
                            <input
                            name="cognome"
                            id="cognome"
                            className="form-control"
                            value={this.state.cognome}
                            onChange={this.changeCognomeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label>Data di Nascita: </label>
                            <input
                            type="date"
                            name="dataNascita"
                            id="dataNascita"
                            className="form-control"
                            value={this.state.dataNascita}
                            onChange={this.changeDataNascitaHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label>Data di Assunzione: </label>
                            <input
                            type="date"
                            name="dataAssunzione"
                            id="dataAssunzione"
                            className="form-control"
                            value={this.state.dataAssunzione}
                            onChange={this.changeDataAssunzioneHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label>Reparto : </label>
                            <input
                            name="reparto"
                            id="reparto"
                            className="form-control"
                            value={this.state.reparto}
                            onChange={this.changeRepartoHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <div className="form-text"></div>
                            Ruolo :
                            <br />
                            <select
                            id="campi-ruolo"
                            onChange={this.changeSelect.bind(this)}
                            ></select>
                        </div>
                        <hr />
                        <button
                            className="btn btn-success"
                            onClick={this.searchDipendente}
                        >
                            Cerca
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={this.cancel.bind(this)}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancella
                        </button>
                    </form>
                  </div>
                </div>
            </div>
           <a href="/admin" className="btn btn-link" style = {{marginLeft: "440px"}}>Torna al menu della pagina Admin</a>
           <br />
           <hr />
           
       </div>


            
        )
    }
}

