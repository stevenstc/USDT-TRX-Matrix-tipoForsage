import React, { Component } from 'react';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import Affiliate from '../Affiliate';
import './Sidebar.css';
class Sidebar extends Component {

  state = {};

  render () {
    return (
      <div className="sidebar">
       <div className="text-left py-5 px-4 px-sm-4">
            <div>
              <div className="card-body">
              <div className="preview-item">
                <div className="preview-item-content d-sm-flex flex-grow">
                  <div className="flex-grow">
                    <h6 className="text-muted">My id</h6>
                    <p className="text-muted mb-0"></p>
                  </div>
                  <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                     <h4 className="text-muted mb-0">1df3g7ks6f6s</h4>
                  </div>
                </div>
              </div>
              <div className="preview-item">
                <div className="preview-item-content d-sm-flex flex-grow">
                  <div className="flex-grow">
                    <h6 className="text-muted">Upline id</h6>
                    <p className="text-muted mb-0"></p>
                  </div>
                  <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                     <h4 className="text-muted mb-0">1df3g7ks6f6s</h4>
                     
                    <CopyToClipboard text="1df3g7ks6f6s">
                      <i className="mdi mdi-compass icon-md"></i>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              <div className="preview-item">
                <div className="preview-item-content d-sm-flex flex-grow">
                  <div className="flex-grow">
                    <h6 className="text-muted">Wallet</h6>
                    <p className="text-muted mb-0">Connected</p>
                  </div>
                  <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                    <h4 className="text-muted mb-0">1df3g7ks6f6s</h4>
                    <CopyToClipboard text="1df3g7ks6f6s">
                      <i className="mdi mdi-compass icon-md"></i>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
                <div className="table-responsive">
                  <table className="table">                    
                    <tbody>                    
                      <tr>
                        <td> <h6 className="text-muted">My partners</h6></td>
                        <td></td>
                        <td></td>
                        <td><div className="mr-auto text-sm-right pt-2 pt-sm-0">
                    <p className="text-muted mb-0">23423432 TRX </p>
                  </div></td>
                      </tr>
                      <tr>
                        <td>
                    <h6 className="text-muted">l earned</h6></td>
                        <td></td>
                        <td></td>
                        <td><div className="mr-auto text-sm-right pt-2 pt-sm-0">
                    <h4 className="preview-subject">$ 23232</h4>
                    <p className="text-muted mb-0">23423432 TRX </p>
                  </div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>

        <div className="text-left py-5 px-4 px-sm-4">
            <Affiliate />
        </div>
        </div>
    );
  }
}

export default Sidebar;