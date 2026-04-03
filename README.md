# ETH Wallet — React Native (Expo)

A mobile Ethereum wallet interface for the Ardata Full Stack Developer technical exam. Connect your wallet, view your live Sepolia testnet balance, and browse transaction history — all backed by real blockchain data.

> **Tiers completed:** Tier 1 — Frontend (Mobile) · Tier 2 — Backend (REST API)
> Tiers 3 and 4 are not included in this submission.

---

## Overview

This app allows a user to:

- Connect an Ethereum wallet (MetaMask, WalletConnect, or 100+ others) via Reown AppKit
- View live ETH balance fetched directly from the Sepolia network via Alchemy RPC
- Browse their last 10 transactions (normal + internal) from Etherscan API v2
- Tap any transaction to open it on Sepolia Etherscan
- Copy their wallet address to clipboard
- See real-time block number and gas price

**Frontend** built with React Native (Expo SDK 53), ethers.js v6, and TypeScript.
**Backend** built with Express.js, ethers.js v6, and TypeScript — exposes a REST API for gas price, block number, and account balance via Alchemy Sepolia RPC.

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 18+ | |
| npm | 9+ | |
| Expo CLI | Latest | `npm install -g expo-cli` |
| Android Studio | Latest | Required for Android builds (includes Android SDK + JDK) |
| Xcode | 26.2+ | Required for iOS builds (macOS only) |
| MetaMask | Latest | Install on your test device for wallet connection |

**Android SDK environment variables** (add to `~/.zshrc` or `~/.bashrc`):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

---

## Setup & Run Locally

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your API keys:

```env
EXPO_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
EXPO_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key
EXPO_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id
```

