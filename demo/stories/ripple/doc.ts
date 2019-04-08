export default `
### Import name
\`RippleGenerator\`
### Usage
This component displays a Material Design Ripple on user press.

Like BackgroundImage, this element will stick in absolute position, taking the whole surface of its container.

Note: due to an [issue](https://github.com/Microsoft/reactxp/issues/1012) in ReactXP, the action event handler of you container should take place in the onPres props of the RipppleGenerator.
\`\`\`
<Paper
  elevation={4}
  style={{
    width: 232,
    height: 132,
  }}
>
  <Ripple
    onPress={console.log}
    isOnPaper
  />
</Paper>
\`\`\`
### Properties

#### color *optional*
\`type: string\`

The ripple teint. Take the precedence on \`palette\` attribute.

### onPress *optional*
\`type: (e: Types.SyntheticEvent) => void\`

The event handler of the Ripple. Due to an issue limitation of ReactXP
`