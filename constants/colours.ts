/**
 * Indigo design system colour tokens.
 * Usage: const t = scheme === 'dark' ? colours.dark : colours.light
 */

export const colours = {
  light: {
    // Surfaces
    background: '#eef0f8',
    cardBackground: '#ffffff',
    cardBorder: '#d0d4e8',
    sectionBackground: '#eef0f8',

    // Text
    textPrimary: '#181c30',
    textMuted: '#9098b0',

    // Dividers & borders
    divider: '#eaecf4',

    // Accent
    accent: '#4f62d0',
    accentSecondary: '#6ee7f7',

    // CTA
    ctaBackground: '#4f62d0',
    ctaText: '#ffffff',

    // Stat card (dark card on light bg)
    statCardBackground: '#181c30',
    statCardText: '#e0e4f8',
    statCardMuted: '#4a5080',
    statCardRing: '#4f62d0',
    statCardBorder: '#2a3060',
    statRingTrack: '#2a3060',

    // Toggles
    toggleOn: '#4f62d0',
    toggleOff: '#e0e4ee',

    // Nav
    navActive: '#4f62d0',
    navInactive: '#b0b8d0',

    // Score brackets
    scoreGoodBg: '#e8ebf8',
    scoreGoodText: '#4f62d0',
    scoreAvgBg: '#fef9e8',
    scoreAvgText: '#c09010',
    scorePoorBg: '#fde8e8',
    scorePoorText: '#c03030',

    // Utility
    white: '#ffffff',
    black: '#181c30',
  },

  dark: {
    // Surfaces
    background: '#0e1020',
    cardBackground: '#141830',
    cardBorder: '#1e2448',
    sectionBackground: '#0e1020',

    // Text
    textPrimary: '#c8d0f0',
    textMuted: '#3a4060',

    // Dividers & borders
    divider: '#1a2040',

    // Accent
    accent: '#6680f0',
    accentSecondary: '#50d8f0',

    // CTA
    ctaBackground: '#6680f0',
    ctaText: '#ffffff',

    // Stat card
    statCardBackground: '#141830',
    statCardText: '#e0e4f8',
    statCardMuted: '#4a5080',
    statCardRing: '#6680f0',
    statCardBorder: '#1e2448',
    statRingTrack: '#1a2040',

    // Toggles
    toggleOn: '#6680f0',
    toggleOff: '#2a3460',

    // Nav
    navActive: '#6680f0',
    navInactive: '#2a3460',

    // Score brackets
    scoreGoodBg: '#1a2252',
    scoreGoodText: '#6680f0',
    scoreAvgBg: '#2a2010',
    scoreAvgText: '#d0a030',
    scorePoorBg: '#2a1010',
    scorePoorText: '#d05050',

    // Utility
    white: '#ffffff',
    black: '#0e1020',
  },
} as const;

export type ColourScheme = keyof typeof colours;
export type LightTokens = (typeof colours)['light'];
export type DarkTokens = (typeof colours)['dark'];
