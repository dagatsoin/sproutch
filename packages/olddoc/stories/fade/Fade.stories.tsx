import { Button, Fade } from '@sproutch/core'
import { useEffect, useState } from 'react'
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

type SpoilerProps = {
  isVisible: boolean
}

function Spoiler({ isVisible }: SpoilerProps) {
  const isAnimatedOnMount = true
  const [isRunning, setIsRunning] = useState(isAnimatedOnMount)

  useEffect(function() {
    if (isVisible) {
      setIsRunning(true)
    }
  }, [isVisible])

  return (isVisible || (!isVisible && isRunning)) && (
    <Fade
      isVisible={isVisible}
      isAnimatedOnMount={isVisible}
      onAnimationEnd={() => {
        setIsRunning(false)
      }}
    >
      <View>
        <Text>Han shot first. Period.</Text>
      </View>
    </Fade>
  )
}

const FadeMeta = {
  title: 'Fade',
  component: () => {
    const [isVisible, setIsVisible ] = useState(true)
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
          <Spoiler isVisible={isVisible} />
        </View>
      </View>
    )
  }
}

export default FadeMeta;

export const Basic = {};