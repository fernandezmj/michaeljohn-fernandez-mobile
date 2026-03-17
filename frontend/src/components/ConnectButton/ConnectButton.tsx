import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Wallet, AlertCircle, RotateCcw } from 'lucide-react-native';
import { styles } from './styles';

interface ConnectButtonProps {
  onConnect: () => void;
  isConnecting: boolean;
  error: string | null;
}

export function ConnectButton({ onConnect, isConnecting, error }: ConnectButtonProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onConnect}
        disabled={isConnecting}
        style={({ pressed }) => [
          styles.btn,
          isConnecting && styles.btnDisabled,
          pressed && !isConnecting && styles.btnPressed,
        ]}
        accessibilityLabel={isConnecting ? 'Connecting wallet' : 'Connect wallet'}
        accessibilityRole="button"
      >
        {isConnecting ? (
          <>
            <ActivityIndicator size="small" color="#ffffff" />
            <Text style={styles.connectingText}>Connecting…</Text>
          </>
        ) : (
          <>
            <Wallet size={20} color="#ffffff" />
            <Text style={styles.btnText}>Connect Wallet</Text>
          </>
        )}
      </Pressable>

      {error && (
        <View style={styles.errorBox} accessibilityRole="alert">
          <AlertCircle size={16} color="#f87171" style={styles.errorIcon} />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            onPress={onConnect}
            disabled={isConnecting}
            style={({ pressed }) => [
              styles.retryBtn,
              pressed && styles.retryBtnPressed,
            ]}
            accessibilityLabel="Retry connection"
          >
            <RotateCcw size={12} color="#f87171" />
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
