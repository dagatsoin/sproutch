/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    directory: "./stories",
    files: "**/*.stories.?(ts|tsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:stories(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx)?)$",
  },
];

import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    "./stories/backgroundImage/BackgroundImage.stories.tsx": require("../stories/backgroundImage/BackgroundImage.stories.tsx"),
    "./stories/button/Button.stories.tsx": require("../stories/button/Button.stories.tsx"),
    "./stories/paper/Paper.stories.tsx": require("../stories/paper/Paper.stories.tsx"),
    "./stories/ripple/Ripple.stories.tsx": require("../stories/ripple/Ripple.stories.tsx"),
    "./stories/tabs/Tabs.stories.tsx": require("../stories/tabs/Tabs.stories.tsx"),
  };
};

configure(getStories, module, false);
