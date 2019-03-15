import { LayoutInfo } from '../view'

export type ParticleProps = {
  id: number
  isDying: boolean
  emitterLayout: LayoutInfo
  x: number
  y: number
  options?: {
    isOnPaper?: boolean
    color?: string
    palette?: 'primary' | 'secondary'
  }
  onDeath: () => void
}
