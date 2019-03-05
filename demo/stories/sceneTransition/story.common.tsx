import {
  SceneTransition,
  Spinner,
  Styles,
  TabBar,
  Text,
  View,
} from '@sproutch/ui'
import * as React from 'react'
import { Route, Router, Switch } from './router'

// tslint:disable-next-line: no-var-requires
const FontAwesome = require('react-native-vector-icons/FontAwesome')

const style = {
  section: Styles.createViewStyle({
    marginTop: 60,
    width: 300,
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

const labelStyle = {
  shadowColor: '#fff',
  shadowRadius: 8,
}

type State = {
  activeId: string
}

function WithRouter() {
  return (
    <View style={style.section}>
      <Text> With React router </Text>
      <Router>
        <>
          <Route
            path="/"
            render={props => (
              <TabBar
                style={style.header}
                activeTabId={'profile'}
                onChange={id => {
                  props.history.push('/' + id)
                }}
                leftScrollButton={
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FontAwesome.default
                      name="chevron-left"
                      size={16}
                      color="#ddd"
                    />
                  </View>
                }
                rightScrollButton={
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
                      color="#ddd"
                    />
                  </View>
                }
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

          <Route
            render={({location}) => (
              <View style={style.sceneContainer}>
                <SceneTransition
                  dummyScene={
                    <View style={style.scene}>
                      <Spinner size="small" color="#809" />
                    </View>
                  }
                  render={() => (
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
                      <Route component={() => <Text>Profile</Text>}/>
                    </Switch>
                  )}
                />
              </View>
            )}
          />
        </>
      </Router>
    </View>
  )
}

class WithoutRouter extends React.Component<{}, State> {
  public state: State = {
    activeId: 'section0',
  }
  public render() {
    return (
      <View style={style.section}>
        <Text> Without router </Text>
        <TabBar
          palette="secondary"
          style={style.header}
          activeTabId={this.state.activeId}
          onChange={activeId => this.setState({ activeId })}
          leftScrollButton={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome.default name="chevron-left" size={16} color="#ddd" />
            </View>
          }
          rightScrollButton={
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
                color="#ddd"
              />
            </View>
          }
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
          <SceneTransition
            render={() => {
              switch (this.state.activeId) {
                default:
                case 'section0':
                  return <Text>Section 0</Text>

                case 'section1':
                  return <Text>Section 1</Text>

                case 'section2':
                  return <Text>Section 2</Text>
              }
            }}
          />
        </View>
      </View>
    )
  }
}

export default function Story() {
  return (
    <View>
      <WithRouter/>
      <WithoutRouter/>
    </View>
  )
}