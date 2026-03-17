import { StyleSheet } from 'react-native';

const VIOLET = '#8B5CF6';
const VIOLET_DARK = '#7C3AED';
const RED_LIGHT = '#f87171';
const TEXT_WHITE = '#F8FAFC';
const TEXT_SLATE_400 = '#94a3b8';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
    gap: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 58,
    paddingHorizontal: 32,
    borderRadius: 16,
    backgroundColor: VIOLET,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.4)',
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnPressed: {
    backgroundColor: VIOLET_DARK,
    opacity: 0.9,
  },
  btnText: {
    color: TEXT_WHITE,
    fontFamily: 'Orbitron_600SemiBold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  connectingText: {
    color: TEXT_WHITE,
    fontFamily: 'Exo2_600SemiBold',
    fontSize: 15,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(239,68,68,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.20)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  errorIcon: {
    marginTop: 2,
  },
  errorText: {
    flex: 1,
    fontFamily: 'Exo2_400Regular',
    fontSize: 14,
    color: RED_LIGHT,
    lineHeight: 20,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  retryBtnPressed: {
    opacity: 0.6,
  },
  retryText: {
    fontFamily: 'Exo2_400Regular',
    fontSize: 12,
    color: TEXT_SLATE_400,
  },
});
