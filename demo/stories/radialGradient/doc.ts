export default `
### Import name
\`RadialGradient\`
### Usage
This component displays a radial gradient. Does not accept children.
\`\`\`
<RadialGradient
  isPercent
  style={{
    width: 200,
    height: 200,
  }}
  colors={['#edd33e', '#B4985F', '#0000ff']}
  stops={[0.1, 0.5, 0.6]}
  center={[50, 100]}
  radius={100}
/>
\`\`\`
### Properties

#### colors
\`type: string[]\`

An array of colors that represent stops in the gradient. At least two colors are required (otherwise it's not a gradient, it's just a fill!).

#### stops
\`type: number[]\`

An array of the same lenth as colors, where each element is a float with the same meaning as the start and end values, but instead they indicate where the color at that index should be.

### center *optional*
\`type: [number, number]\`

A tuple of number indicate the origin of the gradient ellipse.
If ommitted, the component will take the center of the element.

### isPercent *optional*
\`type: boolean\`

If true, the center tupple will be set as percent, otherwise in pixel.

### Other optional props
- style: [ViewStyle](https://microsoft.github.io/reactxp/docs/styles.html#view-style-attributes)
`