import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import SafeAreaContainer from '@common/components/containers/SafeArea.Container';
import { ScreenHeader } from '@common/components/ScreenHeader';
import { COLORS } from '@theme';
import { FlashList } from '@shopify/flash-list';
import { DOMAINS } from '@articles/constants';
import { DomainChip } from '@articles/components/DomainChip';

export const ArticlesScreen: FC = () => {
  return (
    <SafeAreaContainer style={styles.safeContainer} fullFlex edges={['top']}>
      <ScreenHeader title="All NEWS" />
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
});
