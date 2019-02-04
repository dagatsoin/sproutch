import { boolean, number, select, text } from '@storybook/addon-knobs'
import * as React from 'react'
import { Animated, Styles } from 'reactxp'

import { LayoutInfo } from 'reactxp/dist/common/Types'
import { fade } from '../../styles/colorManipulator'
import { DefaultTheme } from '../../styles/theme'
import { Text } from '../text'
import { View } from '../view'
import Tab from './Tab'
import Tabs, { CustomAnimation } from './TabBar'

const FontAwesome = require('react-native-vector-icons/FontAwesome')

function renderCustomCursor(
  { x }: LayoutInfo,
  { width: barWidth }: LayoutInfo,
  theme: DefaultTheme
) {
  return (
    <View
      style={Styles.createViewStyle({
        borderRadius: 1,
        height: 4,
        backgroundColor: fade(
          theme.business.warning.main,
          Math.max(x / barWidth, 0.1)
        ),
        transform: [{ scaleY: 4 }],
      })}
    />
  )
}

const customCursorAnimation: CustomAnimation = (
  { scaleX, scaleY, translateY, rotateZ },
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
      toValue: width - theme.spacing * 2,
      duration: 200,
      easing: Animated.Easing.In(),
    }),
  ]),
  scaleY: Animated.sequence([
    Animated.timing(scaleY, {
      toValue: 30,
      duration: 100,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(scaleY, {
      toValue: 4,
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
  rotateZ: Animated.sequence([
    Animated.timing(rotateZ, {
      toValue: 180,
      duration: 50,
      easing: Animated.Easing.Out(),
    }),
    Animated.timing(rotateZ, {
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
      width: 16,
      height: 16,
      position: 'absolute',
      top: 0,
      right: 0,
    })}
  >
    <Text
      style={Styles.createTextStyle({ color: 'black', textAlign: 'center' })}
    >
      1
    </Text>
  </View>
)

export default function({
  firstTabLabel = 'LARGE ROCKET LABEL',
  otherTabsLabel = 'ROCKET',
  hasIcon = false,
  isDisable = false,
  hasTwoLines = false,
  palette,
  activeTabId = '0',
  tabNumber = 5,
  customCursor = false,
}: any) {
  const paletteKnob = select(
    'Palette',
    [undefined as any, 'primary', 'secondary'],
    palette
  )
  return (
    <>
      <Tabs
        hasTwoLines={boolean('Has two lines', hasTwoLines)}
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
        renderLeftIndicator={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FontAwesome.default name="chevron-left" size={16} color="#ddd" />
          </View>
        )}
        renderRightIndicator={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FontAwesome.default name="chevron-right" size={16} color="#ddd" />
          </View>
        )}
      >
        {setProps => (
          <>
            <Tab
              key={0}
              id="0"
              label={text('First tab label', firstTabLabel)}
              isDisable={boolean('Disabled', isDisable)}
              slot={notification}
              renderIcon={iconStyle => (
                <>
                  {boolean('With icon', hasIcon) && (
                    <FontAwesome.default
                      style={iconStyle}
                      name="rocket"
                      size={30}
                      color="#900"
                    />
                  )}
                </>
              )}
              {...setProps('0')}
            />
            {Array.from(Array(number('Tab number', tabNumber))).map((_, i) => (
              <Tab
                key={i + 1}
                id={i + 1 + ''}
                label={`${otherTabsLabel} ${i + 1}`}
                renderIcon={iconStyle => (
                  <>
                    {boolean('With icon', hasIcon) && (
                      <FontAwesome.default
                        style={iconStyle}
                        name="check"
                        size={30}
                        color="#900"
                      />
                    )}
                  </>
                )}
                {...setProps(i + 1 + '')}
              />
            ))}
          </>
        )}
      </Tabs>
    </>
  )
}
