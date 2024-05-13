import { BorderImage } from '@sproutch/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 128,
    height: 256,
  }
})

const meta: Meta<typeof BorderImage> = {
  title: 'BorderImage',
  component: BorderImage,
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View style={style.outer}>
          <View style={style.inner}>
            <Story />
          </View>
        </View>
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BorderImage>;

export const Primary: Story = {
  args: {
    uri: "https://i.ibb.co/Yhs3Ff5/btn-bg.png",
    borderWidth: 16,
    sliceWidth: 127,
  },
};