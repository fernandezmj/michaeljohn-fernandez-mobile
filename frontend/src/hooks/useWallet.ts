import { useAppKit, useAccount } from '@reown/appkit-react-native';

export function useWallet() {
  const { open, disconnect } = useAppKit();
  const { address, isConnected } = useAccount();

  return {
    address: address ?? null,
    isConnected,
    isConnecting: false,
    error: null,
    connect: () => open(),
    disconnect: () => disconnect(),
  };
}
