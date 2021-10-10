import React, { Component } from "react";

export default class Footer extends Component {
  
  render() {

      return (
        <>
            <footer>

                <div className="row footer-bottom">

                    <div className="col-twelve">
                        <div className="copyright">
                            <span>© Copyright 2021</span> 
                            <span>by <a href="https://www.themonopolyclub.com/">TMC</a></span>	
                        </div>

                        <div className="go-top">
                            <a className="smoothscroll" title="Back to Top" href="#top"><i className="icon-arrow-up" aria-hidden="true"></i></a>
                        </div>
                    </div>

                </div> 

            </footer> 
            <script src="js/jquery-3.2.1.min.js"></script>
            <script src="js/plugins.js"></script>
            <script src="js/main.js"></script>

        </>
      );
  }
}
