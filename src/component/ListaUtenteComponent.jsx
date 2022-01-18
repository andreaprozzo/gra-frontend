import React, { Component } from 'react';
import UtenteService from '../service/UtenteService';
import $ from 'jquery'


export default class ListaDipendenteComponent extends Component {

    constructor(props) {
        super(props);
        if(localStorage.getItem("status")!== "admin") {
            console.log("accesso non consentito");
            this.props.history.push("/")
            
        }

        this.state = {
            
            utenti: [] ,
            trovato: "",
            checked: true,
            idSearch:"",
            userSearch:"",
            emailSearch:"",
            profiloSearch:""
        }

        this.cambioSelezione = this.cambioSelezione.bind(this);
        this.idSearchHandler = this.idSearchHandler.bind(this);
        this.userSearchHandler = this.userSearchHandler.bind(this);
        this.emailSearchHandler = this.emailSearchHandler.bind(this);
        this.profiloSearchHandler = this.profiloSearchHandler.bind(this);
       
    }

    componentDidMount() {
        UtenteService.getUtenti().then((res) => {
            this.setState({utenti: res.data});
            console.log("stampo gli utenti: " + JSON.stringify(this.state.utenti));
        }); 
    }

    abilitaUtente(id) {
        localStorage.setItem("idUt", id);
        this.props.history.push("/abilitaUtente");
        console.log("sei entrato in abilita utente id ->: " + id);
    }

    modificaUtente(){
        this.props.history.push("/modificaUtente");
    }

    cambioSelezione(e){
        this.setState({cambio: !e.target.checked});
        console.log("visualizzo lo switch :" + JSON.stringify(this.state.cambio));  
    }

    eliminaUtente(idUtente){
        UtenteService.eliminaUtente(idUtente).then(res=> {
            this.setState({utenti: this.state.utenti.filter(utente => utente.idUtente !== idUtente)});
            console.log("hai eliminanto l'utente -> " + idUtente);
        }); 
    }


    idSearchHandler = (event) => {
        // console.log("idSearchHandler => " + event.target.value );
            this.setState({idSearch: event.target.value});        
    }
    
    userSearchHandler = (event) => {
        // console.log("nomeSearchHandler => " + event.target.value );
        this.setState({userSearch: event.target.value });        
    }

    emailSearchHandler = (event) => {
        // console.log("cognomeSearchHandler => " + event.target.value );
        this.setState({emailSearch: event.target.value});        
    }

    profiloSearchHandler = (event) => {
        // console.log("nascitaSearchHandler => " + event.target.value );
        this.setState({profiloSearch: event.target.value});        
    }

    resetFiltro(){
        this.setState({idSearch: ""});
        this.setState({userSearch: ""});
        this.setState({emailSearch:""});
        this.setState({profiloSearch: ""});
    }


