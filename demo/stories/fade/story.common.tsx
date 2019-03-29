import { Button, Fade, Text, View } from '@sproutch/ui'
import * as React from 'react'

import * as styles from './styles'

type StoryState = {
  isVisible: boolean
}

type SpoilerProps = {
  isVisible: boolean
}

type SpoilerState = {
  isIdle: boolean
}

class Spoiler extends React.PureComponent<SpoilerProps, SpoilerState> {
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

// tslint:disable-next-line: max-classes-per-file
export default class extends React.PureComponent<{}, StoryState> {
  public state: StoryState = {
    isVisible: false,
  }

  public render() {
    const { isVisible } = this.state
    return (
      <View style={styles.root}>
        <Button
          style={{root: styles.button}}
          label="Spoiler alert"
          onPress={() => this.setState({ isVisible: !isVisible })}
        />
        <View style={styles.fadeContainer}>
          <Spoiler isVisible={isVisible} />
        </View>
      </View>
    )
  }
}