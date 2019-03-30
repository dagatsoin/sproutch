import { LayoutInfo } from '../view'

export type ParticleProps<O> = {
  id: number
  isDying: boolean
  emitterLayout: LayoutInfo
  x: number
  y: number
  options: O
  onDeath: () => void
}
