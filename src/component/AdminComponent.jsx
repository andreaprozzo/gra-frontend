import React, { Component } from 'react'
import addDipendente from '../Imgs/addDipendente.jpg';
import menuDipendenti from '../Imgs/menuDipendenti.jpg'

export default class AdminComponent extends Component {

    constructor(props) {
        super(props);
        if(localStorage.getItem("status")!== "admin") {
            console.log("accesso non consentito");
            this.props.history.push("/")
            
        }
    
        this.state = {
       
        };
    
    }


    render() {
        return (
          <div className="container bcontent text-center shadow-lg p-3 mb-5 bg-white">
        <h2>Benvenuto Admin</h2>
        <hr />
        <div className="card" style= {{width: "500px" , marginLeft:"380px"}}>
            <div className="row no-gutters">
                <div className="col-sm-5">
                    <img className="card-img" src={addDipendente} alt="Suresh Dasari Card" style={{marginTop:"30px"}}></img>
                </div>
                <div className="col-sm-7">
                    <div className="card-body">
                        <h5 className="card-title">Aggiungi Dipendente</h5>
                        <p className="card-text">Entra per accedere al form di inserimento</p>
                        <a href="/add-dipendente" className="btn btn-primary">Vai ad aggiungi</a>
                    </div>
               
              <hr />
              <br />
              <br />
              <hr />

               
                </div>
                <div className="col-sm-5">
                    <img className="card-img" src={menuDipendenti} alt="Suresh Dasari Card"></img>
                </div>
                <div className="col-sm-7">
                    <div className="card-body">
                        <h5 className="card-title">Menu Principale</h5>
                        <p className="card-text">Entra per accedere al Menu</p>
                        <a href="/dipendenti" className="btn btn-primary">Vai al Menu</a>
                    </div>
                </div>
            </div>
        </div>
    </div> 
        )
    }
}
