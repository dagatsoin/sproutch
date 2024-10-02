import * as React from 'react'
/* import FontAwesome from '@expo/vector-icons/FontAwesome5'; */
import { Animated, LayoutRectangle, StyleSheet, Text, View } from 'react-native';
import {
  colorManipulator,
  DefaultTheme,
  easing,
} from '@sproutch/core/styles'
import {
  CustomTabBarCursorAnimation,
  TabBar,
  TabProps,
} from '@sproutch/tabs'
import type{ Meta, StoryObj } from '@storybook/react';



const styles = {
  notification: StyleSheet.create({
    root: {
      backgroundColor: 'red',
      borderRadius: 10,
      minWidth: 20,
      padding: 4,
      position: 'absolute',
      top: 0,
      right: 0,
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 10,
    }
  })
}

function renderCustomCursor(
  { x }: LayoutRectangle,
  { width: barWidth }: LayoutRectangle,
  theme: DefaultTheme
) {
  return (
    <View
      style={{
        position: 'absolute',
        width: 1,
        height: 4,
        top: 44,
        backgroundColor: colorManipulator.fade(
          theme.business.warning.main,
          Math.max(x / Math.max(barWidth, 1), 0.1)
        ),
      }}
    />
  )
}

const customCursorAnimation: CustomTabBarCursorAnimation = (
  { scaleX, scaleY, translateY, rotate },
  { width },
  theme
) => ({
  scaleX: Animated.sequence([
    Animated.timing(scaleX, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
      easing: easing.easeOut,
    }),
    Animated.timing(scaleX, {
      toValue: width - theme.spacing * 4,
      useNativeDriver: true,
      duration: 200,
      easing: easing.easeIn,
    }),
  ]),
  scaleY: Animated.sequence([
    Animated.timing(scaleY, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
      easing: easing.easeOut,
    }),
    Animated.timing(scaleY, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
      easing: easing.easeIn,
    }),
  ]),
  translateY: Animated.sequence([
    Animated.timing(translateY, {
      toValue: -30,
      useNativeDriver: true,
      duration: 50,
      easing: easing.easeOut,
    }),
    Animated.timing(translateY, {
      toValue: 0,
      useNativeDriver: true,
      duration: 50,
      easing: easing.easeIn,
    }),
  ]),
  rotate: Animated.sequence([
    Animated.timing(rotate, {
      toValue: 180,
      useNativeDriver: true,
      duration: 50,
      easing: easing.easeOut,
    }),
    Animated.timing(rotate, {
      toValue: 0,
      useNativeDriver: true,
      duration: 50,
      easing: easing.easeIn,
    }),
  ]),
})

const notification = (
  <View style={styles.notification.root}>
    <Text style={styles.notification.text}>1</Text>
  </View>
)

type TabBarPropsAndCustomArgs = React.ComponentProps<typeof TabBar> & {
  firstTabLabel: string
  numberOfTabs: number
  otherTabBarLabel: string
  hasIcon: boolean
  isDisabled: boolean
  useCustomCursor: boolean
}


const meta: Meta<TabBarPropsAndCustomArgs> = {
  component: TabBar,
  argTypes: {
    palette: {
      options: [undefined, 'primary', 'secondary'],
      control: { type: 'select' },
    },
    hasIcon: {
      type: 'boolean',
      description: 'With icon'
    },
    hasIconOnTop: {
      type: 'boolean',
      description: 'Has two lines'
    },
    activeTabId: {
      options: ['0', '1', '2', '3', '4', '5'],
      control: { type: 'select' },
    },
    useCustomCursor: {
      type: 'boolean',
      description: 'Use custom cursor'
    },
    firstTabLabel: {
      control: 'text',
      description: 'First tab label',
    },
    otherTabBarLabel: {
      control: 'text',
      description: 'Other tabs label',
    }
  }
};

type Story = StoryObj<TabBarPropsAndCustomArgs>;


export default meta;

export const Basic: Story = {
  render: (props) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <TabBar
        paddingHorizontal={0}
        isFrozen={props.isFrozen}
        hasIconOnTop={props.hasIconOnTop}
        palette={props.palette}
        activeTabId={props.activeTabId}
        customCursorAnimation={props.useCustomCursor
            ? customCursorAnimation
            : undefined
        }
        renderCustomCursor={props.useCustomCursor
          ? renderCustomCursor
          : undefined
      }
        leftScrollButton={theme => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i>j</i>
          </View>
        )}
        rightScrollButton={theme => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i>j</i>
          </View>
        )}
        tabs={[
          {
            id: '0',
            label: props.firstTabLabel,
            isDisabled: props.isDisabled,
            badgeSlot: notification,

          },
          ...Array.from(Array(props.numberOfTabs)).map<TabProps>((_, i) => ({
            id: i + 1 + '',
            label: `${props.otherTabBarLabel} ${i + 1}`,
          })),
        ]}
      />
    </View>
  ),
  args: {
    isDisabled: false,
    palette: undefined,
    activeTabId: '0',
    numberOfTabs: 4,
    firstTabLabel: 'LARGE ROCKET LABEL',
    otherTabBarLabel: 'ROCKET',
    hasIcon: false,
    hasIconOnTop: false,
    useCustomCursor: false,
    isFrozen: false
  }
}