import { ThemeContext } from '../../styles'
import { useContext } from 'react'
import { ImageBackground as RNImageBackground, type ImageBackgroundProps as RNImageBackgroundProps } from 'react-native'


export function ImageBackground(props: RNImageBackgroundProps) {
    const theme = useContext(ThemeContext)

  return <RNImageBackground 
    style={theme.palette.background.default.container}
    imageStyle={theme.palette.background.default.image}
    {...props}
/>
}