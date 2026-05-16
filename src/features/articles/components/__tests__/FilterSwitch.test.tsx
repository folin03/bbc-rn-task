import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SortBySwitch } from '@articles/components/SortBySwitch';
import { useArticleFiltersStore } from '@articles/store/useArticleFilters.Store';

jest.mock('@articles/store/useArticleFilters.Store');

const mockUseArticleFiltersStore = jest.mocked(useArticleFiltersStore);
const mockSetSortBy = jest.fn();

describe('SortBySwitch', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseArticleFiltersStore.mockReturnValue({
      sortBy: 'publishedAt',
      setSortBy: mockSetSortBy,
    });
  });

  it('renders sorting container', () => {
    const { getByTestId } = render(<SortBySwitch />);

    expect(getByTestId('article-sort-by-switch')).toBeTruthy();
  });

  it('renders both filter buttons', () => {
    const { getByText } = render(<SortBySwitch />);

    expect(getByText('Latest')).toBeTruthy();
    expect(getByText('Popular')).toBeTruthy();
  });

  it('marks Latest as selected when sortBy is publishedAt', () => {
    const { getByLabelText } = render(<SortBySwitch />);

    const latestButton = getByLabelText('Latest articles');
    expect(latestButton.props.accessibilityState.selected).toBe(true);
  });

  it('marks Popular as selected when sortBy is popularity', () => {
    mockUseArticleFiltersStore.mockReturnValue({
      sortBy: 'popularity',
      setSortBy: mockSetSortBy,
    });

    const { getByLabelText } = render(<SortBySwitch />);

    const popularButton = getByLabelText('Popular articles');
    expect(popularButton.props.accessibilityState.selected).toBe(true);
  });

  it('calls setSortBy with publishedAt when Latest is pressed', () => {
    const { getByText } = render(<SortBySwitch />);

    fireEvent.press(getByText('Latest'));
    expect(mockSetSortBy).toHaveBeenCalledWith('publishedAt');
  });

  it('calls setSortBy with popularity when Popular is pressed', () => {
    const { getByText } = render(<SortBySwitch />);

    fireEvent.press(getByText('Popular'));
    expect(mockSetSortBy).toHaveBeenCalledWith('popularity');
  });

  it('has tablist accessibility role and label', () => {
    const { getByTestId } = render(<SortBySwitch />);

    const carousel = getByTestId('article-sort-by-switch');
    expect(carousel.props.accessibilityLabel).toBe('Article sorting options');
    expect(carousel.props.accessibilityRole).toBe('tablist');
  });
});
