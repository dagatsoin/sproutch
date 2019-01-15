import { storiesOf } from '@storybook/react-native'
import * as React from 'react'
import { text, boolean, select, withKnobs } from '@storybook/addon-knobs'

import Tab from './Tab'
import Tabs from './TabBar'

const FontAwesome = require('react-native-vector-icons/FontAwesome')

storiesOf('Sproutch', module)
  .addDecorator(withKnobs)
  .add('Tabs', function({
    label = 'ROCKET',
    hasIcon = false,
    isDisable = false,
    hasTwoLines = false,
    palette = '' as ''
  }) {
    return (
      <>
        <Tabs
          hasTwoLines={boolean('Has two lines', hasTwoLines)}
          palette={select('Palette', ['primary', 'secondary', ''], palette)}
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
        >
          <Tab
            key={4}
            id="4"
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
            key={5}
            id="5"
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
            key={6}
            id="6"
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
        </Tabs>
      </>
    )
  } as any)
