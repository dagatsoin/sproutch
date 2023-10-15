import { Paper, StyleSheet } from '@sproutch/ui'
import * as React from 'react'
import { ScrollView, Text, View } from 'react-native'

const styles = {
  paper: StyleSheet.create({
    root: {
      margin: 15,
      width: 120,
      height: 60,
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

export default {
  title: 'Paper',
  component: () => (
    <ScrollView
      style={{ flex: 1 }}
    >
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}
      >
        <Paper
          style={styles.paper}
          elevation={0}
        >
          <View style={styles.content.root}>
            <Text>0dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={1}
        >
          <View style={styles.content.root}>
            <Text>1dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={2}
        >
          <View style={styles.content.root}>
            <Text>2dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={3}
        >
          <View style={styles.content.root}>
            <Text>3dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={4}
        >
          <View style={styles.content.root}>
            <Text>4dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={5}
        >
          <View style={styles.content.root}>
            <Text>5dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={6}
        >
          <View style={styles.content.root}>
            <Text>6dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={7}
        >
          <View style={styles.content.root}>
            <Text>7dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={8}
        >
          <View style={styles.content.root}>
            <Text>8dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={9}
        >
          <View style={styles.content.root}>
            <Text>9dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={10}
        >
          <View style={styles.content.root}>
            <Text>10dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={11}
        >
          <View style={styles.content.root}>
            <Text>11dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={12}
        >
          <View style={styles.content.root}>
            <Text>12dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={13}
        >
          <View style={styles.content.root}>
            <Text>13dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={14}
        >
          <View style={styles.content.root}>
            <Text>14dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={15}
        >
          <View style={styles.content.root}>
            <Text>15dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={16}
        >
          <View style={styles.content.root}>
            <Text>16dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={17}
        >
          <View style={styles.content.root}>
            <Text>17dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={18}
        >
          <View style={styles.content.root}>
            <Text>18dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={19}
        >
          <View style={styles.content.root}>
            <Text>19dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={20}
        >
          <View style={styles.content.root}>
            <Text>20dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={21}
        >
          <View style={styles.content.root}>
            <Text>21dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={22}
        >
          <View style={styles.content.root}>
            <Text>22dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={23}
        >
          <View style={styles.content.root}>
            <Text>23dp</Text>
          </View>
        </Paper>

        <Paper
          style={styles.paper}
          elevation={24}
        >
          <View style={styles.content.root}>
            <Text>24dp</Text>
          </View>
        </Paper>
      </View>
    </ScrollView>
  )
}

export const Basic = {};
