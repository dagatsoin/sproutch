import { useEffect, useState } from 'react'

export function useWindowDimensions(): {
  width: number
  height: number
} {
  const [window, setWindow] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })

  function onResize() {
    setWindow({ width: window.width, height: window.height })
  }

  useEffect(() => {
    addEventListener('resize', onResize)
    return () => {
      removeEventListener('resize', onResize)
    }
  })
  return window
}
