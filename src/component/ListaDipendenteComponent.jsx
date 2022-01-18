import React, { Component } from 'react';
import DipendenteService from '../service/DipendenteService';


export default class ListaDipendenteComponent extends Component {

    constructor(props) {
        super(props);

        if(localStorage.getItem("status")!== "admin") {
            console.log("accesso non consentito");
            this.props.history.push("/")
            
        }

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
        this.listaUtenti = this.listaUtenti.bind(this);
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

    listaUtenti() {
        this.props.history.push('/listaUtenti');
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


    filterList(){
       
        let idSearch=  this.state.idSearch;
        let nomeSearch=this.state.nomeSearch;
        let cognomeSearch=this.state.cognomeSearch;
        let nascitaSearch=this.state.nascitaSearch;
        let repartoSearch=this.state.repartoSearch;
        let assunzioneSearch=this.state.assunzioneSearch;
        let ruoloSearch=this.state.ruoloSearch;
        let creazioneSearch=this.state.creazioneSearch;
        
        // console.log(`dati ricevuti in FilterList idSearch => ${idSearch}`);
        // console.log(`dati ricevuti in FilterList nomeSearch => ${nomeSearch}`);
        // console.log(`dati ricevuti in FilterList cognomeSearch => ${cognomeSearch}`);
        // console.log(`dati ricevuti in FilterList nascitaSearch => ${nascitaSearch}`);
        // console.log(`dati ricevuti in FilterList repartoSearch => ${repartoSearch}`);
        // console.log(`dati ricevuti in FilterList assunzioneSearch => ${assunzioneSearch}`);
        // console.log(`dati ricevuti in FilterList ruoloSearch => ${ruoloSearch}`);
        // console.log(`dati ricevuti in FilterList creazioneSearch => ${creazioneSearch}`);               
       

        //------------------------------------------------------------------------------------------------------------------------------------------
        //ricerca per singoli campi 

        // Ricerca per id
        if (idSearch!=="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
             && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="" ) { 
        
            return( 
                   ( this.state.dipendenti.filter( dipendenti =>
                    
                        dipendenti.idDipendente===parseInt((idSearch))
                        
                    ))
            ); 
        
        // Ricerca per Nome (prima lettera)
        }else if (idSearch==="" && nomeSearch.length<2 && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
             && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 
        
            return( 
                   ( this.state.dipendenti.filter( dipendenti => 
                    
                        dipendenti.nome.charAt(0).toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch)
                     
                   )))
            ); 


        // Ricerca per Nome (completo)
        }else if (idSearch==="" && nomeSearch!=="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
             && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 
        
            return( 
                   ( this.state.dipendenti.filter( dipendenti => 
                    
                        dipendenti.nome.slice(0,20).toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch)
                     
                   )))
            ); 

        
        // Ricerca per Cognome
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
            
