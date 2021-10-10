import React from "react";
import classnames from 'classnames';


class Header extends React.Component { 

  render() {
    return (
      <header className="dashboard-header">

            <div className="dashboard-logo">
                <a className="site-logo" href="index.html">
                    <img src="images/TMC-blanco-verde.svg" height="100%" alt="Homepage"/>
                </a>
            </div>
            
       <div className="dashboard-profit">
          <p style={{fontSize:20,textAlign: "right"}} >{"100000"} TRX</p>
          <p style={{fontSize:18,textAlign: "right"}}>${"1000"}</p>
          </div>
            </header>
    );
  }
}

export default Header;
