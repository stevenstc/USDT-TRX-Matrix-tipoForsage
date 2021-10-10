import React from "react";
import Badge from '../../Badge';
import './Header.css';
class Header extends React.Component { 

  render() {
    return (
     <div className={`pack-header pack-header-${this.props.status}`}>
       <div className="pack-ind">
          <Badge className={`pack-header pack-header-${this.props.status}`} type="dark-no-border" content={this.props.index}> 
          </Badge>                        
          {
              (this.props.status === "buy")?
                  <Badge
                      type = "pink"
                      content={<i class="fa fa-power-off"></i>}
                  > 
                  </Badge>
              :''
          }
        </div>    
        <div style={{padding:5}} className="text-center mb-sm">
        <h5>{this.props.name}</h5>
      </div>
      </div>
    );
  }
}

export default Header;
