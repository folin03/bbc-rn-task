/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ArticlesScreen } from '@articles';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@api/client';

function App() {
  return (
    <SafeAreaProvider>
      {/* forse in dark status bar for simplicity, since we don't do theme switching */}
      <StatusBar barStyle={'dark-content'} />
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <ArticlesScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
