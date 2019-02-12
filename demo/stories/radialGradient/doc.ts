export default `
### Import name
\`RadialGradient\`
### Usage
This component displays a radial gradient. Does not accept children.
\`\`\`
<RadialGradient
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
\`type: [number, number] | [string, string]\`

A tuple of number indicate the origin of the gradient ellipse.
If ommitted, the component will take the center of the element.

### isEllipse *optional*
\`type: boolean\`

The final shape of the gradient. If true, the shape will be function of the container width/height.

### radius *optional*
\`type: number | 'closest-corner' | 'farthest-side' | 'farthest-corner'\`

Like in CSS, this represent the radius of the final ellipse of the gradient. It can be a \`number\` in pixel unit. Or a string:
- \`closest-side\` The gradient's ending shape meets the side of the box closest to its center (for circles) or meets both the vertical and horizontal sides closest to the center (for ellipses).
- \`closest-corner\` The gradient's ending shape is sized so that it exactly meets the closest corner of the box from its center.
- \`farthest-side\`	Similar to closest-side, except the ending shape is sized to meet the side of the box farthest from its center (or vertical and horizontal sides).
- \`farthest-corner\`	The gradient's ending shape is sized so that it exactly meets the farthest corner of the box from its center.

### Other optional props
- style: [ViewStyle](https://microsoft.github.io/reactxp/docs/styles.html#view-style-attributes)
`