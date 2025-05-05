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
  component: Fade,
  render: () => {
    const [isVisible, setIsVisible ] = useState(false)
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
            isAnimatedOnMount={false}
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

export const Default: Story = {};