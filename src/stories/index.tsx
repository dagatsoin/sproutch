import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StyleSheet, View, Text } from 'react-native'

const style = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

type Props = {
  children: React.ReactNode
}

const CenteredView = ({ children }: Props) => (
  <View style={style.centered}>{children}</View>
)

storiesOf('CenteredView', module).add('default view', () => (
  <CenteredView>
    <Text>Hello Storybook</Text>
  </CenteredView>
))
