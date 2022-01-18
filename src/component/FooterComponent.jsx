import React, { Component } from 'react'

export default class FooterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
        <div>
            <footer className="footer fixed-bottom">
                <span className="text-muted">Tutti i diritti sono riservati - @Andrea Prozzo - 2021</span>
            </footer>
        </div>
        )
    }
}
