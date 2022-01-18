import React, { Component } from 'react'
import UtenteService from '../service/UtenteService';


export default class ModificaUtenteComponent extends Component {
    constructor(props) {
        super(props);

        if(localStorage.getItem("status")!== "admin") {
          console.log("accesso non consentito");
          this.props.history.push("/")
          
      }

        this.state = {

          idUtente: localStorage.getItem("idUp"),
          userName: "",
          passwordUtente: "",
          emailUtente: "",
          idProfiloUtente: "",
          abilitato: "",

        };

        // this.cancel = this.cancel.bind(this);
  
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
      changeAbilita(e){
          this.setState({ abilitato: e.target.value});
      } 
      
      
      componentDidMount() {
          var utenteRecuperato = null;
          var oggettoProfilo = "";
          UtenteService.getUtenteById(localStorage.getItem("idUt")).then((res) => {
              console.log("sono nel compdidmount abilita utente " + localStorage.getItem("idUt"))
              utenteRecuperato = res.data;
              console.log("sono in abilita utente " + JSON.stringify(res.data))
              console.log("sono in abilita utente visualizza oggetto profilo" + JSON.stringify(utenteRecuperato.idProfiloUtente))
              oggettoProfilo = res.data.idProfiloUtente;
              
              this.setState({
                  userName: utenteRecuperato.userName,
                  passwordUtente: utenteRecuperato.passwordUtente,
                  emailUtente: utenteRecuperato.emailUtente,
                  idProfiloUtente: utenteRecuperato.idProfiloUtente.nomeProfilo,
                  abilitato: utenteRecuperato.abilitato,
              });
          });
      }


      updateUtente = (e) => {
        e.preventDefault();
    
        console.log("stampo il this.state" + JSON.stringify(this.state));
        console.log("stampo profilo utente recuperato" + JSON.stringify(this.state.oggettoProfilo));
    
        let utente = {
    
          idUtente: this.state.idUtente,
          userName: this.state.userName,
          passwordUtente: this.state.passwordUtente,
          emailUtente: this.state.emailUtente,
        //   idProfiloUtente: this.oggettoProfilo,
          abilitato: this.state.abilitato,
          
        }

        console.log("utente =>" + JSON.stringify(utente));
    
        UtenteService.updateUtente(localStorage.getItem("idUt"),utente).then(res=> {
            
            console.log("hai aggiornato l'utente -> " + JSON.stringify(res.data));
            this.props.history.push("/listaUtenti");
        });
      };
    
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
                        <h2 id="messaggio-errore" style={{ marginLeft: "-20px",marginTop: "0px" }}>Modifica User</h2>
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
                        disabled={true}

                       
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
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        Id Profilo Utente
                      </label>
                      <div id="emailHelp" className="form-text"></div>
                      <input
                        type="text"
                        id="idProfUtente"
                        value={this.state.idProfiloUtente}
                        
                        
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                       Abilitato
                      </label>
                      <div id="emailHelp" className="form-text"></div>
                      <input
                        type="text"
                        id="abilitato"
                        value={this.state.abilitato}
                        onChange={this.changeAbilita.bind(this)}
                        disabled={true}
                      />
                    </div>
                    <button style={{ marginLeft: "60px",marginTop: "0px" }}
                      className="btn btn-primary"
                      onClick={this.updateUtente.bind(this)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <br />
                <br />
                <a href="/listaUtenti" className="btn btn-link" style={{ marginLeft: "-110px",marginTop: "10px" }}>Torna alla pagina precedente</a>
              </div>
            </div>
          </div>
        );
      }
    }