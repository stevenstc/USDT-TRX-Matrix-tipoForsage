import React, { Component } from "react";
import Utils from "../../utils";
import contractAddress from "../Contract";

export default class EarnTron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalInvestors: 0,
      totalInvested: 0,
      totalRefRewards: 0
    };

    this.totalInvestors = this.totalInvestors.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    setInterval(() => this.totalInvestors(),1000);
  };

  async totalInvestors() {

    let esto = await Utils.contract.setstate().call();
    //console.log(esto);
    this.setState({
      totalInvestors: parseInt(esto.Investors._hex),
      totalInvested: parseInt(esto.Invested._hex)/1000000,
      totalRefRewards: parseInt(esto.RefRewards._hex)/1000000

    });

  };

  render() {
    const { totalInvestors, totalInvested, totalRefRewards } = this.state;

    return (
      <section id="stats" className="section-gap aboutus-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 single-services">
              <h1 className="pt-40 pb-30 text-white">{totalInvestors}</h1>
              <p>
                Global Investors
              </p>
            </div>
            <div className="col-lg-4 single-services">
              
              <h1 className="pt-40 pb-30 text-white">{totalInvested} TRX</h1>
              <p>
                Global Inverted
              </p>
            </div>
            <div className="col-lg-4 single-services">
              <h1 className="pt-40 pb-30 text-white">{totalRefRewards} TRX</h1>
              <p>
                Global Referral Rewards
              </p>
            </div>                        
          </div>
        </div>    
      </section>

    );
  }
}
