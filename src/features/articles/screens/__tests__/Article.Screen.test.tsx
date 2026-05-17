// import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ArticlesScreen } from '../Article.Screen';
import { useArticleFiltersStore } from '@articles/store/useArticleFilters.Store';
import { DOMAINS } from '@articles/constants';
import { useArticles } from '@articles/hooks/useArticles';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock('@articles/store/useArticleFilters.Store');
jest.mock('@articles/hooks/useArticles', () => ({
  useArticles: jest.fn(),
}));

const mockUseArticleFiltersStore = jest.mocked(useArticleFiltersStore);
const mockUseArticles = useArticles as jest.Mock;

const mockArticles = [
  {
    url: 'https://example.com/article-1',
    title: 'Mock Article 1',
    source: { id: 'bbc-news', name: 'BBC News' },
    publishedAt: '2026-05-15T12:00:00Z',
    description: 'This is a mock article for testing.',
    content: 'Full content of the mock article.',
  },
];

const defaultArticlesResult = {
  data: { pages: [{ articles: mockArticles }] },
  isLoading: false,
  isFetchingNextPage: false,
  fetchNextPage: jest.fn(),
  hasNextPage: false,
  refetch: jest.fn(),
  isRefetching: false,
  isError: false,
  error: null,
};

describe('ArticlesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseArticleFiltersStore.mockReturnValue({
      selectedDomains: ['bbc.com'],
      sortBy: 'publishedAt',
      setSortBy: jest.fn(),
      toggleDomain: jest.fn(),
    });
    mockUseArticles.mockReturnValue(defaultArticlesResult);
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

  it('renders article items via ArticleCard', () => {
    const { getByText } = render(<ArticlesScreen />);

    expect(getByText('Mock Article 1')).toBeTruthy();
  });

  it('renders SortBySwitch', () => {
    const { getByTestId } = render(<ArticlesScreen />);

    expect(getByTestId('article-sort-by-switch')).toBeTruthy();
  });

  it('should open modal with selected article when article is pressed', () => {
    const { getByTestId, getByText } = render(<ArticlesScreen />);

    fireEvent.press(getByTestId(`article-card-${mockArticles[0].title}`));

    expect(getByTestId('article-modal')).toBeTruthy();
    expect(getByText(mockArticles[0].content)).toBeTruthy();
  });
});
