import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ArticleCard } from '../ArticleCard';
import { Article } from '@articles/types';

describe('ArticleCard', () => {
  const mockArticle: Article = {
    source: {
      id: 'bbc',
      name: 'BBC News',
    },
    author: 'John Doe',
    title: 'Breaking News',
    description: 'Important news description',
    url: 'https://bbc.com/article',
    urlToImage: 'https://bbc.com/image.jpg',
    publishedAt: '2026-05-16T12:00:00.000Z',
    content: 'Article content',
    popularity: 100,
  };

  it('should render article title', () => {
    const { getByText } = render(<ArticleCard article={mockArticle} />);

    expect(getByText('Breaking News')).toBeTruthy();
  });

  it('should render article description', () => {
    const { getByText } = render(<ArticleCard article={mockArticle} />);

    expect(getByText('Important news description')).toBeTruthy();
  });

  it('should render formatted publication date', () => {
    const { getByText } = render(<ArticleCard article={mockArticle} />);

    expect(
      getByText(new Date(mockArticle.publishedAt).toLocaleString()),
    ).toBeTruthy();
  });

  it('should render image when urlToImage exists', () => {
    const { getByTestId } = render(<ArticleCard article={mockArticle} />);

    expect(
      getByTestId(`article-image-${mockArticle.urlToImage}`, {
        includeHiddenElements: true,
      }),
    ).toBeTruthy();
  });

  it('should call onPress with article when pressed', () => {
    const onPress = jest.fn();

    const { getByTestId } = render(
      <ArticleCard article={mockArticle} onPress={onPress} />,
    );

    fireEvent.press(getByTestId(`article-card-${mockArticle.title}`));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(mockArticle);
  });

  it('should have correct accessibility props', () => {
    const { getByTestId } = render(<ArticleCard article={mockArticle} />);

    const card = getByTestId(`article-card-${mockArticle.title}`);

    const expectedLabel = `${mockArticle.title}. Published ${new Date(
      mockArticle.publishedAt,
    ).toLocaleDateString()}${mockArticle.description}`;

    expect(card.props.accessibilityRole).toBe('button');
    expect(card.props.accessibilityHint).toBe('Navigates to the full article');
    expect(card.props.accessibilityLabel).toBe(expectedLabel);
  });

  it('should handle missing description in accessibility label', () => {
    const articleWithoutDescription: Article = {
      ...mockArticle,
      description: undefined,
    };

    const { getByTestId } = render(
      <ArticleCard article={articleWithoutDescription} />,
    );

    const card = getByTestId(`article-card-${mockArticle.title}`);

    const expectedLabel = `${mockArticle.title}. Published ${new Date(
      mockArticle.publishedAt,
    ).toLocaleDateString()}`;

    expect(card.props.accessibilityLabel).toBe(expectedLabel);
  });
});
