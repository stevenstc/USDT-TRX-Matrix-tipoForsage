import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';


const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const logo = (
    <div className='col-sm-4 text-center'>
        <img src={ TronLinkLogo } className="img-fluid" alt='TronLink logo' />
    </div>
);

const openTronLink = () => {
    window.open(WEBSTORE_URL, '_blank');
};


const TronLinkGuide = props => {
    var {
        installed = false
    } = props;

    if(!installed) {
        return (
            <div className='container text-light ' style={{marginTop: "150px"}}>
                <div className='row ' onClick={ openTronLink } >
                    <div className='col'>
                        <h1>Install TronLink</h1>
                        <p>
                        To access this page you must install TronLink. TronLink is a TRON wallet for the browser, you can install it from the <a href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>Chrome Webstore</a>.
                             Once installed, go back and refresh the page.
                        </p>
                        { logo }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='container text-light '  style={{marginTop: "150px"}}>
            <div className='tronLink row ' >
                <div className='col'>
                    <h1>Unlock your wallet</h1>
                    <p>
                    TronLink is installed. Open TronLink from your browser bar if you haven't already set up your first wallet from scratch,
                         If you already have a wallet with funds, just unlock the wallet to use this page.
                    </p>
                    { logo }
                </div>
            </div>
        </div>
        
    );
};

export default TronLinkGuide;
