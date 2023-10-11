import {
  Animated,
  colorManipulator,
  CustomTabBarCursorAnimation,
  DefaultTheme,
  TabBar,
  Text,
  View,
} from '@sproutch/ui'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import * as React from 'react'
import { Styles } from 'reactxp'

import { LayoutInfo } from 'reactxp/dist/common/Types'

// tslint:disable-next-line: no-var-requires
const FontAwesome = require('react-native-vector-icons/FontAwesome')

function renderCustomCursor(
  { x }: LayoutInfo,
  { width: barWidth }: LayoutInfo,
  theme: DefaultTheme
) {
  return (
    <View
      style={Styles.createViewStyle({
        position: 'absolute',
        width: 1,
        height: 4,
        top: 44,
        backgroundColor: colorManipulator.fade(
          theme.business.warning.main,
          Math.max(x / Math.max(barWidth, 1), 0.1)
        ),
      })}
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
      duration: 100,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(scaleX, {
      toValue: width - theme.spacing * 4,
      duration: 200,
      easing: Animated.Easing.In(),
    }),
  ]),
  scaleY: Animated.sequence([
    Animated.timing(scaleY, {
      toValue: 1,
      duration: 100,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(scaleY, {
      toValue: 1,
      duration: 200,
      easing: Animated.Easing.In(),
    }),
  ]),
  translateY: Animated.sequence([
    Animated.timing(translateY, {
      toValue: -30,
      duration: 50,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(translateY, {
      toValue: 0,
      duration: 50,
      easing: Animated.Easing.In(),
    }),
  ]),
  rotate: Animated.sequence([
    Animated.timing(rotate, {
      toValue: 180,
      duration: 50,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(rotate, {
      toValue: 0,
      duration: 50,
      easing: Animated.Easing.In(),
    }),
  ]),
})

const notification = (
  <View
    style={Styles.createViewStyle({
      backgroundColor: 'red',
      borderRadius: 10,
      minWidth: 20,
      padding: 4,
      position: 'absolute',
      top: 0,
      right: 0,
    })}
  >
    <Text
      style={Styles.createTextStyle({
        color: 'white',
        textAlign: 'center',
        fontSize: 10,
      })}
    >
      1
    </Text>
  </View>
)

export default function({
  firstTabLabel = 'LARGE ROCKET LABEL',
  otherTabBarLabel = 'ROCKET',
  hasIcon = false,
  isDisabled = false,
  hasIconOnTop = false,
  palette,
  activeTabId = '0',
  tabNumber = 4,
  customCursor = false,
  isFrozen = boolean('Freeze the tabs bar', false)
}: any) {
  const paletteKnob = select(
    'Palette',
    [undefined as any, 'primary', 'secondary'],
    palette
  )
  return (
    <View
      style={Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
      })}
    >
      <TabBar
        isFrozen={isFrozen}
        hasIconOnTop={boolean('Has two lines', hasIconOnTop)}
        palette={paletteKnob || undefined}
        activeTabId={select('Tab', ['0', '1', '2', '3', '4', '5'], activeTabId)}
        customCursorAnimation={
          boolean('With custom cursor', customCursor)
            ? customCursorAnimation
            : undefined
        }
        renderCustomCursor={
          boolean('With custom cursor', customCursor)
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
            <FontAwesome.default
              name="chevron-left"
              size={16}
              color={
                paletteKnob
                  ? theme.palette[paletteKnob].main
                  : theme.palette.primary.contrastText
              }
            />
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
            <FontAwesome.default
              name="chevron-right"
              size={16}
              color={
                paletteKnob
                  ? theme.palette[paletteKnob].main
                  : theme.palette.primary.contrastText
              }
            />
          </View>
        )}
        tabs={[
          {
            id: '0',
            label: text('First tab label', firstTabLabel),
            isDisabled: boolean('Disabled', isDisabled),
            badgeSlot: notification,
            iconSlot:
              boolean('With icon', hasIcon) ?
              (iconStyle => (
                <FontAwesome.default
                  style={iconStyle}
                  name="rocket"
                  size={30}
                />
              )) : undefined,
          },
          ...Array.from(Array(number('Tab number', tabNumber))).map((_, i) => ({
            id: i + 1 + '',
            label: `${otherTabBarLabel} ${i + 1}`,
            iconSlot:
              boolean('With icon', hasIcon)
              ? (iconStyle => (
                <FontAwesome.default style={iconStyle} name="check" size={30} />
              ))
              : undefined,
          })),
        ]}
      />
    </View>
  )
}
