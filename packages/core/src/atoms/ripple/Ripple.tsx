import { useContext } from 'react'
import { ThemeContext } from '../../styles/ThemeContext'
import Emitter from './Emitter'
import Particle from './MDRippleParticle'

export type RippleProperties = {
  color?: string
  onRef?: (emitter: Emitter) => void
}

/**
 * Material design ripple effect.
 */
export function Ripple({ onRef, ...props }: RippleProperties) {
  const theme = useContext(ThemeContext)
  return (
    <Emitter
      particle={Particle}
      onRef={onRef}
      options={{
        theme,
        
        ...props,
      }}
    />
  )
}