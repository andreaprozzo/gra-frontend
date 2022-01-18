import React, { Component } from "react";
import DipendenteService from "../service/DipendenteService";
import RuoloService from "../service/RuoloService";
import $ from "jquery";

class ModificaDipendenteComponent extends Component {
  constructor(props) {
    super(props);

    if(localStorage.getItem("status")!== "admin") {
      console.log("accesso non consentito");
      this.props.history.push("/")
      
  }

    this.state = {
      id: this.props.match.params.id,
      nome: "",
      cognome: "",
      dataNascita: "",
      dataAssunzione: "",
      reparto: "",
      ruoli: [],
      idRuolo: null,
    };

    this.changeNomeHandler = this.changeNomeHandler.bind(this);
    this.changeCognomeHandler = this.changeCognomeHandler.bind(this);
    this.changeDataNascitaHandler = this.changeDataNascitaHandler.bind(this);
    this.changeDataAssunzioneHandler =
    this.changeDataAssunzioneHandler.bind(this);
    this.changeRepartoHandler = this.changeRepartoHandler.bind(this);
    this.updateDipendente = this.updateDipendente.bind(this);
  }

  componentDidMount() {
    let dipendente = null;
    DipendenteService.getDipendenteById(this.state.id).then((res) => {
      dipendente = res.data;
      console.log(
        "stampe ovunque, dipendente recuperato: " + JSON.stringify(res.data)
      );
      this.setState({
        nome: dipendente.nome,
        cognome: dipendente.cognome,
        dataNascita: dipendente.dataNascita,
        dataAssunzione: dipendente.dataAssunzione,
        reparto: dipendente.reparto,
        idRuolo: dipendente.idRuolo,
      });
    });

    RuoloService.getListaRuoli().then((response) => {
      console.log("tutti i ruoli  in response : " + JSON.stringify(response));
      this.setState({ ruoli: response.data });
      console.log("id ruolo dal backend"+JSON.stringify(dipendente.idRuolo));
      

      // $("#campi-ruolo").append(
      //   "<option disabled value= Ruolo" +
      //     ">Ruolo" +
      //     "</option>"
      // );

      for (var i = 0; i < this.state.ruoli.length; i++) {
        console.log("id ruolo dell'array"+JSON.stringify(this.state.ruoli[i].idruolo));
          if(this.state.ruoli[i].idruolo === dipendente.idRuolo.idruolo){
              //console.log("entro nell if")
            $("#campi-ruolo").append(
                "<option selected='selected' value=" +
                  JSON.stringify(this.state.ruoli[i]) +
                  ">" +
                  JSON.stringify(this.state.ruoli[i].nomeRuolo) +
                  "</option>"
              );
          } else {
            //console.log("entro nell else")
            $("#campi-ruolo").append(
                "<option value=" +
                  JSON.stringify(this.state.ruoli[i]) +
                  ">" +
                  JSON.stringify(this.state.ruoli[i].nomeRuolo) +
                  "</option>"
              );
          }
        
      }
    });
  }

  updateDipendente = (e) => {
    e.preventDefault();

    console.log("stampo il this.state" + JSON.stringify(this.state));

    let dipendente = {

      idDipendente: this.state.id,
      nome: this.state.nome,
      cognome: this.state.cognome,
      dataNascita: this.state.dataNascita,
      dataAssunzione: this.state.dataAssunzione,
      reparto: this.state.reparto,
      idRuolo: this.state.idRuolo
    }
    console.log("dipendente =>" + JSON.stringify(dipendente));

    DipendenteService.updateDipendente(dipendente).then(res=> {
        
        console.log("hai aggiornato il dipendente -> " + JSON.stringify(res.data));
        this.props.history.push("/dipendenti");
    });
  };

  cancel() {
    this.props.history.push("/dipendenti");
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
    console.log("siamo in changeSelect" + JSON.stringify(this.state.idRuolo));
  }

  render() {
    return (
      <div className="container container shadow-lg p-3 mb-5 bg-white">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center">Modifica Dipendente</h3>
          <div className="card-body">
            <form>
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
                Modifica il ruolo :
                <br />
                <select
                  id="campi-ruolo"
                  onChange={this.changeSelect.bind(this)}
                ></select>
              </div>
              <hr />
              <button
                className="btn btn-success"
                onClick={this.updateDipendente}
              >
                Salva
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
    );
  }
}

export default ModificaDipendenteComponent;
