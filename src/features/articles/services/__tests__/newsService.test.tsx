import Config from 'react-native-config';
import { apiClient } from '@api/client';
import { Article } from '@articles/types';
import { fetchArticles } from '@articles/services/newsService';

jest.mock('@api/client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockedGet = apiClient.get as jest.Mock;

describe('fetchArticles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockArticles: Article[] = [
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News',
      },
      author: 'John Smith',
      title: 'Breaking News Headline',
      description: 'This is a test description',
      url: 'https://example.com/article-1',
      urlToImage: 'https://example.com/image-1.jpg',
      publishedAt: '2026-05-14T10:00:00Z',
      content: 'This is the article content',
      popularity: 95,
    },
    {
      source: {
        id: null,
        name: 'CNN',
      },
      title: 'Another News Article',
      url: 'https://example.com/article-2',
      publishedAt: '2026-05-14T11:00:00Z',
    },
  ];

  it('should fetch articles with default params', async () => {
    const mockResponse = {
      data: {
        articles: mockArticles,
        totalResults: 2,
      },
    };

    mockedGet.mockResolvedValue(mockResponse);

    const result = await fetchArticles({
      domains: ['bbc.com', 'apple.com'],
    });

    expect(mockedGet).toHaveBeenCalledWith('/everything', {
      params: {
        domains: 'bbc.com,apple.com',
        language: 'en',
        sortBy: 'publishedAt',
        page: 1,
        pageSize: 20,
        apiKey: Config.NEWS_API_KEY,
      },
    });

    expect(result).toEqual({
      articles: mockArticles,
      totalResults: 2,
    });
  });

  it('should fetch articles with custom pageParam and sortBy', async () => {
    const mockResponse = {
      data: {
        articles: [mockArticles[0]],
        totalResults: 1,
      },
    };

    mockedGet.mockResolvedValue(mockResponse);

    const result = await fetchArticles({
      domains: ['bbc.com'],
      pageParam: 3,
      sortBy: 'popularity',
    });

    expect(mockedGet).toHaveBeenCalledWith('/everything', {
      params: {
        domains: 'bbc.com',
        language: 'en',
        sortBy: 'popularity',
        page: 3,
        pageSize: 20,
        apiKey: Config.NEWS_API_KEY,
      },
    });

    expect(result).toEqual(mockResponse.data);
  });

  it('should throw when api request fails', async () => {
    const error = new Error('Network Error');

    mockedGet.mockRejectedValue(error);

    await expect(
      fetchArticles({
        domains: ['bbc.com'],
      }),
    ).rejects.toThrow('Network Error');
  });

  it('should handle empty domains array', async () => {
    const mockResponse = {
      data: {
        articles: [],
        totalResults: 0,
      },
    };

    mockedGet.mockResolvedValue(mockResponse);

    const result = await fetchArticles({
      domains: [],
    });

    expect(mockedGet).toHaveBeenCalledWith('/everything', {
      params: {
        domains: '',
        language: 'en',
        sortBy: 'publishedAt',
        page: 1,
        pageSize: 20,
        apiKey: Config.NEWS_API_KEY,
      },
    });

    expect(result).toEqual({
      articles: [],
      totalResults: 0,
    });
  });
});
