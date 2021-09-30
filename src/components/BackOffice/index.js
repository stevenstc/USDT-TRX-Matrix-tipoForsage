import React, { Component } from "react";
import TronWeb from "tronweb";

import CrowdFunding from "../CrowdFunding";
import Oficina from "../Oficina";
import TronLinkInfo from "../TronLinkInfo";

import './Backoffice.scss';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";

const TRONGRID_API = "https://api.shasta.trongrid.io";

var viewTronweb = new TronWeb(
  TRONGRID_API, 
  TRONGRID_API, 
  TRONGRID_API
);

viewTronweb.setAddress(FOUNDATION_ADDRESS);

console.log(viewTronweb);

export default class BackOffice extends Component {
  state = {}
  render () {
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    return (
      <div className="container-scroller">
        { sidebarComponent }
        <div className="container-fluid page-body-wrapper">
          <div className="main-panel">
             <Dashboard/>
          </div>
        </div>
      </div>
    );
  }/*
  render() {

    if (this.props.view === true) {
      return (
        <>

          <CrowdFunding />
    
          <Oficina /> 
          

      </>
      );
      
      
    }else{
      return (
        <>

          <TronLinkInfo tronWeb={window.tronWeb}/>

          <CrowdFunding />
    
          <Oficina /> 
          

      </>
      );
    }

      
  }*/
}
