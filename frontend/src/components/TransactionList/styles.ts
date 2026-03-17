import { StyleSheet } from 'react-native';

const ROW_BG = '#0D1526';
const BORDER = 'rgba(255,255,255,0.08)';
const RED_LIGHT = '#f87171';

const AMBER = '#F59E0B';
const TEXT_WHITE = '#F8FAFC';
const TEXT_SLATE_400 = '#94a3b8';
const TEXT_SLATE_500 = '#64748b';

export const styles = StyleSheet.create({
  container: {},

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 12,
    color: TEXT_WHITE,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  refreshBtnPressed: {
    opacity: 0.5,
  },
  refreshText: {
    fontFamily: 'Exo2_500Medium',
    fontSize: 12,
    color: TEXT_SLATE_400,
  },

  // Skeleton row
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: ROW_BG,
    marginBottom: 10,
  },
  skeletonIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.08)',
    flexShrink: 0,
  },
  skeletonAddrCol: {
    flex: 1,
    gap: 8,
  },
  skeletonAddrLine: {
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 4,
    width: '60%',
  },
  skeletonBlockLine: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    width: '40%',
  },
  skeletonValueCol: {
    alignItems: 'flex-end',
    gap: 8,
    flexShrink: 0,
  },
  skeletonValueLine: {
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 4,
    width: 80,
  },
  skeletonTimeLine: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    width: 48,
  },

  // Error state
  errorContainer: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 40,
  },
  errorText: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 14,
    color: RED_LIGHT,
    textAlign: 'center',
  },
  retryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  retryBtnPressed: {
    opacity: 0.5,
  },
  retryText: {
    fontFamily: 'Exo2_500Medium',
    fontSize: 13,
    color: TEXT_SLATE_400,
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 48,
  },
  emptyText: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 14,
    color: TEXT_SLATE_500,
  },

  // FlatList item wrapper
  itemWrapper: {
    marginBottom: 10,
  },
});
