import { StyleSheet } from 'react-native';

const BG = '#0F172A';
const HEADER_BG = '#0B1220';
const GLASS = 'rgba(255,255,255,0.05)';
const BORDER_LIGHT = 'rgba(255,255,255,0.07)';
const BORDER = 'rgba(255,255,255,0.10)';

const TEXT_WHITE = '#F8FAFC';
const TEXT_SLATE_400 = '#94a3b8';
const TEXT_SLATE_500 = '#64748b';
const TEXT_SLATE_600 = '#475569';

export const styles = StyleSheet.create({
  // ── DisconnectedView ──────────────────────────────────────────
  disconnectedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
    backgroundColor: BG,
  },
  disconnectedLogo: {
    marginBottom: 36,
  },
  disconnectedTitle: {
    color: TEXT_WHITE,
    fontSize: 28,
    fontFamily: 'Orbitron_700Bold',
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  disconnectedSubtitle: {
    color: TEXT_SLATE_400,
    fontFamily: 'Exo2_400Regular',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 44,
    lineHeight: 24,
    maxWidth: 280,
  },
  disconnectedFooter: {
    marginTop: 36,
    fontSize: 11,
    fontFamily: 'Exo2_400Regular',
    color: TEXT_SLATE_600,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  // ── ConnectedView ─────────────────────────────────────────────
  connectedRoot: {
    flex: 1,
    backgroundColor: BG,
  },
  headerSafeArea: {
    backgroundColor: HEADER_BG,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
    backgroundColor: HEADER_BG,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    color: TEXT_WHITE,
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  disconnectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: GLASS,
    minHeight: 44,
  },
  disconnectBtnPressed: {
    opacity: 0.6,
  },
  disconnectBtnText: {
    color: TEXT_SLATE_400,
    fontFamily: 'Exo2_500Medium',
    fontSize: 13,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 48,
    gap: 24,
  },
  connectedFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
    backgroundColor: HEADER_BG,
  },
  connectedFooterText: {
    fontSize: 11,
    fontFamily: 'Exo2_400Regular',
    color: TEXT_SLATE_500,
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  // ── HomeScreen root ───────────────────────────────────────────
  safeAreaFull: {
    flex: 1,
    backgroundColor: BG,
  },
});
