(this.webpackJsonpdrawingboard=this.webpackJsonpdrawingboard||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),s=n(5),i=n.n(s),o=n(4),l=n.n(o),j=n(6),a=n(2),d=n(0),b=function(e){var t=Object(d.jsx)("canvas",{style:{border:"4px solid black",borderRadius:0,backgroundColor:"white"},id:"canvasboard",ref:e.cvsRef});return Object(d.jsx)("section",{style:{display:"flex",justifyContent:"center"},children:t})};n(13);var u=function(){var e=Object(r.useRef)(),t=Object(r.useRef)(!1),n=Object(r.useState)(null),c=Object(a.a)(n,2),s=c[0],i=c[1],o=Object(r.useState)(!1),u=Object(a.a)(o,2),h=u[0],O=u[1],x=Object(r.useRef)(!1),f=Object(r.useRef)(0),p=Object(r.useState)(!1),y=Object(a.a)(p,2),m=y[0],g=y[1],v=Object(r.useRef)(0),k=Object(r.useState)(null),S=Object(a.a)(k,2),w=S[0],C=S[1],z=Object(r.useState)("#"),F=Object(a.a)(z,2),T=F[0],I=F[1];Object(r.useEffect)((function(){var t;i(null===e||void 0===e||null===(t=e.current)||void 0===t?void 0:t.getContext("2d"))}),[e,s]);var E=Object(r.useCallback)((function(e){t.current=!0;var n=[e.offsetX,e.offsetY];f.current=n[0],v.current=n[1]}),[]),R=Object(r.useCallback)((function(){t.current=!1}),[]),W=Object(r.useCallback)((function(){s&&e&&e.current&&(s.clearRect(0,0,e.current.width,e.current.height),C(null),O(!1))}),[e,s]),J=Object(r.useCallback)((function(){e&&e.current&&I(e.current.toDataURL("image/png"))}),[e]),B=Object(r.useCallback)((function(e){if(s){s.beginPath(),s.moveTo(f.current,v.current),s.lineTo(e.offsetX,e.offsetY),s.stroke(),O(!0);var t=[e.offsetX,e.offsetY];f.current=t[0],v.current=t[1]}}),[s]),D=function(){var t=Object(j.a)(l.a.mark((function t(){var n,r,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(h){t.next=2;break}return t.abrupt("return");case 2:return n=e.current.toDataURL(),"https://prmlproject1.herokuapp.com/predict",t.next=6,fetch("https://prmlproject1.herokuapp.com/predict",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({imagestring:n})});case 6:return r=t.sent,t.next=9,r.json();case 9:c=t.sent,C(c.predictedclass);case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),L=Object(r.useCallback)((function(e){t.current&&s&&(x.current?(s.globalCompositeOperation="destination-out",s.lineWidth=6):(s.globalCompositeOperation="source-over",s.lineWidth=2.05),B(e))}),[B,s,t]);Object(r.useEffect)((function(){e&&e.current&&s&&(e.current.addEventListener("mousedown",E),e.current.addEventListener("mousemove",L),e.current.addEventListener("mouseup",R),e.current.addEventListener("mouseout",R),e.current.width=640,e.current.height=480,s.strokeStyle="#000",s.lineJoin="round",s.lineCap="round",s.lineWidth=2.05)}),[e,s,L,E,R]);var P={backgroundColor:"#eee",padding:0};w&&(P={backgroundColor:"#eee",padding:0});var Y=w?Object(d.jsxs)("div",{style:{height:100,width:window.innerWidth,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",paddingBottom:10},children:[Object(d.jsx)("div",{children:Object(d.jsx)("text",{style:{color:"purple",fontFamily:"cursive",fontSize:30},children:"We think that the sketch you have drawn is a:"})}),Object(d.jsx)("div",{style:{padding:15,marginRight:10,marginLeft:20,borderRadius:20,backgroundColor:"black",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(d.jsx)("text",{style:{color:"white",fontFamily:"cursive",fontSize:27},children:w})})]}):null;return Object(d.jsxs)("div",{style:P,children:[Object(d.jsx)("div",{style:{width:"100%",paddingTop:10,paddingBottom:10,textAlign:"center"},children:Object(d.jsxs)("p",{style:{fontSize:30,fontWeight:200,marginBottom:10,fontFamily:"cursive"},children:["Welcome to our ",Object(d.jsx)("text",{style:{color:"#710eab"},children:"Canvas"})]})}),Object(d.jsx)("div",{children:Object(d.jsx)(b,{cvsRef:e})}),Object(d.jsx)("div",{style:{marginTop:20,padding:5},children:Object(d.jsx)("nav",{children:Object(d.jsxs)("ul",{children:[Object(d.jsx)("li",{children:Object(d.jsxs)("a",{style:{cursor:"pointer",textDecoration:"none"},download:"image.png",onClick:J,href:T,children:["Save Image",Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{})]})}),Object(d.jsxs)("li",{onClick:W,style:{cursor:"pointer"},children:["Clear",Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{})]}),Object(d.jsxs)("li",{onClick:D,style:{cursor:"pointer"},children:["Predict",Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{})]}),Object(d.jsxs)("li",{onClick:function(e){m||(x.current=!0,g(!0))},style:{cursor:m?"not-allowed":"pointer",border:m?"0.3em solid maroon":"0.3em solid goldenrod"},children:["Eraser",Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{})]}),Object(d.jsxs)("li",{onClick:function(e){m&&(x.current=!1,g(!1))},style:{cursor:m?"pointer":"not-allowed",border:m?"0.3em solid goldenrod":"0.3em solid maroon"},children:["Brush",Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{}),Object(d.jsx)("span",{})]})]})})}),Object(d.jsx)("div",{children:Y}),Object(d.jsx)("div",{style:{width:window.innerWidth,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",padding:10},children:Object(d.jsx)("text",{style:{color:"red",fontFamily:"cursive",fontSize:35},children:"About Us"})}),Object(d.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:10},children:[Object(d.jsx)("p",{style:{color:"black",fontFamily:"cursive",fontSize:26},children:"This project is created and maintained by a group of three students from Indian Institute of Technology, Jodhpur."}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("p",{style:{color:"black",fontFamily:"cursive",fontSize:26},children:"We are:"}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("p",{style:{color:"#d44f0d",fontFamily:"cursive",fontSize:26},children:"1. Tanishq Joshi, B Tech in EE, IIT Jodhpur."}),Object(d.jsx)("p",{style:{color:"#d44f0d",fontFamily:"cursive",fontSize:26},children:"2. Suyash Singh, B Tech in EE, IIT Jodhpur."}),Object(d.jsx)("p",{style:{color:"#d44f0d",fontFamily:"cursive",fontSize:26},children:"3. Shyam Sundar Meena, B Tech in EE, IIT Jodhpur."}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("p",{style:{color:"black",fontFamily:"cursive",fontSize:26},children:"This project was created as a part of the Pattern Recognition and Machine Learning Course in Semester 4."})]}),Object(d.jsx)("div",{style:{width:window.innerWidth,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",padding:10},children:Object(d.jsx)("text",{style:{color:"red",fontFamily:"cursive",fontSize:35},children:"Predicted Classes"})}),Object(d.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:10},children:[Object(d.jsx)("p",{style:{color:"black",fontFamily:"cursive",fontSize:24},children:"We predict 30 classes of sketches as of now. These include:"}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("p",{style:{color:"green",fontFamily:"cursive",fontSize:23},children:"1. bicycle 2. couch 3. blimp 4. knife 5. banana 6. pineapple"}),Object(d.jsx)("p",{style:{color:"green",fontFamily:"cursive",fontSize:23},children:"7. pretzel 8. castle 9. trumpet 10. flower 11. church 12. hourglass"}),Object(d.jsx)("p",{style:{color:"green",fontFamily:"cursive",fontSize:23},children:"13. hat 14. fan 15. spoon 16. umbrella 17. skyscraper 18. bench"}),Object(d.jsx)("p",{style:{color:"green",fontFamily:"cursive",fontSize:23},children:"17. saw 18. car_(sedan) 19. shoe 20. hamburger 21. hammer 22. hot-air_balloon"}),Object(d.jsx)("p",{style:{color:"green",fontFamily:"cursive",fontSize:23},children:"25. hotdog 26. eyeglasses 27. helicopter 28. harp 29. geyser 30. mushroom"}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("p",{style:{color:"black",fontFamily:"cursive",fontSize:26},children:"We hope that you enjoy our little creation \ud83d\ude01."}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsxs)("p",{style:{color:"black",fontFamily:"cursive",fontSize:24},children:["You can ping us at"," ",Object(d.jsx)("a",{style:{color:"blue"},children:"prmlproject1@gmail.com"})," for feedback."]}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("hr",{})]})]})};i.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(u,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.bdb76d6a.chunk.js.map