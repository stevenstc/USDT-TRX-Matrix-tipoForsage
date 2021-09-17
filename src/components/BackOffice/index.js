import React, { Component } from "react";

import CrowdFunding from "../CrowdFunding";
import Oficina from "../Oficina";
import TronLinkInfo from "../TronLinkInfo";

export default class BackOffice extends Component {
  
  render() {

      return (
        <>
        <section className="hero set-bg" data-setbg="img/hero-bg.jpg" style={{"backgroundImage": "url('img/hero-bg.jpg')"}}>
          <div className="container">
              <div className="row">
                  <div className="col-lg-5">
                      <div className="hero__text">
                          <TronLinkInfo tronWeb={window.tronWeb}/>
                      </div>
                  </div>
                  <div className="col-lg-5 offset-lg-2">
                      <div className="hero__form">
                          
                          <CrowdFunding />
                          
                      </div>
                  </div>
              </div>
          </div>
        </section>

        <section className="choose spad">
          <div className="container">
            <Oficina /> 
          </div>
        </section>

      </>
      );
  }
}
