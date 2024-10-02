export default `
### Import name
\`List\` and \`ListItem\`
### Usage
This component displays a vertical list of items.
\`\`\`
<List>
  <ListItem
    key="100"
    title="The cake is a lie"
    meta="day 100"
    text="I am still stuck, Glados watching my back. I can feel it."
  />
  <ListItem
    key="101"
    title="The cake is a lie"
    meta="day 101"
    text="I am still stuck, Glados watching my back. I can feel it."
  />
  <ListItem
    key="102"
    title="The cake is a lie"
    meta="day 102"
    text="I am still stuck, Glados watching my back. I can feel it."
  />
  <ListItem
    key="103"
    title="The cake is a lie"
    meta="day 103"
    text="I am still stuck, Glados watching my back. I can feel it."
  />
</List>
\`\`\`

### Properties of List

#### style *optional*
\`type: ViewStyle\`

Style applied on the list container.

### Properties of ListItem
  
### circleImageSlot *optional*
\`type: React.ReactNode\`

The image slot.

#### squareImageSlot *optional*
\`type: string\`

The left square image source.

### renderLeftIcon *optional*
\`type: (iconStyle: StyleProp<TextStyle>) => React.ReactNode \`

Display an icon on the left.

### renderLeftCircleIcon *optional*
\`type: (iconStyle: StyleProp<TextStyle>) => React.ReactNode \`

Display an circled icon on the left

#### textSlot *optional*
\`type: React.ReactNode\`

Slot before the title

#### title *optional*
\`type: string\`

The title. Appearing in bold and primary color.

#### meta *optional*
\`type: string\`

The meta description. Use this for add information as date/author/price... in italic.

#### metaSlot *optional*
\`type: React.ReactNode\`

Slot before the meta

#### text *optional*
\`type: string\`

#### textSlot *optional*
\`type: React.ReactNode\`

Slot before the text

### hasTwoLinesText *optional*
\`type: boolean\`

If there is no \`meta\`, the text can be set on two lines.

#### palette *optional*
\`type: 'primary' | 'secondary'\`

The palette affect the title, overlay and ripple color.

### isLast *optional*
\`type: boolean\`

If true, will remove the last divider

### mainAction *optional*
\`type: () => void\`

The main action when when the user clicks on the item.

### rightSlot *optional*
\`type: React.ReactNode\`

The right slot which is meant to received text or control like check box or switch.

### centerSlot *optional*
\`type: React.ReactNode\`

The center slot which takes place behind the text.

### renderRightIcon *optional*
\`type: (iconStyle: StyleProp<TextStyle>) => React.ReactNode \`

The right icon slot renderer.

#### style *optional*
\`type: Partial<ListItemStyleOverride>\`

You can pass a style object with those keys to override the default style:

\`\`\`  
{
  root: ViewStyle
  leftIconContainer: ViewStyle
  circleIconContainer: ViewStyle
  circleImageContainer: ViewStyle
  squareImageContainer: ViewStyle
  iconStyle: TextStyle
  iconCircleStyle: TextStyle
  center: TextStyle
  title: TextStyle
  meta: TextStyle
  text: TextStyle
  right: ViewStyle
  mainButton: ButtonStyleOverride
}
\`\`\`
`