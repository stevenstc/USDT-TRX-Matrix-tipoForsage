import React, { Component } from "react";
import TronWeb from "tronweb";

import Header from "../Header";
import Footer from "../Footer";
import Utils from "../../utils";
import Home from "../../pages/Home";
import BackOffice from "../../pages/BackOffice";
import TronLinkGuide from "../TronLinkGuide";




const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };
  }

  async componentDidMount() {
    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {

          //console.log("intento "+tries);

          const TRONGRID_API = "https://api.trongrid.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false
            }
          });
          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) {
          return tries++;
        }

        this.setState({
          tronWeb: tronWebState
        });

        resolve();
      }, 1000);
    });

    if (!this.state.tronWeb.loggedIn) {
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object if TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS
      };

      window.tronWeb.on("addressChange", () => {
        if (this.state.tronWeb.loggedIn) {
          return;
        }

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true
          }
        });
      });
    }

    Utils.setTronWeb(window.tronWeb);
  }

  render() {
    var opt = "/";
    var loc = document.location.href;
    var interrogant = "";
    if(loc.indexOf('?')>0){              
      opt = loc.split('?')[1];
      opt = opt.split('#')[0].toLowerCase();
      interrogant = "?";
    }

    let content = <Home/>;
   console.log(opt);
    switch (opt) {
      case "backoffice": 
        if (!this.state.tronWeb.installed) 
        return(
          <>
            <Header />
            <div className="container"> <TronLinkGuide /></div>
            <Footer />
          </>);
        else if (!this.state.tronWeb.loggedIn)          
          return(
            <>
              <Header />
              <div className="container"> <TronLinkGuide installed /></div>
              <Footer />
            </>);
        else
        return(
          <>
            <BackOffice url={interrogant + opt} view={false}/>
          </>);
      case "viewoffice": 
        if (!this.state.tronWeb.installed) 
        return(
          <>
            <Header />
            <div className="container"> <TronLinkGuide /></div>
            <Footer />
          </>);   
        else if (!this.state.tronWeb.loggedIn)         
          return(
          <>
            <Header />
            <div className="container"> <TronLinkGuide installed /></div>
            <Footer />
          </>);         
        else
          return(
          <>
              <BackOffice url={interrogant + opt} view={true}/>
          </>);
    
      default:   return(<>
        <Header />
             <Home/>
        <Footer />
     </>);
      }
  }
}
export default App;

