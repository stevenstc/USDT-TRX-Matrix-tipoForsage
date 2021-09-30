import React, { Component } from 'react';

import Badge from '../Badge';
import Tree from '../Tree';
import Buy from '../Buy';
import './Card.css'
export class Card extends Component {
  render () {
    return ( 
            <div className={`pack pack-${this.props.status}`}> 
                <div className={`pack-header pack-header-${this.props.status}`}>
                   <div className="pack-ind">
                        <Badge
                            type = "dark-no-border"
                            content={this.props.index}
                        > 
                        </Badge>
                        {
                            (this.props.status === "buy")?
                                <Badge
                                    type = "pink"
                                    content="O"
                                > 
                                </Badge>
                            :''
                        }
  
                   </div>                              
                    {this.props.title}
                </div>
                <div className="pack-body">
                        {
                              ( this.props.branch !== 'undefined' &&  this.props.status === "enable")?
                                    <Tree
                                        branch = {this.props.branch}
                                    />
                                : <Buy status = {this.props.status} />
                        }  
                 
                </div>
                <div className="pack-footer">
                
                    {
                              (this.props.status === "enable")?
                                   
                       <div className="row">
                            <div className="col-md-5 d-flex align-items-center">
                                <div className="d-flex flex-row align-items-center">
                                <i className="mdi mdi-compass icon-md"></i>
                                 <p className="mb-0 ml-1"> 1 </p>
                                </div>
                            </div>
                            <div className="col-md-5 d-flex align-items-center">
                                <div className="d-flex flex-row align-items-center">
                                <i className="mdi mdi-compass icon-md"></i>
                                 <p className="mb-0 ml-1"> 1 </p>
                                </div>
                            </div>
                         </div> 
                                : ''
                    }
                </div>
            </div> 
    );
  }
}

export default Card;