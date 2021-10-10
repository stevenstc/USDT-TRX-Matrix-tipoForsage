import React from 'react';
import { Row, Col, Badge, Button} from 'reactstrap';
import classnames from 'classnames';

import Header from "./Header";
import Widget from "../Widget";

import s from './pack.css';

class Pack extends React.Component {
  render() {
    return (
    <>
    <Widget className={`widget-auth mx-auto pack pack-${this.props.status}`} title={<Header {...this.props}/>}>     
      <div className="pack-body">
       <Row className="mt"></Row>
      <Row className="mt">
      {
        ( this.props.branch !== 'undefined' &&  this.props.status === "enable")?
        <>
                                  <Badge className="badge-left" color={this.props.branch.left.status === 'enable' ? 'blue-light' : 'gray'}>
                                    <i className="fa fa-users" />
                                  </Badge>   
                                     <Badge className="badge-center" color={this.props.branch.center.status === 'enable' ? 'blue-light' : 'gray'}>
                                    <i className="fa fa-users" />
                                  </Badge>
                                     <Badge className="badge-right" color={this.props.branch.right.status === 'enable' ? 'blue-light' : 'gray'}>
                                    <i className="fa fa-users" />
                                  </Badge></>
                                : <>
                                      <p className="badge-center"><i className="fa fa-shopping-cart" /></p>
                                      <p className="badge-center badge-top"> { this.props.status === "buy" ? "Activate" : ''}&nbsp;</p>
                                 </>}  
      </Row>
      </div>
      <footer>
       {
                              ( this.props.branch !== 'undefined' &&  this.props.status === "enable")?
                              <>
                      <div
            color="transparent"
            className="btn-xs float-left py-0"
            id="load-parthers-btn"
          >
            <i className="fa fa-users" /> {"11"}
                      </div>
          <div
            color="transparent"
            className="btn-xs float-right py-0"
            id="load-notifications-btn"
          >
            <i className="fa fa-refresh" />  {"5"}
                      </div> </>: <></>
        }
      </footer>
    </Widget>
    </>
    );
  }
}

export default Pack;
