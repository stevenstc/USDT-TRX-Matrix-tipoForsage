import React, { Component } from "react";
import TronWeb from "tronweb";

import CrowdFunding from "../CrowdFunding";
import Oficina from "../Oficina";
import TronLinkInfo from "../TronLinkInfo";

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

      
  }
}
