import React, { FC } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Article } from '../types';
import { DateText, DescriptionText, TitleText } from '@common/components/Text';

interface ArticleCardProps {
  article: Article;
  onPress?: (article: Article) => void;
}

export const ArticleCard: FC<ArticleCardProps> = ({ article, onPress }) => {
  const label = `${article.title}. Published ${new Date(
    article.publishedAt,
  ).toLocaleDateString()}${article.description ?? ''}`;

  return (
    <TouchableOpacity
      testID={`article-card-${article.title}`}
      activeOpacity={0.85}
      style={styles.articleContainer}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityHint="Navigates to the full article"
      onPress={() => onPress?.(article)}
    >
      <View style={styles.container}>
        <DateText>{new Date(article.publishedAt).toLocaleString()}</DateText>
        {/* image has no alt description for accessibility, if alt description is needed,
         we may try to access the full article and look for alt for the img there,
         this would be lenghy process though. At this point we exclude the img from the reader */}
        {article.urlToImage && (
          <Image
            testID={`article-image-${article.urlToImage}`}
            source={{ uri: article.urlToImage }}
            style={styles.image}
            // iOS to hide decorative images
            accessibilityElementsHidden={true}
            accessibilityIgnoresInvertColors
            // Android
            importantForAccessibility="no-hide-descendants"
          />
        )}
        <TitleText>{article.title}</TitleText>
        <DescriptionText>{article.description}</DescriptionText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  image: {
    minHeight: 200,
    maxHeight: 400,
    borderRadius: 12,
    marginBottom: 12,
  },
  articleContainer: {
    marginBottom: 20,
  },
});
