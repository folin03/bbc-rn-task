import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import SafeAreaContainer from '@common/components/containers/SafeArea.Container';
import { ScreenHeader } from '@common/components/ScreenHeader';
import { COLORS } from '@theme';

export const ArticlesScreen: FC = () => {
  return (
    <SafeAreaContainer style={styles.safeContainer} fullFlex edges={['top']}>
      <ScreenHeader title="All NEWS" />
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: COLORS.background,
  },
});
