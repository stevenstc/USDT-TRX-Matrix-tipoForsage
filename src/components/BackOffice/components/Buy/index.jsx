import React,{Component} from 'react';

import './buy.css'

export class Buy extends Component {    
    render () {
        return (
                    <div className="row">       
                       <div className="col-md-4 d-flex align-items-center">
                            <div className="d-flex flex-row align-items-center">
                            <i className={`mdi mdi-account-box icon-md buy buy-${this.props.status}`}></i>
                            </div>
                        </div>    
                    </div>
        )
    }
}

export default Buy;
