import { StyleSheet } from 'react-native';

const ADDRESS_BG = 'rgba(0,0,0,0.30)';
const BORDER = 'rgba(255,255,255,0.18)';
const GLASS = 'rgba(255,255,255,0.06)';

const AMBER = '#F59E0B';
const GREEN = '#10B981';

const TEXT_WHITE = '#FFFFFF';
const TEXT_SLATE_300 = '#cbd5e1';
const TEXT_SLATE_400 = '#94a3b8';
const TEXT_SLATE_500 = '#64748b';

export const styles = StyleSheet.create({
  // Outer container — clips layers, shows border
  cardContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER,
  },
  // Gradient fills entire card
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  // Thin white rim at top — glass light-reflection
  topRim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  inner: {
    padding: 24,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245,158,11,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.30)',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontFamily: 'Exo2_500Medium',
    fontSize: 13,
    color: AMBER,
  },
  refreshBtn: {
    padding: 6,
    borderRadius: 8,
  },
  refreshBtnPressed: {
    opacity: 0.4,
  },

  // Balance area
  balanceArea: {
    marginBottom: 28,
  },
  skeletonBalanceLine: {
    height: 64,
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    marginBottom: 12,
  },
  skeletonEthLabel: {
    height: 28,
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6,
    marginBottom: 10,
  },
  skeletonUsdLine: {
    height: 16,
    width: 140,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
  },
  balanceNumber: {
    fontFamily: 'Orbitron_700Bold',
    fontSize: 45,
    color: TEXT_WHITE,
    letterSpacing: -1.5,
    lineHeight: 64,
  },
  ethLabel: {
    fontFamily: 'Orbitron_700Bold',
    fontSize: 26,
    color: AMBER,
    marginTop: 4,
  },
  usdValue: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 14,
    color: TEXT_SLATE_400,
    marginTop: 8,
  },

  // Address row — inset darker "glass" pill
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 20,
    backgroundColor: ADDRESS_BG,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: GREEN,
    flexShrink: 0,
  },
  addressText: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 15,
    color: TEXT_SLATE_300,
    flex: 1,
    letterSpacing: 0.3,
  },
  copyBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: GLASS,
  },
  copyBtnPressed: {
    opacity: 0.4,
  },

  // Footer meta
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerText: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 13,
    color: TEXT_SLATE_500,
  },
  footerDivider: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 13,
    color: '#334155',
  },
  skeletonFooterLeft: {
    height: 13,
    width: 110,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
  },
  skeletonFooterRight: {
    height: 13,
    width: 90,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
  },
});
