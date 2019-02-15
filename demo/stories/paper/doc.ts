export default `
### Import name
\`Paper\`
### Usage
This component is a container which implements the Material Design Paper specifications.
\`\`\`
<Paper
  elevation={10}
  style={{
    width: 232,
    height: 132,
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

#### square *optional*
\`type: boolean\`

Remove round border

The event handler of the Ripple. Due to an issue limitation of ReactXP

### Other optional props
- style: [ViewStyle](https://microsoft.github.io/reactxp/docs/styles.html#view-style-attributes)
- children?: React.React.ReactNode
`