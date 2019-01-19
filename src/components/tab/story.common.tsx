import * as React from 'react'
import { text, boolean, select } from '@storybook/addon-knobs'

import Tab from './Tab'
import Tabs from './TabBar'
import { View } from '../view'

const FontAwesome = require('react-native-vector-icons/FontAwesome')

export default function({
    label = 'ROCKET',
    hasIcon = false,
    isDisable = false,
    hasTwoLines = false,
    palette = '' as '',
    activeTabId = '0'
  }) {
    return (
      <>
        <Tabs
          hasTwoLines={boolean('Has two lines', hasTwoLines)}
          palette={select('Palette', ['primary', 'secondary', ''], palette)}
          activeTabId={select('Tab', ['0', '1', '2', '3', '4', '5'], activeTabId)}
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
        {/*<Tabs
          hasTwoLines={boolean('Has two lines', hasTwoLines)}
          palette={select('Palette', ['primary', 'secondary', ''], palette)}
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
      */}</>
    )
  }
