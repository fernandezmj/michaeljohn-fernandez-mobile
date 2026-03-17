import { StyleSheet } from 'react-native';

const GLASS = 'rgba(255,255,255,0.03)';
const BORDER = 'rgba(255,255,255,0.08)';
const RED_LIGHT = '#f87171';

const TEXT_WHITE = '#ffffff';
const TEXT_SLATE_500 = '#64748b';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.10)',
    backgroundColor: GLASS,
  },
  textGroup: {
    alignItems: 'center',
    gap: 4,
  },
  message: {
    fontFamily: 'Exo2_500Medium',
    fontSize: 14,
    color: RED_LIGHT,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 12,
    color: TEXT_SLATE_500,
    textAlign: 'center',
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: 'rgba(255,255,255,0.06)',
    minHeight: 44,
  },
  retryBtnPressed: {
    opacity: 0.7,
  },
  retryText: {
    fontFamily: 'Exo2_500Medium',
    fontSize: 14,
    color: TEXT_WHITE,
  },
});
