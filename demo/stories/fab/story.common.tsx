import { CircleButtonProps, Fab, NodeInstance, Styles, Text, View } from '@sproutch/ui'
import * as React from 'react'
import { UserInterface } from 'reactxp'

// tslint:disable-next-line: no-var-requires
const FontAwesome = require('react-native-vector-icons/FontAwesome')

type State = {
  fabContainer: View | null
  path?: string
  hoveredId?: string
  selectedId?: string
  onPreOpenId?: string
  onPostOpenId?: string
  onPreCloseId?: string
  onPostCloseId?: string
}

export default class extends React.Component<{}, State> {
  public state: State = {
    fabContainer: null
  }
  public render() {
    const windowDimension = UserInterface.measureWindow()
    const position = {
      x: windowDimension.width - 100,
      y: windowDimension.height - 100
    }
    return (
      <>
        <View
          ref={view => {
            if (view && this.state.fabContainer === null) {
              this.setState({fabContainer: view})
            }
          }}
          onLayout={() => {}}
          style={Styles.createViewStyle({
            overflow: 'visible',
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'stretch'
          })}
        >
          <Fab
            delayLongPress={300}
            containerRef={this.state.fabContainer}
            position={position}
            nodeData={{
              renderOpenIcon: this.renderOpenIcon,
              renderCancelIcon: this.renderCancelIcon,
            }}
            nodeChildren={[
              {
                id: '00',
                nodeData: {
                  label: '00',
                },
              },
              {
                id: '01',
                nodeData: {
                  label: '01',
                },
              },
              {
                id: '02',
                nodeData: {
                  renderOpenIcon: this.renderOpenIcon,
                  renderCancelIcon: this.renderCancelIcon,
                },
                nodeChildren: [
                  {
                    id: '020',
                    nodeData: {
                      label: '020',
                    },
                  },
                  {
                    id: '021',
                    nodeData: {
                      renderOpenIcon: this.renderOpenIcon,
                      renderCancelIcon: this.renderCancelIcon,
                    },
                    nodeChildren: [
                      {
                        id: '0210',
                        nodeData: {
                          label: '0210',
                        },
                      },
                      {
                        id: '0211',
                        nodeData: {
                          renderOpenIcon: this.renderOpenIcon,
                          renderCancelIcon: this.renderCancelIcon,
                        },
                        nodeChildren: [
                          {
                            id: '02110',
                            nodeData: {
                              label: '02110',
                            },
                          },
                          {
                            id: '02111',
                            nodeData: {
                              label: '02111',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ]}
            onCancel={this.onCancel}
            onSelect={this.onSelect}
            onPreOpen={this.onPreOpen}
            onPostOpen={this.onPostOpen}
            onPreClose={this.onPreClose}
            onPostClose={this.onPostClose}
            onEnter={this.onEnter}
            onExit={this.onExit}
            buildButtonProps={this.buildButtonProps}
          />
          <View style={{
            position: 'absolute',
            left: 0,
            top: 0
          }}>
            <Text>Breadcrumbs: {this.state.path}</Text>
            <Text>Selected: {this.state.selectedId}</Text>
            <Text>Hover: {this.state.hoveredId}</Text>
            <Text>PreOpen: {this.state.onPreOpenId}</Text>
            <Text>LastOpened: {this.state.onPostOpenId}</Text>
            <Text>PreClose: {this.state.onPreCloseId}</Text>
            <Text>PostClose: {this.state.onPostCloseId}</Text>
          </View>
        </View>
      </>
    )
  }

  private buildButtonProps = (nodeInstance: NodeInstance): Partial<CircleButtonProps> => {
    const { hasChildren } = nodeInstance
    return {
      radius: hasChildren ? 32 : 28,
      palette: hasChildren ? 'primary' : 'secondary',
    }
  }

  private renderOpenIcon = style => (
    <FontAwesome.default name="plus" style={style} />
  )

  private renderCancelIcon = style => (
    <FontAwesome.default name="remove" style={style} />
  )

  private onPreOpen = (onPreOpenId: string) => {
    this.setState({ onPreOpenId })
  }

  private onPostOpen = (onPostOpenId: string) => {
    this.setState({ onPostOpenId })
  }

  private onPreClose = (onPreCloseId: string) => {
    this.setState({ onPreCloseId })
  }

  private onPostClose = (onPostCloseId: string) => {
    this.setState({ onPostCloseId })
  }

  private onCancel = () => {
    this.setState({ selectedId: 'canceled' })
  }

  private onSelect = (selectedId: string, path: string[]) => {
    this.setState({
      selectedId,
      path: path.join(' > '),
    })
  }

  private onEnter = (hoveredId: string) => {
    this.setState({ hoveredId })
  }

  private onExit = () => {
    this.setState({ hoveredId: '' })
  }
}
