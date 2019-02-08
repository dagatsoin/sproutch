import { ProgressBar } from '@sproutch/sproutch'
import { number } from '@storybook/addon-knobs'
import * as React from 'react'

export default function({
  animationDuration = 300,
  progress = 50,
}: {
  animationDuration: number
  progress: number
}) {
  return (
    <ProgressBar
      progress={number('Progress', progress, {
        range: true,
        min: 0,
        max: 100,
      })}
      animationDuration={number('Animation duration', animationDuration, {
        range: true,
        min: 0,
        max: 3000,
        step: 10,
      })}
    />
  )
}