import React, { Component } from 'react'
import ListaDipendenteComponent from './ListaDipendenteComponent';
import CreaDipendenteComponent from './CreaDipendenteComponent';
import ModificaDipendenteComponent from './ModificaDipendenteComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginUtenteComponent from './LoginUtenteComponent';
import SignInUtenteComponent from './SignInUtenteComponent';
import HomeGraComponent from './HomeGraComponent';
import AdminComponent from './AdminComponent';
import RicercaDipendenteComponent from './RicercaDipendenteComponent';
import UserComponent from './UserComponent';
import ListaUtenteComponent from './ListaUtenteComponent';
import AbilitaUtenteComponent from './AbilitaUtenteComponent';
import ModificaUtenteComponent from './ModificaUtenteComponent';


export default class RouterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }


    render() {
        return (
            <div>
                 <Router>
                     <HeaderComponent />
                         <div className="container">
                  <Switch>
                     <Route path = "/" exact component = {HomeGraComponent}></Route>
                     <Route path = "/dipendenti"  component = {ListaDipendenteComponent}></Route>
                     <Route path = "/add-dipendente" component = {CreaDipendenteComponent}></Route>
                     <Route path = "/update-dipendente/:id" component = {ModificaDipendenteComponent}></Route>
                     <Route path = "/utente/loginUtente" component = {LoginUtenteComponent}></Route>
                     <Route path = "/utente/signInUtente" component = {SignInUtenteComponent}></Route>
                     <Route path = "/admin" component = {AdminComponent}></Route>
                     <Route path = "/ricerca" component = {RicercaDipendenteComponent}></Route>
                     <Route path = "/user" component = {UserComponent}></Route>
                     <Route path = "/listaUtenti" component = {ListaUtenteComponent}></Route>
                     <Route path = "/abilitaUtente" component = {AbilitaUtenteComponent}></Route>
                     <Route path = "/modificaUtente" component = {ModificaUtenteComponent}></Route>

                 </Switch>
                         </div>
                     <FooterComponent />
                 </Router>
            </div>
        )
    }
}
