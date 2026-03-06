import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  StatusBar,
  SafeAreaView,
} from 'react-native';

// ─────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────
const tokens = {
  dark: {
    bg:           '#0d0d0d',
    bgCard:       '#121212',
    bgChip:       '#131313',
    bgHero:       '#121212',
    bgTogOff:     '#181818',
    bgTogOn:      '#34d399',
    bgNav:        '#0d0d0d',
    border:       '#1d1d1d',
    borderHero:   '#1e1e1e',
    borderTog:    '#252525',
    borderNav:    '#1a1a1a',
    text:         '#e8e8e8',
    textSub:      '#3a3a3a',
    textMuted:    '#3d3d3d',
    textMeta:     '#383838',
    textNav:      '#2e2e2e',
    textRec:      '#2e2e2e',
    accent:       '#34d399',
    accentDark:   '#059669',
    ctaBg:        '#34d399',
    ctaText:      '#060d0a',
    togOnText:    '#fff',
    togOffText:   '#505050',
    pbarBg:       '#1e1e1e',
    pbarFill:     ['#34d399', '#059669'] as [string, string],
    sessDivider:  '#161616',
    badgeGBg:     'rgba(52,211,153,0.1)',  badgeGFg: '#34d399',
    badgeABg:     'rgba(251,191,36,0.1)',  badgeAFg: '#fbbf24',
    badgeRBg:     'rgba(248,113,113,0.1)', badgeRFg: '#f87171',
  },
  light: {
    bg:           '#f3f3f1',
    bgCard:       '#e9e9e7',
    bgChip:       '#e9e9e7',
    bgHero:       '#e4f5ee',
    bgTogOff:     '#fff',
    bgTogOn:      '#059669',
    bgNav:        '#f3f3f1',
    border:       '#dededd',
    borderHero:   '#c8e8d8',
    borderTog:    '#c8e8d8',
    borderNav:    '#e0e0de',
    text:         '#111',
    textSub:      '#b0b0b0',
    textMuted:    '#aaa',
    textMeta:     '#b0b0b0',
    textNav:      '#ccc',
    textRec:      '#c4c4c4',
    accent:       '#059669',
    accentDark:   '#047857',
    ctaBg:        '#059669',
    ctaText:      '#fff',
    togOnText:    '#fff',
    togOffText:   '#7aab96',
    pbarBg:       '#c8e8d8',
    pbarFill:     ['#34d399', '#059669'] as [string, string],
    sessDivider:  '#e4e4e2',
    badgeGBg:     '#f0fdf4', badgeGFg: '#16a34a',
    badgeABg:     '#fffbeb', badgeAFg: '#d97706',
    badgeRBg:     '#fff1f2', badgeRFg: '#dc2626',
  },
};

// ─────────────────────────────────────
// TYPES
// ─────────────────────────────────────
type Theme = typeof tokens.dark;
type AccentMode = 'GB' | 'US';
type SessionResult = 'g' | 'a' | 'r';

interface Session {
  id: string;
  name: string;
  meta: string;
  result: SessionResult;
  score: string;
}

// ─────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────
const SESSIONS: Session[] = [
  { id: '1', name: 'Reading Passage 3', meta: '14 words · British · Today',     result: 'g', score: '84%' },
  { id: '2', name: 'Word Drill — /th/', meta: '22 words · British · Yesterday', result: 'a', score: '61%' },
  { id: '3', name: 'Reading Passage 2', meta: '18 words · American · 2d ago',   result: 'g', score: '91%' },
  { id: '4', name: 'Reading Passage 1', meta: '11 words · American · 3d ago',   result: 'r', score: '44%' },
];

// ─────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────
function StatChip({ value, label, highlight, t }: {
  value: string; label: string; highlight?: boolean; t: Theme;
}) {
  return (
    <View style={[styles.chip, { backgroundColor: t.bgChip, borderColor: t.border }]}>
      <Text style={[styles.chipVal, { color: highlight ? t.accent : t.text }]}>{value}</Text>
      <Text style={[styles.chipLbl, { color: t.textMuted }]}>{label}</Text>
    </View>
  );
}

