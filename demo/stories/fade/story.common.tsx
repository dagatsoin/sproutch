import { Button, Fade, Text, View } from '@sproutch/ui'
import * as React from 'react'

import * as styles from './styles'

type State = {
  isVisible: boolean
}

export default class extends React.PureComponent<{}, State> {
  public state: State = {
    isVisible: true,
  }

  public render() {
    const { isVisible } = this.state
    return (
      <View style={styles.root}>
        <Button label="Toggle" onPress={() => this.setState({ isVisible: !isVisible })} />
        <View style={styles.fadeContainer}>
          <Fade isVisible={isVisible} isAnimatedOnMount>
            <View>
              <Text>Fading element</Text>
            </View>
          </Fade>
        </View>
      </View>
    )
  }
}
