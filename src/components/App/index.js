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
        contrato: { 
          ready: false
        }
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

    if ( typeof window.tronLink !== 'undefined' && typeof window.tronWeb !== 'undefined' && document.location.href.indexOf('?')>0 ) { 

      var tronWeb = this.state.tronWeb;

      tronWeb['installed'] = true;
      tronWeb['web3'] = window.tronLink.tronWeb;

      this.setState({

        tronWeb: tronWeb,
      });

      window.tronLink.request({method: 'tron_requestAccounts'})
      .then(()=>{

      
        window.tronWeb.trx.getAccount()
        .then((account)=>{
          tronWeb['loggedIn'] = true;

          this.setState({
            accountAddress: window.tronWeb.address.fromHex(account.address),
            tronWeb: tronWeb,
        
          });

        }).catch(()=>{
          tronWeb['loggedIn'] = false;
          this.setState({

            tronWeb: tronWeb
        
          });

        })
        
          
      }).catch(()=>{

          tronWeb['installed'] = false;
          tronWeb['loggedIn'] = false;

          this.setState({

            tronWeb: tronWeb
        
          });

      })

      if(window.tronLink.ready){
        this.setState({
          contrato: { 
            ready: true,
            matrix: await window.tronWeb.contract().at(cons.SC),
            USDT: await window.tronWeb.contract().at(cons.USDT)
          }
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
      getString = getString.split('#')[0];

    }

    switch (getString) {
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
            <BackOffice contrato={this.state.contrato}/>
          </>
        );
      

      default:  

        return (<><Inicio /></>);
      
    }


    
  }

  
}
export default App;

// {tWeb()}
