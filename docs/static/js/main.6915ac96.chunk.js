(this["webpackJsonpusdt-forsage"]=this["webpackJsonpusdt-forsage"]||[]).push([[0],{198:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(57),o=n.n(c),s=n(2),l=n.n(s),i=n(3),u=n(9),d=n(10),m=n(12),f=n(11),p=n(58),h=n.n(p),b={tronWeb:!1,contract:!1,setTronWeb:function(e){this.tronWeb=e},setContract:function(e,t){var n=this;return Object(i.a)(l.a.mark((function a(){return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.contract().at(t);case 2:n.contract=a.sent;case 3:case"end":return a.stop()}}),a)})))()}},v=n(8),w="TUKB7EPZUoctNde8gePW3zgsmnQaza3YrM",x=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={texto:"Loading...",sponsor:"",level:"Loading...",levelPrice:0,balanceUSDT:"Loading..."},a.deposit=a.deposit.bind(Object(v.a)(a)),a.estado=a.estado.bind(Object(v.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.setContract(window.tronWeb,w);case 2:this.estado(),setInterval((function(){return t.estado()}),1e3);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"estado",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,a,r,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.tronWeb.trx.getAccount();case 2:t=e.sent,t=window.tronWeb.address.fromHex(t.address),n=0,a=15;case 6:if(!(a>=0)){e.next=14;break}return e.next=9,b.contract.usersActiveX3Levels(t,a).call();case 9:if(!e.sent){e.next=11;break}n++;case 11:a--,e.next=6;break;case 14:return e.next=16,b.contract.levelPrice(n+1).call();case 16:return r=e.sent,e.next=19,b.contract.balanceOfUSDT(t).call();case 19:return c=e.sent,c=parseInt(c._hex)/Math.pow(10,6),e.next=23,b.contract.allowanceUSDT(t).call();case 23:o=e.sent,console.log(o),o=(o=parseInt(o._hex)/Math.pow(10,6))>0?"Buy next level":"Register",this.setState({level:n,levelPrice:parseInt(r._hex)/Math.pow(10,6),balanceUSDT:c,texto:o});case 28:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"deposit",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,a,r,c,o,s,i,u,d,m,f,p,h,v,w,x,g,E,k;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state,n=t.level,a=t.levelPrice,r=t.balanceUSDT,c=a,c=parseFloat(c),e.next=5,window.tronWeb.trx.getAccount();case 5:return o=e.sent,o=window.tronWeb.address.fromHex(o.address),e.next=9,window.tronWeb.trx.getBalance();case 9:return s=e.sent,i=window.tronWeb.fromSun(s),i=parseFloat(i),console.log(i),console.log(c),e.next=16,b.contract.owner().call();case 16:return u=e.sent,d=window.tronWeb.address.fromHex(u),e.next=20,b.contract.allowanceUSDT(o).call();case 20:return m=e.sent,m=parseInt(m._hex)/Math.pow(10,6),e.next=24,b.contract.LAST_LEVEL().call();case 24:if(f=e.sent,!(i>=50&&m>=c&&r>=c&&n<f)){e.next=53;break}if(!((p=document.location.href).indexOf("?")>0)){e.next=41;break}for(h=p.split("?")[1],v=h.split("&"),w={},x=0,g=v.length;x<g;x++)E=v[x].split("="),w[E[0]]=unescape(decodeURI(E[1]));if(!w.ref){e.next=41;break}return E=w.ref.split("#"),e.next=36,b.contract.idToAddress(E[0]).call();case 36:return k=e.sent,e.next=39,b.contract.isUserExists(k).call();case 39:if(!e.sent){e.next=41;break}d=window.tronWeb.address.fromHex(k);case 41:return this.setState({sponsor:d}),e.next=44,b.contract.isUserExists(o).call();case 44:if(!e.sent){e.next=49;break}return e.next=47,b.contract.buyNewLevel(n+1,c*Math.pow(10,6)).send();case 47:e.next=51;break;case 49:return e.next=51,b.contract.registrationExt(d,c*Math.pow(10,6)).send();case 51:e.next=58;break;case 53:if(console.log(m),!(m<=0)){e.next=57;break}return e.next=57,b.contract.approveUSDT().send();case 57:c>200&&i>250?c>i?i<=50?window.alert("You do not have enough funds in your account you place at least 250 TRX"):(document.getElementById("amount").value=i-50,window.alert("You must leave 50 TRX free in your account to make the transaction")):(document.getElementById("amount").value=c-50,window.alert("You must leave 50 TRX free in your account to make the transaction")):window.alert("You do not have enough funds in your account you place at least 250 TRX");case 58:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"text-center"},r.a.createElement("h6",null,"Balance: ",this.state.balanceUSDT," ",r.a.createElement("strong",null,"USDT"),r.a.createElement("br",null)),r.a.createElement("h3",null,"current level = ",this.state.level),r.a.createElement("button",{onClick:function(){return e.deposit()},className:"primary-btn"},this.state.texto),r.a.createElement("p",null,"Price ",this.state.levelPrice," USDT"),r.a.createElement("p",null,"You must have ~ 30 TRX to make the transaction"))}}]),n}(a.Component),g=n(59),E=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={direccion:"",link:"Haz una inversi\xf3n para obtener el LINK de referido",registered:!1,balanceRef:0,totalRef:0,invested:0,paidAt:0,my:0,withdrawn:0},a.Investors=a.Investors.bind(Object(v.a)(a)),a.Link=a.Link.bind(Object(v.a)(a)),a.withdraw=a.withdraw.bind(Object(v.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.setContract(window.tronWeb,w);case 2:setInterval((function(){return t.Link()}),1e3),setInterval((function(){return t.Investors()}),7e3);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"Link",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.tronWeb.trx.getAccount();case 2:return t=e.sent,t=window.tronWeb.address.fromHex(t.address),e.next=6,b.contract.users(t).call();case 6:return n=e.sent,e.next=9,b.contract.isUserExists(t).call();case 9:if(!e.sent){e.next=16;break}(a=document.location.href).indexOf("?")>0&&(a=a.split("?")[0]),t=a+"?ref="+parseInt(n.id._hex),this.setState({link:t}),e.next=17;break;case 16:this.setState({link:"Haz una inversi\xf3n para obtener el LINK de referido"});case 17:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"Investors",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,a,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.tronWeb.trx.getAccount();case 2:t=e.sent,t=window.tronWeb.address.fromHex(t.address),n=[],a=1;case 6:if(!(a<=15)){e.next=20;break}return e.next=9,b.contract.usersActiveX3Levels(t,a).call();case 9:if(!e.sent){e.next=16;break}return e.next=12,b.contract.usersX3Matrix(t,a).call();case 12:c=e.sent,n[a]=r.a.createElement("div",{className:"col-lg-4 col-md-4 col-sm-6",key:"level"+a},r.a.createElement("div",{className:"choose__item"},r.a.createElement("img",{src:"img/choose/choose-"+a+".svg",alt:"",width:"50%"}),r.a.createElement("h5",null,"Level"),r.a.createElement("p",null,"Referers ",c[1].length," ",r.a.createElement("strong",null,"|")," cycles ",parseInt(c[1].length/3)))),e.next=17;break;case 16:n[a]=r.a.createElement("div",{className:"col-lg-4 col-md-4 col-sm-6",key:"level"+a},r.a.createElement("div",{className:"choose__item"},r.a.createElement("h5",null,"Level ",a," (Inactive) ")));case 17:a++,e.next=6;break;case 20:this.setState({canastas:n});case 21:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"withdraw",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.contract.withdraw().send();case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.balanceRef,n=e.totalRef,a=e.invested,c=e.withdrawn,o=e.my,s=(e.direccion,e.link),l=t+o;return l=l.toFixed(6),l=parseFloat(l),t=t.toFixed(6),t=parseFloat(t),n=n.toFixed(6),n=parseFloat(n),a=a.toFixed(6),a=parseFloat(a),c=c.toFixed(6),c=parseFloat(c),o=o.toFixed(6),o=parseFloat(o),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12"},r.a.createElement("div",{className:"section-title"},r.a.createElement("h2",null,"My referral link:"),r.a.createElement("p",null,r.a.createElement("a",{style:{color:"blue"},href:s},s)," \xa0\xa0",r.a.createElement(g.CopyToClipboard,{text:s},r.a.createElement("button",{type:"button",className:"primary-btn"},"Copy")))))),r.a.createElement("div",{className:"row"},this.state.canastas))}}]),n}(a.Component),k=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={accountAddress:"Billetera NO conectada",accountBalance:"Billetera NO conectada",accountBandwidth:"Billetera NO conectada"},a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;setInterval((function(){return e.fetchAccountAddress()}),1e3),setInterval((function(){return e.fetchAccountBalance()}),1e3),setInterval((function(){return e.fetchAccountBandwidth()}),1e3)}},{key:"fetchAccountAddress",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t,n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.tronWeb.trx.getAccount();case 2:t=e.sent,n=t.address,a=window.tronWeb.address.fromHex(n),this.setState({accountAddress:a});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fetchAccountBalance",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.tronWeb.trx.getBalance();case 2:t=e.sent,n=window.tronWeb.fromSun(t),this.setState({accountBalance:n});case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fetchAccountBandwidth",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.tronWeb.trx.getBandwidth();case 2:t=e.sent,this.setState({accountBandwidth:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.accountAddress,n=e.accountBalance;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Wallet Conected:"),r.a.createElement("p",null,r.a.createElement("strong",null,t),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("strong",null,"Balance:"),r.a.createElement("br",null),n," ",r.a.createElement("strong",null,"TRX"),r.a.createElement("br",null)))}}]),n}(a.Component),y=n(60),W=n.n(y),O="https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/",N=r.a.createElement("div",{className:"col-sm-4 text-center"},r.a.createElement("img",{src:W.a,className:"img-fluid",alt:"TronLink logo"})),j=function(){window.open(O,"_blank")},I=function(e){var t=e.installed;return void 0!==t&&t?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"tronLink row",onClick:j,style:{padding:"3em"}},r.a.createElement("div",{className:"info col-sm-8"},r.a.createElement("h1",null,"Log in Required"),r.a.createElement("p",null,"TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your first wallet or decrypt a previously created wallet.")),N)):r.a.createElement("div",{className:"row",onClick:j},r.a.createElement("div",{className:"col-sm-8"},r.a.createElement("h1",null,"TronLink Required"),r.a.createElement("p",null,"To create a post or tip others you must install TronLink. TronLink is a TRON wallet for the browser that can be ",r.a.createElement("a",{href:O,target:"_blank",rel:"noopener noreferrer"},"installed from the Chrome Webstore"),". Once installed, return back and refresh the page.")),N)},T=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={tronWeb:{installed:!1,loggedIn:!1}},a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(i.a)(l.a.mark((function e(){var t=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){var n={installed:!!window.tronWeb,loggedIn:window.tronWeb&&window.tronWeb.ready};if(n.installed)return t.setState({tronWeb:n}),e();var a=0,r=setInterval((function(){if(a>=10){return window.tronWeb=new h.a("https://api.trongrid.io","https://api.trongrid.io","https://api.trongrid.io"),t.setState({tronWeb:{installed:!1,loggedIn:!1}}),clearInterval(r),e()}if(n.installed=!!window.tronWeb,n.loggedIn=window.tronWeb&&window.tronWeb.ready,!n.installed)return a++;t.setState({tronWeb:n}),e()}),100)}));case 2:this.state.tronWeb.loggedIn||(window.tronWeb.defaultAddress={hex:window.tronWeb.address.toHex("TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg"),base58:"TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg"},window.tronWeb.on("addressChange",(function(){t.state.tronWeb.loggedIn||t.setState({tronWeb:{installed:!0,loggedIn:!0}})}))),b.setTronWeb(window.tronWeb);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.tronWeb.installed?this.state.tronWeb.loggedIn?r.a.createElement(r.a.Fragment,null,r.a.createElement("section",{className:"hero set-bg","data-setbg":"img/hero-bg.jpg",style:{backgroundImage:"url('img/hero-bg.jpg')"}},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-5"},r.a.createElement("div",{className:"hero__text"},r.a.createElement(k,null))),r.a.createElement("div",{className:"col-lg-5 offset-lg-2"},r.a.createElement("div",{className:"hero__form"},r.a.createElement(x,null)))))),r.a.createElement("section",{className:"choose spad"},r.a.createElement("div",{className:"container"},r.a.createElement(E,null)))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement(I,{installed:!0}))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"container"},r.a.createElement(I,null)))}}]),n}(a.Component),S=document.getElementById("root");o.a.render(r.a.createElement(T,null),S)},60:function(e,t,n){e.exports=n.p+"static/media/TronLinkLogo.d3a8f115.png"},61:function(e,t,n){e.exports=n(198)},90:function(e,t){},91:function(e,t){}},[[61,1,2]]]);
//# sourceMappingURL=main.6915ac96.chunk.js.map