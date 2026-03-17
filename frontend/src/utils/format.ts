import type { Transaction } from '../types';

export function truncateAddress(address: string, start = 6, end = 4): string {
  if (!address) return '';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function weiToEth(wei: string, decimals = 6): string {
  const eth = Number(wei) / 1e18;
  if (eth === 0) return '0';
  return eth.toFixed(decimals).replace(/\.?0+$/, '');
}

export function timeAgo(unixTimestamp: string): string {
  const seconds = Math.floor(Date.now() / 1000 - Number(unixTimestamp));
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  const date = new Date(Number(unixTimestamp) * 1000);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatGasCost(gasUsed: string, gasPrice: string): string {
  const cost = (Number(gasUsed) * Number(gasPrice)) / 1e18;
  return cost.toFixed(6);
}

export function getTxDirection(
  tx: Pick<Transaction, 'from' | 'to'>,
  myAddress: string,
): 'in' | 'out' {
  return tx.from.toLowerCase() === myAddress.toLowerCase() ? 'out' : 'in';
}

export function formatFunctionName(functionName: string): string {
  if (!functionName) return '';
  return functionName.split('(')[0];
}
