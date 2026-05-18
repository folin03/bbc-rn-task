import React, { FC, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import SafeAreaContainer from '@common/components/containers/SafeArea.Container';
import { ScreenHeader } from '@common/components/ScreenHeader';
import { COLORS } from '@theme';
import { FlashList } from '@shopify/flash-list';
import { DOMAINS } from '@articles/constants';
import { DomainChip } from '@articles/components/DomainChip';
import { useArticles } from '@articles/hooks/useArticles';
import { useArticleFiltersStore } from '@articles/store/useArticleFilters.Store';
import { useNewsApiErrorProcessor } from '@api/hooks/useNewsApiErrorProcessor';
import { AxiosError } from 'axios';
import { MutedSubText } from '@common/components/Text';
import { ArticleCard } from '@articles/components/ArticleCard';
import { EmptyScreenInfo } from '@articles/components/EmptyScreenInfo';
import { SortBySwitch } from '@articles/components/SortBySwitch';
import { Article } from '@articles/types';
import { ArticleDetailModal } from '@articles/components/ArticleDetailModal';

export const ArticlesScreen: FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | undefined>();

  const { selectedDomains, sortBy } = useArticleFiltersStore();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isError,
    error,
  } = useArticles({
    domains: selectedDomains,
    sortBy,
  });
  const errorMessage = useNewsApiErrorProcessor(error as AxiosError);

  const articles = useMemo(() => {
    return data?.pages.flatMap(page => page.articles) ?? [];
  }, [data]);

  return (
    <SafeAreaContainer style={styles.safeContainer} fullFlex edges={['top']}>
      <View>
        <ScreenHeader title="All NEWS" />
        <SortBySwitch />
      </View>
      <FlashList
        testID="domain-carousel"
        horizontal
        data={DOMAINS}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          return <DomainChip title={item} />;
        }}
        contentContainerStyle={styles.filtersContainer}
        accessibilityLabel="News domains"
        accessibilityRole="tablist"
        accessibilityHint="select domains"
      />
      {isLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator />
          <MutedSubText>Loading articles</MutedSubText>
        </View>
      ) : isError ? (
        <EmptyScreenInfo title="Error" subtitle={errorMessage} />
      ) : (
        <FlashList
          testID="articles-list"
          data={articles}
          renderItem={({ item }) => (
            <ArticleCard article={item} onPress={setSelectedArticle} />
          )}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          contentContainerStyle={styles.contentContainer}
          refreshing={isRefetching}
          onRefresh={refetch}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <EmptyScreenInfo
              title="No articles found"
              subtitle="Try selecting different domains"
            />
          }
        />
      )}
      <ArticleDetailModal
        selectedArticle={selectedArticle}
        onPressClose={() => setSelectedArticle(undefined)}
      />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: COLORS.background,
  },
  filtersContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 2,
  },
  footerLoader: {
    paddingVertical: 24,
  },
  emptyContainer: {
    paddingTop: '50%',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 40,
  },
});
