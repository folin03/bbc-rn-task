import { DEFAULT_DOMAIN, Domain } from '@articles/constants';
import { create } from 'zustand';

type SortOption = 'publishedAt' | 'popularity';

interface ArticleFiltersState {
  selectedDomains: Domain[];
  sortBy: SortOption;
  toggleDomain: (domain: Domain) => void;
  setSortBy: (sort: SortOption) => void;
}

export const useArticleFiltersStore = create<ArticleFiltersState>(set => ({
  selectedDomains: [DEFAULT_DOMAIN],
  sortBy: 'publishedAt',

  toggleDomain: domain =>
    set(state => {
      const exists = state.selectedDomains.includes(domain);

      return {
        selectedDomains: exists
          ? state.selectedDomains.filter(d => d !== domain)
          : [...state.selectedDomains, domain],
      };
    }),

  setSortBy: sortBy => set({ sortBy }),
}));
