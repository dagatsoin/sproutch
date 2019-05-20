export default `
A recursive FAB button.
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
  onCancel={this.onCancel}
  onSelect={this.onSelect}
  onPreOpen={this.onPreOpen}
  onPostOpen={this.onPostOpen}
  onPreClose={this.onPreClose}
  onPostClose={this.onPostClose}
/>
\`\`\`
### Properties

The Fab is made of nested Button. So the root Fab and each option accepts the buton properties.

**Important:** you must provide a position information to the root FAB either by using the left/bottom/right/top style properties or by posX/poxY properties

#### posX *optional*
\`type: number\`

#### posY *optional*
\`type: number\`

#### onHover *optional*
\`type: (id: string) => void\`

Callback executed when the touch hover a Fab or an option.

#### onSelect *optional*
\`type: (id: string, path: string[]) => void\`

Callback executed when the touch is ended over a Fab or an option.
\`id\`: the selected option id
\`path\`: the path to the selected option


##### nodeData *optional*
\`type: FabButtonData\`

An object representing the FAB data:
\`\`\`
{
  label?: string // label to display
  cancelLabel?: string // label to display when the node is open
  renderOpenIcon?: (style: StyleProp<TextStyle>) => React.ReactNode // a render function to generate an open icon
  renderCancelIcon?: (style: StyleProp<TextStyle>) => React.ReactNode // a render function to generate an close icon
}
\`\`\`

#### children *optional*
\`type: Child\`

If you want to make nested FABs you will have to describe the children in this props.

\`\`\`
{
  id: string
  children?: Array<Child> // see bellow
  nodeData: FabButtonData // see bellow
  posX?: number
  posY?: number
}
\`\`\`


#### cancelLabel *optional*
\`type: string\`

The label to display when a Fab is open.

#### iconSlot *optional*
\`type: iconSlot?: (style: StyleProp<TextStyle>) => React.ReactNode\`

The icon to display when a Fab is open.

### isOpen *optional*
\`type: string\`

Open or close the root element via parent props

An option array (chould be recursive) to display nested Fabs. The options takes the same arguments as the root Fab
but with and additional \`id: string\` props.
### Other optional props
- ButtonProps
- children: [React.ReactNode]
- style: [ViewStyle](https://microsoft.github.io/reactxp/docs/styles.html#view-style-attributes)
`