    filter(){
      var cambio = this.state.cambio;
      console.log("visualizzo la proprieta role dello switch: " + $("#switch").val());
      let idSearch = this.state.idSearch;
      let userSearch = this.state.userSearch;
      let emailSearch = this.state.emailSearch;
      let profiloSearch = this.state.profiloSearch;
    //   console.log(idSearch +"  "+ userSearch + "  " + emailSearch +"  "+ profiloSearch);
      
      if(cambio === true || cambio === undefined) {


             if(idSearch!=="" && userSearch==="" && emailSearch===""  &&  profiloSearch==="") {

                return(
                    (this.state.utenti.filter( utenti =>
                    
                        utenti.idUtente===parseInt((idSearch))
                    ))
                );
                // ricerca per user (prima lettera)
                } else if(idSearch==="" && userSearch.length<2 && emailSearch===""  &&  profiloSearch===""){

                    return( 
                        ( this.state.utenti.filter( utenti => 
                         
                             utenti.userName.charAt(0).toLowerCase().includes(userSearch.toLowerCase(userSearch)
                          
                        )))
                 ); 

                // ricerca per user (completo)
                } else if(idSearch==="" && userSearch!=="" && emailSearch===""  &&  profiloSearch===""){

                    return( 
                        ( this.state.utenti.filter( utenti => 
                         
                             utenti.userName.slice(0,20).toLowerCase().includes(userSearch.toLowerCase(userSearch)
                          
                        )))
                 ); 
                // ricerca per email 
                } else if(idSearch==="" && userSearch==="" && emailSearch.length<2 &&  profiloSearch===""){

                    return( 
                        ( this.state.utenti.filter( utenti => 
                         
                             utenti.emailUtente.charAt(0).toLowerCase().includes(emailSearch.toLowerCase(emailSearch)
                          
                        )))
                 ); 

                // ricerca per email (completo)
                } else if(idSearch==="" && userSearch==="" && emailSearch!==""  &&  profiloSearch===""){

                    return( 
                        ( this.state.utenti.filter( utenti => 
                         
                             utenti.emailUtente.slice(0,20).toLowerCase().includes(emailSearch.toLowerCase(emailSearch)
                          
                        )))
                 ); 
                // ricerca per profilo (prima lettera)
                } else if(idSearch==="" && userSearch==="" && emailSearch==="" &&  profiloSearch.length<2){

                    return( 
                        ( this.state.utenti.filter( utenti => 
                         
                             utenti.idProfiloUtente.nomeProfilo.charAt(0).toLowerCase().includes(profiloSearch.toLowerCase(profiloSearch)
                          
                        )))
                 ); 

                // ricerca per profilo (completo)
                } else if(idSearch==="" && userSearch==="" && emailSearch===""  &&  profiloSearch!==""){

                    return( 
                        ( this.state.utenti.filter( utenti => 
                         
                             utenti.idProfiloUtente.nomeProfilo.slice(0,20).toLowerCase().includes(profiloSearch.toLowerCase(profiloSearch)
                          
                        )))
                 ); 
                           
                // ricerca per userName ed Email 
                } else if(idSearch ==="" && userSearch!=="" && emailSearch!==""  &&  profiloSearch===""){

                        return( 
                            ( this.state.utenti.filter( utenti => 
                            
                                utenti.userName.toLowerCase().includes(userSearch.toLowerCase(userSearch))
                                &&
                                utenti.emailUtente.toLowerCase().includes(emailSearch.toLowerCase(emailSearch))
                            
                            ))
                       ); 
                // ricerca per userName e profilo  
                } else if(idSearch ==="" && userSearch!=="" && emailSearch===""  &&  profiloSearch!==""){

                        return( 
                            ( this.state.utenti.filter( utenti => 
                            
                                utenti.userName.toLowerCase().includes(userSearch.toLowerCase(userSearch))
                                &&
                                utenti.idProfiloUtente.nomeProfilo.toLowerCase().includes(profiloSearch.toLowerCase(profiloSearch))
                            
                            ))
                       ); 
                // ricerca per email e profilo  
                } else if(idSearch ==="" && userSearch==="" && emailSearch!==""  &&  profiloSearch!==""){

                        return( 
                            ( this.state.utenti.filter( utenti => 
                            
                                utenti.emailUtente.toLowerCase().includes(emailSearch.toLowerCase(emailSearch))
                                &&
                                utenti.idProfiloUtente.nomeProfilo.toLowerCase().includes(profiloSearch.toLowerCase(profiloSearch))
                            
                            ))
                       ); 

                // ricerca per user e profilo
                } else if(idSearch ==="" && userSearch!=="" && emailSearch===""  &&  profiloSearch!==""){

                        return( 
                            ( this.state.utenti.filter( utenti => 
                            
                                utenti.userName.toLowerCase().includes(userSearch.toLowerCase(userSearch))
                                &&
                                utenti.idProfiloUtente.nomeProfilo.toLowerCase().includes(profiloSearch.toLowerCase(profiloSearch))
                            
                            ))
                       ); 

                // ricerca per user / email e profilo  
                } else if(idSearch ==="" && userSearch!=="" && emailSearch!==""  &&  profiloSearch!==""){

                        return( 
                            ( this.state.utenti.filter( utenti => 
                            
                                utenti.userName.toLowerCase().includes(userSearch.toLowerCase(userSearch))
                                &&
                                utenti.emailUtente.toLowerCase().includes(emailSearch.toLowerCase(emailSearch))
                                &&
                                utenti.idProfiloUtente.nomeProfilo.toLowerCase().includes(profiloSearch.toLowerCase(profiloSearch))
                            
                            ))
                       ); 

                    } else {
                    return (
                    this.state.utenti
                    )
                }   

      } else {

        return( 
            (this.state.utenti.filter(utenti => 
                utenti.abilitato === false
                ))
          ); 
      }
    }



