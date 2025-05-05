import{j as t}from"./extends-C7_UVhvk.js";import{P as i,V as p,s,T as c}from"./BackgroundImage-BQD4Zmgx.js";import"./index-R2V08a_e.js";import{r as d}from"./utils-8Sp2GGYB.js";const a={paper:s.create({root:{borderRadius:4,margin:15,width:256,height:128}}),content:s.create({root:{flex:1,alignItems:"center",justifyContent:"center"}})},m={title:"Core/Layout/Paper",component:i,argTypes:{elevation:d({min:0,max:24,step:1})},decorators:r=>t.jsx(p,{style:{alignItems:"center",justifyContent:"center",flex:1},children:t.jsx(r,{})})},e={tags:["!dev"],args:{elevation:1},render:r=>t.jsx(i,{style:a.paper,elevation:r.elevation,children:t.jsx(p,{style:a.content.root,children:t.jsxs(c,{children:[r.elevation,"dp"]})})})};var n,o,l;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    elevation: 1
  },
  render: args => <Paper style={styles.paper} elevation={args.elevation}>
      <View style={styles.content.root}>
        <Text>{args.elevation}dp</Text>
      </View>
    </Paper>
}`,...(l=(o=e.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const g=["Default"],v=Object.freeze(Object.defineProperty({__proto__:null,Default:e,__namedExportsOrder:g,default:m},Symbol.toStringTag,{value:"Module"}));export{v as P};
