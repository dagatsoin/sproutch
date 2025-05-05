import{j as o}from"./extends-C7_UVhvk.js";import{C as B,V as v,a as f}from"./BackgroundImage-BQD4Zmgx.js";import"./index-R2V08a_e.js";import{i as r}from"./FontAwesome-BGRLjMFv.js";import{B as W}from"./btn-bg-T6-yhMzO.js";import"./create-icon-set-B8RN24XO.js";import"./index-Dv5xzOwU.js";const P={title:"Core/Molecule/Button/Circle",component:B,decorators:[e=>o.jsx(v,{style:{flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignItems:"center",overflow:"visible"},children:o.jsx(e,{})})]},a={name:"Palette choice",args:{palette:"primary",iconSlot:e=>o.jsx(r,{style:e,name:"user"})}},t={name:"Can be disabled",args:{isDisabled:!0,iconSlot:e=>o.jsx(r,{style:e,name:"user"})}},s={args:{elevation:4,iconSlot:e=>o.jsx(r,{style:e,name:"user"})}},n={name:"Variant choice",args:{variant:"outlined",iconSlot:e=>o.jsx(r,{style:e,name:"user"})}},i={name:"With background image",args:{style:{root:{margin:8,borderRadius:32},content:{borderRadius:32},label:{color:"#FFE082"},icon:{color:"#FFE082"}},elevation:10,iconSlot:e=>o.jsx(r,{style:e,name:"user"}),backgroundSlot:()=>o.jsx(f,{source:W,borderWidth:32,sliceWidth:127,growInside:!0})}};var c,l,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: "Palette choice",
  args: {
    palette: "primary",
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />
  }
}`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,u,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: "Can be disabled",
  args: {
    isDisabled: true,
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />
  }
}`,...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var g,S,y;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    elevation: 4,
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />
  }
}`,...(y=(S=s.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var b,x,h;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: "Variant choice",
  args: {
    variant: "outlined",
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />
  }
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var F,j,w;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: "With background image",
  args: {
    style: {
      root: {
        margin: 8,
        borderRadius: 32
      },
      content: {
        borderRadius: 32
      },
      label: {
        color: '#FFE082'
      },
      icon: {
        color: '#FFE082'
      }
    },
    elevation: 10,
    iconSlot: iconStyle => <FontAwesome style={iconStyle} name="user" />,
    backgroundSlot: () => <BorderImage source={BtnBorder as ImageSourcePropType} borderWidth={32} sliceWidth={127} growInside />
  }
}`,...(w=(j=i.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};const R=["Palette","Disabled","Elevation","Variant","WithBackground"];export{t as Disabled,s as Elevation,a as Palette,n as Variant,i as WithBackground,R as __namedExportsOrder,P as default};
