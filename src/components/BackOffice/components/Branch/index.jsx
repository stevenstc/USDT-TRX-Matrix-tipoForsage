import React,{Component} from 'react';

import './branch.css'

export class Branch extends Component {   
   render () {
        return (
            <div className="col-md-4 d-flex align-items-center">
                <div className="d-flex flex-row align-items-center">
                  <i className={`mdi icon-md branch branch-${this.props.status}`}></i>
                </div>
            </div>
        )
  }
}

export default Branch
/*


            <div className={`branch branch-${this.props.status}`}>
                <span >
                    <i className="mdi mdi-account-box"></i>
                </span>
            </div>*/