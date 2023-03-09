import React, { Component } from "react";

import cons from "../../cons"

export default class BackOffice extends Component {

    constructor(props) {
        super(props);

        this.state = {

            texto: "Loading...",
            sponsor: "",
            level: "Loading...",
            levelPrice: 0,
            balanceUSDT: "Loading...",
            aprovedUSDT: 0,
            contractUSDT: {},
            direccion: "",
            link: "Haz una inversión para obtener el LINK de referido",
            registered: false,
            balanceRef: 0,
            totalRef: 0,
            invertido: 0,
            ganado: 0,
            my: 0,
            withdrawn: 0,

        };

        this.deposit = this.deposit.bind(this);
        this.estado = this.estado.bind(this);
        this.Investors = this.Investors.bind(this);
        this.Link = this.Link.bind(this);
        this.withdraw = this.withdraw.bind(this);


    }

    async componentDidMount() {

        setInterval(async () => {
            await this.estado();
            await this.Link();
            await this.Investors();
        }, 3 * 1000);

    };

    async estado() {

        var accountAddress = window.tronWeb.defaultAddress.base58

        //console.log(accountAddress);

        var activeLevels = 0;

        for (var i = 15; i >= 0; i--) {

            if (await this.props.contrato.matrix.usersActiveX3Levels(accountAddress, i).call()) {
                activeLevels++;
            }

        }

        var levelPrice = await this.props.contrato.matrix.levelPrice(activeLevels + 1).call();

        var tokenAddress = await this.props.contrato.matrix.tokenUSDT().call();

        const contractUSDT = await window.tronWeb.contract().at(tokenAddress);

        var balanceUSDT = await contractUSDT.balanceOf(accountAddress).call();

        balanceUSDT = parseInt(balanceUSDT._hex) / 10 ** 6;

        var aproved = await contractUSDT.allowance(accountAddress, cons.SC).call();

        //console.log(aproved);

        if (aproved.remaining) {
            aproved = parseInt(aproved.remaining._hex) / 10 ** 6;

        } else {
            aproved = parseInt(aproved._hex) / 10 ** 6;

        }


        var text;
        if (aproved > 0) {
            if (activeLevels === 0) {
                text = "Register and buy the first level"
            } else {
                text = "Buy next level"
            }

        } else {
            text = "Link Wallet"
        }

        this.setState({
            level: activeLevels,
            levelPrice: parseInt(levelPrice._hex) / 10 ** 6,
            balanceUSDT: balanceUSDT,
            texto: text,
            aprovedUSDT: aproved,
            contractUSDT: contractUSDT
        });

        //console.log(min);
    }

