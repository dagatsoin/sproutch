import * as React from 'react'
import { RadialGradient, RadialGradientProps } from '@sproutch/ui'
import { View } from 'react-native'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RadialGradient> = {
  component: RadialGradient,
  decorators: [(Story) => <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Story/>
  </View>]
}

export default meta
type Story = StoryObj<typeof RadialGradient>

export const Radius: Story = {
  name: "Radius",
  argTypes: {
    radius: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      options: [
        'closest-side',
        'closest-corner',
        'farthest-side',
        'farthest-corner',
      ],
    }
  },
  args: {
    radius: 'closest-side',
    style: {
      width: 200,
      height: 200,
    },
    isEllipse: true,
    colors: ['#A3D', '#000', '#00f', '#0D0'],
    stops: [0.01, 0.5, 0.99, 1], 
  }
}