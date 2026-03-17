import { StyleSheet } from 'react-native';

const ROW_BG = '#0D1526';
const BORDER = 'rgba(255,255,255,0.08)';

const AMBER = '#F59E0B';
const VIOLET = '#8B5CF6';
const GREEN = '#10B981';
const RED = '#EF4444';
const RED_LIGHT = '#f87171';

const TEXT_WHITE = '#F8FAFC';
const TEXT_SLATE_200 = '#e2e8f0';
const TEXT_SLATE_300 = '#cbd5e1';
const TEXT_SLATE_500 = '#64748b';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: ROW_BG,
  },
  rowPressed: {
    opacity: 0.65,
  },

  // Direction icon container variants
  iconBgIn: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'rgba(16,185,129,0.15)',
  },
  iconBgOut: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'rgba(245,158,11,0.15)',
  },
  iconBgFailed: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'rgba(239,68,68,0.15)',
  },
  iconBgDefi: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'rgba(139,92,246,0.15)',
  },

  // Address column
  addrCol: {
    flex: 1,
    minWidth: 0,
  },
  addrLine: {
    fontFamily: 'Exo2_500Medium',
    fontSize: 14,
    color: TEXT_WHITE,
  },
  addrMono: {
    fontFamily: 'Exo2_400Regular',
    color: TEXT_SLATE_300,
  },
  fnLabel: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 12,
    color: VIOLET,
    marginTop: 3,
  },
  blockLabel: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 12,
    color: TEXT_SLATE_500,
    marginTop: 3,
  },

  // Value column
  valueCol: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  valueIn: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 13,
    color: GREEN,
  },
  valueOut: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 13,
    color: TEXT_SLATE_200,
  },
  valueFailed: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 13,
    color: RED_LIGHT,
    textDecorationLine: 'line-through',
  },
  timestamp: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 11,
    color: TEXT_SLATE_500,
    marginTop: 3,
  },

  // Status dot
  dotSuccess: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: GREEN,
    flexShrink: 0,
  },
  dotFailed: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: RED,
    flexShrink: 0,
  },
});
