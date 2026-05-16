import Config from 'react-native-config';
import { apiClient } from '../../../api/client';
import type { Article } from '../types';
import type { Domain } from '@articles/constants';

interface FetchArticlesParams {
  domains: Domain[];
  pageParam?: number;
  sortBy?: 'publishedAt' | 'popularity';
}

interface NewsApiResponse {
  articles: Article[];
  totalResults: number;
}

/**
 * Fetches articles from the News API based on the provided parameters.\
 * uses everything endpoint\
 * \
 * use try/catch it can throw an error
 */
export async function fetchArticles({
  domains,
  pageParam = 1,
  sortBy = 'publishedAt',
}: FetchArticlesParams) {
  const response = await apiClient.get<NewsApiResponse>('/everything', {
    params: {
      domains: domains.join(','),
      language: 'en',
      sortBy,
      page: pageParam,
      pageSize: 20,
      apiKey: Config.NEWS_API_KEY,
    },
  });

  return response.data;
}
