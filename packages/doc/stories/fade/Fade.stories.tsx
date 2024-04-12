import { Button, Fade, StyleSheet } from '@sproutch/ui'
import { PureComponent, useState } from 'react'
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

type SpoilerState = {
  isIdle: boolean
}

class Spoiler extends PureComponent<SpoilerProps, SpoilerState> {
  constructor(props: SpoilerProps) {
    super(props)
    this.state = {
      isIdle: !props.isVisible,
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: SpoilerProps) {
    if (this.props.isVisible !== nextProps.isVisible && nextProps.isVisible) {
      this.setState({ isIdle: false })
    }
  }

  public render() {
    const { isVisible } = this.props
    const { isIdle } = this.state
    
    return !isIdle && (
      <Fade
        isVisible={isVisible}
        isAnimatedOnMount={isVisible}
        onAnimationEnd={this.setIdle}
      >
        <View>
          <Text>Han shot first. Period.</Text>
        </View>
      </Fade>
    )
  }

  private setIdle = () => {
    const { isVisible } = this.props
    if (!isVisible) {
      this.setState({ isIdle: true })
    }
  }
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