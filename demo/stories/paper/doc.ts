export default `
### Import name
\`Paper\`
### Usage
This component is a container which implements the Material Design Paper specifications.
\`\`\`
<Paper
  elevation={10}
  style={
    root: {
      width: 232,
      height: 132,
    }
  }}
>
   <Text
      style={Styles.createTextStyle({
        textAlign: 'center',
      })}
    >
      "I am at level 10"
    </Text>
  </View>
</Paper>
\`\`\`
### Properties

#### elevation *optional*
\`type: number\`

From 0 to 24, the Material Design elevation number.

### Style

\`type ButtonStyle = {
    root: StyleProp<ViewStyle>
    content: StyleProp<ViewStyle>
}\`

- \`root:\` use only exterior properties here (eg: use margin, borderRadius, etc. But not padding)
- \`content\`: the internal container. You can use padding, background color, etc.
`