import { BackgroundImage, BorderImage } from '@sproutch/core';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageSourcePropType, View } from 'react-native';
import BtnBorder from '../../assets/btn-bg.png'
import SpeedFlask from '../../assets/flask_speed.png'

type BorderImageCustomArgs = React.ComponentProps<typeof BorderImage> & {
  viewWidth: number
  viewHeight: number
};

const meta: Meta<BorderImageCustomArgs> = {
  title: 'Core/Atoms/Border image',
  component: BorderImage,
  tags:['!dev'],
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>  
        <Story />
      </View>
    ),
  ],
  render: (args) => (
    <View style={{ width: args.viewWidth, height: args.viewHeight, justifyContent: 'center', alignItems: 'center', borderWidth: args.borderWidth, borderColor: 'transparent', padding: args.borderWidth }}>
      <BorderImage {...args}/>
      <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#2C2621'}}>
        <BackgroundImage source={SpeedFlask as ImageSourcePropType} size='contain' style={{flex: 1, height: '100%' }} position='50% 50%'/>
      </View>
    </View>
  )
};

export default meta;
type Story = StoryObj<BorderImageCustomArgs>;

export const Default: Story = {
  argTypes: {
    viewWidth: { control: { type: 'range', min: 64, max: 512 }},
    viewHeight: { control: { type: 'range', min: 64, max: 512 }},
  },
  args: {
    viewHeight: 256,
    viewWidth: 256,
    source: BtnBorder as ImageSourcePropType,
    borderWidth: 32,
    sliceWidth: 127,
  },
};