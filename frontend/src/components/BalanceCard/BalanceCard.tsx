import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import { RefreshCw, Copy, Check, Shield } from 'lucide-react-native';
import { truncateAddress } from '../../utils/format';
import { styles } from './styles';

interface BalanceCardProps {
  address: string;
  eth: string | null;
  usdValue: string | null;
  gasPrice: string | null;
  blockNumber: number | null;
  loading: boolean;
  onRefresh: () => void;
}

export function BalanceCard({
  address,
  eth,
  usdValue,
  gasPrice,
  blockNumber,
  loading,
  onRefresh,
}: BalanceCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Gradient: lighter blue-purple top → deeper navy bottom */}
      <LinearGradient
        colors={['#202244', '#181A38', '#13152E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />

      {/* Rim highlight along top edge */}
      <View style={styles.topRim} />

      {/* Content */}
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.badge}>
            <Shield size={12} color="#F59E0B" />
            <Text style={styles.badgeText}>Sepolia Testnet</Text>
          </View>
          <Pressable
            onPress={onRefresh}
            disabled={loading}
            style={({ pressed }) => [
              styles.refreshBtn,
              pressed && styles.refreshBtnPressed,
            ]}
            accessibilityLabel="Refresh balance"
          >
            <RefreshCw size={18} color="#64748b" />
          </Pressable>
        </View>

        {/* Balance */}
        <View style={styles.balanceArea}>
          {loading ? (
            <>
              <View style={styles.skeletonBalanceLine} />
              <View style={styles.skeletonEthLabel} />
              <View style={styles.skeletonUsdLine} />
            </>
          ) : (
            <>
              <Text style={styles.balanceNumber}>{eth ?? '—'}</Text>
              <Text style={styles.ethLabel}>ETH</Text>
              {usdValue && (
                <Text style={styles.usdValue}>≈ ${usdValue} USD</Text>
              )}
            </>
          )}
        </View>

        {/* Address row */}
        <View style={styles.addressRow}>
          <View style={styles.onlineDot} />
          <Text style={styles.addressText} selectable numberOfLines={1}>
            {truncateAddress(address)}
          </Text>
          <Pressable
            onPress={handleCopy}
            style={({ pressed }) => [
              styles.copyBtn,
              pressed && styles.copyBtnPressed,
            ]}
            accessibilityLabel={copied ? 'Address copied' : 'Copy address'}
          >
            {copied ? (
              <Check size={18} color="#34d399" />
            ) : (
              <Copy size={18} color="#64748b" />
            )}
          </Pressable>
        </View>

        {/* Footer meta */}
        <View style={styles.footerRow}>
          {blockNumber ? (
            <Text style={styles.footerText}>Block #{blockNumber.toLocaleString()}</Text>
          ) : (
            <View style={styles.skeletonFooterLeft} />
          )}
          <Text style={styles.footerDivider}>·</Text>
          {gasPrice ? (
            <Text style={styles.footerText}>Gas {gasPrice} Gwei</Text>
          ) : (
            <View style={styles.skeletonFooterRight} />
          )}
        </View>
      </View>
    </View>
  );
}