function ScoreBadge({ result, score, t }: { result: SessionResult; score: string; t: Theme }) {
  const map = {
    g: { bg: t.badgeGBg, fg: t.badgeGFg },
    a: { bg: t.badgeABg, fg: t.badgeAFg },
    r: { bg: t.badgeRBg, fg: t.badgeRFg },
  };
  const { bg, fg } = map[result];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color: fg }]}>{score}</Text>
    </View>
  );
}

function SessionRow({ session, t, isLast }: { session: Session; t: Theme; isLast: boolean }) {
  return (
    <View style={[styles.sessRow, !isLast && { borderBottomColor: t.sessDivider, borderBottomWidth: 1 }]}>
      <ScoreBadge result={session.result} score={session.score} t={t} />
      <View style={styles.sessInfo}>
        <Text style={[styles.sessName, { color: t.text }]}>{session.name}</Text>
        <Text style={[styles.sessMeta, { color: t.textMeta }]}>{session.meta}</Text>
      </View>
    </View>
  );
}

function NavTab({ label, active, t, onPress }: {
  label: string; active: boolean; t: Theme; onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.navTab} onPress={onPress} activeOpacity={0.7}>
      <Text style={{ fontSize: 18, color: active ? t.accent : t.textNav }}>
        {label === 'Home' ? '⌂' : label === 'Practice' ? '♪' : label === 'Progress' ? '▦' : '⚙'}
      </Text>
      <Text style={[styles.navLabel, { color: active ? t.accent : t.textNav }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────
export default function HomeScreen() {
  const scheme = useColorScheme();
  const t: Theme = scheme === 'dark' ? tokens.dark : tokens.light;

  const [accent, setAccent] = useState<AccentMode>('GB');
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.bg }]}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />

      <ScrollView
        style={{ backgroundColor: t.bg }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App header */}
        <View style={styles.appHeader}>
          <Text style={[styles.wordmark, { color: t.text }]}>
            Accent<Text style={{ color: t.accent }}>AI</Text>
          </Text>
          <View style={[styles.avatar, { backgroundColor: t.bgChip, borderColor: t.border }]}>
            <Text style={[styles.avatarText, { color: t.accent }]}>JD</Text>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={[styles.greetSub, { color: t.textSub }]}>GOOD MORNING</Text>
          <Text style={[styles.greetMain, { color: t.text }]}>Josh Davies</Text>
        </View>

        {/* Stat chips */}
        <View style={styles.chips}>
          <StatChip value="7"   label="Streak"   t={t} />
          <StatChip value="142" label="Words"     t={t} />
          <StatChip value="78%" label="Accuracy"  t={t} highlight />
        </View>

        {/* Hero card */}
        <View style={[styles.hero, { backgroundColor: t.bgHero, borderColor: t.borderHero }]}>
          <Text style={[styles.heroEye, { color: t.accent }]}>TODAY'S SESSION</Text>
          <Text style={[styles.heroTitle, { color: t.text }]}>
            Ready to practise?{'\n'}Let's keep that streak going.
          </Text>
          <View style={styles.prow}>
            <Text style={[styles.plbl, { color: t.textMuted }]}>Weekly accuracy</Text>
            <Text style={[styles.pval, { color: t.accent }]}>78%</Text>
          </View>
          <View style={[styles.pbarBg, { backgroundColor: t.pbarBg }]}>
            <View style={[styles.pbarFill, { backgroundColor: t.accent, width: '78%' }]} />
          </View>
          <View style={styles.heroFoot}>
            <TouchableOpacity
              style={[styles.cta, { backgroundColor: t.ctaBg }]}
              activeOpacity={0.85}
            >
              <Text style={[styles.ctaText, { color: t.ctaText }]}>Start reading</Text>
            </TouchableOpacity>
            <View style={styles.toggles}>
              {(['GB', 'US'] as AccentMode[]).map(mode => (
                <TouchableOpacity
                  key={mode}
                  style={[styles.tog, {
                    backgroundColor: accent === mode ? t.bgTogOn : t.bgTogOff,
                    borderColor:     accent === mode ? t.bgTogOn : t.borderTog,
                  }]}
                  onPress={() => setAccent(mode)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.togText, { color: accent === mode ? t.togOnText : t.togOffText }]}>
                    {mode === 'GB' ? '🇬🇧 GB' : '🇺🇸 US'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Recent sessions */}
        <View style={styles.recHeader}>
          <Text style={[styles.recLbl, { color: t.textRec }]}>RECENT SESSIONS</Text>
          <TouchableOpacity>
            <Text style={[styles.recAll, { color: t.accent }]}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sessList}>
          {SESSIONS.map((s, i) => (
            <SessionRow key={s.id} session={s} t={t} isLast={i === SESSIONS.length - 1} />
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom nav */}
      <View style={[styles.botNav, { backgroundColor: t.bgNav, borderTopColor: t.borderNav }]}>
        {['Home', 'Practice', 'Progress', 'Settings'].map(tab => (
          <NavTab key={tab} label={tab} active={activeTab === tab} t={t} onPress={() => setActiveTab(tab)} />
        ))}
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────
// STYLES
// ─────────────────────────────────────
const styles = StyleSheet.create({
  safe:          { flex: 1 },
  scrollContent: { paddingBottom: 12 },
  appHeader:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: 14 },
  wordmark:      { fontSize: 15, fontWeight: '600', letterSpacing: 0.2 },
  avatar:        { width: 34, height: 34, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  avatarText:    { fontSize: 11, fontWeight: '700' },
  greeting:      { paddingHorizontal: 22, paddingTop: 22 },
  greetSub:      { fontSize: 11, fontWeight: '400', letterSpacing: 1.2, marginBottom: 3 },
  greetMain:     { fontSize: 24, fontWeight: '600', letterSpacing: -0.5, lineHeight: 28 },
  chips:         { flexDirection: 'row', gap: 7, paddingHorizontal: 22, paddingTop: 14 },
  chip:          { flex: 1, borderRadius: 10, borderWidth: 1, paddingVertical: 10, alignItems: 'center', gap: 3 },
  chipVal:       { fontSize: 16, fontWeight: '700', letterSpacing: -0.5 },
  chipLbl:       { fontSize: 9, fontWeight: '500', letterSpacing: 0.5, textTransform: 'uppercase' },
  hero:          { marginHorizontal: 22, marginTop: 14, borderRadius: 16, borderWidth: 1, padding: 18 },
  heroEye:       { fontSize: 9, fontWeight: '600', letterSpacing: 1.5, marginBottom: 7 },
  heroTitle:     { fontSize: 16, fontWeight: '600', lineHeight: 23, marginBottom: 14 },
  prow:          { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  plbl:          { fontSize: 10 },
  pval:          { fontSize: 10, fontWeight: '600' },
  pbarBg:        { height: 4, borderRadius: 2, marginBottom: 16 },
  pbarFill:      { height: 4, borderRadius: 2 },
  heroFoot:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cta:           { borderRadius: 9, paddingVertical: 11, paddingHorizontal: 18 },
  ctaText:       { fontSize: 13, fontWeight: '700' },
  toggles:       { flexDirection: 'row', gap: 6 },
  tog:           { borderRadius: 7, paddingVertical: 7, paddingHorizontal: 10, borderWidth: 1 },
  togText:       { fontSize: 10, fontWeight: '600' },
  recHeader:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, paddingTop: 20, paddingBottom: 10 },
  recLbl:        { fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  recAll:        { fontSize: 11, fontWeight: '500' },
  sessList:      { paddingHorizontal: 22 },
  sessRow:       { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 10 },
  badge:         { width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  badgeText:     { fontSize: 12, fontWeight: '700' },
  sessInfo:      { flex: 1 },
  sessName:      { fontSize: 13, fontWeight: '500', marginBottom: 2 },
  sessMeta:      { fontSize: 10 },
  botNav:        { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 24, borderTopWidth: 1 },
  navTab:        { alignItems: 'center', gap: 3 },
  navLabel:      { fontSize: 9, fontWeight: '500' },
});