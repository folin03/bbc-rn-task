module.exports = {
  preset: '@react-native/jest-preset',

  moduleNameMapper: {
    '^@articles/(.*)$': '<rootDir>/src/features/articles/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
  },
};
