import { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['../stories/**/*.stories.?(ts|tsx)'],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-actions',
    '@storybook/addon-ondevice-notes',
  ],
  reactNative: {
    playFn: false,
  },
};

export default main;
