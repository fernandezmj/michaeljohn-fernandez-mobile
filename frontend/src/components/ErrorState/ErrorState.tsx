import { Pressable, Text, View } from 'react-native';
import { WifiOff, RotateCcw } from 'lucide-react-native';
import { styles } from './styles';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <WifiOff size={40} color="#f87171" opacity={0.6} />
      <View style={styles.textGroup}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.subtitle}>Check your connection and try again</Text>
      </View>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={({ pressed }) => [
            styles.retryBtn,
            pressed && styles.retryBtnPressed,
          ]}
        >
          <RotateCcw size={16} color="#f1f5f9" />
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      )}
    </View>
  );
}
