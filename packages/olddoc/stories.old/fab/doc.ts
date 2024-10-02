export default `
A multi level circular menu button.
### Import name
\`Fab\`
### Usage
\`\`\`
<Fab
  nodeData={{
    renderOpenIcon: this.renderOpenIcon,
    renderCancelIcon: this.renderCancelIcon
  }}
  posX={0}
  posY={0}
  children={[
    {
      id: '00',
      nodeData: {
        label: '00'
      }
    },
    {
      id: '01',
      nodeData: {
        label: '01'
      }
    },
    {
      id: '02',
      nodeData: {
        renderOpenIcon: this.renderOpenIcon,
        renderCancelIcon: this.renderCancelIcon
      },
      children: [
        {
          id: '020',
          nodeData: {
            label: '020'
          }
        },
        {
          id: '021',
          nodeData: {
            renderOpenIcon: this.renderOpenIcon,
            renderCancelIcon: this.renderCancelIcon
          },
          children: [
            {
              id: '0210',
              nodeData: {
                label: '0210'
              }
            },
            {
              id: '0211',
              nodeData: {
                renderOpenIcon: this.renderOpenIcon,
                renderCancelIcon: this.renderCancelIcon
              },
              children: [
                {
                  id: '02110',
                  nodeData: {
                    label: '02110'
                  }
                },
                {
                  id: '02111',
                  nodeData: {
                    label: '02111'
                  }
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
  onPressRoot={() => alert("root pressed")}
  onCancel={this.onCancel}
  onSelect={this.onSelect}
  onPreOpen={this.onPreOpen}
  onPostOpen={this.onPostOpen}
  onPreClose={this.onPreClose}
  onPostClose={this.onPostClose}
/>
\`\`\`
### Properties

The Fab is made of nested Button. So the root and each leaf accepts the buton properties.

**Important:** you must provide a position information to the root either by using the left/bottom/right/top style properties or by posX/poxY properties

#### containerRef
\`type: Ref\`

#### posX *optional*
\`type: number\`

#### posY *optional*
\`type: number\`

#### onEnter *optional*
\`type: (id: string) => void\`

Callback executed when the touch enters a node or an leaf.

#### onExit *optional*
\`type: (id: string) => void\`

Callback executed when the touch exitss a node or an leaf.

#### onExit *optional*
\`type: (id: string) => void\`

Callback executed when the touch exits a node or an leaf.

#### onSelect *optional*
\`type: (id: string, path: string[]) => void\`

Callback executed when the touch is ended over a node or an leaf.
\`id\`: the selected leaf id
\`path\`: the path to the selected leaf


##### nodeData
\`type: FabButtonData\`

An object representing the node data:
\`\`\`
{
  label?: string // label to display
  renderOpenIcon?: (style: StyleProp<TextStyle>) => React.ReactNode // a render function to generate an open icon
  renderCancelIcon?: (style: StyleProp<TextStyle>) => React.ReactNode // a render function to generate an close icon
}
\`\`\`

#### nodeChildren
\`type: Array<Child<FabButtonData>>\`

If you want to make a multi level menu you will have to describe the children in this props.

\`\`\`
{
  id: string
  nodeChildren?: Array<Child<FabButtonData>> // see bellow
  nodeData: FabButtonData // see bellow
}
\`\`\`

#### iconSlot *optional*
\`type: iconSlot?: (style: StyleProp<TextStyle>) => React.ReactNode\`

The icon to display when a Fab is open.

### isOpen *optional*
\`type: string\`

Open or close the root element via parent props

An leaf array (chould be recursive) to display nested Fabs. The leafs takes the same arguments as the root Fab
but with and additional \`id: string\` props.

### onRef *optional*
\`type: (fab: Fab) => void\`

To retrieve the Fab instance.

### Other leafal props
- ButtonProps
- children: [React.ReactNode]
- style: [ViewStyle](https://microsoft.github.io/reactxp/docs/styles.html#view-style-attributes)
`