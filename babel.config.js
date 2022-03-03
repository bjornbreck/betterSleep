module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // plugins: [
  //   [
  //     'module-resolver',
  //     {
  //       root: ['./src'],
  //       alias: {
  //         state: './src/state',
  //         util: './src/util',
  //         const: './src/const',
  //         '@components': './src/components'
  //       }
  //     }
  //   ]
  // ]
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        root: ['./src']
      }
    ]
  ]
};
