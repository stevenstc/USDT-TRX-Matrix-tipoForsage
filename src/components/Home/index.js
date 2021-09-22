import React, { Component } from "react";

export default class Home extends Component {
  
  render() {

      return (
        <>
          <div>
            <section id="home" className="s-home target-section" data-parallax="scroll" data-image-src="images/hero-bg.jpg" data-natural-width="3000" data-natural-height="2000" data-position-y="center">

              <div className="overlay"></div>
              <div className="shadow-overlay"></div>

              <div className="home-content">

                  <div className="row home-content__main">

                      <h1>
                          #1 BlockChain decentralized USDT ecosystem
                      </h1>

                      <div className="home-content__buttons">
                          <a href="/?viewOffice" className="smoothscroll btn btn--stroke">
                              View Demo
                          </a>
                          <a href="/?backoffice" className="smoothscroll btn btn--stroke">
                              Login
                          </a>
                      </div>

                  </div>

                  <div className="home-content__scroll">
                      <a href="#about" className="scroll-link smoothscroll">
                          <span>Scroll Down</span>
                      </a>
                  </div>

                  <div className="home-content__line"></div>

              </div> 

              <ul className="home-social">
                  <li>
                      <a href="#0"><i className="fa fa-facebook" aria-hidden="true"></i><span>Facebook</span></a>
                  </li>
                  <li>
                      <a href="#0"><i className="fa fa-twitter" aria-hidden="true"></i><span>Twiiter</span></a>
                  </li>
                  <li>
                      <a href="#0"><i className="fa fa-instagram" aria-hidden="true"></i><span>Instagram</span></a>
                  </li>
                  <li>
                      <a href="#0"><i className="fa fa-behance" aria-hidden="true"></i><span>Behance</span></a>
                  </li>
                  <li>
                      <a href="#0"><i className="fa fa-dribbble" aria-hidden="true"></i><span>Dribbble</span></a>
                  </li>
              </ul> 


            </section>

            <section id='about' className="s-about">

            <div className="row about-desc" data-aos="fade-up">
                <div className="col-full">
                    <p>
                        Crowdfunding Global Decentralized Platform Based On Smart Contract’s Technology Connects People To Directly Engage In Personal And Business Transactions.
                    </p>
                </div>
            </div> 

            <div className="row about-stats stats block-1-4 block-m-1-2 block-mob-full" data-aos="fade-up">
                    
                <div className="col-block stats__col ">
                    <div className="stats__count">1505</div>
                    <h5>All participants</h5>
                </div>
                <div className="col-block stats__col">
                    <div className="stats__count">127</div>
                    <h5>Joined in 24H</h5>
                </div>
                <div className="col-block stats__col">
                    <div className="stats__count">109</div>
                    <h5>USDT <br/>Member results</h5>
                </div>
                <div className="col-block stats__col">
                    <div className="stats__count">102</div>
                    <h5>USDT <br/>Results in 24H</h5> 
                </div>

            </div> 

            <div className="about__line"></div>

            </section> 

            <section id='services' className="s-services">

            <div className="row section-header has-bottom-sep" data-aos="fade-up">
                <div className="col-full">
                    <h3 className="subhead">Now</h3>
                    <h1 className="display-2">The Next Generation Defi Ecosystem</h1>
                </div>
            </div> 

            <div className="row services-list block-1-2 block-tab-full">

                <div className="col-block service-item" data-aos="fade-up">
                    <div className="service-icon">
                        <i className="icon-paint-brush"></i>
                    </div>
                    <div className="service-text">
                        <h3 className="h2">Immutability</h3>
                        <p>Blockchain secures the algorithm, therefore nobody, even the creators or developers, can change, cancel, stop, or alter your transactions.
                        </p>
                    </div>
                </div>

                <div className="col-block service-item" data-aos="fade-up">
                    <div className="service-icon">
                        <i className="icon-group"></i>
                    </div>
                    <div className="service-text">
                        <h3 className="h2">Automatic</h3>
                        <p>All transactions between the community members are executed directly from one personal wallet to another. There are no accounts to withdraw from, THEMONOPOLYCLUB does not store your funds.
                        </p>
                    </div>
                </div>

                <div className="col-block service-item" data-aos="fade-up">
                    <div className="service-icon">
                        <i className="icon-megaphone"></i>
                    </div>  
                    <div className="service-text">
                        <h3 className="h2">Autonomus</h3>
                        <p>The ecosystem is built on the smart contract technology that is completely autonomous, which excludes any human factor.
                        </p>
                    </div>
                </div>

                <div className="col-block service-item" data-aos="fade-up">
                    <div className="service-icon">
                        <i className="icon-earth"></i>
                    </div>
                    <div className="service-text">
                        <h3 className="h2">Transparent an decentralized</h3>
                        <p>The smart contract code is open, and anyone anytime can observe the entire transaction history. There are no managers or admins at the head, the creators are the same platform participants like everyone else.
                        </p>
                    </div>
                </div>

            </div> 

            </section> 

            <section id="clients" className="s-clients">

            <div className="row section-header" data-aos="fade-up">
                <div className="col-full">
                    <h3 className="subhead">FAQ</h3>
                    <h1 className="display-2">FREQUENTLY ASKED QUESTIONS</h1>
                </div>
            </div> 

            <div className="row clients-testimonials" data-aos="fade-up">
                <div className="col-full">

                        <div className="testimonials__slide">
                            <details close>
                            <summary>What is THE MONOPOLY CLUB?</summary>

                            <div className="faq__content">
                                <p>THE MONOPOLY CLUB is a Global Decentralized Community and the first USDT marketing matrix in history with immediate reward distribution built on Tron blockchain smart contract, which makes it fully decentralized, transparent, secure and unstoppable.</p>
                            </div>
                        </details>
                        </div>

                        <div className="testimonials__slide">
                            <details close>
                            <summary>How long is THE MONOPOLY CLUB going to work?</summary>

                            <div className="faq__content">
                                <p>THE MONOPOLY CLUB is associated with blockchain will keep working forever. As it is a decentralized system, it is not abided by the rules and regulations set by any government body and cannot be hacked or shut down. It will remain in the Blockchain forever.</p>
                            </div>
                        </details>
                        </div>   
                        <div className="testimonials__slide">
                            <details close>
                            <summary>Are Smart Contracts Legal in My Country?</summary>

                            <div className="faq__content">
                                <p>The smart contract does not depend on the site, it works on a blockchain that cannot be blocked. TheMonopolyClub does not fall under the legal laws and regulations of any of the countries in the world, it can not be illegal, unless, it will be done specifically for the purpose of attempting to discredit or take under control manually. Smart Contracts are like Bitcoin or NFT, they are not illegal, but also not legal.</p>
                            <p>The Monopoly Club is a DeFi Ecosystem and all this is aimed at development, realization of dreams of thousands of people, helping people, transparency, security and decentralization.
                                The Monopoly Club has only good goals, given new technologies that do not depend on governments and banks.
                                </p>
                            </div>
                        </details>
                        </div>           
                        <div className="testimonials__slide">
                            <details close>
                            <summary>Why THE MONOPOLY CLUB is Not a Pyramid?</summary>

                            <div className="faq__content">
                                <p>Firstly, in a Pyramid scheme, old participants get paid with the money from new participants. Sooner or later the scheme operator decides to pull it to keep their profits. It’s mathematically impossible for this scheme to go on forever anyway.</p>
                            <p>Secondly, a Ponzi scheme is always centralized! Every pyramid has an operator who can push the button to stop payouts and claim all the money. Once that happens, the pyramid is done.</p>
                            <p>THE MONOPOLY CLUB doesn’t have a single thing in common with the scheme above:      </p>
                            <p>All transactions are made between users: from wallet to wallet.
                                The smart contract balance is always zero.
                                THE MONOPOLY CLUB doesn’t have an administrator who could terminate the project.
                                THE MONOPOLY CLUB is 100% decentralized.
                                To stop the platform, no one can, because it’s functioning is ensured by a smart contract that cannot be deleted or changed.
                                </p>
                            </div>
                        </details>
                        </div>  
                        <div className="testimonials__slide">
                            <details close>
                            <summary>Do I Need to Withdraw Money from THE MONOPOLY CLUB?</summary>

                            <div className="faq__content">
                                <p>THE MONOPOLY CLUB does not retain any funds, Your income arrives instantly into your personal wallet directly from your partners. Only you have access to your wallet and no one else can manage your money.</p>
                            </div>
                        </details>
                        </div>
                        <div className="testimonials__slide">
                            <details close>
                            <summary>Is THE MONOPOLY CLUB a Company?</summary>

                            <div className="faq__content">
                                <p>THE MONOPOLY CLUB is NOT a company (especially an investment company) that is managed by a CEO and a board of management, where you can bring a complaint against the system that fails to live up to expectations. In reality, it is a self-executing smart contract instructed to carry out sequences of arithmetic, logical or Pre-determined operations automatically via computer programming in order to serve a specific purpose. As such, there is no middleman or intermediary involved to issue the refund for the initial expense. Just like when you buy an NFT, you cannot get your funds back because the transaction cannot be reversed and when you make the purchase you are agreeing to buy an NFT.</p>
                            </div>
                        </details>
                        </div>
                        <div className="testimonials__slide">
                            <details close>
                            <summary>Who Created THE MONOPOLY CLUB?</summary>

                            <div className="faq__content">
                                <p>The idea of THE MONOPOLY CLUB belongs to a group of crypto enthusiasts, who are also participants in the community and have no special privileges.</p>
                            </div>
                        </details>
                        </div>
                        
                        <div className="testimonials__slide">
                            <details close>
                            <summary>Who Manages The Platform?</summary>

                            <div className="faq__content">
                                <p>THE MONOPOLY CLUB platform doesn’t have a manager. The smart contract works on the Tron Blockchain. This means that the platform is fully decentralized(it has no leaders or admins).</p>
                            </div>
                        </details>
                        </div>
                        <div className="testimonials__slide">
                            <details close>
                            <summary>Is THE MONOPOLY CLUB Legal or illegal?</summary>

                            <div className="faq__content">
                                <p>To put it simply, itʼs neither legal nor illegal. This is because THE MONOPOLY CLUB does not need to be regulated or be approved to operate online, since it is free from government control due to its decentralized nature. Fact is, it is not a corporate entity or company. It does not do business transactions between parties, like an MLM company would.</p>
                                <p>THE MONOPOLY CLUB is a system built on pre defined codes deployed by the developers on a blockchain network, we know this as smart contract.</p>
                            </div>
                            </details>
                        </div>
                        <div className="testimonials__slide">
                            <details close>
                                <summary>Can I Join THE MONOPOLY CLUB in My Country?</summary>
                                <div className="faq__content">
                                    <p>Absolutely, THE MONOPOLY CLUB is international and you can join from all the countries in the world, you just need a mobile device, tablet or laptop and internet connection.</p>
                                </div>
                              </details>
                        </div>
                    
                    
                </div> 
            </div> 
            </section> 
            
          </div>

        </>
      );
  }
}
