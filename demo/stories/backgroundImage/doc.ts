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
#### uri
\`type: string\`

The URL of the image.

#### resizeMode
\`type: 'stretch' | 'contain' | 'cover' | 'auto' | 'repeat'\`

The resize method, similar to the [RN property](https://facebook.github.io/react-native/docs/image#resizemode)
`