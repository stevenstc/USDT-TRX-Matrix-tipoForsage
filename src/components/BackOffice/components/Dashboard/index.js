import React, { Component } from 'react';
import Card from '../Card';

import './Dashboard.css'

let pack = [
    {
        "partner": "12",
        "value": "100",
        "status" : "enable",
        "branch" : {
          "left" : {
            "status" : "enable",
            "value": "200"
          },
          "center" : {
            "status" : "disabled",
            "value": "200"
          },
          "right" : {
            "status" : "disabled",
            "value": "200"
          }
        },
        "name": "100"
    },{
        "partner": "12",
        "value": "200",
        "status" : "enable",        
        "branch" : {
          "left" : {
            "status" : "enable",
            "value": "200"
          },
          "center" : {
            "status" : "enable",
            "value": "200"
          },
          "right" : {
            "status" : "disabled",
            "value": "200"
          }
        },
        "name": "200"
    },{
        "partner": "12",
        "value": "400",
        "status" : "enable",
        "branch" : {
          "left" : {
            "status" : "disabled",
            "value": "200"
          },
          "center" : {
            "status" : "disabled",
            "value": "200"
          },
          "right" : {
            "status" : "disabled",
            "value": "200"
          }
        },
        "name": "400"
    },{
        "partner": "12",
        "value": "800",
        "status" : "buy",
        "name": "800"
    }, {
        "partner": "12",
        "value": "100",
        "status" : "disabled",
        "name": "100"
    },{
        "partner": "12",
        "value": "200",
        "status" :"disabled",
        "name": "200"
    },{
        "partner": "12",
        "value": "400",
        "status" : "disabled",
        "name": "400"
    },{
        "partner": "12",
        "value": "800",
        "status" : "disabled",
        "name": "800"
    }
];
export class Dashboard extends Component {
  
  render () {
    return (
      <div className="dashboard">
        <div className="dashboard-body">            
            <div className="row">
              <div className="col-12">
                <div className="dashboard">
                   <div className="dashboard-body">  
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start 100%">
                        <a class="site-logo">
                            <img src={require('../../../../assets/images/TMC-blanco-verde.svg')} height="100%" className="gradient-corona-img img-fluid" alt="banner" />
                        </a>
                        </div>
                      </div>
                      <div className="col-9 col-sm-2 col-xl-2 pl-0 text-right">
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <h2 className="mb-0">32123 TRX</h2>
                          <h3 className="mb-0">$1138 </h3>
                        </div>
                      </div>
                    </div>  
                    <div className="row">
                     &nbsp;
                    </div>     
                    <div className="row">
                    {
                      pack.map((item, index) => (                        
                          <div className="col-xl-3 col-sm-2 grid-margin"> 
                            <Card
                                index = {index}
                                title = {item.name}
                                status = {item.status}
                                branch = {item.branch}
                            />
                            </div>
                      ))
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        
                <div className="dashboard-footer">
                 <div className="row">
                    <div className="col-md-5 d-flex align-items-center">
                      <div className="d-flex flex-row align-items-center">
                        <i className="mdi mdi-compass icon-md"></i>
                          <p> Recicle count </p>
                      </div>
                    </div>
                    <div className="col-md-5 d-flex align-items-center">
                      <div className="d-flex flex-row align-items-center">
                        <i className="mdi mdi-compass icon-md"></i>
                          <p> Number of partner in the slot </p>
                      </div>
                    </div>
                </div> 
          </div>
      </div>
    );
  }
}

export default Dashboard;