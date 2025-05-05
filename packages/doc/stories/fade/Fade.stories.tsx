import { Button, Fade } from '@sproutch/core'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    flex: 0
  },
  fadeContainer: {
    marginTop: 50,
    height: 50,
  }
})
const meta: Meta<typeof Fade> = {
  title: 'Core/Layout/Fading container',
  tags:['!dev'],
  argTypes: {
    isAnimatedOnMount: { control: false }
  },
  component: Fade,
  render: (args) => {
    const [isVisible, setIsVisible ] = useState(args.isVisible)
    return (
      <View style={styles.root}>
        <Button
          style={{root: styles.button}}
          label="Spoiler alert"
          onPress={() => {
            setIsVisible(!isVisible)
          }}
        />
        <View style={styles.fadeContainer}>
          <Fade
            isVisible={isVisible}
            isAnimatedOnMount={args.isAnimatedOnMount}
          >
            <View>
              <Text>Han shot first. Period.</Text>
            </View>
          </Fade>
        </View>
      </View>
    )
  }
}

export default meta;
type Story = StoryObj<typeof Fade>;

export const Default: Story = {
  args: {
    isAnimatedOnMount: true
  }
};