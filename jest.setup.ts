// ------- react-native-config ------
jest.mock('react-native-config', () => ({
  NEWS_API_KEY: 'mock-api-key',
}));

// ------- FlashList ------
jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const { View } = require('react-native');

  const FlashList = ({
    data = [],
    renderItem,
    keyExtractor,
    accessibilityLabel,
    accessibilityRole,
    testID,
  }: any) =>
    React.createElement(
      View,
      {
        testID,
        accessibilityLabel,
        accessibilityRole,
      },
      data.map((item: any, index: number) =>
        React.createElement(
          View,
          {
            key: keyExtractor ? keyExtractor(item, index) : String(index),
          },
          renderItem({ item, index }),
        ),
      ),
    );

  return {
    __esModule: true,
    FlashList,
    default: FlashList,
  };
});
