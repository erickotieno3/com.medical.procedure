module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@screens': './src/screens',
          '@config': './src/config',
          '@constants': './src/constants',
          '@services': './src/services',
          '@assets': './src/assets'
        },
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.ts', '.tsx']
      }
    ]
  ]
};
