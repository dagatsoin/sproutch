import { Button, Fade, StyleSheet } from '@sproutch/ui'
import { useMemo, useRef, useState } from 'react'
import { Text, View } from 'react-native'

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
  const [isIdle, setIsIdle] = useState(isVisible)
  const prevIsVisible = useRef(isVisible)

  useMemo(function() {
    if (prevIsVisible.current !== isVisible && isVisible) {
      setIsIdle(false)
    }
  }, [isVisible])

  return !isIdle && (
    <Fade
      isVisible={isVisible}
      isAnimatedOnMount={isVisible}
      onAnimationEnd={() => {
        if (!isVisible) {
          setIsIdle(true)
        }
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
    const [isVisible, setIsVisible ] = useState(false)
    return (
      <View style={styles.root}>
        <Button
          style={{root: styles.button}}
          label="Spoiler alert"
          onPress={() => setIsVisible(!isVisible)}
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