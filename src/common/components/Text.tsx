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

TitleText.displayName = 'TitleText';
DescriptionText.displayName = 'DescriptionText';
DateText.displayName = 'DateText';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  date: {
    marginBottom: 8,
    textAlign: 'right',
  },
});
