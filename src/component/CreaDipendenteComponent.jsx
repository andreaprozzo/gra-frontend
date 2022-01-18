import React, { Component } from "react";
import DipendenteService from "../service/DipendenteService";
import RuoloService from "../service/RuoloService";
import $ from 'jquery';


class InsertDipendente extends Component {
    constructor(props) {

      console.log("sono nel create")

      super(props);
      if(localStorage.getItem("status")!== "admin") {
        console.log("accesso non consentito");
        this.props.history.push("/")
        
    }

      this.state = {
        nome: "",
        cognome: "",
        dataNascita: "",
        reparto: "",
        dataAssunzione: "",
        ruoli: [],
        idRuolo: null,
      };
  
      this.addDipendente = this.addDipendente.bind(this);
      // this.cancel = this.cancel.bind(this);

    }
  
    componentDidMount() {
      RuoloService.getListaRuoli().then((response) => {
        console.log("tutti i ruoli  in response : " + JSON.stringify(response));
        this.setState({ ruoli: response.data });

        

        for(var i=0;i<this.state.ruoli.length;i++){

        $("#campi-ruolo").append(
            "<option value=" + JSON.stringify(this.state.ruoli[i]) + ">" + 
               JSON.stringify(this.state.ruoli[i].nomeRuolo) + "</option>" 
        ); 
      }  
    });
  }
  
    addDipendente() {
      console.log("addDipendente function");

      let dipendente= "";
      console.log("dropdownMenu" + JSON.stringify(this.state.idRuolo));
      
      dipendente = {
        nome: $("#nome").val(),
        cognome: $("#cognome").val(),
        dataNascita: $("#dataNascita").val(),
        dataAssunzione: $("#dataAssunzione").val(),
        reparto: $("#reparto").val(),
        idRuolo: JSON.parse(this.state.idRuolo)
      };
  
      console.log("Dipendente popolato" + JSON.stringify(dipendente));
  
      DipendenteService.createDipendente(dipendente).then((response) => {
        console.log("dati dipendente registrato: " + JSON.stringify(response));
        this.props.history.push('/dipendenti');
      });
    }
  
    cancel() {
        this.props.history.push('/dipendenti');
      }

      
    resetInput() {
      this.setState({ nome: "" });
      this.setState({ cognome: "" });
      this.setState({ dataNascita: ""});
      this.setState({ dataAssunzione: ""});
      this.setState({ reparto: "" });
     
    }
  
    changeNome(e) {
      this.setState({ nome: e.target.value });
    }
    changeCognome(e) {
      this.setState({ cognome: e.target.value });
    }
    changeDataNascita(e) {
      this.setState({ dataNascita: e.target.value });
    }
    changeReparto(e) {
      this.setState({ reparto: e.target.value });
    }
    changeDataAssunzione(e) {
      this.setState({ dataAssunzione: e.target.value });
    }
    changeSelect(e) {
      this.setState({ idRuolo: e.target.value});
      console.log("siamo in changeSelect" + JSON.stringify(this.state.idRuolo));
    }
  
    onSubmit(e) {
      e.preventDefault();
    }
  
    render() {
      return (
        <div className="container shadow-lg p-3 mb-5 bg-white">
          <div className="container-fluid">
            <div className="row">
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className=" col-md-4 offset-md-4">
                  <div className="mb-3">
                    <div>
                      <h2>Inserisci Dipendente</h2>
                    </div>
                    <div id="emailHelp" className="form-text"></div>
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <div id="emailHelp" className="form-text"></div>
                    <input
                      type="text"
                      id="nome"
                      value={this.state.nome}
                      onChange={this.changeNome.bind(this)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Cognome
                    </label>
                    <div id="emailHelp" className="form-text"></div>
                    <input
                      type="text"
                      id="cognome"
                      aria-describedby="emailHelp"
                      value={this.state.cognome}
                      onChange={this.changeCognome.bind(this)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Data Di Nascita
                    </label>
                    <div id="emailHelp" className="form-text"></div>
                    <input
                      type="date"
                      id="dataNascita"
                      value={this.state.dataNascita}
                      onChange={this.changeDataNascita.bind(this)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Data Assunzione
                    </label>
                    <div id="emailHelp" className="form-text"></div>
                    <input
                      type="date"
                      id="dataAssunzione"
                      value={this.state.dataAssunzione}
                      onChange={this.changeDataAssunzione.bind(this)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Reparto
                    </label>
                    <div id="emailHelp" className="form-text"></div>
                    <input
                      type="text"
                      id="reparto"
                      value={this.state.reparto}
                      onChange={this.changeReparto.bind(this)}
                    />
                  </div>
                  <div className="mb-3">
                    <div className="form-text"></div>
                    Seleziona il ruolo :
                    <select id="campi-ruolo" onChange={this.changeSelect.bind(this)}></select>
                    </div>
  
                  <button
                    className="btn btn-primary"
                    onClick={this.addDipendente.bind(this)}
                  >
                    Submit
                  </button>
                  {/* <button className = "btn btn-danger" onClick = {this.cancel.bind(this)}  
                  style = {{marginLeft: "10px"}}>Cancella</button> */}
                  <button
                    className="btn btn-warning"
                    onClick={this.resetInput.bind(this)}
                    style = {{marginLeft: "10px"}}
                  >
                    Reset
                  </button>
                  <hr />
                  <a href="/admin" className="btn btn-link">Torna al menu della pagina Admin</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
  export default InsertDipendente;
  