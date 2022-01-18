import React, { Component } from 'react'
import $ from 'jquery';
import UtenteService from '../service/UtenteService';

export default class SignInUtenteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

          userName: "",
          passwordUtente: "",
          emailUtente: "",

        };
    
        this.addUtente = this.addUtente.bind(this);
        // this.cancel = this.cancel.bind(this);
  
      }
    
     
    
      addUtente() {
        console.log("addDipendente function");
  
        let utente= "";
       
        utente = {
          userName: $("#nome").val(),
          passwordUtente: $("#password").val(),
          emailUtente: $("#email").val(),
      
        };
    
        UtenteService.userSignin(utente).then((response) => {
          console.log("dati utente registrato: " + JSON.stringify(response));
          $("#messaggio-errore").text("Registrazione effettuata, in attesa di conferma")
        });
      }
    
     
        
      resetInput() {
        this.setState({ userName: "" });
        this.setState({ passwordUtente: "" });
        this.setState({ emailUtente: ""});
     
       
      }
    
      changeNome(e) {
        this.setState({ userName: e.target.value });
      }
      changePassword(e) {
        this.setState({ passwordUtente: e.target.value });
      }
      changeEmail(e) {
        this.setState({ emailUtente: e.target.value });
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
                        <h2 id="messaggio-errore" style={{ marginLeft: "-90px" }}>Compila il form per registrarti</h2>
                        <br />
                      </div>
                      <div id="emailHelp" className="form-text"></div>
                      <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                      <div id="emailHelp" className="form-text"></div>
                      <input
                        type="text"
                        id="nome"
                        value={this.state.userName}
                        onChange={this.changeNome.bind(this)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Password
                      </label>
                      <div id="emailHelp" className="form-text"></div>
                      <input
                        type="password"
                        id="password"
                        aria-describedby="emailHelp"
                        value={this.state.passwordUtente}
                        onChange={this.changePassword.bind(this)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        Email
                      </label>
                      <div id="emailHelp" className="form-text"></div>
                      <input
                        type="email"
                        id="email"
                        value={this.state.emailUtente}
                        onChange={this.changeEmail.bind(this)}
                      />
                    </div>
    
                    <button
                      className="btn btn-primary"
                      onClick={this.addUtente.bind(this)}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={this.resetInput.bind(this)}
                      style = {{marginLeft: "50px"}}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              
                <br />
                <a href="/" className="btn btn-link" style = {{marginLeft: "-120px"}}>Torna alla HomePage</a>
              </div>
            </div>
          </div>
        );
      }
    }