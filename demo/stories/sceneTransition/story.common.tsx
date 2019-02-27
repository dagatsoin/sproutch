import {
  SceneTransition,
  Spinner,
  Styles,
  TabBar,
  Text,
  View,
} from '@sproutch/ui'
import * as React from 'react'
import { Platform } from 'reactxp'
import { Redirect, Route, Router, Switch } from './router'

// tslint:disable-next-line: no-var-requires
const FontAwesome = require('react-native-vector-icons/FontAwesome')

const style = {
  appLayout: Styles.createViewStyle({
    marginTop: 60,
    width: 300,
    alignSelf: Platform.getType() === 'web' ? 'stretch' : 'auto',
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

const labelStyle = {
  shadowColor: '#fff',
  shadowRadius: 8,
}

export default function() {
  return (
    <View style={style.appLayout}>
      <Router>
        <> 
          <Route
            path="/"
            render={props => (
              <TabBar
                style={style.header}
                activeTabId="profile"
                onChange={id => {
                  props.history.push('/' + id)
                }}
                leftScrollButton={(
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FontAwesome.default name="chevron-left" size={16} color="#ddd" />
                  </View>
                )}
                rightScrollButton={(
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FontAwesome.default name="chevron-right" size={16} color="#ddd" />
                  </View>
                )}
                tabs={[
                  {
                    id: 'profile',
                    label: 'Profile',
                    style: {
                      isActiveLabel: labelStyle,
                    },
                  },
                  {
                    id: 'portfolio',
                    label: 'Portfolio',
                    style: {
                      isActiveLabel: labelStyle,
                    },
                  },
                  {
                    id: 'contact',
                    label: 'Contact',
                    style: {
                      isActiveLabel: labelStyle,
                    },
                  },
                ]}
              />
            )}
          />

          <Route render={({location}) => (
            <View style={style.sceneContainer}>
              <SceneTransition
                dummyScene={
                <View style={style.scene}>
                  <Spinner size="small" color="#809" />
                </View>
                }
                render={
                  () => (
                    <Switch location={location}>
                      <Route path="/profile" component={() => <Text>Profile</Text>} />
                      <Route path="/portfolio" component={() => <Text>Portfolio</Text>} />
                      <Route path="/contact" component={() => <Text>Contact</Text>} />
                      <Redirect to="/profile" />
                    </Switch>
                  )
                }
              />
            </View>
          )}
        />
        </>
      </Router>
    </View>
  )
}