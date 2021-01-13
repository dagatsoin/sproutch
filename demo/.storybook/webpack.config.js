const path = require('path')

const root = filePath => path.resolve(__dirname, `../${filePath}`)
module.exports = async ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve('awesome-typescript-loader'),
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
   'react-native': 'react-native-web',
   '@sproutch/ui': root('../src')
  }
  config.resolve.modules = [root('node_modules'), 'node_modules']
  config.devtool = 'inline-source-map'
  return config
}
