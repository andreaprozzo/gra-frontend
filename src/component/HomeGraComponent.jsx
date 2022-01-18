import React, { Component } from 'react'
import logo from '../Imgs/logo.png'

export default class HomeGraComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount(){
      localStorage.clear();
      // alert("Login effettuato con successo");
      console.log("local storage pulito" + localStorage.getItem("utente"));
    }


    render() {
        return (
            <div className="container shadow-lg p-3 mb-5 bg-white">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Clicca su Login per accedere</h3>
              <h4 className="text-center">Clicca su Registrati per inserire ituoi dati</h4>
              <div className="card-body ">
                <img className="img-fluid" src={logo} alt="logo" style={{marginLeft: "110px"}}></img>
              </div>
            </div>
          </div>
        )
    }
}
