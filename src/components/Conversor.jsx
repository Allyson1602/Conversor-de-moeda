import React, { Component } from 'react';

import './Conversor.css';

export default class Conversor extends Component {
    constructor(props){
        super(props);
        this.state={
            moedaA_valor: '',
            moedaB_valor: 0,
        };

        this.handleConvert = this.handleConvert.bind(this);
        this.handleValor = this.handleValor.bind(this);
    }
    handleConvert(){
        const countries_convert = `${this.props.moedaA}_${this.props.moedaB}`;
        const url = `https://free.currconv.com/api/v7/convert?q=${countries_convert}&compact=ultra&apiKey=0a580d79fa43299c8602`;

        fetch(url).then(res => {
            return res.json();
        }).then(json => {
            let cotacao = json[countries_convert];
            this.setState({ moedaB_valor: (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2) });
        });
    }
    handleValor(event){
        if(isNaN(event.target.value)){
            return 0;
        }
        return this.setState({ moedaA_valor: event.target.value });
    }
    render(){
        return(
            <div className="conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input type="text" onChange={this.handleValor} value={this.state.moedaA_valor} />
                <input type="button" value="converter" onClick={this.handleConvert} />
                <h2>{isNaN(this.state.moedaB_valor) ? 0 : this.state.moedaB_valor}</h2>
            </div>
        );
    }
}