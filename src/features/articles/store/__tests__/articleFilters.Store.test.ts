import { act } from '@testing-library/react-native';
import { DEFAULT_DOMAIN, Domain } from '@articles/constants';
import { useArticleFiltersStore } from '../useArticleFilters.Store';

describe('useArticleFiltersStore', () => {
  const TEST_DOMAIN: Domain = 'apple.com';

  beforeEach(() => {
    useArticleFiltersStore.setState({
      selectedDomains: [DEFAULT_DOMAIN],
      sortBy: 'publishedAt',
    });
  });

  it('should initialize with default state', () => {
    const state = useArticleFiltersStore.getState();

    expect(state.selectedDomains).toEqual([DEFAULT_DOMAIN]);
    expect(state.sortBy).toBe('publishedAt');
  });

  it('should add a domain when toggled and not already selected', () => {
    act(() => {
      useArticleFiltersStore.getState().toggleDomain(TEST_DOMAIN);
    });

    const state = useArticleFiltersStore.getState();

    expect(state.selectedDomains).toContain(DEFAULT_DOMAIN);
    expect(state.selectedDomains).toContain(TEST_DOMAIN);
  });

  it('should remove a domain when toggled and already selected', () => {
    act(() => {
      useArticleFiltersStore.setState({
        selectedDomains: [DEFAULT_DOMAIN, TEST_DOMAIN],
      });
    });

    act(() => {
      useArticleFiltersStore.getState().toggleDomain(TEST_DOMAIN);
    });

    const state = useArticleFiltersStore.getState();

    expect(state.selectedDomains).toEqual([DEFAULT_DOMAIN]);
  });

  it('should update sortBy', () => {
    act(() => {
      useArticleFiltersStore.getState().setSortBy('popularity');
    });

    const state = useArticleFiltersStore.getState();

    expect(state.sortBy).toBe('popularity');
  });
});
