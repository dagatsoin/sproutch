import { StyleObject, ViewStyle, Styles } from '../../styles/createStyleSheet'
import { Theme } from '../../styles/theme'

type RootStyle = {
  root: StyleObject<ViewStyle>
}

export default Styles.createViewStyle({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
})
