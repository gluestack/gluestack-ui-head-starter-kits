module.exports = function (api) {
  api.cache(true);
  return {
    // presets: [
    //   'babel-preset-expo',
    //   ['@babel/preset-env', { targets: { node: 'current' } }],
    //   '@babel/preset-typescript',
    // ],
    // plugins: [
    //   // Required for expo-router
    //   'expo-router/babel',
    // ],
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
      "nativewind/babel",
    ],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "react-native-reanimated/plugin",
    ]
  };
};
