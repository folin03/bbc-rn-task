import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchArticles } from '../services/newsService';
import type { Domain } from '@articles/constants';

interface Params {
  domains: Domain[];
  sortBy: 'publishedAt' | 'popularity';
}

export function useArticles({ domains, sortBy }: Params) {
  return useInfiniteQuery({
    queryKey: ['articles', domains, sortBy],

    queryFn: ({ pageParam = 1 }) =>
      fetchArticles({
        domains,
        pageParam,
        sortBy,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap(p => p.articles).length;

      if (loadedItems >= lastPage.totalResults) {
        return undefined;
      }

      return allPages.length + 1;
    },

    initialPageParam: 1,

    staleTime: 1000 * 60 * 5,
  });
}
