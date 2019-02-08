const path = require('path')

const root = filePath => path.resolve(__dirname, `../${filePath}`)
module.exports = (_baseConfig, _env, config) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: 'awesome-typescript-loader',
      options: {
        configFileName: path.resolve(__dirname, '../tsconfig.json')
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
            ]
          ]
        }
      }
    }
  )

  config.resolve.extensions.push('.ts', '.tsx')
  config.resolve.alias = {
   'react-native': 'react-native-web'
  }
  config.devtool = 'inline-source-map'
  return config
}