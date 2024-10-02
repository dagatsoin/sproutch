import type { StorybookConfig } from "@storybook/nextjs";

import path from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return path.dirname(require.resolve(path.join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    '@storybook/addon-react-native-web',
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve?.alias) {
        config.resolve.alias['@'] = path.resolve(__dirname, '../../core/src/');
        config.resolve.alias['@sproutch/core'] = path.resolve(__dirname, '../../core/src/');
        console.log(config.resolve.alias)
    }
    return config;
  }
};
export default config;
