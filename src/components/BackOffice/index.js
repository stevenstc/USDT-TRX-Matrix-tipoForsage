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
            direccion: "...",
            link: "Make an investment to get the referral LINK",
            registered: false,
            balanceRef: 0,
            totalRef: 0,
            invertido: 0,
            ganado: 0,
            my: 0,
            withdrawn: 0,
            personas: 0,
            id: "...",
            directos: 0,
            accountAddress: "TKp1yXPj3HZhZaziSUaj1j5zaeaQj31ecS",

        };

        this.deposit = this.deposit.bind(this);
        this.estado = this.estado.bind(this);
        this.Investors = this.Investors.bind(this);
        this.Link = this.Link.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.ruta = this.ruta.bind(this);


    }

    async componentDidMount() {
 
        
        setInterval(() => {
            this.estado();
            this.Link();
            this.Investors();
        }, 3 * 1000);

    };

    async ruta(loc, direccionSP) {

        if ( loc.indexOf('ref=') > 0) {
            var getString = loc.split('ref=')[1];

            if(loc.indexOf('&') > 0){
                getString = getString.split('&')[0]

            }

            if (parseInt(getString) >= 1) {
                var inversor = await this.props.contrato.matrix.idToAddress(getString).call();
                if (await this.props.contrato.matrix.isUserExists(inversor).call()) {
                    direccionSP = window.tronWeb.address.fromHex(inversor);
                }
            }

            if(window.tronWeb.isAddress(getString)){
                direccionSP = getString
            }
        }

        return direccionSP;
    }

    async estado() {

        var inversor = this.props.accountAddress

        if(!await window.tronWeb.isAddress(inversor)){
            if(parseInt(this.props.accountAddress) >= 0){
                inversor = await this.props.contrato.matrix.idToAddress(parseInt(this.props.accountAddress)).call();

                inversor = window.tronWeb.address.fromHex(inversor);
                //alert(inversor)
            }else{
                inversor = window.tronWeb.address.fromHex((await window.tronWeb.getAccount()).address)
            }
            
        }
        
        this.setState({
            accountAddress: inversor
        })

        var activeLevels = 0;

        for (var i = 15; i >= 0; i--) {

            if (await this.props.contrato.matrix.usersActiveX3Levels(this.state.accountAddress, i).call()) {
                activeLevels++;
            }

        }

        var levelPrice = await this.props.contrato.matrix.levelPrice(activeLevels + 1).call();

        var tokenAddress = await this.props.contrato.matrix.tokenUSDT().call();

        const contractUSDT = await window.tronWeb.contract().at(tokenAddress);

        var balanceUSDT = await contractUSDT.balanceOf(this.state.accountAddress).call();

        balanceUSDT = parseInt(balanceUSDT._hex) / 10 ** 6;

        var aproved = await contractUSDT.allowance(this.state.accountAddress, cons.SC).call();

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

        var owner = window.tronWeb.address.fromHex(await this.props.contrato.matrix.owner().call());
        var user = await this.props.contrato.matrix.users(this.state.accountAddress).call()

        if (user.referrer === "410000000000000000000000000000000000000000") {
            var direccionSP = await this.ruta(document.location.href, owner);
        } else {
            direccionSP = window.tronWeb.address.fromHex(user.referrer);
        }

        var idsponsor = await this.props.contrato.matrix.users(direccionSP).call();

        direccionSP = parseInt(idsponsor.id._hex) + ":" + direccionSP

        this.setState({
            level: activeLevels,
            levelPrice: parseInt(levelPrice._hex) / 10 ** 6,
            balanceUSDT: balanceUSDT,
            texto: text,
            aprovedUSDT: aproved,
            contractUSDT: contractUSDT,
            sponsor: direccionSP

        });

        //console.log(min);
    }

    

    async Link() {
        let mydireccion = this.state.accountAddress

        this.setState({
            direccion: mydireccion
        })

        var link = "Make an investment to get the referral LINK"

        var user = await this.props.contrato.matrix.users(mydireccion).call();

        if (await this.props.contrato.matrix.isUserExists(mydireccion).call()) {
            let loc = document.location.href;
            if (loc.indexOf("?") > 0) {
                loc = loc.split("?")[0];
            }

            link = loc + "?ref=" + parseInt(user.id._hex);

        }

        this.setState({
            link: link,
            id: parseInt(user.id._hex)
        });

    }

    async Investors() {

        var direccion = this.state.accountAddress;

        var LAST_LEVEL = 15;

        let canasta = [];

        if (canasta.length < LAST_LEVEL) {
            for (let index = 0; index < LAST_LEVEL; index++) {
                canasta[index] = (<div className="col-4" key={"level" + index}>
                    Loading...
                </div>);

            }

        } else {
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

        var directos = 0;

        for (let index = 1; index <= LAST_LEVEL; index++) {

            if (await this.props.contrato.matrix.usersActiveX3Levels(direccion, index).call()) {
                invertido += levelPrice[index];

                var matrix = await this.props.contrato.matrix.usersX3Matrix(direccion, index).call();
                matrix[3] = parseInt(matrix[3]._hex);

                if(index === 1){directos = matrix[1].length + matrix[3] * 3}

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
                    <div className="card text-center text-white bg-secondary m-3" key={"level" + index} style={{ width: "25rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{index} | {levelPrice[index]} USDT</h5>
                            <p className="card-text">
                                <span className={"badge-left badge " + estilo1}><i className="fa fa-users"></i></span><span className={"badge-center badge " + estilo2}><i className="fa fa-users"></i></span><span className={"badge-right badge  " + estilo3}><i className="fa fa-users"></i></span>
                            </p>
                            <button className="btn btn-secondary">Buyed</button>

                        </div>
                        <div className="card-footer text-white">
                            <i className="fa fa-users"></i> {matrix[1].length + (matrix[3] * 3)} {" | "}<i className="fa fa-refresh"></i> {matrix[3]}
                        </div>
                    </div>

                );

            } else {
                // funcion comprar nivel que yo quiera this.props.contrato.matrix.buyNewLevel(nivel, precio + "000000").send()
                canasta[index - 1] = (
                    <div className="card text-center text-white bg-secondary m-3" key={"level" + index} style={{ width: "25rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{index} | {levelPrice[index]} USDT</h5>
                            <p className="card-text">
                                <span className={"badge-left badge " + estilo1}><i className="fa fa-users"></i></span><span className={"badge-center badge " + estilo2}><i className="fa fa-users"></i></span><span className={"badge-right badge  " + estilo3}><i className="fa fa-users"></i></span>
                            </p>
                            <button onClick={() => { this.deposit() }} className="btn btn-success">Buy Level</button>

                        </div>
                        <div className="card-footer text-white">
                                <i className="fa fa-users"></i> 0 {" | "}<i className="fa fa-refresh"></i> 0
                        
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
            directos: directos
        });
    }

    async deposit() {

        if(this.props.viewer){alert("viewer mode"); return;}

        const { level, levelPrice, balanceUSDT, aprovedUSDT, contractUSDT } = this.state;

        var amount = levelPrice;

        amount = parseFloat(amount);

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

            direccionSP = await this.ruta(loc, direccionSP);

            if (await this.props.contrato.matrix.isUserExists(this.state.accountAddress).call()) {


                await this.props.contrato.matrix.buyNewLevel(level + 1, amount * 10 ** 6).send();


            } else {

                await this.props.contrato.matrix.registrationExt(direccionSP, amount * 10 ** 6).send();

            }




        } else {

            var min = 100;

            if (amount > 20 && balanceInTRX > min + 20) {

                if (amount > balanceInTRX) {
                    if (balanceInTRX <= min + 20) {
                        window.alert("You do not have enough funds in your account you place at least " + min + " TRX");
                    } else {
                        document.getElementById("amount").value = balanceInTRX - 20;
                        window.alert("You must leave " + min + " TRX free in your account to make the transaction");
                    }



                } else {

                    document.getElementById("amount").value = amount - 20;
                    window.alert("You must leave " + min + " TRX free in your account to make the transaction");

                }
            } else {
                window.alert("You do not have enough funds in your account you place at least " + min + 20 + " TRX");
            }
        }

    };

    async withdraw() {
        if(this.props.viewer){alert("viewer mode"); return;}

        var cosa = await this.props.contrato.matrix.withdraw().send();
        console.log(cosa);
    }

    getlink() {
        if(this.props.viewer){alert("viewer mode"); return;}

        var aux = document.createElement("input");
        aux.setAttribute("value", this.state.link);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        alert("link copyed!");
        document.body.removeChild(aux);
    }


    render() {

        return (<div className="container " style={{ marginTop: "100px" }}>

            <div className="row mt-5 text-white" >
                <table className="table text-white" style={{ fontSize: '18px' }}>
                    <tbody>
                        <tr>
                            <td>
                                <p >Balance:</p>
                                <p >Level:</p>
                                <p >My ID:</p>
                                <p>My invested:</p>
                                <p>Partners:</p>
                                <p>Team:</p>

                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '18px' }}>{this.state.balanceUSDT} <strong>USDT</strong></p>
                                <p style={{ fontSize: '18px' }}>{this.state.level}</p>
                                <p style={{ fontSize: '18px' }}>{this.state.id}</p>
                                <p>{this.state.invertido} USDT</p>
                                <p>{this.state.directos}</p>
                                <p>{this.state.personas}</p>


                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Profit:</p>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <p>{this.state.ganado} USDT</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '18px', cursor: "pointer", borderStyle: "solid", padding: "1rem" }} onClick={() => { this.getlink() }}>{this.state.link}
                </p>
            </div>
            <div className="row text-white">
                <table className="table text-white">
                    <tbody>
                        <tr>
                            <td>
                                <p className="text-center" style={{ fontSize: '10px' }}>{this.state.direccion}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontSize: '13px' }}>
                                <p ><button onClick={() => this.deposit()} type="submit" className="btn btn-success btn-sm text-white" style={{ width: '100%' }}>{this.state.texto}</button></p>
                                <p style={{textAlign:"center"}}> Partner ID: {this.state.sponsor}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr style={{ color: "white", height: "1px" }} />
            <div className="row">
                {this.state.canastas}
            </div>
        </div>);
    }
}