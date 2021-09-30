import React, { Component } from 'react';
import Branch from '../Branch';
import './Tree.css'
export class Tree extends Component {
  render () {
    return (  
            <div className="row"> 
            <Branch
                    status={this.props.branch.left.status}
                /> 
             <Branch
                    status={this.props.branch.center.status}
                /> 
            <Branch
                    status={this.props.branch.right.status}
                />
            </div>
    );
  }
}

export default Tree;