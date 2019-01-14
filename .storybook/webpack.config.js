const path = require('path')

const root = filePath => path.resolve(__dirname, `../${filePath}`)
console.log(path.resolve(__dirname, './tsconfig.json'))
module.exports = (_baseConfig, _env, config) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: 'awesome-typescript-loader',
      options: {
        configFileName: path.resolve(__dirname, './tsconfig.json')
      }
    },
   
    {
      test: /\.(js|jsx|mjs)$/,
      include: [root('node_modules/react-native-vector-icons')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react'],
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                legacy: true
              }
            ],
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: true
              }
            ],
            [
              'module-resolver',
              {
                alias: {
                  '^react-native$': 'react-native-web'
                }
              }
            ]
          ]
        }
      }
    }
  )

  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.alias = {
    deepmerge: root('node_modules/deepmerge/dist/umd.js'),
    'react-native': 'react-native-web'
  }
  return config
}
