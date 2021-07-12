import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

import cons from "../../cons.js";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {

      min: 200,
      texto: "Register",
      sponsor: "",
      level: "Loading...",
      levelPrice: 0,
      balanceUSDT: "Loading..."
  

    };

    this.deposit = this.deposit.bind(this);
    this.estado = this.estado.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    this.estado();
    setInterval(() => this.estado(),3*1000);
  };

  async estado(){

    var accountAddress = await window.tronWeb.trx.getAccount();
    accountAddress = window.tronWeb.address.fromHex(accountAddress.address);


    var min = 20;

    var activeLevels = 0;

    for (var i = 15; i >= 0; i--) {

      if (await Utils.contract.usersActiveX3Levels(accountAddress, i).call()) {
        activeLevels++ ;
      }
      
    }

    var levelPrice = await Utils.contract.levelPrice(activeLevels+1).call();

    var contractTRC20 = await window.tronWeb.contract().at(cons.DT);

    var balanceUSDT = await contractTRC20.balanceOf(accountAddress).call();

    balanceUSDT = parseInt(balanceUSDT._hex)/10**6;

    this.setState({
      min: min,
      level: activeLevels,
      levelPrice: parseInt(levelPrice._hex)/10**6,
      balanceUSDT: balanceUSDT
    });

    //console.log(min);

    

  }


  async deposit() {


    const { min, level, levelPrice, balanceUSDT} = this.state;

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

    var contractTRC20 = await window.tronWeb.contract().at(cons.DT);

    var aproved = await contractTRC20.allowance(accountAddress, contractAddress).call();

    aproved = parseInt(aproved.remaining._hex)/10**6;



    if ( balanceInTRX >= 50 && aproved >= amount && balanceUSDT >= amount){

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


        if ( amount >= min){


          if ( await Utils.contract.isUserExists(accountAddress).call() ) {


            await Utils.contract.buyNewLevel(level+1, amount*10**6).send();


          }else{

            await Utils.contract.registrationExt(direccionSP, 2*amount*10**6).send();

          }

        }else{
          window.alert("Please enter an amount greater than 200 TRX");
        }

        

    }else{

      console.log(aproved);

      if ( aproved <= 0 ) {
        await contractTRC20.approve(contractAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send();
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

    var { min } = this.state;

    min = "Min. "+min+" TRX";


    
    return (
      

        <div className="text-center">
          <h6>
            Balance: {this.state.balanceUSDT} <strong>USDT</strong><br />
          </h6>

          <h3>current level = {this.state.level}</h3>

            <button  onClick={() => this.deposit()} className="primary-btn">Buy next level</button>
            <p>Price {this.state.levelPrice} USDT</p>
            <p>You must have ~ 50 TRX to make the transaction</p>
            
          
        </div>
      

    );
  }
}
