import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {

      texto: "Loading...",
      sponsor: "",
      level: "Loading...",
      levelPrice: 0,
      balanceUSDT: "Loading...",
      aprovedUSDT: 0,
      contractUSDT:{}
  

    };

    this.deposit = this.deposit.bind(this);
    this.estado = this.estado.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    this.estado();
    setInterval(() => this.estado(),1*1000);
  };

  async estado(){

    var accountAddress = await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);

    var activeLevels = 0;

    for (var i = 15; i >= 0; i--) {

      if (await Utils.contract.usersActiveX3Levels(accountAddress, i).call()) {
        activeLevels++ ;
      }
      
    }

    var levelPrice = await Utils.contract.levelPrice(activeLevels+1).call();

    var balanceUSDT = await Utils.contract.balanceOfUSDT(accountAddress).call();

    balanceUSDT = parseInt(balanceUSDT._hex)/10**6;

    var tokenAddress = await Utils.contract.tokenUSDT().call();

    const contractUSDT = await window.tronWeb.contract().at(tokenAddress);

    var aproved = await contractUSDT.allowance(accountAddress, contractAddress).call();

    console.log(aproved);

    aproved = parseInt(aproved._hex)/10**6;
    var text;
    if(aproved > 0){
      text = "Buy next level"
    }else{
      text = "Register"
    }

    this.setState({
      level: activeLevels,
      levelPrice: parseInt(levelPrice._hex)/10**6,
      balanceUSDT: balanceUSDT,
      texto: text,
      aprovedUSDT: aproved,
      contractUSDT: contractUSDT
    });

    //console.log(min);

    

  }


  async deposit() {


    const { level, levelPrice, balanceUSDT, aprovedUSDT, contractUSDT} = this.state;

    var amount = levelPrice;

    amount = parseFloat(amount);

    var accountAddress = await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);

    const balanceInSun = await window.tronWeb.trx.getBalance(); //number
    var balanceInTRX = window.tronWeb.fromSun(balanceInSun); //string
    balanceInTRX = parseFloat(balanceInTRX);//number

    console.log(balanceInTRX);
    console.log(amount);

    var owner = await Utils.contract.owner().call();

    var direccionSP = window.tronWeb.address.fromHex(owner);

    var aproved = aprovedUSDT;

    var LAST_LEVEL = await Utils.contract.LAST_LEVEL().call();

    if ( balanceInTRX >= 50 && aproved >= amount && balanceUSDT >= amount && level < LAST_LEVEL){

      var loc = document.location.href;
      if(loc.indexOf('?')>0){
          var getString = loc.split('?')[1];
          var GET = getString.split('&');
          var get = {};
          for(var i = 0, l = GET.length; i < l; i++){
              var tmp = GET[i].split('=');
              get[tmp[0]] = unescape(decodeURI(tmp[1]));
          }
          
          if (get['ref']) {
            tmp = get['ref'].split('#');

            var inversor = await Utils.contract.idToAddress(tmp[0]).call();

            if ( await Utils.contract.isUserExists(inversor).call() ) {

              direccionSP = window.tronWeb.address.fromHex(inversor);
            
            }
          }     
        }

        this.setState({
          sponsor: direccionSP
        });


        if ( await Utils.contract.isUserExists(accountAddress).call() ) {


          await Utils.contract.buyNewLevel(level+1, amount*10**6).send();


        }else{

          await Utils.contract.registrationExt(direccionSP, amount*10**6).send();

        }


        

    }else{

      console.log(aproved);

      if ( aproved <= 0 ) {
        await contractUSDT.approve(contractAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send();
      }
      
      if (amount > 200 && balanceInTRX > 250) {

        if ( amount > balanceInTRX) {
          if (balanceInTRX <= 50) {
            window.alert("You do not have enough funds in your account you place at least 250 TRX");
          }else{
            document.getElementById("amount").value = balanceInTRX-50;
            window.alert("You must leave 50 TRX free in your account to make the transaction");
          }
          
          

        }else{

          document.getElementById("amount").value = amount-50;
          window.alert("You must leave 50 TRX free in your account to make the transaction");
          
        }
      }else{
        window.alert("You do not have enough funds in your account you place at least 250 TRX");
      }
    }
    
  };


  render() {
    
    return (
      

        <div className="text-center">
          <h6>
            Balance: {this.state.balanceUSDT} <strong>USDT</strong><br />
          </h6>

          <h3>current level = {this.state.level}</h3>

            <button  onClick={() => this.deposit()} className="primary-btn">{this.state.texto}</button>
            <p>Price {this.state.levelPrice} USDT</p>
            <p>You must have ~ 30 TRX to make the transaction</p>
            
          
        </div>
      

    );
  }
}
