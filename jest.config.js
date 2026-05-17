module.exports = {
  preset: '@react-native/jest-preset',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@articles/(.*)$': '<rootDir>/src/features/articles/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@shopify/flash-list)/)',
  ],
};
