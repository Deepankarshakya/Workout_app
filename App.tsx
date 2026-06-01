import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation';
import useCachedResources from './hooks/useCachedResources';
// 1. Import the gesture handler wrapper at the very top
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const isLoading = useCachedResources();

  if (isLoading) {
    return (
      // 2. Wrap everything inside the conditional return block
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    );   
  } else {
    return null;
  }
}