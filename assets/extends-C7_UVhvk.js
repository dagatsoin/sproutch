var l={exports:{}},e={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=Symbol.for("react.transitional.element"),x=Symbol.for("react.fragment");function o(n,r,t){var s=null;if(t!==void 0&&(s=""+t),r.key!==void 0&&(s=""+r.key),"key"in r){t={};for(var a in r)a!=="key"&&(t[a]=r[a])}else t=r;return r=t.ref,{$$typeof:v,type:n,key:s,ref:r!==void 0?r:null,props:t}}e.Fragment=x;e.jsx=o;e.jsxs=o;l.exports=e;var i=l.exports;function u(){return u=Object.assign?Object.assign.bind():function(n){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var s in t)({}).hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},u.apply(null,arguments)}export{u as _,i as j};
