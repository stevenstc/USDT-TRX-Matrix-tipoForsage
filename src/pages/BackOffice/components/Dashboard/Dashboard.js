import React from "react";
import { Row, Col, Button} from 'reactstrap';

import classnames from 'classnames';
import Pack from "../Pack";
import Widget from "../Widget";
import Header from './Header';

import s from "./Dashboard.module.scss";


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
class Dashboard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
  }

  render() {
    return (
      <div className={s.root}>        
        <Widget title={<Header/>} collapse close="">
        <Row>
        {
          pack.map((item, index) => (      
            <Col lg={2} xl={3} xs={12}>
              <Pack index={++index} {...item}/>
            </Col>
          ))
        }
        </Row>
        <footer className={[s.cardFooter, 'text-sm', 'card-footer'].join(' ')} style={{height: '50px',maxHeight: '50px'}}>
        <Row className="mt">
                  <Col md={3} xs={12}>
                  <div
           color="transparent"
            className="btn-xs float-left py-0"
            id="load-notifications-btn"  style={{height: '45px',maxHeight: '45px'}}
          >
            <i className="fa fa-refresh" /> Recycle count
                      </div>
                    </Col>
                    <Col md={3} xs={12}>
                    <div
             color="transparent"
             className="btn-xs float-left py-0"
            id="load-notifications-btn"   style={{height: '45px',maxHeight: '45px'}}
          >
            <i className="fa fa-users" /> Number partners in the slot
                      </div>
                    </Col>
       </Row>
        </footer>
        </Widget>
      </div>
    );
  }
}

export default Dashboard;
