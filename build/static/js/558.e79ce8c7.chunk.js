"use strict";(self.webpackChunkreact_form=self.webpackChunkreact_form||[]).push([[558],{9558:function(t,r,e){e.r(r),e.d(r,{MarketplaceV3:function(){return h}});var n=e(4165),i=e(5861),a=e(5671),s=e(3144),c=e(2659),o=e(3331),h=(e(518),e(5025),e(332),e(8455),e(9242),e(9189),e(6219),e(8834),e(5660),e(1303),e(1497),e(6880),e(4317),e(3670),e(9120),e(7604),e(8187),e(9362),e(9190),e(4730),e(6250),e(5725),e(8730),e(8507),e(8398),e(2090),e(6841),e(9561),e(580),e(246),e(4253),e(1559),e(553),e(26),e(9392),e(9526),e(4601),e(6878),e(7033),e(3058),e(5158),e(7761),e(583),e(2355),e(4194),e(1121),e(2484),e(8435),e(6315),e(4255),e(8528),e(2555),e(3211),e(2037),e(737),e(8262),e(4161),e(266),e(8839),e(5815),e(2378),e(5173),e(1375),e(3320),function(){function t(r,e,n){(0,a.Z)(this,t);var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,h=arguments.length>5?arguments[5]:void 0,p=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new o.cV(r,e,s,i);(0,c._)(this,"abi",void 0),(0,c._)(this,"contractWrapper",void 0),(0,c._)(this,"storage",void 0),(0,c._)(this,"encoder",void 0),(0,c._)(this,"events",void 0),(0,c._)(this,"estimator",void 0),(0,c._)(this,"platformFees",void 0),(0,c._)(this,"metadata",void 0),(0,c._)(this,"app",void 0),(0,c._)(this,"roles",void 0),(0,c._)(this,"interceptor",void 0),(0,c._)(this,"_chainId",void 0),this._chainId=h,this.abi=s,this.contractWrapper=p,this.storage=n,this.metadata=new o.am(this.contractWrapper,o.cZ,this.storage),this.app=new o.b4(this.contractWrapper,this.metadata,this.storage),this.roles=new o.an(this.contractWrapper,t.contractRoles),this.encoder=new o.al(this.contractWrapper),this.estimator=new o.aZ(this.contractWrapper),this.events=new o.a_(this.contractWrapper),this.platformFees=new o.b0(this.contractWrapper),this.interceptor=new o.a$(this.contractWrapper)}return(0,s.Z)(t,[{key:"directListings",get:function(){return(0,o.c1)(this.detectDirectListings(),o.d0)}},{key:"englishAuctions",get:function(){return(0,o.c1)(this.detectEnglishAuctions(),o.d1)}},{key:"offers",get:function(){return(0,o.c1)(this.detectOffers(),o.d2)}},{key:"chainId",get:function(){return this._chainId}},{key:"onNetworkUpdated",value:function(t){this.contractWrapper.updateSignerOrProvider(t)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"prepare",value:function(){var t=(0,i.Z)((0,n.Z)().mark((function t(r,e,i){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",o.b3.fromContractWrapper({contractWrapper:this.contractWrapper,method:r,args:e,overrides:i}));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"call",value:function(){var t=(0,i.Z)((0,n.Z)().mark((function t(r){var e,i,a,s,c=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(i=c.length,a=new Array(i>1?i-1:0),s=1;s<i;s++)a[s-1]=c[s];return t.abrupt("return",(e=this.contractWrapper).call.apply(e,[r].concat(a)));case 2:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"detectDirectListings",value:function(){if((0,o.c2)(this.contractWrapper,"DirectListings"))return new o.aV(this.contractWrapper,this.storage)}},{key:"detectEnglishAuctions",value:function(){if((0,o.c2)(this.contractWrapper,"EnglishAuctions"))return new o.aW(this.contractWrapper,this.storage)}},{key:"detectOffers",value:function(){if((0,o.c2)(this.contractWrapper,"Offers"))return new o.aX(this.contractWrapper,this.storage)}}]),t}());(0,c._)(h,"contractRoles",["admin","lister","asset"])}}]);
//# sourceMappingURL=558.e79ce8c7.chunk.js.map