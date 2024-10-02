import React from 'react'
import { fitParent } from '@sproutch/core';
import { Transition } from '@sproutch/transition';
import { Meta } from '@storybook/react'
import { StyleSheet, Text, View } from 'react-native'
import { Link, NativeRouter, Route, Routes, useLocation } from 'react-router-native';

const style = StyleSheet.create({
  appRoot: {
    justifyContent: 'center',
    flex: 1,
    height: 200,
  },
  nav: {
    display: "flex",
    textTransform: "uppercase",
    backgroundColor: "#f093fb",
    flexDirection: "row",
  },
  linkRoot: {
    paddingRight: 20,
    paddingTop: 40,
  },
  content: {
    flex: 1,
  },
  linkText: {
    color: "white",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  contentText: {
    fontSize: 50,
    fontWeight: "900",
    color: "white"
  }
})

const Layout = () => {
  return (
    <View style={style.nav}>
      <Link style={style.linkRoot} to="/"><Text style={style.linkText}>Home</Text></Link>
      <Link style={style.linkRoot} to="/1"><Text style={style.linkText}>Page 1</Text></Link>
      <Link style={style.linkRoot} to="/2"><Text style={style.linkText}>Page 2</Text></Link>     
    </View>
  )
} 
const App = () => {
  const location = useLocation()

  return (
    <View style={style.appRoot}>
      <Transition
        id={location.pathname}
        configuration={{
          keys: null,
          from: { opacity: 0, rotateZ: -10, translateX: -100 },
          enter: { opacity: 1, rotateZ: 0, translateX: 0, translateY: 0  },
          leave: { opacity: 0, rotateZ: 10, translateX: 100, translateY: 100 },
        }}
        wrapperStyle={fitParent.root}
        renderFn={(pathName: string) => (
          <Routes location={pathName}>
            <Route path="/"  element={<View style={{...style.content, backgroundColor: "#f5576c",}}><Text style={style.contentText}>HOME</Text></View>}/>
            <Route path="/1" element={<View style={{...style.content, backgroundColor: "#f5226c",}}><Text style={style.contentText}>HELLO</Text></View>}/>
            <Route path="/2" element={<View style={{...style.content, backgroundColor: "#f511ff",}}><Text style={style.contentText}>WORLD</Text></View>}/>
          </Routes>
        )}
      />
    </View>
  )
}

const TransitionMeta: Meta<typeof Transition> = {
  title: 'Transition/Slide',
  component: () => {
    return (
      <>
        <NativeRouter>
        <Layout/>
          <App/>
        </NativeRouter>
      </>
    )
},
  decorators: [
    (Story) => (
      <View style={style.appRoot}>
        <Story />
      </View>
    ),
  ],
}

export default TransitionMeta

export const Basic = {};