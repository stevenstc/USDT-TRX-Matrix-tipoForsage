import React, { Component } from "react";

import Utils from "../../utils";
import BackOffice from "../BackOffice";
import TronLinkGuide from "../TronLinkGuide";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };

    this.conectar = this.conectar.bind(this);

  }

  async componentDidMount() {

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

        tronWeb: tronWeb
    
      });

      window.tronLink.request({method: 'tron_requestAccounts'})
      .then(()=>{

      
        window.tronLink.tronWeb.trx.getAccount()
        .then((account)=>{
          tronWeb['loggedIn'] = true;

          this.setState({
            tronWeb: tronWeb,
            accountAddress: window.tronLink.tronWeb.address.fromHex(account.address)
        
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

      Utils.setTronWeb(window.tronLink.tronWeb);


      
    }
  }

  render() {
    var getString = "/";
    var loc = document.location.href;
    var interrogant = "";

    if(loc.indexOf('?')>0){
              
      getString = loc.split('?')[1];
      getString = getString.split('#')[0];
      interrogant = "?";
    }

    if (!this.state.tronWeb.installed) return (
      <>
        <div className="container">
          <TronLinkGuide />
        </div>
      </>
      );

    if (!this.state.tronWeb.loggedIn) return (
      <>
        <div className="container">
          <TronLinkGuide installed />
        </div>
      </>
      );

      switch (getString) {
        case "BackOffice": 
        case "backOffice":
        case "backoffice": return(<BackOffice url={interrogant+getString}/>);
  
        case "ViewOffice": 
        case "viewOffice": 
        case "viewoffice": return(<BackOffice url={interrogant+getString}/>);
      
        default:  return(<BackOffice url={interrogant+getString}/>);
      }


  }
}
export default App;

