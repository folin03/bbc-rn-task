import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ArticleDetailModal } from '@articles/components/ArticleDetailModal';

jest.mock('@react-native-vector-icons/ionicons/static', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockArticle = {
  source: {
    id: 'bbc-news',
    name: 'BBC News',
  },
  author: 'John Doe',
  title: 'Test Article Title',
  description: 'Test description',
  url: 'https://example.com/article',
  urlToImage: 'https://example.com/image.jpg',
  publishedAt: '2026-05-15T12:00:00Z',
  content: 'This is the full article content',
};

describe('ArticleDetailModal', () => {
  it('does not render article content when selectedArticle is undefined', () => {
    const { queryByText } = render(
      <ArticleDetailModal
        selectedArticle={undefined}
        onPressClose={jest.fn()}
      />,
    );

    expect(queryByText('Test Article Title')).toBeNull();
  });

  it('renders article title', () => {
    const { getByText } = render(
      <ArticleDetailModal
        selectedArticle={mockArticle}
        onPressClose={jest.fn()}
      />,
    );

    expect(getByText('Test Article Title')).toBeTruthy();
  });

  it('renders article author and source', () => {
    const { getByText } = render(
      <ArticleDetailModal
        selectedArticle={mockArticle}
        onPressClose={jest.fn()}
      />,
    );

    expect(getByText('BBC News • John Doe')).toBeTruthy();
  });

  it('renders formatted published date', () => {
    const { getByText } = render(
      <ArticleDetailModal
        selectedArticle={mockArticle}
        onPressClose={jest.fn()}
      />,
    );

    const formattedDate = new Date(mockArticle.publishedAt).toLocaleString();

    expect(getByText(formattedDate)).toBeTruthy();
  });

  it('renders article content', () => {
    const { getByText } = render(
      <ArticleDetailModal
        selectedArticle={mockArticle}
        onPressClose={jest.fn()}
      />,
    );

    expect(getByText('This is the full article content')).toBeTruthy();
  });

  it('renders article image when urlToImage exists', () => {
    const { getByTestId } = render(
      <ArticleDetailModal
        selectedArticle={mockArticle}
        onPressClose={jest.fn()}
      />,
    );

    expect(
      getByTestId('article-detail-image', {
        includeHiddenElements: true,
      }),
    ).toBeTruthy();
  });

  it('does not render image when urlToImage is missing', () => {
    const articleWithoutImage = {
      ...mockArticle,
      urlToImage: undefined,
    };

    const { queryByTestId } = render(
      <ArticleDetailModal
        selectedArticle={articleWithoutImage}
        onPressClose={jest.fn()}
      />,
    );

    expect(queryByTestId('article-detail-image')).toBeNull();
  });

  it('calls onPressClose when back button is pressed', () => {
    const mockOnPressClose = jest.fn();

    const { getByLabelText } = render(
      <ArticleDetailModal
        selectedArticle={mockArticle}
        onPressClose={mockOnPressClose}
      />,
    );

    fireEvent.press(getByLabelText('Close article'));

    expect(mockOnPressClose).toHaveBeenCalledTimes(1);
  });

  it('renders scroll view with correct accessibility label', () => {
    const { getByLabelText } = render(
      <ArticleDetailModal
        selectedArticle={mockArticle}
        onPressClose={jest.fn()}
      />,
    );

    expect(
      getByLabelText(`Article details for ${mockArticle.title}`),
    ).toBeTruthy();
  });

  it('renders title as accessibility header', () => {
    const { getByRole } = render(
      <ArticleDetailModal
        selectedArticle={mockArticle}
        onPressClose={jest.fn()}
      />,
    );

    expect(getByRole('header')).toBeTruthy();
  });
});