| Key | Where to get it |
|---|---|
| `EXPO_PUBLIC_ALCHEMY_API_KEY` | [dashboard.alchemy.com](https://dashboard.alchemy.com) → Create app → Ethereum → Sepolia |
| `EXPO_PUBLIC_ETHERSCAN_API_KEY` | [etherscan.io/myapikey](https://etherscan.io/myapikey) |
| `EXPO_PUBLIC_REOWN_PROJECT_ID` | [cloud.reown.com](https://cloud.reown.com) → Create project |

### 3. Run on device

**Android (USB or wireless ADB):**
```bash
npx expo run:android
```

**iOS (macOS only):**
```bash
npx expo run:ios
```

> Native folders (`android/`, `ios/`) are already generated via `expo prebuild` — no need to run it again unless you add new native modules.

### 4. Testing the wallet flow

1. Install **MetaMask** on your phone
2. Switch to **Sepolia testnet** inside MetaMask
3. Get free test ETH from a faucet:
   - https://cloud.google.com/application/web3/faucet/ethereum/sepolia
   - https://www.alchemy.com/faucets/ethereum-sepolia
4. Open the app → tap **Connect Wallet** → select MetaMask
5. Approve the connection in MetaMask
6. Your Sepolia balance and transaction history will load

---

## Backend Setup & Run

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your API key:

```env
ALCHEMY_API_KEY=your_alchemy_api_key
PORT=3001
NODE_ENV=development
```

### 3. Run in development mode

```bash
npm run dev
```

Server starts at `http://localhost:3001`.

### 4. API endpoints

| Endpoint | Description |
|---|---|
| `GET /health` | Health check — `{"status":"ok"}` |
| `GET /api/ethereum/:address` | Gas price, block number, and balance for an Ethereum address |

**Example:**
```bash
curl http://localhost:3001/api/ethereum/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

```json
{
  "success": true,
  "data": {
    "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "balance": "0.0",
    "balanceWei": "0",
    "maxFeePerGas": "1.5",
    "maxFeePerGasWei": "1500000000",
    "maxPriorityFeePerGas": "1.0",
    "maxPriorityFeePerGasWei": "1000000000",
    "blockNumber": 7654321,
    "network": "sepolia",
    "timestamp": "2026-04-03T00:00:00.000Z"
  }
}
```

### 5. Run tests

```bash
npm test
```

---

## Build APK (Android)

```bash
cd frontend/android
./gradlew assembleDebug
```

Output: `app/build/outputs/apk/debug/app-debug.apk`

If the build fails with memory errors, add to `android/gradle.properties`:
```
org.gradle.jvmargs=-Xmx4096m
```

---

## Docker Compose

Not included in this submission (Tier 4). The frontend is a React Native app that runs natively on Android/iOS devices. The backend can be run locally via `npm run dev`.

---

## Key Assumptions & Architectural Decisions

**React Native (mobile) instead of React.js (web)**
The exam spec described a web interface, but mobile is the natural environment for wallet dApps — deep links to MetaMask, native device UX, and WalletConnect's primary use case are all mobile-first. React Native with Expo provides the same component model as React.js with native execution.

**Reown AppKit for wallet connection**
Instead of integrating WalletConnect manually, Reown AppKit handles the full connection lifecycle — session management, deep links, reconnection, and UI modals — with a single integration. It supports MetaMask, Trust Wallet, and 100+ others out of the box.

**Both `txlist` and `txlistinternal` from Etherscan**
The requirement asks for the last 10 transactions. However, faucet transfers and many DeFi interactions arrive as internal transactions (ETH sent from a smart contract), which `txlist` does not return. The service fetches both endpoints in parallel, merges and deduplicates, then returns the 10 most recent — ensuring no transactions are silently missed.

**Alchemy RPC instead of public endpoints**
Public Ethereum RPC endpoints are rate-limited and unreliable for production use. Alchemy's free tier (30M compute units/month) provides stable, fast access to Sepolia with no practical limits for a demo app.

**ethers.js v6 (not web3.js)**
ethers.js v6 has a cleaner API, better TypeScript support, smaller bundle size, and is the current industry standard for frontend blockchain interactions.

---

## Project Structure

```
michaeljohn-fernandez-mobile/
├── frontend/              # Tier 1 — React Native (Expo) mobile app
├── backend/               # Tier 2 — Express.js REST API
└── docs/                  # Planning documents and design specs
```

### Frontend

```
frontend/
├── src/
│   ├── config/
│   │   ├── appkit.ts          # Reown AppKit + WalletConnect setup
│   │   └── constants.ts       # API keys, Sepolia chain config
│   ├── services/
│   │   ├── ethereum.ts        # ethers.js — balance, gas price, block number
│   │   └── etherscan.ts       # Etherscan API — normal + internal transactions
│   ├── hooks/
│   │   ├── useWallet.ts       # Wallet connect/disconnect/address state
│   │   ├── useBalance.ts      # Balance + network stats with 30s auto-refresh
│   │   └── useTransactions.ts # Transaction list fetch
│   ├── components/
│   │   ├── BalanceCard/       # ETH balance, address display, network stats
│   │   ├── TransactionList/   # Scrollable tx list with skeleton loader
│   │   ├── TransactionItem/   # Individual transaction row (tap to open Etherscan)
│   │   ├── ConnectButton/     # Wallet connect button with error + retry state
│   │   └── ErrorState/        # Generic error display component
│   ├── screens/
│   │   └── HomeScreen.tsx     # Root screen — disconnected and connected views
│   ├── types/index.ts         # Transaction, WalletState, Balance interfaces
│   └── utils/format.ts        # truncateAddress, weiToEth, timeAgo helpers
├── App.tsx                    # Root — providers, font loading
├── index.js                   # Entry point — registerRootComponent
├── app.json                   # Expo config, URL scheme, bundle IDs
├── babel.config.js            # unstable_transformImportMeta for ethers.js
├── .env.example               # Environment variable template
└── package.json
```

### Backend

```
backend/
├── src/
│   ├── index.ts               # Entry point — dotenv + app.listen
│   ├── app.ts                 # Express app — middleware + routes (no listen)
│   ├── provider.ts            # ethers.js JsonRpcProvider singleton (staticNetwork)
│   ├── routes/
│   │   └── ethereum.ts        # GET /api/ethereum/:address
│   ├── services/
│   │   └── ethereum.ts        # EthereumService — getAccountDetails()
│   ├── middleware/
│   │   ├── validation.ts      # Ethereum address validation (ethers.isAddress)
│   │   └── errorHandler.ts    # Centralized error handler (503 for network errors)
│   ├── types/
│   │   └── index.ts           # AccountDetails interface
│   └── __tests__/             # Jest + supertest test suites
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Known Issues & Limitations

- **Simulator wallet connection** — Social login (Google/email) via WalletConnect requires a browser redirect that iOS/Android simulators don't handle reliably. Use a physical device with MetaMask for the full flow.
- **USD value not shown** — The balance card has a placeholder for USD value. A price API (CoinGecko, etc.) would be needed to populate it; not implemented in this tier.
- **Gas price shows 0.00 Gwei** — Sepolia is a testnet with near-zero gas demand. This is accurate, not a bug.
- **New Architecture disabled** — `newArchEnabled: false` in `app.json` due to a compatibility issue with `@reown/appkit-react-native` v2 and React Native 0.79's new renderer. Re-enable after Reown updates their bridge.

---

## Dependencies

```json
"@reown/appkit-ethers-react-native": "^2.0.2"
"@reown/appkit-react-native": "^2.0.2"
"ethers": "^6.16.0"
"axios": "^1.13.6"
"expo": "~53.0.0"
"expo-linear-gradient": "~14.1.5"
"expo-blur": "~14.1.4"
"expo-clipboard": "~7.1.5"
"expo-font": "~13.3.2"
"@expo-google-fonts/orbitron": "^0.4.2"
"@expo-google-fonts/exo-2": "^0.4.2"
"lucide-react-native": "^0.577.0"
"react-native-safe-area-context": "5.4.0"
"react-native-svg": "15.11.2"
```
