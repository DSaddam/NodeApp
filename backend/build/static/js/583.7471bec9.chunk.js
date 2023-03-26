"use strict";(self.webpackChunkreact_form=self.webpackChunkreact_form||[]).push([[583],{7583:function(t,r,e){e.r(r),e.d(r,{Marketplace:function(){return h}});var n=e(3433),a=e(4165),i=e(5861),s=e(5671),c=e(3144),o=e(2659),u=e(3975),p=e(8624),f=e(2257),l=e(4554),h=(e(518),e(5025),e(332),e(8455),e(9242),e(9189),e(6219),e(8834),e(5660),e(1303),e(1497),e(6880),e(4317),e(3670),e(9120),e(7604),e(8187),e(9362),e(9190),e(4730),e(6250),e(5725),e(8730),e(8507),e(8398),e(2090),e(6841),e(9561),e(580),e(246),e(4253),e(1559),e(553),e(26),e(9392),e(9526),e(4601),e(6878),e(7033),e(3058),e(5158),e(7761),e(583),e(2355),e(4194),e(1121),e(2484),e(8435),e(6315),e(4255),e(8528),e(2555),e(3211),e(2037),e(737),e(8262),e(4161),e(266),e(8839),e(5815),e(2378),e(5173),e(1375),e(3320),function(){function t(r,e,n){(0,s.Z)(this,t);var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,p=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new u.cV(r,e,i,a);(0,o._)(this,"abi",void 0),(0,o._)(this,"contractWrapper",void 0),(0,o._)(this,"storage",void 0),(0,o._)(this,"encoder",void 0),(0,o._)(this,"events",void 0),(0,o._)(this,"estimator",void 0),(0,o._)(this,"platformFees",void 0),(0,o._)(this,"metadata",void 0),(0,o._)(this,"app",void 0),(0,o._)(this,"roles",void 0),(0,o._)(this,"interceptor",void 0),(0,o._)(this,"direct",void 0),(0,o._)(this,"auction",void 0),(0,o._)(this,"_chainId",void 0),(0,o._)(this,"getAll",this.getAllListings),this._chainId=c,this.abi=i,this.contractWrapper=p,this.storage=n,this.metadata=new u.am(this.contractWrapper,u.cZ,this.storage),this.app=new u.b4(this.contractWrapper,this.metadata,this.storage),this.roles=new u.an(this.contractWrapper,t.contractRoles),this.encoder=new u.al(this.contractWrapper),this.estimator=new u.aZ(this.contractWrapper),this.direct=new u.aT(this.contractWrapper,this.storage),this.auction=new u.aU(this.contractWrapper,this.storage),this.events=new u.a_(this.contractWrapper),this.platformFees=new u.b0(this.contractWrapper),this.interceptor=new u.a$(this.contractWrapper)}return(0,c.Z)(t,[{key:"chainId",get:function(){return this._chainId}},{key:"onNetworkUpdated",value:function(t){this.contractWrapper.updateSignerOrProvider(t)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"getListing",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.listings(r);case 2:if((e=t.sent).assetContract!==p.d){t.next=5;break}throw new u.bv(this.getAddress(),r.toString());case 5:t.t0=e.listingType,t.next=t.t0===u.b7.Auction?8:t.t0===u.b7.Direct?11:14;break;case 8:return t.next=10,this.auction.mapListing(e);case 10:case 13:return t.abrupt("return",t.sent);case 11:return t.next=13,this.direct.mapListing(e);case 14:throw new Error("Unknown listing type: ".concat(e.listingType));case 15:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"getActiveListings",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e,n,i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getAllListingsNoFilter(!0);case 2:return e=t.sent,n=this.applyFilter(e,r),i=f.O$.from(Math.floor(Date.now()/1e3)),t.abrupt("return",n.filter((function(t){return t.type===u.b7.Auction&&f.O$.from(t.endTimeInEpochSeconds).gt(i)&&f.O$.from(t.startTimeInEpochSeconds).lte(i)||t.type===u.b7.Direct&&t.quantity>0})));case 6:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"getAllListings",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getAllListingsNoFilter(!1);case 2:return e=t.sent,t.abrupt("return",this.applyFilter(e,r));case 4:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"getTotalCount",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.totalListings();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"isRestrictedToListerRoleOnly",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(){var r;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.hasRole((0,u.bG)("lister"),p.d);case 2:return r=t.sent,t.abrupt("return",!r);case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getBidBufferBps",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.contractWrapper.readContract.bidBufferBps());case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getTimeBufferInSeconds",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.contractWrapper.readContract.timeBuffer());case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getOffers",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e,n=this;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.events.getEvents("NewOffer",{order:"desc",filters:{listingId:r}});case 2:return e=t.sent,t.next=5,Promise.all(e.map(function(){var t=(0,i.Z)((0,a.Z)().mark((function t(e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,u.c_)(n.contractWrapper.getProvider(),f.O$.from(r),{quantityWanted:e.data.quantityWanted,pricePerToken:e.data.quantityWanted.gt(0)?e.data.totalOfferAmount.div(e.data.quantityWanted):e.data.totalOfferAmount,currency:e.data.currency,offeror:e.data.offeror});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}()));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"buyoutListing",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r,e,n){var i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.listings(r);case 2:if((i=t.sent).listingId.toString()===r.toString()){t.next=5;break}throw new u.bv(this.getAddress(),r.toString());case 5:t.t0=i.listingType,t.next=t.t0===u.b7.Direct?8:t.t0===u.b7.Auction?12:15;break;case 8:return(0,l.Z)(void 0!==e,"quantityDesired is required when buying out a direct listing"),t.next=11,this.direct.buyoutListing(r,e,n);case 11:case 14:return t.abrupt("return",t.sent);case 12:return t.next=14,this.auction.buyoutListing(r);case 15:throw Error("Unknown listing type: ".concat(i.listingType));case 16:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"makeOffer",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r,e,n){var i,s;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.listings(r);case 2:if((i=t.sent).listingId.toString()===r.toString()){t.next=5;break}throw new u.bv(this.getAddress(),r.toString());case 5:return t.next=7,this.contractWrapper.getChainID();case 7:s=t.sent,t.t0=i.listingType,t.next=t.t0===u.b7.Direct?11:t.t0===u.b7.Auction?15:18;break;case 11:return(0,l.Z)(n,"quantity is required when making an offer on a direct listing"),t.next=14,this.direct.makeOffer(r,n,(0,u.c$)(i.currency)?u.cj[s].wrapped.address:i.currency,e);case 14:case 17:return t.abrupt("return",t.sent);case 15:return t.next=17,this.auction.makeBid(r,e);case 18:throw Error("Unknown listing type: ".concat(i.listingType));case 19:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"setBidBufferBps",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this.roles,t.t1=["admin"],t.next=4,this.contractWrapper.getSignerAddress();case 4:return t.t2=t.sent,t.next=7,t.t0.verify.call(t.t0,t.t1,t.t2);case 7:return t.next=9,this.getTimeBufferInSeconds();case 9:return e=t.sent,t.next=12,this.contractWrapper.sendTransaction("setAuctionBuffers",[e,f.O$.from(r)]);case 12:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"setTimeBufferInSeconds",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this.roles,t.t1=["admin"],t.next=4,this.contractWrapper.getSignerAddress();case 4:return t.t2=t.sent,t.next=7,t.t0.verify.call(t.t0,t.t1,t.t2);case 7:return t.next=9,this.getBidBufferBps();case 9:return e=t.sent,t.next=12,this.contractWrapper.sendTransaction("setAuctionBuffers",[f.O$.from(r),e]);case 12:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"allowListingFromSpecificAssetOnly",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=[],t.next=3,this.roles.get("asset");case 3:return t.sent.includes(p.d)&&e.push(this.encoder.encode("revokeRole",[(0,u.bG)("asset"),p.d])),e.push(this.encoder.encode("grantRole",[(0,u.bG)("asset"),r])),t.next=8,this.contractWrapper.multiCall(e);case 8:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"allowListingFromAnyAsset",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(){var r,e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=[],t.next=3,this.roles.get("asset");case 3:for(e in t.sent)r.push(this.encoder.encode("revokeRole",[(0,u.bG)("asset"),e]));return r.push(this.encoder.encode("grantRole",[(0,u.bG)("asset"),p.d])),t.next=8,this.contractWrapper.multiCall(r);case 8:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getAllListingsNoFilter",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e,n=this;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=Promise,t.t1=Array,t.t2=Array,t.next=5,this.contractWrapper.readContract.totalListings();case 5:return t.t3=t.sent.toNumber(),t.t4=(0,t.t2)(t.t3).keys(),t.t5=t.t1.from.call(t.t1,t.t4).map(function(){var t=(0,i.Z)((0,a.Z)().mark((function t(e){var i,s;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n.getListing(e);case 3:i=t.sent,t.next=14;break;case 6:if(t.prev=6,t.t0=t.catch(0),!(t.t0 instanceof u.bv)){t.next=12;break}return t.abrupt("return",void 0);case 12:return console.warn("Failed to get listing ".concat(e,"' - skipping. Try 'marketplace.getListing(").concat(e,")' to get the underlying error.")),t.abrupt("return",void 0);case 14:if(i.type!==u.b7.Auction){t.next=16;break}return t.abrupt("return",i);case 16:if(!r){t.next=23;break}return t.next=19,n.direct.isStillValidListing(i);case 19:if(s=t.sent,s.valid){t.next=23;break}return t.abrupt("return",void 0);case 23:return t.abrupt("return",i);case 24:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(r){return t.apply(this,arguments)}}()),t.next=10,t.t0.all.call(t.t0,t.t5);case 10:return e=t.sent,t.abrupt("return",e.filter((function(t){return void 0!==t})));case 12:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"applyFilter",value:function(t,r){var e=(0,n.Z)(t),a=f.O$.from((null===r||void 0===r?void 0:r.start)||0).toNumber(),i=f.O$.from((null===r||void 0===r?void 0:r.count)||o.c).toNumber();return r&&(r.seller&&(e=e.filter((function(t){var e;return t.sellerAddress.toString().toLowerCase()===(null===r||void 0===r||null===(e=r.seller)||void 0===e?void 0:e.toString().toLowerCase())}))),r.tokenContract&&(e=e.filter((function(t){var e;return t.assetContractAddress.toString().toLowerCase()===(null===r||void 0===r||null===(e=r.tokenContract)||void 0===e?void 0:e.toString().toLowerCase())}))),void 0!==r.tokenId&&(e=e.filter((function(t){var e;return t.tokenId.toString()===(null===r||void 0===r||null===(e=r.tokenId)||void 0===e?void 0:e.toString())}))),e=(e=e.filter((function(t,r){return r>=a}))).slice(0,i)),e}},{key:"prepare",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r,e,n){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",u.b3.fromContractWrapper({contractWrapper:this.contractWrapper,method:r,args:e,overrides:n}));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"call",value:function(){var t=(0,i.Z)((0,a.Z)().mark((function t(r){var e,n,i,s,c=arguments;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=c.length,i=new Array(n>1?n-1:0),s=1;s<n;s++)i[s-1]=c[s];return t.abrupt("return",(e=this.contractWrapper).call.apply(e,[r].concat(i)));case 2:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()}]),t}());(0,o._)(h,"contractRoles",["admin","lister","asset"])}}]);
//# sourceMappingURL=583.7471bec9.chunk.js.map