import { ImageBackground } from '@sproutch/core';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';


const meta: Meta<typeof ImageBackground> = {
  title: 'Core/Atoms/Image background',
  component: ImageBackground,
  tags:['!dev'],
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View style={{ width: 128, height: 256, justifyContent: 'center', alignItems: 'center', borderColor: 'transparent' }}>
          <Story />
          <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#2C262155'}}/>
        </View>
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImageBackground>;

export const Default: Story = {
  args: {
    source: { uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png"},
    style: { width: 128, height: 256 },
  },
};