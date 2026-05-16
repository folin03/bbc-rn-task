module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@articles': './src/features/articles', // Point this to your actual folder path
          '@common': './src/common',
          '@theme': './src/theme',
        },
      },
    ],
  ],
};
