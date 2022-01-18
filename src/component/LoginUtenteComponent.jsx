import React, { Component } from "react";
import UtenteService from "../service/UtenteService";
import $ from 'jquery';

class LoginUtenteComponent extends Component {
  constructor(props) {

    console.log("sono dentro login")
    super(props);

    this.state = {
      userName: "",
      passwordUtente: ""
    };

  

    this.loginInput = this.loginInput.bind(this)
    this.goBackInput = this.goBackInput.bind(this)
    this.resetInput = this.resetInput.bind(this)
  }

  loginInput() {
    console.log("stiamo facendo il login");

    let utente = "";

    utente = {
        userName: this.state.userName,
        passwordUtente: this.state.passwordUtente
    };

    console.log("stampo l'utente e i suoi dati: " + JSON.stringify(utente));

    UtenteService.doLogin(utente).then((response) => {
      console.log("dati utente recuperato dopo il login: " + JSON.stringify(response.data));
      
      localStorage.setItem("utente" , response.data);

      if(response.data!==("")){
        var profilo = `${response.data.idProfiloUtente.nomeProfilo}` 
        localStorage.setItem("status",profilo);
        console.log("profilo admin" + profilo)
        console.log("abilitato " + JSON.stringify(response.data.abilitato));

      } if(response.data.abilitato === false) {
        $("#messaggio-errore").text("Utente non ancora Abilitato");
      }

       else if(response.data.abilitato === true && profilo === "user") {
          this.props.history.push('/user');
      }

       else if(profilo==="admin") {
           this.props.history.push('/admin');
      
      } else {
        $("#messaggio-errore").text("credenziali errate, riprova")
       }
    });
    
  }
  
  changeUserName(e) {
    this.setState({ userName: e.target.value });
  }
  changePasswordUtente(e) {
    this.setState({ passwordUtente: e.target.value });
  }

  goBackInput() {
    this.props.history.push("/");
  }

  resetInput() {
    
    console.log("stampo il this.state nel reset " + JSON.stringify(this.state))

    this.setState({ userName: "" });
    this.setState({ passwordUtente: "" });
  }

  onSubmit(e) {
    e.preventDefault();
  }


  render() {
    return (
      <div className="container shadow-lg p-3 mb-5 bg-white">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center">Login Utente</h3>
          <h5 id="messaggio-errore" style={{ marginLeft: "200px",marginTop: "0px" }}>Inserisci le tue credenziali</h5>
          <hr></hr>
          <div className="card-body ">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="mb-3 col-6 offset-3">
              
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.userName}
                  onChange={this.changeUserName.bind(this)}
                ></input>
              </div>
              <div className="mb-3 col-6 offset-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  className="form-control"
                  value={this.state.passwordUtente}
                  onChange={this.changePasswordUtente.bind(this)}
                ></input>
              </div>
              <button
                onClick={this.loginInput}
                style={{ marginLeft: "175px" }}
                className="btn btn-primary">
                Invia
              </button>
              <button
                onClick={this.goBackInput}
                style={{ marginLeft: "30px" }}
                className="btn btn-danger">
                Home
              </button>
              <button
                onClick={this.resetInput}
                style={{ marginLeft: "30px" }}
                className="btn btn-warning">
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginUtenteComponent;
