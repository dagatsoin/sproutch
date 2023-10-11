import { useEffect, useState } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

export function useWindowDimensions(): {
  width: number
  height: number
} {
  const [window, setWindow] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  function onChange({ window: _window }: { window: ScaledSize }) {
    setWindow(_window)
  }

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)
    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  })
  return window
}
