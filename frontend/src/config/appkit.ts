import '@walletconnect/react-native-compat';
import { createAppKit } from '@reown/appkit-react-native';
import { EthersAdapter } from '@reown/appkit-ethers-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEPOLIA_CHAIN } from './constants';

const projectId = process.env.EXPO_PUBLIC_REOWN_PROJECT_ID ?? '';

// AsyncStorage-backed storage adapter that satisfies the AppKit Storage interface
const storage = {
  getKeys: async () => {
    const keys = await AsyncStorage.getAllKeys();
    return [...keys];
  },
  getEntries: async <T = unknown>(): Promise<[string, T][]> => {
    const keys = await AsyncStorage.getAllKeys();
    const entries = await AsyncStorage.multiGet(keys);
    return entries
      .filter(([, v]) => v !== null)
      .map(([k, v]) => [k, JSON.parse(v!) as T]);
  },
  getItem: async <T = unknown>(key: string): Promise<T | undefined> => {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return undefined;
    return JSON.parse(value) as T;
  },
  setItem: async <T = unknown>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },
};

const ethersAdapter = new EthersAdapter();

export const appKit = createAppKit({
  projectId,
  networks: [SEPOLIA_CHAIN],
  defaultNetwork: SEPOLIA_CHAIN,
  adapters: [ethersAdapter],
  storage,
  metadata: {
    name: 'ETH Wallet DApp',
    description: 'Ethereum Tech Exam',
    url: 'https://example.com',
    icons: ['https://example.com/icon.png'],
    redirect: {
      native: 'ethexam://',
    },
  },
});
