// metro.config.js
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../../');

const defaultConfig = getDefaultConfig(projectRoot);

defaultConfig.watchFolders = [workspaceRoot];

defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

defaultConfig.transformer.unstable_allowRequireContext = true;


module.exports = withStorybook(defaultConfig, {
  // set to false to disable storybook specific settings
  // you can use a env variable to toggle this
  enabled: true,
  // path to your storybook config folder
  configPath: path.resolve(__dirname, "./.storybook.native"),
});
