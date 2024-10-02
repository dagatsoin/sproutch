import { LayoutRectangle } from "react-native"

export type ParticleProps<O> = {
  id: number
  isDying: boolean
  emitterLayout: LayoutRectangle
  x: number
  y: number
  options: O
  onDeath: () => void
}
