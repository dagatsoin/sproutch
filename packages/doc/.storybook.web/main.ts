import { StorybookConfig } from "storybook/internal/types";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path'

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-web",
    "@storybook/addon-webpack5-compiler-babel",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
 
    },
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          configFile: "web.tsconfig.json",
          
        }),
      ];
      
      config.resolve.alias = {
        ...config.resolve.alias,
        '@sproutch/core': path.resolve(__dirname, '../core/src'),
      };
      return config;
    }
    return config;
  },
} as StorybookConfig;
