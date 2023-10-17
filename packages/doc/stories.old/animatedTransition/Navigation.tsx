import {
  TabBar,
  View
} from '@sproutch/ui';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { labelStyle, style } from './story.common';
const FontAwesome = require('react-native-vector-icons/FontAwesome');

export function Navigation() {
  const history = useHistory()
  return (
    <TabBar
      style={style.header}
      activeTabId={'profile'}
      onChange={id => {
        history.push('/' + id);
      }}
      leftScrollButton={(theme) => (
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
            color={theme.palette.primary.contrastText} />
        </View>
      )}
      rightScrollButton={(theme) => (
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
            color={theme.palette.primary.contrastText} />
        </View>
      )}
      tabs={[
        {
          id: 'profile',
          label: 'Profile',
          style: {
            isActiveLabel: labelStyle,
          },
        },
        {
          id: 'portfolio',
          label: 'Portfolio',
          style: {
            isActiveLabel: labelStyle,
          },
        },
        {
          id: 'contact',
          label: 'Contact',
          style: {
            isActiveLabel: labelStyle,
          },
        }
      ]} />
  );
}