    render() {   
        var controllato = this.trovato;
        return (
            <div className="row container shadow-lg p-3 mb-5 bg-white">

            {/* form di ricerca dei utenti */}
                <h2  style = {{marginLeft: "-10px"}} className="text-center">Lista degli Utenti</h2>
                <div className="row">
                        <form style={{border: "2px solid black",margin: "10px 10px 10px 0px" }}>
                            <div  style={{margin: "10px 10px 10px 10px"}}  ><h4 className="text-center">Menu di ricerca</h4></div>
                            {/* <div className="col-12"  style={{display: "flex"}}>  */}
                                <div  style={{display: "flex", marginLeft: "220px"}}>    
                                    <div className="ricerca-cell">
                                        <label  style={{marginLeft: "10px"}} className="label-ricerca">ID Utente</label>
                                            <div className="input-div">    
                                                <input className="ricerca-inp" type="text" value={this.state.idSearch} onChange={this.idSearchHandler} />
                                            </div>
                                    </div>
                                    
                                    <div className="ricerca-cell">
                                        <label  className="label-ricerca">User Name</label>
                                            <div className="input-div">
                                                <input  className="ricerca-inp" type="text" value={this.state.userSearch} onChange={this.userSearchHandler} />
                                            </div>
                                    </div>   
                                    
                                    <div className="ricerca-cell"> 
                                        <label  className="label-ricerca">Email Utente</label>
                                            <div className="input-div">        
                                                <input id="cognomeSearch" className="ricerca-inp" type="text" value={this.state.emailSearch} onChange={this.emailSearchHandler} />
                                            </div>
                                    </div>
                                
                                    <div className="ricerca-cell"> 
                                        <label  className="label-ricerca">Profilo Utente</label>
                                            <div className="input-div">        
                                                <input id="cognomeSearch" className="ricerca-inp" type="text" value={this.state.profiloSearch} onChange={this.profiloSearchHandler} />
                                            </div>
                                    </div>
                                
                                </div>  
                                <div className="filter-btn">
                                        <button  style = {{marginLeft: "550px"}} onClick={ () => this.resetFiltro()} className="btn btn-warning">Reset Campi</button>
                                </div>                   
                        </form>
                        <br />
                        <hr />
                        <br />
                        <br />
                    </div>
            {/*FIne  form di ricerca dei dipendenti */}


                {/* <h2>Tabella Utenti</h2> */}
                {/* switch per visualizzare gli utenti non abilitati */}
                <h4 style = {{marginLeft:"455px",textShadow:"4px  1px 20px black",color:"green"}}>FIltra Utenti da Abilitare</h4>
                
                <div class="form-check form-switch" style={{webkitTransform:"scale(1.6)"}}>
                   
                      <input style = {{marginLeft:"550px"}} className="form-check-input" type="checkbox" role="switch" id="switch2" unchecked={!this.state.checked} onChange={this.cambioSelezione.bind(this)}></input>
                        
                      {/* <label style = {{marginRight:"-300px"}} className="form-check-label" for="flexSwitchCheckChecked">Clicca per visualizzare gli utenti non abilitati</label> */}
                </div>
                {/* Fine switch  */}
                <br />
                <br />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Id Profilo Utente</th>
                            <th>Abilitato</th>
                            <th colSpan="3" text-align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.filter().map(
                                utente => 
                                <tr key = {utente.idUtente}>
                                    <td>{utente.idUtente}</td>
                                    <td>{utente.userName}</td>
                                    <td>{utente.passwordUtente}</td>
                                    <td>{utente.emailUtente}</td>
                                    <td>{utente.idProfiloUtente.nomeProfilo}</td>
                                    <td>{utente.abilitato?"si":"no"}</td>
                                    <td>
                                        <button style = {{marginLeft: "80px"}}  onClick = {() => this.abilitaUtente(utente.idUtente)}
                                        className = {utente.abilitato?"btn btn-danger":"btn btn-success"}>{utente.abilitato?"Disabilita":"Abilita->"}</button>
                                    </td>
                                    <td>
                                        <button style = {{marginLeft: "10px"}} onClick = {() => this.modificaUtente(utente.idUtente)}
                                        className = "btn btn-info">Aggiorna</button>
                                    </td>
                                    <td>
                                        <button style = {{marginLeft: "10px"}} onClick = {() => this.eliminaUtente(utente.idUtente)}
                                        className = "btn btn-danger">Elimina</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <a href="/dipendenti" className="btn btn-link">Torna alla pagina precedente</a>
            </div>
        )
    }
}