                dipendenti.cognome.charAt(0).toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch)
                
                
                )))
            ); 
        
        //Ricerca per data di Nascita
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch)
                    
                    
                )))
            );
        
        // Filtra per Reparto
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.reparto.charAt(0).toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch)
                    
                    
                )))
            );
    
        // Filtra per data Assunzione
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch)
                    
                    
                )))
            );

        // Filtra per Ruolo
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.idRuolo.nomeRuolo.charAt(0).toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch)
                    
                    
                )))
            );

        // Filtra per data Creazione
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch)
                    
                    
                )))
            );

        // ---------------------------------------------------------------------------------------------------------------------------
        //ricerca per due campi alla volta

        
        // Filtra per Nome e Cognome
        }else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                ))
            );

         // Filtra per Nome e data di Nascita
        }else if (idSearch==="" && nomeSearch!=="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                ))
            );

            // Filtra per Nome e Reparto
            }else if (idSearch==="" && nomeSearch!=="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch!=="" 
            && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 

                return( 
                    ( this.state.dipendenti.filter( dipendenti =>
                    
                        dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                        &&
                        dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    ))
                );
             // Filtra per Nome e data di Assunzione
            }else if (idSearch==="" && nomeSearch!=="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
            && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") { 

                return( 
                    ( this.state.dipendenti.filter( dipendenti =>
                    
                        dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                        &&
                        dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    ))
                );

         // Filtra per Nome e Ruolo
        }else if (idSearch==="" && nomeSearch!=="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );    

        // Filtra per Nome e Creazione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            ); 
            

        //  ------------------------------------------------------------------------------------------------------------------------------------------------

                    

        
        // filtra per cognome e dataNascita
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                ))
            ); 
            

        // filtra per cognome e reparto
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                ))
            ); 
        
        // filtra per cognome e data di assunzione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            ); 
        
        // filtra per cognome e ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            ); 


        // filtra per cognome e data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            ); 



        //-------------------------------------------------------------------------------------------------------------


            
        // ricerca per data di Nascita e Reparto Assegnato
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                ))
            );
        
       // ricerca per data di Nascita e data di Assunzione
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            ); 
        
       // ricerca per data di Nascita e Ruolo
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.ruoloIdRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );

       // ricerca per data di Nascita e  data di Creazione
        }else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") { 

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.ruoloIdRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );
    


        //----------------------------------------------------------------------------------------------------------------------
        


        // filtra per reparto e data di assunzione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            ); 


        // filtra per reparto e ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            ); 


        // filtra per reparto e data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            ); 


       
        //  ------------------------------------------------------------------------------------------------------------------------------------------------

        // filtra per data di assunzione e ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            ); 




        // filtra per data di assunzione e data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            ); 


        //  ------------------------------------------------------------------------------------------------------------------------------------------------



        // filtra per ruolo e data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            ); 
        


        //  ------------------------------------------------------------------------------------------------------------------------------------------------
        // ricerca per tre campi 
        

        // filtra per nome / cognome  e  data di nascita
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                ))
            ); 




        // filtra per nome / cognome  e  reparto
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                ))
            ); 
        


        // filtra per nome / cognome  e  data di assunzione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            ); 


        // filtra per nome / cognome  e  ruolo
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            ); 
        


        // filtra per nome / cognome  e  data di creazione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            ); 
        



        //  ------------------------------------------------------------------------------------------------------------------------------------------------




        // filtra per Cognome-data di nascita  e Reparto
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                ))
            );

        // filtra per Cognome-data di nascita e data di Assunzione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            );

        // filtra per Cognome-data di nascita e Ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );

        // filtra per Cognome / data di nascita e data di Creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );




        //  ------------------------------------------------------------------------------------------------------------------------------------------------
          



        // filtra per data di nascita - reparto e data di assunzione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            );


        // filtra per data di nascita - reparto e ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );


        // filtra per data di nascita - reparto e data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );

            
            

        //  ------------------------------------------------------------------------------------------------------------------------------------------------




         // filtra per Reparto-data di Assunzione  e ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );

        // filtra per Reparto-data di Assunzione  e ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch!=="") {

        return( 
            ( this.state.dipendenti.filter( dipendenti =>
            
                dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                &&
                dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                &&
                dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
            ))
        );
 
        
        
        //  ------------------------------------------------------------------------------------------------------------------------------------------------




        // filtra per data di assunzione - ruolo e data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );


        //  ------------------------------------------------------------------------------------------------------------------------------------------------
        // ricerca per quattro campi          
       
        // filtra per nome / cognome / data nascita e reparto
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch==="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                ))
            );



        // filtra per nome / cognome / data nascita e data di assunzione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            );



        // filtra per nome / cognome / data nascita e ruolo
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );



        // filtra per nome / cognome / data nascita e data di creazione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch==="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );

        //  ------------------------------------------------------------------------------------------------------------------------------------------------


        // filtra per Cognome - Data di nascita Reparto assegnato - data Assunzione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            );

        // filtra per Cognome - Data di nascita Reparto assegnato - ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );
            
        // filtra per Cognome - Data di nascita Reparto assegnato - data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") {

            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );


        //  ------------------------------------------------------------------------------------------------------------------------------------------------
    

            // filtra per dataNascita / reparto / data assunzione e ruolo
            } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch!=="" 
            && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch==="") {
                return( 
                    ( this.state.dipendenti.filter( dipendenti =>
                    
                        dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                        &&  
                        dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                        &&
                        dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                        &&
                        dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                    ))
                );


                // filtra per dataNascita / reparto / data assunzione e data di creazione
                } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch!=="" 
                && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch!=="") {
                    return( 
                        ( this.state.dipendenti.filter( dipendenti =>
                        
                            dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                            &&  
                            dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                            &&
                            dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                            &&
                            dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                        ))
                    );



        //  ------------------------------------------------------------------------------------------------------------------------------------------------




           // filtra per reaparto / data di assunzione / ruolo e data di creazione
            } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch==="" && repartoSearch!=="" 
            && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch!=="") {
                return( 
                    ( this.state.dipendenti.filter( dipendenti =>
                    
                        dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                        &&  
                        dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                        &&
                        dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                        &&
                        dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                    ))
                );     



        //  ------------------------------------------------------------------------------------------------------------------------------------------------
        // ricerca per cinque campi 
    
        // filtra per nome / cognome / data nascita / reparto e data di assunzione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch==="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                ))
            );


        // filtra per nome / cognome / data nascita / reparto e ruolo
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch!=="" && creazioneSearch==="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );

        // filtra per nome / cognome / data nascita / reparto e data di creazione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch==="" && ruoloSearch==="" && creazioneSearch!=="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );


        // filtra per cognome / data di nascita / reparto / data di assunzione e ruolo
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch==="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );


        // filtra per cognome / data di nascita / reparto / data di assunzione e data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch!=="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );


        // filtra per data di nascita / reparto / data di assunzione / ruolo e data di creazione
        } else if (idSearch==="" && nomeSearch==="" && cognomeSearch===""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch!=="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );


            
        //  ------------------------------------------------------------------------------------------------------------------------------------------------
        // ricerca per sei campi 


        // filtra per nome / cognome / data nascita / reparto / data di assunzione e ruolo
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch==="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                ))
            );



        // filtra per nome / cognome / data nascita / reparto / data di assunzione e data di creazione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch==="" && creazioneSearch!=="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );



        //  ------------------------------------------------------------------------------------------------------------------------------------------------
        // ricerca per sette campi 

        // filtra per nome / cognome / data nascita / reparto / data di assunzione /ruolo e data di creazione
        } else if (idSearch==="" && nomeSearch!=="" && cognomeSearch!==""  &&  nascitaSearch!=="" && repartoSearch!=="" 
        && assunzioneSearch!=="" && ruoloSearch!=="" && creazioneSearch!=="") {
            return( 
                ( this.state.dipendenti.filter( dipendenti =>
                
                    dipendenti.nome.toLowerCase().includes(nomeSearch.toLowerCase(nomeSearch))
                    &&
                    dipendenti.cognome.toLowerCase().includes(cognomeSearch.toLowerCase(cognomeSearch))
                    &&
                    dipendenti.dataNascita.toLowerCase().includes(nascitaSearch.toLowerCase(nascitaSearch))
                    &&
                    dipendenti.reparto.toLowerCase().includes(repartoSearch.toLowerCase(repartoSearch))
                    &&
                    dipendenti.dataAssunzione.toLowerCase().includes(assunzioneSearch.toLowerCase(assunzioneSearch))
                    &&
                    dipendenti.idRuolo.nomeRuolo.toLowerCase().includes(ruoloSearch.toLowerCase(ruoloSearch))
                    &&
                    dipendenti.idRuolo.dataCreazione.toLowerCase().includes(creazioneSearch.toLowerCase(creazioneSearch))
                ))
            );

        } else {
                // console.log("Sono in else");
            
            return(
                    this.state.dipendenti
                );
            }
            
    }



    render() {
        
        return (
            <div className="row col-12 container shadow-lg p-3 mb-5 bg-white">
                {/* Parte relativa alla bara di ricerca del search */}
                <h2  style = {{marginLeft: "-30px"}} className="text-center">Lista dei Dipendenti</h2>
                <div className="row">
                    
                        <form style={{border: "2px solid black",margin: "10px 10px 10px 0px" }}>
                            <div  style={{margin: "10px 10px 10px 10px"}}  ><h4 className="text-center">Menu di ricerca </h4></div>
                            {/* <div className="col-12"  style={{display: "flex"}}>  */}
                                <div   style={{display: "flex"}}>    
                                    <div className="ricerca-cell">
                                        <label  className="label-ricerca">ID Dipendente</label>
                                            <div className="input-div">    
                                                <input className="ricerca-inp" type="text" value={this.state.idSearch} onChange={this.idSearchHandler} />
                                            </div>
                                    </div>
                                    
                                    <div className="ricerca-cell">
                                        <label  className="label-ricerca">Nome Dipendente</label>
                                            <div className="input-div">
                                                <input  className="ricerca-inp" type="text" value={this.state.nomeSearch} onChange={this.nomeSearchHandler} />
                                            </div>
                                    </div>   
                                    
                                    <div className="ricerca-cell"> 
                                        <label  className="label-ricerca">Cognome Dipendente</label>
                                            <div className="input-div">        
                                                <input id="cognomeSearch" className="ricerca-inp" type="text" value={this.state.cognomeSearch} onChange={this.cognomeSearchHandler} />
                                            </div>
                                    </div>
                                
                                    <div className="ricerca-cell">
                                        <label  className="label-ricerca">Data di Nascita</label>
                                            <div className="input-div">
                                                <input className="ricerca-inp" type="text" value={this.state.nascitaSearch} onChange={this.nascitaSearchHandler} />
                                            </div>                                   
                                    </div>

                                    <div className="ricerca-cell">
                                        <label  className="label-ricerca">Reparto Assegnato</label>
                                            <div className="input-div">    
                                                <input className="ricerca-inp" type="text" value={this.state.repartoSearch} onChange={this.repartoSearchHandler} />
                                            </div>                               
                                    </div>
                                
                                    <div className="ricerca-cell">
                                        <label  className="label-ricerca">Data di Assunzione</label>
                                            <div className="input-div">
                                                <input className="ricerca-inp" type="text" value={this.state.assunzioneSearch} onChange={this.assunzioneSearchHandler} />
                                            </div>
                                    </div> 

                                    <div className="ricerca-cell">
                                        <label  className="label-ricerca">Ruolo</label>
                                            <div className="input-div">
                                                <input className="ricerca-inp" type="text" value={this.state.ruoloSearch} onChange={this.ruoloSearchHandler} />
                                            </div>
                                    </div>
                                    
                                    <div className="ricerca-cell">
                                        <label  className="label-ricerca">Data di Creazione</label>
                                            <div className="input-div">
                                                <input className="ricerca-inp" type="text" value={this.state.creazioneSearch} onChange={this.creazioneSearchHandler} />
                                            </div>
                                    </div>
                                
                                    
                                </div>  
                                <div className="filter-btn">
                                        <button  style = {{marginLeft: "550px"}} onClick={ () => this.resetFiltro()} className="btn btn-warning">Reset Campi</button>
                                </div>                   
                        </form>
                    </div>


                <br />
                <hr />
                <button className="btn btn-primary col-2" onClick={this.addDipendente}>Aggiungi Dipendente</button>
                <button className="btn btn-primary col-2" onClick={this.listaUtenti} style={{marginLeft: 4}}>Lista Utenti</button>
                
            
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.filterList().map(
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
                                    <td>
                                        <button  onClick = {() => this.editDipendente(dipendente.idDipendente)}
                                        className = "btn btn-info">Modifica</button>
                                        <button style = {{marginLeft: "10px"}} onClick = {() => this.deleteDipendente(dipendente.idDipendente)}
                                        className = "btn btn-danger">Elimina</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <a href="/admin" className="btn btn-link">Torna al menu della pagina Admin</a>
            </div>
        </div>
        )
    }
}
