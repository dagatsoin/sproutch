import { ThemeProvider, defaultTheme } from '@sproutch/ui'

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [
    (story) => ({
      components: { story, View, ThemeProvider },
      template: '<ThemeProvider theme={defaultTheme}"><story /></ThemeProvider>',
    }),
  ],
};
