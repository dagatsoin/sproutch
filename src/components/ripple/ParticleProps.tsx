import { LayoutInfo } from '../view'

export type ParticleProps = {
  id: number
  isDying: boolean
  emitterLayout: LayoutInfo
  x: number
  y: number
  options?: {
    isOnPaper?: boolean
    palette?: 'primary' | 'secondary'
  }
  onDeath: () => void
}
