import React from 'react';

import { Preview } from '@storybook/react';

import { ThemeProvider, defaultTheme } from '@sproutch/ui'

import { FontProvider } from '../FontDecorator'
import { Story } from '@storybook/react-native';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
}

const preview: Preview = {
  decorators: [
    (Story: Story) => (
      <FontProvider>
        <ThemeProvider theme={defaultTheme}>
          <Story />
        </ThemeProvider>
      </FontProvider>
    ),
  ],
};

export default preview;