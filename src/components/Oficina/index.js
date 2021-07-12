import React, { Component } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      direccion: "",
      link: "Haz una inversión para obtener el LINK de referido",
      registered: false,
      balanceRef: 0,
      totalRef: 0,
      invested: 0,
      paidAt: 0,
      my: 0,
      withdrawn: 0

    };

    this.Investors = this.Investors.bind(this);
    this.Link = this.Link.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.Link(),1*1000);

    setInterval(() => this.Investors(),2*1000);
  };

  async Link() {

    let mydireccion = await window.tronWeb.trx.getAccount();
      mydireccion = window.tronWeb.address.fromHex(mydireccion.address);

      var user = await Utils.contract.users(mydireccion).call();

    if( await Utils.contract.isUserExists(mydireccion).call() ){

      let loc = document.location.href;
      if(loc.indexOf('?')>0){
        loc = loc.split('?')[0]
      }
      

      mydireccion = loc+'?ref='+parseInt(user.id._hex);
      this.setState({
        link: mydireccion,
      });
    }else{
      this.setState({
        link: "Haz una inversión para obtener el LINK de referido",
      });
    }
  }
    

  async Investors() {

    var direccion = await window.tronWeb.trx.getAccount();
    var direccion = window.tronWeb.address.fromHex(direccion.address);

    var activeLevels = 0;

    var canasta = [];

    for (var i = 15; i >= 0; i--) {

      if (await Utils.contract.usersActiveX3Levels(direccion, i).call()) {
        activeLevels++ ;
        var matrix = await Utils.contract.usersX3Matrix(direccion, i).call();
        canasta[i] = (
          <div className="col-sm-4 single-services" key={"level"+i}>
            <h4 className="pt-30 pb-20">Nivel {i}</h4>
            <p>
              personas {matrix[1].length}| ciclos {parseInt(matrix[1].length/3)}
            </p>
          </div>);
      }


      
    }


 



    this.setState({
      canastas:canasta

    });

  };

  async withdraw(){
    var cosa = await Utils.contract.withdraw().send();
    console.log(cosa);
  };


  render() {
    var { balanceRef, totalRef, invested,  withdrawn , my, direccion, link} = this.state;

    var available = (balanceRef+my);
    available = available.toFixed(6);
    available = parseFloat(available);

    balanceRef = balanceRef.toFixed(6);
    balanceRef = parseFloat(balanceRef);

    totalRef = totalRef.toFixed(6);
    totalRef = parseFloat(totalRef);

    invested = invested.toFixed(6);
    invested = parseFloat(invested);

    withdrawn = withdrawn.toFixed(6);
    withdrawn = parseFloat(withdrawn);

    my = my.toFixed(6);
    my = parseFloat(my);

    return (

      <>

      <section className="loan-services spad">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="section-title">
                          <h2>My referral link:</h2>
                          <p>
                            <a style={{"color":"blue"}} href={link}>{link}</a> &nbsp;&nbsp;
                            <CopyToClipboard text={link}>
                              <button type="button" className="primary-btn">Copy</button>
                            </CopyToClipboard>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

            

          <div className="row">

            {this.state.canastas}
                    
          </div>

      </>
      
    );
  }
}
