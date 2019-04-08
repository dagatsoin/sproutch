export default `

### Import name
\`Button\`
### Usage
A Material UI button.
\`\`\`
  <Button
    style={style}
    variant="contained"
    label="RAISED"
    elevation={4}
  />
\`\`\`

### Props

#### onClick *optional*
\`type: (e: Types.SyntheticEvent) => void\`

The click handler.

#### isDisabled *optional*
\`type: boolean\`

If true, the button is disabled.

#### elevation *optional*
\`type: number\`

The elevation of the component.

#### isDense *optional*
\`type: boolean\`

If true, display a smaller button.

#### label *optional*
\`type: string\`

The button label.

#### palette *optional*
\`type: primary | secondary\`

The palette to use. If set, it will affect the background color.
If \`variant\` is also set on \`text\` or \`outline\`, it will set the label color.

#### variant *optional*
\`type: primary | secondary\`

Set the variant of the button according to the Material Design specs.

#### iconSlot *optional*
\`type: iconSlot?: (style: StyleProp<TextStyle>) => React.ReactNode\`

The icon rendering slot. It take in parameter a style to use with you Icon.

exemple:
\`\`\`
<Button
  style={style}
  variant="contained"
  iconSlot={iconStyle => (
    <FontAwesome.default style={iconStyle} name="search" />
  )}
  label="SEARCH"
/>
\`\`\`

#### badgeSlot
\`type: (theme: Theme<any, any>) => React.ReactNode\`

Use this to display a notification badge.

#### backgroundSlot *optional*
\`type: (theme: Theme<any, any>) => React.ReactNode\`

Render slot for a deeper customization. Exemple: set a borderImage to the button.

\`\`\`
<Button
  style={{
    root: {
      ...(style.root as object),
      ...(Styles.createViewStyle({
        borderRadius: 16,
      }) as object),
    },
    content: {
      borderRadius: 16,
    },
    label: {
      color: '#FFE082',
    },
    icon: {
      color: '#FFE082',
    },
  }}
  variant="text"
  label="CONTACT"
  iconSlot={iconStyle => (
    <FontAwesome.default style={iconStyle} name="user" />
  )}
  backgroundSlot={() => (
    <View
      style={Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      })}
    >
      <BorderImage
        uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
        borderWidth={18}
        sliceWidth={127}
      />
    </View>
  )}
/>
\`\`\`

### Style

\`type ButtonStyle = {
    root: StyleProp<ViewStyle>
    content: StyleProp<ViewStyle>
    icon: StyleProp<Types.TextStyle>
    label: StyleProp<Types.TextStyle>
    overlay: StyleProp<ViewStyle>
}\`

- \`root:\` use only exterior properties here (eg: use margin, borderRadius, etc. But not padding)
- \`content\`: the internal container. You can use padding, background color, etc.
- \`icon\`: the optional icon style
- \`label\`: the text label 
- \`overlay\`: the overlay which appears during an mouseover
`