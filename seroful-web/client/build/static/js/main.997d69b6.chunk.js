(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{35:function(e,t,a){e.exports=a.p+"static/media/molecule.12ccad98.png"},56:function(e,t,a){e.exports=a(72)},67:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(7),l=a.n(o),c=a(5),i=a(106),u=a(103),s=a(105),m=a(49),g=a.n(m),d=a(12),f=Object(d.b)({key:"emailState",default:""}),b=Object(d.b)({key:"pwState",default:""}),p=a(35),h=a.n(p),E=a(100),v=Object(E.a)((function(e){return{loginDiv:{textAlign:"center"},seroful:{fontFamily:"Happy Monkey",color:"#21a3fc",fontSize:"56px",fontWeight:"bold",fontStyle:"italic"},images:{height:350,width:350},button1:{backgroundImage:"linear-gradient(90deg, rgba(33,163,252,1) 0%, rgba(75,110,198,1) 51%, rgba(31,122,204,1) 100%)",width:"9.5%",marginTop:".5%",marginRight:"1%"},button2:{backgroundImage:"linear-gradient(90deg, rgba(75,110,198,1) 0%, rgba(31,122,204,1) 51%, rgba(33,163,252,1) 100%)",marginTop:".5%",width:"9.5%"},email:{width:"20%"},password:{width:"20%"}}})),w=function(e){var t=v(),a=Object(n.useState)(!1),o=Object(c.a)(a,2),l=o[0],m=o[1],p=Object(d.c)(f),E=Object(c.a)(p,2),w=(E[0],E[1]),O=Object(d.c)(b),j=Object(c.a)(O,2),k=(j[0],j[1]);return r.a.createElement(r.a.Fragment,null,l?r.a.createElement("div",{className:t.loginDiv},r.a.createElement(u.a,{className:t.seroful,variant:"h3"},"Seroful"),r.a.createElement("img",{className:t.images,src:h.a,alt:"molecule.png"}),r.a.createElement("form",{noValidate:!0,autoComplete:"off"},r.a.createElement(s.a,{label:"Email",variant:"outlined",className:t.email,onBlur:function(e){return w((function(t){return e.target.value}))}}),r.a.createElement("br",null),r.a.createElement(s.a,{label:"Password",type:"password",variant:"outlined",className:t.password,onBlur:function(e){return k((function(t){return e.target.value}))}}),r.a.createElement("br",null),r.a.createElement(i.a,{variant:"contained",className:t.button1,onClick:function(){return m(!1)},startIcon:r.a.createElement(g.a,null)},"Back to Login"),r.a.createElement(i.a,{variant:"contained",className:t.button2,onClick:e.register},"Register"))):r.a.createElement("div",{className:t.loginDiv},r.a.createElement(u.a,{className:t.seroful,variant:"h3"},"Seroful"),r.a.createElement("img",{className:t.images,src:h.a,alt:"molecule.png"}),r.a.createElement("form",{noValidate:!0,autoComplete:"off"},r.a.createElement(s.a,{label:"Email",variant:"outlined",className:t.email,onBlur:function(e){return w((function(t){return e.target.value}))}}),r.a.createElement("br",null),r.a.createElement(s.a,{label:"Password",type:"password",variant:"outlined",className:t.password,onBlur:function(e){return k((function(t){return e.target.value}))}}),r.a.createElement("br",null),r.a.createElement(i.a,{variant:"contained",className:t.button1,onClick:e.login},"Login"),r.a.createElement(i.a,{variant:"contained",className:t.button2,onClick:function(){return m(!0)}},"Register"))))},O=(a(67),a(26)),j=a.n(O);a(70);j.a.initializeApp({apiKey:"AIzaSyBJg9iVnvGl6F5TFBRTmoWn-3A5IxTgywI",authDomain:"seroful.firebaseapp.com",databaseURL:"https://seroful.firebaseio.com",projectId:"seroful",storageBucket:"seroful.appspot.com",messagingSenderId:"531332449318",appId:"1:531332449318:web:9b85133f0399aa898fd2e7",measurementId:"G-XYW74Z91MJ"});var k=function(){var e=Object(n.useState)(!0),t=Object(c.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)(),u=Object(c.a)(l,2),s=u[0],m=u[1],g=Object(d.c)(f),p=Object(c.a)(g,2),h=p[0],E=p[1],v=Object(d.c)(b),O=Object(c.a)(v,2),k=O[0],y=O[1],N=function(e){m(e),a&&o(!1)};return Object(n.useEffect)((function(){return j.a.auth().onAuthStateChanged(N)}),[]),Object(n.useEffect)((function(){console.log(h)}),[h]),a?null:s?r.a.createElement(r.a.Fragment,null,"Welcome to the party, ",s.email,".",r.a.createElement(i.a,{variant:"outlined",onClick:function(){j.a.auth().signOut().then((function(){return console.log("User signed out.")}))}},"Log Out")):r.a.createElement(w,{login:function(){return j.a.auth().signInWithEmailAndPassword(h,k).then((function(){return console.log("User logged in.")})).catch((function(e){return console.log(e)})),E(""),void y("")},register:function(){return j.a.auth().createUserWithEmailAndPassword(h,k).then((function(){return console.log("User created successfully.")})).catch((function(e){return console.log(e)})),E(""),void y("")}})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(d.a,null,r.a.createElement(k,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[56,1,2]]]);
//# sourceMappingURL=main.997d69b6.chunk.js.map