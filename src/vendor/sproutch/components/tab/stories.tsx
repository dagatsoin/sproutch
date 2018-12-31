import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { RPGIcon, Tab, View } from 'sproutch'

storiesOf('Tab', module)
  .add('Text only', () => <Tab key={0} tabIndex="0" label="ESCAPE" />)
  .add('With icon', () => (
    <Tab
      key={0}
      tabIndex="0"
      renderIcon={iconStyle => (
        <RPGIcon
          style={iconStyle}
          name="barrier"
        />
      )}
    />
  ))
  .add('Disabled', () => (
    <Tab
      key={0}
      tabIndex="0"
      isDisable
      renderIcon={iconStyle => (
        <RPGIcon
          style={iconStyle}
          name="barrier"
        />
      )}
      label="ESCAPE"
    />
  ))
  .add('Active', () => (
    <Tab
      key={0}
      tabIndex="0"
      isActive
      renderIcon={iconStyle => (
        <RPGIcon
          style={iconStyle}
          name="barrier"
        />
      )}
      label="ESCAPE"
    />
  ))
  .add('With icon and text', () => (
    <Tab
      key={0}
      tabIndex="0"
      renderIcon={iconStyle => (
        <RPGIcon
          style={iconStyle}
          name="barrier"
        />
      )}
      label="ESCAPE"
    />
  ))
  .add('Icon and text on two lines', () => (
    <Tab
      key={0}
      tabIndex="0"
      hasTwoLines={true}
      renderIcon={iconStyle => (
        <RPGIcon
          style={iconStyle}
          name="barrier"
        />
      )}
      label="ESCAPE"
    />
  ))