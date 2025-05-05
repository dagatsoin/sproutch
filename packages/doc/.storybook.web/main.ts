import { StorybookConfig } from "storybook/internal/types";
import type { UserConfig } from 'vite'
import { transform } from 'esbuild';
import path from "path";
import react from '@vitejs/plugin-react';

const extensions = [
  '.mjs',
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
];

export default {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ['../assets'],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: {
    "name": "@storybook/react-vite",
    "options": {}
  },
  typescript: {
    check: true,
  },
  viteFinal: async (config: UserConfig) => {
    config.plugins?.push(react())

    config.plugins?.push({
      name: 'fix-expo-vector-icons-jsx',
      enforce: 'pre',
      async transform(code, id: string) {
        if (id.match(/(@expo\/vector-icons|react-native-vector-icons).+js\b/gm)) {
          const result = await transform(code, {
            loader: 'jsx',
            target: 'es2015',
            sourcemap: true,
          });
          return { code: result.code, map: result.map };
        }
      },
    });

    // New plugin to transform object-utils.js to ESM exports
    config.plugins?.push({
      name: 'cjs-to-esm-object-utils',
      enforce: 'pre',
      transform(code, id) {
        if (id.match(/react-native-vector-icons\/lib\/object-utils.js/gm)) {
          return code.replace(
            /module\.exports\s*=\s*{([^}]+)}/,
            (_, exportsContent) => `export {${exportsContent.trim()}};`
          );
        }
      },
    });
    
    config.resolve = {
      ...config.resolve,
      extensions,
      alias: [
          ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : Object.entries(config.resolve?.alias as Record<string, unknown>).map(([find, replacement]) => ({ find, replacement }))),
          { find: '@sproutch/core', replacement: path.resolve(__dirname, '../../core/src') },
          { find: '@sproutch/tabs', replacement: path.resolve(__dirname, '../../tabs/src') },
          { find: '@sproutch/transition', replacement: path.resolve(__dirname, '../../transition/src') },
          { find: 'react-native', replacement: 'react-native-web' },
          { find: '@expo/vector-icons', replacement: '@expo/vector-icons/build/vendor/react-native-vector-icons'}
      ],
    }

    if(config.optimizeDeps)
      config.optimizeDeps.exclude = ['@expo/vector-icons', 'react-native-vector-icons']

    return config
  },
} as StorybookConfig;
