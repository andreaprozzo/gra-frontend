import React, { Component } from 'react'
import logoNav2 from '../Imgs/logoNav2.png'

export default class HeaderComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                      <div><a href="/" className="navbar-brand" style = {{marginLeft: "10px"}}>
                          <img src={logoNav2} alt="" height="40px" /></a></div>
                      <div className="collapse navbar-collapse" id="navbarNavDropdown"> 
                            <ul className="navbar-nav">
                             <li className="nav-item">
                                 <a className="nav-link " aria-current="page" href="/">Home</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link" href="/utente/loginUtente">Login</a>
                             </li>
                             <li className="nav-item">
                                <a className="nav-link" href="/utente/signInUtente">Registrati</a>
                             </li>
                             <li className="nav-item">
                                <a className="nav-link" href="/">Logout</a>
                             </li>
                            </ul>
                        </div>
                        <form className="d-flex" style = {{marginRight: "10px"}}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit" >Cerca</button>
                        </form>
                    </nav>
                </header>
                
            </div>
        )
    }
}
