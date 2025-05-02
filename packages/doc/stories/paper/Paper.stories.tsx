import { Paper } from '@sproutch/core'
import { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, Text, View } from 'react-native'
import { range } from '../../utils';

const styles = {
  paper: StyleSheet.create({
    root: {
      borderRadius: 4,
      margin: 15,
      width: 256,
      height: 128,
    }
  }),
  content: StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })
}

const meta: Meta<typeof Paper> = {
  title: 'Core/Layout/Paper',
  component: Paper,
  argTypes: {
    elevation: range({min: 0, max: 24, step: 1}),
  },
  decorators: (Story) => (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Story />
    </View>
  )
}

export default meta;

type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  tags: ['!dev'],
  args: {
    elevation: 1
  },
  render: args => (
    <Paper
      style={styles.paper}
      elevation={args.elevation}
    >
      <View style={styles.content.root}>
        <Text>{args.elevation}dp</Text>
      </View>
    </Paper>
  )
}