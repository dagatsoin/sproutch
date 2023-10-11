export default `
### Import name
\`Fade\`
### Usage
This component makes its child (dis)appear with a fade.
\`\`\`
<Fade isVisible={this.state.isVisible}/>
\`\`\`
### Properties

#### isVisible
\`type: boolean\`

Makes (dis)appear the children

#### isAnimatedOnMount - *optional*
\`type: boolean\`

Default to true. On mount, animate the fading to the \`isVisible\` prop value. Set it to false, when you don't need an entrance (dis)apparition.

#### duration - *optional*
\`type: number\`

The animation duration.

#### onAnimationEnd - *optional*
\`type: () => void\`

Triggered at the end of the fade.

### Other optional props
- children: [React.ReactNode]
- style: [ViewStyle](https://microsoft.github.io/reactxp/docs/styles.html#view-style-attributes)
`