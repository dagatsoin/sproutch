import * as React from 'react'
import { text, boolean, select } from '@storybook/addon-knobs'
import { Animated, Styles } from 'reactxp'

import Tab from './Tab'
import Tabs, { CustomAnimation } from './TabBar'
import { View } from '../view'
import { LayoutInfo } from 'reactxp/dist/common/Types';
import { DefaultTheme } from '../../styles/theme';
import { fade } from '../../styles/colorManipulator';

const FontAwesome = require('react-native-vector-icons/FontAwesome')

export default function({
    label = 'ROCKET',
    hasIcon = false,
    isDisable = false,
    hasTwoLines = false,
    palette = '' as '',
    activeTabId = '0',
    customCursor = false,
  }) {
    return (
      <>
        <Tabs
          hasTwoLines={boolean('Has two lines', hasTwoLines)}
          palette={select('Palette', ['primary', 'secondary', ''], palette)}
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
            <View style={{
              flex: 1,
              paddingLeft: 16,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FontAwesome.default
                name="chevron-left"
                size={16}
                color="#ddd"
              />
            </View>
          )}
          renderRightIndicator={() => (
            <View style={{
              flex: 1,
              paddingRight: 16,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FontAwesome.default
                name="chevron-right"
                size={16}
                color="#ddd"
              />
            </View>
          )}
        >
          <Tab
            key={0}
            id="0"
            label="Looooonoooooooooog label"
            isDisable={boolean('Disabled', isDisable)}
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
          />
          <Tab
            key={1}
            id="1"
            label="Label"
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
          />
          <Tab
            key={2}
            id="2"
            label={text('Label', label)}
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
          />
          <Tab
            key={3}
            id="3"
            label={text('Label', label) + '03'}
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
          />
          <Tab
            key={4}
            id="4"
            label={text('Label', label) + '004'}
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
          />
          <Tab
            key={5}
            id="5"
            label={text('Label', label) + '0005'}
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
          />
          <Tab
            key={6}
            id="6"
            label={text('Label', label) + '00006'}
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
          />
        </Tabs>
        <Tabs
          hasTwoLines={boolean('Has two lines', hasTwoLines)}
          palette={select('Palette', ['primary', 'secondary', ''], palette)}
          customCursorAnimation={
            boolean('With custom cursor', customCursor)
              ? customCursorAnimation
              : undefined
          }
        >
          <Tab
            key={0}
            id="0"
            label={text('Label', label) + ' 0'}
            isDisable={boolean('Disabled', isDisable)}
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
          />
          <Tab
            key={1}
            id="1"
            label={text('Label', label) + ' 1'}
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
          />
          <Tab
            key={2}
            id="2"
            label={text('Label', label) + ' 2'}
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
          />
        </Tabs>
      </>
    )
  }

function renderCustomCursor({x}: LayoutInfo, {width: barWidth}: LayoutInfo, theme: DefaultTheme) {
  return (
    <View
      style={Styles.createViewStyle({
        borderRadius: 1,
        height: 4,
        backgroundColor: fade(theme.business.warning.main, Math.max(x / barWidth, 0.1)),
        transform: [{ scaleY: 4 }]
      })}
    ></View>
  )
}

const customCursorAnimation: CustomAnimation = (
  {
    scaleX,
    scaleY,
    translateY,
    rotateZ
  },
  {
    width
  },
  theme
) => ({
  scaleX: Animated
    .sequence([
      Animated.timing(
        scaleX,
        {
          toValue: 0,
          duration: 100,
          easing: Animated.Easing.Out(),
        }
      ),
      Animated.timing(
        scaleX,
        {
          toValue: width - theme.spacing * 2,
          duration: 200,
          easing: Animated.Easing.In(),
        }
      )
    ]),
    scaleY: Animated
    .sequence([
      Animated.timing(
        scaleY,
        {
          toValue: 30,
          duration: 100,
          easing: Animated.Easing.Out(),
        }
      ),
      Animated.timing(
        scaleY,
        {
          toValue: 4,
          duration: 200,
          easing: Animated.Easing.In(),
        }
      )
    ]),
  translateY: Animated
    .sequence([
      Animated.timing(
        translateY,
        {
          toValue: -30,
          duration: 50,
          easing: Animated.Easing.Out(),
        }
      ),
      Animated.timing(
        translateY,
        {
          toValue: 0,
          duration: 50,
          easing: Animated.Easing.In(),
        }
      ),
    ]),
    rotateZ: Animated
    .sequence([
      Animated.timing(
        rotateZ,
        {
          toValue: 180,
          duration: 50,
          easing: Animated.Easing.Out(),
        }
      ),
      Animated.timing(
        rotateZ,
        {
          toValue: 0,
          duration: 50,
          easing: Animated.Easing.In(),
        }
      ),
    ])
})