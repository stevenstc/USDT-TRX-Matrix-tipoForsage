import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './affiliate.css'
export class Affiliate extends Component {
  render () {
    return ( 
            <div className="affiliate"> 
                <div className="affiliate-body">  
                <div className="text-left py-5 px-4 px-sm-4">                   
                  <h6 className="font-weight-light">My affiliate link</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="text" placeholder="My link" size="sm" className="h-auto" />
                    <CopyToClipboard text="1df3g7ks6f6s">
                      <i className="mdi mdi-compass icon-md"></i>
                    </CopyToClipboard>
                  </Form.Group>
                  <div className="mt-3">
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-success auth-form-btn">
                      Invite to Forsage
                    </button>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-success auth-form-btn">
                      Telegram tools
                    </button>
                  </div>
                </Form>
                </div>
                 </div>
            </div> 
    );
  }
}

export default Affiliate;