    async deposit() {

        const { level, levelPrice, balanceUSDT, aprovedUSDT, contractUSDT } = this.state;

        var amount = levelPrice;

        amount = parseFloat(amount);

        var accountAddress = window.tronWeb.defaultAddress.base58;

        var balanceInTRX = await window.tronWeb.trx.getBalance(); //number
        balanceInTRX = balanceInTRX / 10 ** 6;

        var owner = await this.props.contrato.matrix.owner().call();

        var direccionSP = window.tronWeb.address.fromHex(owner);

        var aproved = aprovedUSDT;

        if (aproved <= 0) {
            await contractUSDT.approve(cons.SC, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send();
            return;
        }

        var LAST_LEVEL = await this.props.contrato.matrix.LAST_LEVEL().call();

        if (balanceInTRX >= 50 && aproved >= amount && balanceUSDT >= amount && level < LAST_LEVEL) {

            var loc = document.location.href;
            if (loc.indexOf('?') > 0) {
                var getString = loc.split('?')[1];
                var GET = getString.split('&');
                var get = {};
                for (var i = 0, l = GET.length; i < l; i++) {
                    var tmp = GET[i].split('=');
                    get[tmp[0]] = unescape(decodeURI(tmp[1]));
                }

                if (get['ref']) {
                    tmp = get['ref'].split('#');

                    var inversor = await this.props.contrato.matrix.idToAddress(tmp[0]).call();

                    if (await this.props.contrato.matrix.isUserExists(inversor).call()) {

                        direccionSP = window.tronWeb.address.fromHex(inversor);

                    }
                }
            }

            this.setState({
                sponsor: direccionSP
            });


            if (await this.props.contrato.matrix.isUserExists(accountAddress).call()) {


                await this.props.contrato.matrix.buyNewLevel(level + 1, amount * 10 ** 6).send();


            } else {

                await this.props.contrato.matrix.registrationExt(direccionSP, amount * 10 ** 6).send();

            }




        } else {

            var min = 100;

            if (amount > 20 && balanceInTRX > min+20) {

                if (amount > balanceInTRX) {
                    if (balanceInTRX <= min+20) {
                        window.alert("You do not have enough funds in your account you place at least "+min+" TRX");
                    } else {
                        document.getElementById("amount").value = balanceInTRX - 20;
                        window.alert("You must leave "+min+" TRX free in your account to make the transaction");
                    }



                } else {

                    document.getElementById("amount").value = amount - 20;
                    window.alert("You must leave "+min+" TRX free in your account to make the transaction");

                }
            } else {
                window.alert("You do not have enough funds in your account you place at least "+min+20+" TRX");
            }
        }

    };

    async Link() {
        let mydireccion = await window.tronWeb.trx.getAccount();
        //console.log(mydireccion);
        mydireccion = window.tronWeb.address.fromHex(mydireccion.address);

        var user = await this.props.contrato.matrix.users(mydireccion).call();

        if (await this.props.contrato.matrix.isUserExists(mydireccion).call()) {
            let loc = document.location.href;
            if (loc.indexOf("?") > 0) {
                loc = loc.split("?")[0];
            }

            mydireccion = loc + "?ref=" + parseInt(user.id._hex);
            this.setState({
                link: mydireccion,
            });
        } else {
            this.setState({
                link: "Haz una inversión para obtener el LINK de referido",
            });
        }
    }

    async Investors() {
        var direccion = await window.tronWeb.trx.getAccount();
        direccion = window.tronWeb.address.fromHex(direccion.address);

        var LAST_LEVEL = 15;

        let canasta = [];

        if(canasta.length < LAST_LEVEL){
            for (let index = 0; index < LAST_LEVEL; index++) {
                canasta[index] = (<div className="col-4" key={"level" + index}>
                    Loading...
                </div>);
                
            }
            
        }else{
            canasta = this.state.canastas
        }

        var invertido = 0;
        var personas = 0;
        var ganado = 0;

        var levelPrice = [];
        var ownerPrice = [];
        levelPrice[1] = 20;
        ownerPrice[1] = 0;
        ownerPrice[4] = 4;

        for (let i = 2; i <= LAST_LEVEL; i++) {
            levelPrice[i] = levelPrice[i - 1] * 2;
            if (i >= 5) {
                ownerPrice[i] = ownerPrice[i - 1] * 2;
            } else {
                if (i !== 4) {
                    ownerPrice[i] = 0;
                }
            }
        }

        //console.log(levelPrice);
        //console.log(ownerPrice);

        for (let index = 1; index <= LAST_LEVEL; index++) {

            let precio = levelPrice[index];
            let nivel = index;

            if (await this.props.contrato.matrix.usersActiveX3Levels(direccion, index).call()) {
                invertido += levelPrice[index];

                var matrix = await this.props.contrato.matrix.usersX3Matrix(direccion, index).call();
                matrix[3] = parseInt(matrix[3]._hex);

                personas += matrix[1].length + matrix[3] * 3;

                ganado += (matrix[1].length + matrix[3] * 3) * ownerPrice[index];

                var rango = matrix[1].length + ((matrix[3] * 3) % 3);
                var estilo1, estilo2, estilo3;
                switch (rango) {
                    case 1:
                        estilo1 = "badge-on";
                        estilo2 = "";
                        estilo3 = "";

                        break;
                    case 2:
                        estilo1 = "badge-on";
                        estilo2 = "badge-on";
                        estilo3 = "";

                        break;

                    case 0:
                        estilo1 = "badge-on";
                        estilo2 = "badge-on";
                        estilo3 = "badge-on";

                        break;

                    default:
                        break;
                }

                canasta[index - 1] = (
                    <div className="card text-center text-white bg-secondary mb-3" key={"level" + index}>
                        <div className="card-body">
                            <h5 className="card-title">{index} | {levelPrice[index]} TRX</h5>
                            <p className="card-text">
                                <span className={"badge-left badge " + estilo1}><i className="fa fa-users"></i></span><span className={"badge-center badge " + estilo2}><i className="fa fa-users"></i></span><span className={"badge-right badge  " + estilo3}><i className="fa fa-users"></i></span>
                            </p>
                            <a href="#" className="btn btn-secondary">Buyed</a>

                        </div>
                        <div class="card-footer text-muted">
                            <div color="transparent" className="btn-xs float-left py-0" id="load-parthers-btn"><i className="fa fa-users"></i> {matrix[1].length + (matrix[3] * 3)}</div>
                            <div color="transparent" className="btn-xs float-right py-0" id="load-notifications-btn"><i className="fa fa-refresh"></i> {matrix[3]}</div>
                        </div>
                    </div>

                );

            } else {
                canasta[index - 1] = (
                    <div className="card text-center text-white bg-secondary mb-3" key={"level" + index}>
                        <div className="card-body">
                            <h5 className="card-title">{index} | {levelPrice[index]} TRX</h5>
                            <p className="card-text">
                                    <span className={"badge-left badge " + estilo1}><i className="fa fa-users"></i></span><span className={"badge-center badge " + estilo2}><i className="fa fa-users"></i></span><span className={"badge-right badge  " + estilo3}><i className="fa fa-users"></i></span>
                            </p>
                            <a href="#" onClick={() => { this.props.contrato.matrix.buyNewLevel(nivel, precio + "000000").send() }} className="btn btn-success">Buy Level</a>

                        </div>
                        <div class="card-footer text-muted">
                            <div color="transparent" className="btn-xs float-left py-0" id="load-parthers-btn"><i className="fa fa-users"></i> 0</div>
                            <div color="transparent" className="btn-xs float-right py-0" id="load-notifications-btn"><i className="fa fa-refresh"></i> 0</div>
                        </div>
                    </div>

             
                );
            }

            this.setState({
                
            });
        }

        this.setState({
            invertido: invertido,
            ganado: ganado,
            personas: personas,
            canastas: canasta,
        });
    }

    async withdraw() {
        var cosa = await this.props.contrato.matrix.withdraw().send();
        console.log(cosa);
    }


    render() {

        return (<div className="container " style={{ marginTop: "100px" }}>

            <div className="row mt-5 text-white" >
                <table className="table text-white">
                    <tbody>
                        <tr>
                            <td>
                                <p style={{ fontSize: '18px' }}>Balance</p>
                                <p style={{ fontSize: '18px' }}>Level</p>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '18px' }}>{this.state.balanceUSDT} <strong>USDT</strong></p>
                                <p style={{ fontSize: '18px' }}>{this.state.level}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row text-white">
                <table className="table text-white">
                    <tbody>
                        <tr>
                            <td>
                                <p style={{ fontSize: '16px' }}><button onClick={() => this.deposit()} type="submit" className="btn btn-success btn-sm text-white" style={{ width: '100%' }}>{this.state.texto}</button></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style={{ fontSize: '16px' }}>Price {this.state.levelPrice} USDT</p>
                                <p style={{ fontSize: '16px' }}>You must have ~ 50 TRX to make the transaction</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="row text-white">
                <div className="col-xs-4">
                    <p className="fs-4">
                        Earned: {this.state.ganado} USDT
                    </p>
                </div>
                <div className="col-xs-4">
                    <p className="fs-4">
                    My invested:{this.state.invertido} USDT
                    </p>
                </div>
                <div className="col-xs-4">
                    <p className="fs-4">
                    People: {this.state.personas | 0}
                    </p>
                </div>
            </div>
            <hr style={{color:"white", height:"1px"}} />
            <div className="row">
                {this.state.canastas}
            </div>
            <div className="row">
                <div className="col-12 col-md-3">
                    <div color="transparent" className="btn-xs float-left py-0" id="load-notifications-btn" style={{
                        height: '45px',
                        maxHeight: '45px'
                    }}><i className="fa fa-refresh"></i> Recycle count</div>
                </div>
                <div className="col-12 col-md-3">
                    <div color="transparent" className="btn-xs float-left py-0" id="load-notifications-btn" style={{
                        height: '45px',
                        maxHeight: '45px'
                    }}><i className="fa fa-users"></i> Number partners in the
                        slot {this.state.personas}</div>
                </div>
            </div>
        </div>);
    }
}