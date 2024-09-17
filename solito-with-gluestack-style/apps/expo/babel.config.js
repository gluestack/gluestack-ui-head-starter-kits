const path = require('path')

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: ['.js', '.ts', '.json', '.jsx', '.tsx'],
          alias: {
            root: ['./'],
            // For development, we want to alias the library to the source
            ['app']: path.resolve(__dirname, '../../packages/app'),
          },
        },
      ],
    ],
  }
}
