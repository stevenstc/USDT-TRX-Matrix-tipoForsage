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
    await this.Investors(true);
    setInterval(() => this.Investors(false),7*1000);
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
    

  async Investors(hacer) {

    var direccion = await window.tronWeb.trx.getAccount();
    var direccion = window.tronWeb.address.fromHex(direccion.address);

    var canasta = [];

    for (var i = 1; i <= 15; i++) {

      if (await Utils.contract.usersActiveX3Levels(direccion, i).call()) {

        var matrix = await Utils.contract.usersX3Matrix(direccion, i).call();
        canasta[i] = (
          <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+i}>
            <div className="choose__item">
                <img src={"img/choose/choose-"+i+".svg"} alt="" width="50%" />
                <h5>Level</h5>
                <p>Referers {matrix[1].length} <strong>|</strong> cycles {parseInt(matrix[1].length/3)}</p>
            </div>
          </div>
        );

      }else{

        canasta[i] = (
          <div className="col-lg-4 col-md-4 col-sm-6" key={"level"+i}>
            <div className="choose__item">
                <h5>Level {i} (Inactive) </h5>
            </div>
          </div>
        );

      }

      if(hacer){
        this.setState({
          canastas:canasta
    
        });

      }

      
    }


    if(!hacer){
      this.setState({
        canastas:canasta
  
      });

    }


 



    

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

          <div className="row">

            {this.state.canastas}
                    
          </div>

      </>
      
    );
  }
}
