import { FlatList, Pressable, Text, View } from 'react-native';
import { RefreshCw, Inbox } from 'lucide-react-native';
import type { Transaction } from '../../types';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import { styles } from './styles';

interface TransactionListProps {
  transactions: Transaction[];
  myAddress: string;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

function SkeletonRow() {
  return (
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonIcon} />
      <View style={styles.skeletonAddrCol}>
        <View style={styles.skeletonAddrLine} />
        <View style={styles.skeletonBlockLine} />
      </View>
      <View style={styles.skeletonValueCol}>
        <View style={styles.skeletonValueLine} />
        <View style={styles.skeletonTimeLine} />
      </View>
    </View>
  );
}

export function TransactionList({
  transactions,
  myAddress,
  loading,
  error,
  onRefresh,
}: TransactionListProps) {
  return (
    <View>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <Pressable
          onPress={onRefresh}
          disabled={loading}
          style={({ pressed }) => [
            styles.refreshBtn,
            pressed && styles.refreshBtnPressed,
          ]}
          accessibilityLabel="Refresh transactions"
        >
          <RefreshCw size={14} color="#94a3b8" />
          <Text style={styles.refreshText}>Refresh</Text>
        </Pressable>
      </View>

      {/* Content */}
      {loading ? (
        <View>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            onPress={onRefresh}
            style={({ pressed }) => [
              styles.retryBtn,
              pressed && styles.retryBtnPressed,
            ]}
          >
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      ) : transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Inbox size={40} color="#4b5563" />
          <Text style={styles.emptyText}>No transactions yet</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.hash}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <TransactionItem tx={item} myAddress={myAddress} />
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}
