/* eslint-disable @typescript-eslint/no-unsafe-return */
export default ({ config }) => ({
  ...config,
  name: 'Sproutch UI doc',
  slug: 'sproutch-ui-doc',
  userInterfaceStyle: 'automatic',
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    bundler: 'metro',
    favicon: "./assets/favicon.png",
  },
});
