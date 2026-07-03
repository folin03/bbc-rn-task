import { COLORS } from '@theme';
import React, { forwardRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

interface CustomTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

export const TitleText = forwardRef<Text, CustomTextProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.title, style]} {...props}>
        {children}
      </Text>
    );
  },
);

export const TitleText2 = forwardRef<Text, CustomTextProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.title, style]} {...props}>
        {children}
      </Text>
    );
  },
);

export const DescriptionText = forwardRef<Text, CustomTextProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.description, style]} {...props}>
        {children}
      </Text>
    );
  },
);

export const DateText = forwardRef<Text, CustomTextProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.date, style]} {...props}>
        {children}
      </Text>
    );
  },
);

export const MutedSubText = forwardRef<Text, CustomTextProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.mutedSubtitle, style]} {...props}>
        {children}
      </Text>
    );
  },
);

// TitleText.displayName = 'TitleText';
// DescriptionText.displayName = 'DescriptionText';
// DateText.displayName = 'DateText';
// MutedSubText.displayName = 'MutedSubText';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: COLORS.text,
  },
  Title2: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    marginBottom: 8,
    color: COLORS.text,
  },
  date: {
    marginBottom: 8,
    color: COLORS.text,
  },
  mutedSubtitle: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
