import{j as t}from"./extends-C7_UVhvk.js";import{a as n,V as o,d as m}from"./BackgroundImage-BQD4Zmgx.js";import"./index-R2V08a_e.js";import{B as l}from"./btn-bg-T6-yhMzO.js";import{r as i}from"./utils-8Sp2GGYB.js";const p=""+new URL("flask_speed-tK37MV_K.png",import.meta.url).href,c={title:"Core/Atoms/Border image",component:n,tags:["!dev"],decorators:[e=>t.jsx(o,{style:{alignItems:"center",justifyContent:"center",flex:1},children:t.jsx(e,{})})],render:e=>t.jsxs(o,{style:{width:e.viewWidth,height:e.viewHeight,justifyContent:"center",alignItems:"center",borderWidth:e.borderWidth,borderColor:"transparent",padding:e.borderWidth},children:[t.jsx(n,{...e}),t.jsx(o,{style:{position:"absolute",top:0,right:0,bottom:0,left:0,backgroundColor:"#2C2621"},children:t.jsx(m,{source:p,size:"contain",style:{flex:1,height:"100%"},position:"50% 50%"})})]})},r={argTypes:{viewWidth:i({min:64,max:512,step:1}),viewHeight:i({min:64,max:512,step:1})},args:{viewHeight:256,viewWidth:256,source:l,borderWidth:64,sliceWidth:127,growInside:!1}};var s,a,d;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  argTypes: {
    viewWidth: range({
      min: 64,
      max: 512,
      step: 1
    }),
    viewHeight: range({
      min: 64,
      max: 512,
      step: 1
    })
  },
  args: {
    viewHeight: 256,
    viewWidth: 256,
    source: BtnBorder as ImageSourcePropType,
    borderWidth: 64,
    sliceWidth: 127,
    growInside: false
  }
}`,...(d=(a=r.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};const g=["Default"],b=Object.freeze(Object.defineProperty({__proto__:null,Default:r,__namedExportsOrder:g,default:c},Symbol.toStringTag,{value:"Module"}));export{b as B};
