import { BorderImage } from '@sproutch/core';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';


const meta: Meta<typeof BorderImage> = {
  title: 'Core/Atoms/Border image',
  component: BorderImage,
  decorators: [
    (Story, context) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View style={{ width: 128, height: 256, justifyContent: 'center', alignItems: 'center', borderWidth: context.args.borderWidth, borderColor: 'transparent' }}>
          <Story />
          <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#2C262155'}}/>
        </View>
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BorderImage>;

export const Default: Story = {
  args: {
    uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png",
    borderWidth: 16,
    sliceWidth: 127,
  },
};