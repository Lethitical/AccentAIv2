/**
 * Typography tokens — Outfit font throughout.
 * Matches .cursorrules design system.
 */

export const typography = {
  wordmark: {
    fontSize: 13,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    letterSpacing: -0.6,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: '700' as const,
    letterSpacing: 1.3,
    textTransform: 'uppercase' as const,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    letterSpacing: -0.4,
  },
  body: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 13 * 1.7,
  },
  meta: {
    fontSize: 10,
    fontWeight: '400' as const,
  },
  statNumberLarge: {
    fontSize: 48,
    fontWeight: '800' as const,
    letterSpacing: -2.5,
  },
  statNumberSmall: {
    fontSize: 17,
    fontWeight: '700' as const,
  },
  ringNumber: {
    fontSize: 15,
    fontWeight: '700' as const,
  },
  // Size scale for ad-hoc use (used by progress, practice, settings)
  sizes: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 26,
  },
  // Weights for ad-hoc use
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
} as const;
