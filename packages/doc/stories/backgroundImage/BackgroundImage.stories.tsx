import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Story } from '@storybook/react-native';
import { BorderImage } from '@sproutch/ui'

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

const BackgroundImageMeta = {
  title: 'BackgroundImage',
  component: () => (
    <View style={style.outer}>
      <View style={style.inner}>
        <BorderImage
          uri="https://i.ibb.co/Yhs3Ff5/btn-bg.png"
          borderWidth={16}
          sliceWidth={127}
        />
      </View>
    </View>
  ),
  decorators: [
    (Story: Story) => (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default BackgroundImageMeta;

export const Basic = {};