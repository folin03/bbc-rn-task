import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useArticleFiltersStore } from '@articles/store/useArticleFilters.Store';
import { SortByButton } from './SortByButton';

// This component is responsible for rendering the sorting options for the articles.
// It uses the FilterButton component to render each sorting option and manages the active state based on the current sortBy value from the store usin useArticleFiltersStore.
export const SortBySwitch: FC = () => {
  const { sortBy, setSortBy } = useArticleFiltersStore();

  return (
    <View
      testID="article-sort-by-switch"
      style={styles.sortContainer}
      accessibilityRole="tablist"
      accessibilityLabel="Article sorting options"
      accessibilityHint="select sorting option"
    >
      <SortByButton
        onPress={() => setSortBy('publishedAt')}
        title="Latest"
        active={sortBy === 'publishedAt'}
      />
      <SortByButton
        onPress={() => setSortBy('popularity')}
        title="Popular"
        active={sortBy === 'popularity'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 5,
    top: '30%',
  },
});
