import { Linking, Pressable, Text, View } from 'react-native';
import { ArrowDownLeft, ArrowUpRight, XCircle, Zap } from 'lucide-react-native';
import type { Transaction } from '../../types';
import { truncateAddress, weiToEth, timeAgo, formatFunctionName, getTxDirection } from '../../utils/format';
import { styles } from './styles';

interface TransactionItemProps {
  tx: Transaction;
  myAddress: string;
}

export function TransactionItem({ tx, myAddress }: TransactionItemProps) {
  const direction = getTxDirection(tx, myAddress);
  const isIn = direction === 'in';
  const isFailed = tx.isError === '1';
  const ethValue = weiToEth(tx.value);
  const counterparty = isIn ? tx.from : tx.to;
  const fnName = formatFunctionName(tx.functionName);
  const isDeFi = fnName.length > 0;

  const handlePress = () => {
    Linking.openURL(`https://sepolia.etherscan.io/tx/${tx.hash}`);
  };

  const iconBgStyle = isFailed
    ? styles.iconBgFailed
    : isDeFi
    ? styles.iconBgDefi
    : isIn
    ? styles.iconBgIn
    : styles.iconBgOut;

  const valueStyle = isFailed
    ? styles.valueFailed
    : isIn
    ? styles.valueIn
    : styles.valueOut;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      accessibilityLabel={`${isFailed ? 'Failed' : isIn ? 'Received' : 'Sent'} ${ethValue} ETH`}
      accessibilityRole="button"
    >
      {/* Direction icon */}
      <View style={iconBgStyle}>
        {isFailed ? (
          <XCircle size={20} color="#EF4444" />
        ) : isDeFi ? (
          <Zap size={20} color="#8B5CF6" />
        ) : isIn ? (
          <ArrowDownLeft size={20} color="#10B981" />
        ) : (
          <ArrowUpRight size={20} color="#F59E0B" />
        )}
      </View>

      {/* Address + label */}
      <View style={styles.addrCol}>
        <Text style={styles.addrLine} numberOfLines={1}>
          {isIn ? 'From ' : 'To '}
          <Text style={styles.addrMono}>{truncateAddress(counterparty)}</Text>
        </Text>
        {isDeFi ? (
          <Text style={styles.fnLabel} numberOfLines={1}>{fnName}</Text>
        ) : (
          <Text style={styles.blockLabel}>Block #{tx.blockNumber}</Text>
        )}
      </View>

      {/* Value + time */}
      <View style={styles.valueCol}>
        <Text style={valueStyle}>
          {isIn ? '+' : '−'}{ethValue} ETH
        </Text>
        <Text style={styles.timestamp}>{timeAgo(tx.timeStamp)}</Text>
      </View>

      {/* Status dot */}
      <View style={isFailed ? styles.dotFailed : styles.dotSuccess} />
    </Pressable>
  );
}
