const proxy = "http://localhost:8080/";
const PRU = "shasta1.";// shasta1. para inhabilitar red de pruebas

var SC = "TDL7ZoYdhNa5DZzyHkggSQ4wv5PvJXdkCA";//contrato
var USDT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";//token USDT

const testnet = false;

if(testnet){

    SC = "TSZ679Wh1L8sG7VYcjfAEMLmWu7vV1aoTM"; // contrato en red de pruebas

    USDT = "TVF78ZDkPL2eJgUqs7pDusTgyMtw9WA4tq";// USDT en red de pruebas
}


export default {proxy, PRU, SC, USDT};
