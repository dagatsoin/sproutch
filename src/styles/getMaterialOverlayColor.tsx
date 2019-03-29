import { colorManipulator } from '.'
import { Theme } from './theme'
export function getMaterialOverlayColor({
  palette,
  theme,
}: {
  palette?: 'primary' | 'secondary'
  theme: Theme<any, any>
}) {
  const isOnPaper = palette !== undefined
  return isOnPaper
    ? // The container used the paper background
      palette
      ? theme && theme.palette[palette].main
      : theme && theme.palette.type === 'light'
      ? '#000'
      : '#fff'
    : // The primary color is used as the container background
    colorManipulator.getLuminance(
        theme && theme.palette[palette || 'primary'].main
      ) >= 0.5
    ? '#000'
    : '#fff'
}
