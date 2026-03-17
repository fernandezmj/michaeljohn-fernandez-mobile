import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LogOut } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useWallet } from '../hooks/useWallet';
import { useBalance } from '../hooks/useBalance';
import { useTransactions } from '../hooks/useTransactions';
import { ConnectButton, BalanceCard, TransactionList } from '../components';
import { styles } from './styles';

function EthDiamond({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L5.5 12.5L12 16.5L18.5 12.5L12 2Z" fill="#8B5CF6" opacity={0.9} />
      <Path d="M12 2L5.5 12.5L12 16.5V2Z" fill="#6D28D9" opacity={0.9} />
      <Path d="M12 18.5L5.5 13.5L12 22L18.5 13.5L12 18.5Z" fill="#F59E0B" opacity={0.9} />
      <Path d="M12 18.5L5.5 13.5L12 22V18.5Z" fill="#D97706" opacity={0.9} />
    </Svg>
  );
}

function DisconnectedView({
  onConnect,
  isConnecting,
  error,
}: {
  onConnect: () => void;
  isConnecting: boolean;
  error: string | null;
}) {
  return (
    <View style={styles.disconnectedContainer}>
      <View style={styles.disconnectedLogo}>
        <EthDiamond size={96} />
      </View>
      <Text style={styles.disconnectedTitle}>ETH Wallet</Text>
      <Text style={styles.disconnectedSubtitle}>
        Connect your wallet to view your Sepolia balance and transaction history.
      </Text>
      <ConnectButton
        onConnect={onConnect}
        isConnecting={isConnecting}
        error={error}
      />
      <Text style={styles.disconnectedFooter}>
        Powered by Sepolia Testnet · No real funds
      </Text>
    </View>
  );
}

function ConnectedView({
  address,
  onDisconnect,
}: {
  address: string;
  onDisconnect: () => void;
}) {
  const { eth, usdValue, gasPrice, blockNumber, loading: balanceLoading, refresh: refreshBalance } =
    useBalance(address);
  const { transactions, loading: txLoading, error: txError, refresh: refreshTxs } =
    useTransactions(address);

  return (
    <View style={styles.connectedRoot}>
      {/* Header */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.headerRow}>
          <View style={styles.headerBrand}>
            <EthDiamond size={28} />
            <Text style={styles.headerTitle}>ETH Wallet</Text>
          </View>
          <Pressable
            onPress={onDisconnect}
            style={({ pressed }) => [
              styles.disconnectBtn,
              pressed && styles.disconnectBtnPressed,
            ]}
            accessibilityLabel="Disconnect wallet"
          >
            <LogOut size={14} color="#94a3b8" />
            <Text style={styles.disconnectBtnText}>Disconnect</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BalanceCard
          address={address}
          eth={eth}
          usdValue={usdValue}
          gasPrice={gasPrice}
          blockNumber={blockNumber}
          loading={balanceLoading}
          onRefresh={refreshBalance}
        />
        <TransactionList
          transactions={transactions}
          myAddress={address}
          loading={txLoading}
          error={txError}
          onRefresh={refreshTxs}
        />
      </ScrollView>

      {/* Footer */}
      <View style={styles.connectedFooter}>
        <Text style={styles.connectedFooterText}>
          Sepolia Testnet · No real funds
        </Text>
      </View>
    </View>
  );
}

export function HomeScreen() {
  const { address, isConnected, isConnecting, error, connect, disconnect } = useWallet();

  if (isConnected && address) {
    return (
      <ConnectedView address={address} onDisconnect={disconnect} />
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaFull}>
      <DisconnectedView
        onConnect={connect}
        isConnecting={isConnecting}
        error={error}
      />
    </SafeAreaView>
  );
}
