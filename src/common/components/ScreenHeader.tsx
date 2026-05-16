import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@theme';

interface HeaderProps {
  title: string;
}

// header to be used on top of screens
export const ScreenHeader: FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.logo} accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
    color: COLORS.primary,
  },
});
