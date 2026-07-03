import React, { FC } from 'react';
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import { COLORS } from '@theme';
import { Article } from '@articles/types';
import SafeAreaContainer from '@common/components/containers/SafeArea.Container';
import { DescriptionText } from '@common/components/Text';

interface ArticleDetailModalProps {
  selectedArticle: Article | undefined;
  onPressClose: () => void;
}

export const ArticleDetailModal: FC<ArticleDetailModalProps> = ({
  selectedArticle,
  onPressClose,
}) => {
  return (
    <Modal
      testID="article-modal"
      visible={!!selectedArticle}
      animationType="slide"
    >
      <SafeAreaContainer
        fullFlex
        edges={Platform.OS === 'ios' ? ['top'] : undefined}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onPressClose}
          accessibilityRole="button"
          accessibilityLabel="Close article"
          accessibilityHint="Closes the article detail modal and returns to the article list"
        >
          <Ionicons name="chevron-back" size={40} />
          <Text>Back</Text>
        </TouchableOpacity>
        {selectedArticle && (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            accessibilityLabel={`Article details for ${selectedArticle.title}`}
            accessibilityHint={`Read the full details of the article titled ${selectedArticle.title}`}
          >
            <Text style={styles.title} accessibilityRole="header">
              {selectedArticle.title}
            </Text>
            <Text style={styles.meta}>
              {selectedArticle.source.name}
              {selectedArticle.author ? ` • ${selectedArticle.author}` : ''}
            </Text>
            <Text style={styles.meta}>
              {new Date(selectedArticle.publishedAt).toLocaleString()}
            </Text>
            {selectedArticle.urlToImage ? (
              <Image
                testID="article-detail-image"
                source={{ uri: selectedArticle.urlToImage }}
                style={styles.image}
                accessibilityElementsHidden={true}
                importantForAccessibility="no-hide-descendants"
                accessibilityIgnoresInvertColors
              />
            ) : null}
            <DescriptionText style={styles.body}>
              {selectedArticle.content}
            </DescriptionText>
          </ScrollView>
        )}
      </SafeAreaContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    color: COLORS.text,
  },
  meta: {
    color: COLORS.muted,
    fontSize: 14,
    marginBottom: 4,
  },
  image: {
    width: '100%',
    minHeight: 220,
    borderRadius: 12,
    marginVertical: 16,
  },
  body: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  subtitle: {
    marginTop: 12,
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 16,
  },
  closeButton: {
    paddingTop: 4,
    paddingLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
