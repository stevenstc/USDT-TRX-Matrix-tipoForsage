import React, { Component } from "react";
import TronWeb from "tronweb";

import CrowdFunding from "../../components/CrowdFunding";
import Oficina from "../../components/Oficina";
import TronLinkInfo from "../../components/TronLinkInfo";

import Header from '../../components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Footer from '../../components/Footer';

import s from './Layout.module.scss';

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
  render () {    
     return (
       <>
       <Header/>
      <div className={s.root} >
        <div className={s.wrap}>
          <Sidebar/>
           <main className={s.content}>
            <Dashboard/>
            </main>
        </div>
      </div>      
      <Footer/>
      </>
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
