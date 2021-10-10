import React, { Component } from "react";
import Sidebar from "react-sidebar";

export default class Header extends Component {
   constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  render() {

      return (
        <>
         <header className="s-header">

            <div className="header-logo">
                <a className="site-logo" href="index.html">
                    <img src="images/TMC-blanco-verde.svg" height="100%" alt="Homepage"/>
                </a>
            </div>
           <nav className="header-nav">

            <a href="#0" className="header-nav__close" title="close"><span>Close</span></a>

            <div className="header-nav__content">
                <h3>Navigation</h3>
                
                <ul className="header-nav__list">
                    <li className="current"><a className="smoothscroll"  href="#home" title="home">Home</a></li>
                    <li><a className="smoothscroll"  href="#about" title="about">BackOffice</a></li>
                    <li><a className="smoothscroll"  href="#services" title="services">ViewOffice</a></li>
                    <li><a className="smoothscroll"  href="#clients" title="clients">Faq</a></li>
                </ul>
    
                <ul className="header-nav__social">
                    <li>
                        <a href="#"><i className="fa fa-facebook"></i></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-instagram"></i></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-behance"></i></a>
                    </li>
                    <li>
                        <a href="#"><i className="fa fa-dribbble"></i></a>
                    </li>
                </ul>

            </div> 
        </nav>  
        <a className="header-menu-toggle" href="#0">
            <span className="header-menu-text">Menu</span>
            <span className="header-menu-icon"></span>
        </a>
            </header>   
        </>
      );
  }
}
