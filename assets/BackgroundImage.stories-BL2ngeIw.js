import{j as t}from"./extends-C7_UVhvk.js";import{d as r,V as c,T as d}from"./BackgroundImage-BQD4Zmgx.js";import"./index-R2V08a_e.js";const m=""+new URL("lava-DOmN-DhV.png",import.meta.url).href,u={title:"Core/Layout/Background Image",component:r,argTypes:{style:{control:{disable:!0}},position:{control:{type:"text"}},size:{control:"select",options:["cover","contain","stretch","none","custom"]},imageSize:{if:{arg:"size",eq:"custom"},control:{type:"text"}},children:{control:!1}},decorators:[o=>t.jsx(c,{style:{alignItems:"center",justifyContent:"center",flex:1},children:t.jsx(o,{})})],render:({imageSize:o,...s})=>{const l=s.size&&/d/.test(s.size),p={...s,size:l?o:s.size};return t.jsx(r,{...p})}},e={tags:["!dev"],args:{source:m,repeat:!1,position:"5% 90%",size:"cover",imageSize:"50px 50px",style:{width:128,height:256,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:10},children:t.jsx(c,{style:{display:"flex",height:"100%",justifyContent:"center",alignItems:"center"},children:t.jsx(d,{style:{color:"white"},children:"SPROUTCH"})})}};var i,n,a;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    source: Lava as ImageSourcePropType,
    repeat: false,
    position: "5% 90%",
    size: 'cover',
    imageSize: "50px 50px",
    style: {
      width: 128,
      height: 256,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    children: <View style={{
      display: 'flex',
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{
        color: 'white'
      }}>SPROUTCH</Text>
    </View>
  }
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const g=["Default"],h=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:g,default:u},Symbol.toStringTag,{value:"Module"}));export{h as B};
