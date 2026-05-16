// import React from 'react';
import { render } from '@testing-library/react-native';
import { ArticlesScreen } from '../Article.Screen';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('ArticlesScreen', () => {
  it('renders header All NEWS correctly', () => {
    const { getByText } = render(<ArticlesScreen />);
    expect(getByText('All NEWS')).toBeTruthy();
  });
});
