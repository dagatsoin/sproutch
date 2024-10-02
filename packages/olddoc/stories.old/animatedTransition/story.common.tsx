import {
  AnimatedTransition,
  Styles,
  TabBar,
  Text,
  View
} from '@sproutch/ui';
import * as React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Picker } from 'reactxp';
import collapse from './collapseBehavior';
import { Navigation } from './Navigation';
import { Route, RRouter, Switch, useLocation } from './router';

// tslint:disable-next-line: no-var-requires
const FontAwesome = require('react-native-vector-icons/FontAwesome')

export const style = {
  section: Styles.createViewStyle({
    alignSelf: 'stretch',
    marginTop: 60,
    height: 100, // alignSelf: Platform.getType() === 'web' ? 'stretch' : 'auto',
    flex: 1,
  }),
  header: {
    root: Styles.createViewStyle({
      flexGrow: 0,
      flexShrink: 1,
    }),
  },
  sceneContainer: Styles.createViewStyle({
    flex: 1,
  }),
  scene: Styles.createViewStyle({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
}

export const labelStyle = {
  shadowColor: '#fff',
  shadowRadius: 8,
}

export const select = {};

function WithRouter() {
  let location = useLocation();

  const [animation, setAnimation] = React.useState("slide");
  return (
        <View style={style.section}>
          <Picker
            style={select}
            onValueChange={value => setAnimation(value)}
            selectedValue="slide"
            items={[{
              label: "Slide", value: "slide"
            }, {
              label: "Collapse", value: "collapse"
            }]}
          />
          <Text> With React router </Text>
          <Navigation/>
          <View style={style.sceneContainer}>
            <AnimatedTransition
              clean
              animation={animation === "slide" ? undefined : collapse}
              id={location.key}
            >
              <Switch location={location}>
                <Route
                  path="/profile"
                  component={() => <Text>Profile</Text>}
                />
                <Route
                  path="/portfolio"
                  component={() => <Text>Portfolio</Text>}
                />
                <Route
                  path="/contact"
                  component={() => <Text>Contact</Text>}
                />
                <Redirect to="/profile"/>
              </Switch>  
            </AnimatedTransition>
          </View>
        </View>
  )
}

function WithoutRouter(){
  const [{activeId}, setActiveId] = useState({
    activeId: 'section0',
  })

  const [animation, setAnimation] = React.useState("slide");
  
  return (
    
    <View style={style.section}>
      <Picker
      style={select}
      onValueChange={value => setAnimation(value)}
      selectedValue="slide"
      items={[{
        label: "Slide", value: "slide"
      }, {
        label: "Collapse", value: "collapse"
      }]}
    />
     
      <Text> Without router </Text>
      <TabBar
        palette="secondary"
        style={style.header}
        activeTabId={activeId}
        onChange={id => setActiveId({ activeId: id })}
        leftScrollButton={(theme) => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FontAwesome.default name="chevron-left" size={16} color={theme.palette.text.secondary} />
          </View>
        )}
        rightScrollButton={(theme) => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FontAwesome.default
              name="chevron-right"
              size={16}
              color={theme.palette.text.secondary}
            />
          </View>
        )}
        tabs={[
          {
            id: 'section0',
            label: 'Section 0',
            style: {
              isActiveLabel: labelStyle,
            },
          },
          {
            id: 'section1',
            label: 'Section 1',
            style: {
              isActiveLabel: labelStyle,
            },
          },
          {
            id: 'section2',
            label: 'Section 2',
            style: {
              isActiveLabel: labelStyle,
            },
          },
        ]}
      />
      <View style={style.sceneContainer}>
          <AnimatedTransition
            clean
            id={activeId}
            animation={animation === "slide" ? undefined : collapse}
          >
            {activeId === 'section0' && <Text>Section 0</Text>}
            {activeId === 'section1' && <Text>Section 1</Text>}
            {activeId === 'section2' && <Text>Section 2</Text>}  
          </AnimatedTransition>
      </View>
    </View>
  )
}

export default function Story() {
  return (
    <>
      <RRouter>
        <WithRouter />
      </RRouter>
      <WithoutRouter />
    </>
  )
}
