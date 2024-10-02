import { ThemeContext } from '../../styles/ThemeContext'
import Emitter from './Emitter'
import Particle from './MDRippleParticle'

export type RippleProperties = {
  color?: string
  onRef?: (emitter: Emitter) => void
}

export default ({ onRef, ...props }: RippleProperties) => (
  <ThemeContext.Consumer>
    {theme => (
      <Emitter
        particle={Particle}
        onRef={onRef}
        options={{
          theme,
          
          ...props,
        }}
      />
    )}
  </ThemeContext.Consumer>
)
