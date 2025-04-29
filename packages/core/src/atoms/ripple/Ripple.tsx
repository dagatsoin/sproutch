import { useContext } from 'react'
import { ThemeContext } from '../../styles/ThemeContext'
import Emitter from './Emitter'
import Particle from './MDRippleParticle'

export type RippleProperties = {
  color?: string
  onRef?: (emitter: Emitter) => void
}

export default ({ onRef, ...props }: RippleProperties) => {
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