import React, { Component } from "react";

import cons from "../../cons";

import TronLinkGuide from "../TronLinkGuide";
import Inicio from "../Inicio";
import BackOffice from "../BackOffice";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountAddress: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
      tronWeb: {
        address: "Cargando...",
        installed: false,
        loggedIn: false,
        web3: null,
        
      },
      contrato: { 
        matrix: null,
        USDT: null
      }
    };

    this.conectar = this.conectar.bind(this);
  }

  async componentDidMount() {
    this.conectar();

    setInterval(async() => {
      await this.conectar();
    }, 7*1000);
      
  }

  async conectar(){

    var {tronWeb, contrato} = this.state;

    if ( typeof window.tronLink !== 'undefined' && typeof window.tronWeb !== 'undefined' && document.location.href.indexOf('?')>0 ) { 

      tronWeb['installed'] = true;
      tronWeb['web3'] = window.tronLink.tronWeb;

      this.setState({
        tronWeb: tronWeb,
      });

      if((await window.tronLink.request({method: 'tron_requestAccounts'})).code === 200){

        this.setState({
          accountAddress: window.tronLink.tronWeb.defaultAddress.base58,

        })
      }

      if(window.tronLink.ready){
        tronWeb['loggedIn'] = true;

        if(this.state.contrato.matrix == null){

          contrato = {};

          //window.tronWeb.setHeader({"TRON-PRO-API-KEY": 'b0e8c09f-a9c8-4b77-8363-3cde81365fac'})

          contrato.matrix = await window.tronWeb.contract().at(cons.SC);
          contrato.USDT = await window.tronWeb.contract().at(cons.USDT);

          this.setState({
            contrato: contrato,
          });

        }

        this.setState({
          tronWeb: tronWeb,
        });
      }

    }
  }

  render() {


    var getString = "";
    var loc = document.location.href;
    //console.log(loc);
    if(loc.indexOf('?')>0){
              
      getString = loc.split('?')[1];
      getString = getString.split('?')[0];
      getString = getString.split('&')[0];
      getString = getString.split('=')[0];
      getString = getString.split('#')[0];

    }

    var consulta = loc;

    if(loc.indexOf('id=')>0){
      consulta = loc.split('id=')[1];
      consulta = consulta.split('?')[0];
      consulta = consulta.split('&')[0];
      consulta = consulta.split('=')[0];
      consulta = consulta.split('#')[0];

    }

    switch (getString) {
      case "ref":
      case "bo": 
      case "BO":
      case "backoffice": 
        if (!this.state.tronWeb.installed) return (
          <>
            <TronLinkGuide  url={"/?"+getString}/>
          </>
          );
    
        if (!this.state.tronWeb.loggedIn) return (
          <>
            <TronLinkGuide installed url={"/?"+getString}/>
          </>
          );
    
        return (
          <>
            <BackOffice contrato={this.state.contrato} accountAddress={this.state.accountAddress} viewer={false}/>
          </>
        );

        case "id":
        case "preview":
        case "viewer": 
          if (!this.state.tronWeb.installed || !this.state.tronWeb.loggedIn) return (
            <>
              <TronLinkGuide installed={this.state.tronWeb.installed} loggedIn={this.state.tronWeb.loggedIn} url={"/?"+getString}/>
            </>
            );
      
          return (
            <>
              <BackOffice contrato={this.state.contrato} accountAddress={consulta} viewer/>
            </>
          );
      

      default:  

        return (<><Inicio /></>);
      
    }


    
  }

  
}
export default App;
