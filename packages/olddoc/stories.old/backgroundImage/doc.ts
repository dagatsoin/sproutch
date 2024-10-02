export default `
### Import name
\`BackgroundImage\`
### Usage
This component displays a background image inside a container. Does not accept children.
\`\`\`
<View
  style={Styles.createViewStyle({
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderWidth: 10,
    width: 128,
    height: 128
  })}
>
  <BackgroundImage
    uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
    resizeMode="cover"
  />
  {children}
</View>
\`\`\`
### Properties
#### source
\`type: string\`

The uri of the image to fetch.

#### resizeMode
\`type: 'stretch' | 'contain' | 'cover' | 'auto'\`

The resize method, similar to the [RN property](https://facebook.github.io/react-native/docs/image#resizemode)

### repeat *optional*
\`type: boolean\`
If true, repeat the pattern along X and Y axis.

### position *optional*
\`type: [string, string]\`

Available in \`auto\` resize mode. A tupple of string which will offset the top/left of the image.
eg: \`['50px', '50px'] or['50%', '50%']\`
`