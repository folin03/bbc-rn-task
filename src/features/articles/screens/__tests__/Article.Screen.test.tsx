// import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ArticlesScreen } from '../Article.Screen';
import { useArticleFiltersStore } from '@articles/store/useArticleFilters.Store';
import { DOMAINS } from '@articles/constants';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('@articles/store/useArticleFilters.Store');

const mockUseArticleFiltersStore = jest.mocked(useArticleFiltersStore);

describe('ArticlesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseArticleFiltersStore.mockReturnValue({
      selectedDomains: ['bbc.com'],
      sortBy: 'publishedAt',
      setSortBy: jest.fn(),
      toggleDomain: jest.fn(),
    });
  });

  it('renders header All NEWS correctly', () => {
    const { getByText } = render(<ArticlesScreen />);
    expect(getByText('All NEWS')).toBeTruthy();
  });

  it('renders the domain carousel with the correct accessibility label', () => {
    const { getByTestId } = render(<ArticlesScreen />);

    const carousel = getByTestId('domain-carousel');
    expect(carousel.props.accessibilityLabel).toBe('News domains');
    expect(carousel.props.accessibilityRole).toBe('tablist');
  });

  it('renders all DomainChip items from DOMAINS', () => {
    const { getByText, getAllByTestId } = render(<ArticlesScreen />);

    DOMAINS.forEach(domain => {
      const expectedTitle = domain.replace('.com', '');
      expect(getByText(expectedTitle)).toBeTruthy();
    });

    const chips = getAllByTestId('domain-chip');
    expect(chips.length).toBe(DOMAINS.length);
  });

  it('uses DomainChip from the carousel and toggles the selected domain when pressed', () => {
    const mockToggleDomain = jest.fn();
    mockUseArticleFiltersStore.mockReturnValue({
      selectedDomains: ['google.com'],
      sortBy: 'publishedAt',
      setSortBy: jest.fn(),
      toggleDomain: mockToggleDomain,
    });

    const { getAllByTestId } = render(<ArticlesScreen />);
    const chips = getAllByTestId('domain-chip');
    expect(chips.length).toBeGreaterThan(0);

    fireEvent.press(chips[0]);
    expect(mockToggleDomain).toHaveBeenCalledTimes(1);
    expect(mockToggleDomain).toHaveBeenCalledWith('bbc.com');
  });
});
