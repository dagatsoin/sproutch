export default `
### Import name
\`LinearGradient\`
### Usage
This component displays a linear gradient. Does not accept children.
\`\`\`
<LinearGradient
  style={{
    width: 200,
    height: 200,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5
  }}
  colors={['#eee', '#B4985F']}
/>
\`\`\`
### Properties

This API sticks to the [Expo Linear Gradient](https://docs.expo.io/versions/v28.0.0/sdk/linear-gradient)

#### colors
\`type: string[]\`

An array of colors that represent stops in the gradient. At least two colors are required (otherwise it's not a gradient, it's just a fill!).

#### start - *optional*
\`type: [number, number]\`

An array of [x, y] where x and y are floats. They represent the position that the gradient starts at, as a fraction of the overall size of the gradient. For example, [0.1, 0.1] means that the gradient will start 10% from the top and 10% from the left.

#### end - *optional*
\`type: [number, number]\`

Same as start but for the end of the gradient.

#### locations - *optional*
\`type: number[]\`

An array of the same lenth as colors, where each element is a float with the same meaning as the start and end values, but instead they indicate where the color at that index should be.

### Other optional props
- style: [ViewStyle](https://microsoft.github.io/reactxp/docs/styles.html#view-style-attributes)
`