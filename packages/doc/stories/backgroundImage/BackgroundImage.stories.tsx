import { BackgroundImage } from '@sproutch/core';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageSourcePropType, Text, View } from 'react-native';
import Lava from '../../assets/lava.png'
import { BackgroundSize } from '../../../core/src/layout/imageBackground/BackgroundImageProps';

type BackgroundImageCustomArgs = React.ComponentProps<typeof BackgroundImage> & {
  imageSize?: string
};

const meta: Meta<BackgroundImageCustomArgs> = {
  title: 'Core/Layout/Background Image',
  component: BackgroundImage,
  argTypes: {
    style: {
      control: {disable: true},
    },
    position: {
      control: {
        type: 'text'
      }
    },
    size: {
      control: 'select',
      options: ['cover', 'contain', 'stretch', 'none', 'custom'],
    },
    imageSize: {
      if: { arg: 'size', eq: 'custom' },
      control: {
        type: 'text'
      },
    },
    children: {
      control: false
    }
  },
  decorators: [
    Story => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  render: ({ imageSize, ...args }) => {
    const hasCustomSize = args.size && /d/.test(args.size)

    const props = {
      ...args,
      size: (hasCustomSize ? imageSize : args.size) as BackgroundSize
    }

    return <BackgroundImage {...props}/>
  }
};

export default meta;
type Story = StoryObj<BackgroundImageCustomArgs>;

export const Default: Story = {
  tags: ['!dev'],
  args: { 
    source: Lava as ImageSourcePropType,
    repeat: false,
    position: "5% 90%",
    size: 'cover',
    imageSize: "50px 50px",
    style: { width: 128, height: 256, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    children: <View style={{ display: 'flex', height: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white'}}>SPROUTCH</Text>
    </View>
  },
};