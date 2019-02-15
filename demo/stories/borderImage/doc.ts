export default `
### Import name
\`BorderImage\`
## Usage
This component displays an image around the border of a container.
In contrary to the web, the image is not placed on the border, but before (on the padding zone).
Some limitations are to be expected:
- no border repeat. Like iOS The image take a one pixel slice and stretch it along the side of the container.
- no \`fill\` param. This component focus only on the border and will present a hole in the center.
Hint: You can cap it by using a BackgroundImage in you container.
- one slice value for the 4 sides. You won't be able to specify a slice position for each side of the image.

\`\`\`
<View
  style={Styles.createViewStyle({
    width: 256,
    height: 512
  })}
>
  <BorderImage
    uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
    borderWidth={32}
    sliceWidth={127}
  />
</View>
\`\`\`
### Properties
#### uri
\`type: string\`

The URL of the image.

#### borderWidth
\`type: number\`

The border width which the image will fit

#### sliceWidth
\`type: number\`

The distance from the border of the image where to slice.
Similar to the CSS [\`border-image-slice\`](https://developer.mozilla.org/fr/docs/Web/CSS/border-image-slice)
Support only one value, applied to the four position.
`