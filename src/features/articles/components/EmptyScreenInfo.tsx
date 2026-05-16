import { MutedSubText, TitleText2 } from '@common/components/Text';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface EmptyScreenInfoProps {
  title: string;
  subtitle: string;
}

export const EmptyScreenInfo: FC<EmptyScreenInfoProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View style={styles.emptyContainer}>
      <TitleText2>{title}</TitleText2>
      <MutedSubText>{subtitle}</MutedSubText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    paddingTop: '50%',
    alignItems: 'center',
  },
});
