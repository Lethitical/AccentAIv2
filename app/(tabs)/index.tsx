import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native'
import { colours } from '../../constants/colours'
import { typography } from '../../constants/typography'
import { spacing } from '../../constants/spacing'
import { useTheme } from '../../hooks/useTheme'

type AccentMode = 'GB' | 'US'
type SessionResult = 'good' | 'avg' | 'poor'

interface Session {
  id: string
  name: string
  meta: string
  score: number
  result: SessionResult
  date: string
}

const MOCK_SESSIONS: Session[] = [
  { id: '1', name: 'Reading Passage 3', meta: '14 words · British · Today', score: 84, result: 'good', date: '' },
  { id: '2', name: 'Word Drill — /th/', meta: '22 words · British · Yesterday', score: 61, result: 'avg', date: '' },
  { id: '3', name: 'Reading Passage 2', meta: '18 words · American · 2d ago', score: 91, result: 'good', date: '' },
  { id: '4', name: 'Reading Passage 1', meta: '11 words · American · 3d ago', score: 44, result: 'poor', date: '' },
]

type ColourTokens = typeof colours.light | typeof colours.dark

function getScoreColors(
  result: SessionResult,
  t: ColourTokens
): { bg: string; text: string } {
  if (result === 'good') return { bg: t.scoreGoodBg, text: t.scoreGoodText }
  if (result === 'avg') return { bg: t.scoreAvgBg, text: t.scoreAvgText }
  return { bg: t.scorePoorBg, text: t.scorePoorText }
}

function AccuracyRing({
  value,
  size,
  strokeWidth,
  trackColor,
  fillColor,
  textColor,
}: {
  value: number
  size: number
  strokeWidth: number
  trackColor: string
  fillColor: string
  textColor: string
}) {
  const r = size / 2
  return (
    <View style={[styles.ringWrap, { width: size, height: size }]}>
      <View
        style={[
          styles.ringTrack,
          {
            width: size,
            height: size,
            borderRadius: r,
            borderWidth: strokeWidth,
            borderColor: trackColor,
          },
        ]}
      />
      <View
        style={[
          styles.ringFill,
          {
            width: size,
            height: size,
            borderRadius: r,
            borderWidth: strokeWidth,
            borderTopColor: fillColor,
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            transform: [{ rotate: `${-90 + (value / 100) * 360}deg` }],
          },
        ]}
      />
      <View style={[StyleSheet.absoluteFillObject, styles.ringCenter]}>
        <Text style={[styles.ringNumber, { color: textColor }]}>{value}%</Text>
      </View>
    </View>
  )
}

function SessionRow({
  session,
  t,
  isLast,
}: {
  session: Session
  t: ColourTokens
  isLast: boolean
}) {
  const { bg, text } = getScoreColors(session.result, t)
  return (
    <View style={[styles.sessionRow, !isLast && { borderBottomWidth: 1, borderBottomColor: t.divider }]}>
      <View style={[styles.scoreBadge, { backgroundColor: bg }]}>
        <Text style={[styles.scoreBadgeText, { color: text }]}>{session.score}%</Text>
      </View>
      <View style={styles.sessionInfo}>
        <Text style={[styles.sessionName, { color: t.textPrimary }]}>{session.name}</Text>
        <Text style={[styles.sessionMeta, { color: t.textMuted }]}>{session.meta}</Text>
      </View>
    </View>
  )
}

export default function HomeScreen() {
  const { isDark } = useTheme()
  const t = isDark ? colours.dark : colours.light
  const [accentMode, setAccentMode] = useState<AccentMode>('GB')

  const accuracy = 78
  const streak = 7
  const totalWords = 142
  const trend = '+5%'
  const weekBars = [1, 0.8, 1, 0.6, 1, 0.9, 0]
  const weeklyBars = [4, 3, 5, 2, 6, 4, 3]

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingRow}>
          <View style={styles.greetingLeft}>
            <Text style={[styles.dateText, { color: t.textMuted }]}>
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
            </Text>
            <Text style={[styles.greetTitle, { color: t.textPrimary }]}>
              Hey Josh, keep going.
            </Text>
          </View>
          <View style={styles.gbUsRow}>
            {(['GB', 'US'] as AccentMode[]).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.gbUsBtn,
                  {
                    backgroundColor: accentMode === mode ? t.ctaBackground : 'transparent',
                    borderColor: t.cardBorder,
                  },
                ]}
                onPress={() => setAccentMode(mode)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.gbUsText,
                    { color: accentMode === mode ? t.ctaText : t.textMuted },
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* RingStat dark card */}
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: t.statCardBackground,
              borderColor: t.statCardBorder,
            },
          ]}
        >
          <AccuracyRing
            value={accuracy}
            size={70}
            strokeWidth={6}
            trackColor={t.statRingTrack}
            fillColor={t.statCardRing}
            textColor={t.statCardText}
          />
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: t.statCardMuted }]}>Streak</Text>
            <View style={[styles.statDivider, { backgroundColor: t.statCardMuted }]} />
            <Text style={[styles.statLabel, { color: t.statCardMuted }]}>Words</Text>
            <View style={[styles.statDivider, { backgroundColor: t.statCardMuted }]} />
            <Text style={[styles.statLabel, { color: t.statCardMuted }]}>Trend</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statValue, { color: t.statCardText }]}>{streak}</Text>
            <View style={[styles.statDivider, { backgroundColor: t.statCardMuted }]} />
            <Text style={[styles.statValue, { color: t.statCardText }]}>{totalWords}</Text>
            <View style={[styles.statDivider, { backgroundColor: t.statCardMuted }]} />
            <Text style={[styles.statValue, { color: t.accentSecondary }]}>{trend}</Text>
          </View>
        </View>

        {/* Up Next card */}
        <View style={[styles.upNextCard, { backgroundColor: t.cardBackground, borderColor: t.cardBorder }]}>
          <Text style={[styles.cardTitle, { color: t.textPrimary }]}>Reading Passage 4</Text>
          <Text style={[styles.metaText, { color: t.textMuted }]}>18 words · British</Text>
          <View style={styles.weekBarsRow}>
            {weekBars.map((fill, i) => (
              <View
                key={i}
                style={[
                  styles.weekBarBg,
                  { backgroundColor: t.divider },
                ]}
              >
                <View
                  style={[
                    styles.weekBarFill,
                    { backgroundColor: t.accent, width: `${fill * 100}%` },
                  ]}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: t.ctaBackground }]}
            activeOpacity={0.85}
          >
            <Text style={[styles.ctaText, { color: t.ctaText }]}>Start session</Text>
          </TouchableOpacity>
        </View>

        {/* Weekly bar chart */}
        <View style={styles.weeklySection}>
          <Text style={[styles.sectionLabel, { color: t.textMuted }]}>THIS WEEK</Text>
          <View style={styles.weeklyBarsRow}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, i) => (
              <View key={i} style={styles.weeklyBarCol}>
                <View
                  style={[
                    styles.weeklyBarBg,
                    { backgroundColor: t.divider },
                  ]}
                >
                  <View
                    style={[
                      styles.weeklyBarFill,
                      {
                        height: `${(weeklyBars[i] / 6) * 100}%`,
                        backgroundColor: t.accent,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.weeklyBarLabel, { color: t.textMuted }]}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Sessions */}
        <View style={styles.recentSection}>
          <Text style={[styles.sectionLabel, { color: t.textMuted }]}>RECENT SESSIONS</Text>
          <View style={styles.sessionsList}>
            {MOCK_SESSIONS.map((session, i) => (
              <SessionRow
                key={session.id}
                session={session}
                t={t}
                isLast={i === MOCK_SESSIONS.length - 1}
              />
            ))}
          </View>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.pagePaddingHorizontal, paddingBottom: spacing.sectionGap },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: spacing.sectionGap,
    marginBottom: spacing.gapBetweenCards,
  },
  greetingLeft: { flex: 1 },
  dateText: { ...typography.meta, marginBottom: 4 },
  greetTitle: { ...typography.screenTitle },
  gbUsRow: { flexDirection: 'row', gap: 6, marginLeft: 12 },
  gbUsBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: spacing.buttonBorderRadius,
    borderWidth: 1,
  },
  gbUsText: { fontSize: 12, fontWeight: '700' },
  statCard: {
    borderRadius: spacing.cardBorderRadius,
    borderWidth: 1,
    padding: spacing.cardPadding,
    marginBottom: spacing.gapBetweenCards,
    alignItems: 'center',
  },
  ringWrap: { position: 'relative', marginBottom: 12 },
  ringTrack: { position: 'absolute' },
  ringFill: { position: 'absolute' },
  ringCenter: { alignItems: 'center', justifyContent: 'center' },
  ringNumber: { ...typography.ringNumber },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statDivider: { width: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 },
  statLabel: { ...typography.sectionLabel, fontSize: 9 },
  statValue: { fontSize: 13, fontWeight: '700' },
  upNextCard: {
    borderRadius: spacing.cardBorderRadius,
    borderWidth: 1,
    padding: spacing.cardPadding,
    marginBottom: spacing.gapBetweenCards,
  },
  cardTitle: { ...typography.cardTitle, marginBottom: 4 },
  metaText: { ...typography.meta, marginBottom: 12 },
  weekBarsRow: { flexDirection: 'row', gap: 4, marginBottom: 14 },
  weekBarBg: { flex: 1, height: 4, borderRadius: 2, overflow: 'hidden', flexDirection: 'row' },
  weekBarFill: { height: '100%', borderRadius: 2 },
  ctaBtn: {
    borderRadius: spacing.buttonBorderRadius,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaText: { fontSize: 14, fontWeight: '700' },
  weeklySection: { marginBottom: spacing.sectionGap },
  sectionLabel: { ...typography.sectionLabel, marginBottom: 10 },
  weeklyBarsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  weeklyBarCol: { flex: 1, alignItems: 'center' },
  weeklyBarBg: {
    width: '100%',
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
    justifyContent: 'flex-end',
  },
  weeklyBarFill: { width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  weeklyBarLabel: { ...typography.meta },
  recentSection: { marginBottom: spacing.sectionGap },
  sessionsList: {},
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: spacing.cardPadding,
  },
  scoreBadge: {
    width: 38,
    height: 38,
    borderRadius: spacing.badgeBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBadgeText: { fontSize: 12, fontWeight: '700' },
  sessionInfo: { flex: 1 },
  sessionName: { fontSize: 12, fontWeight: '600', marginBottom: 2 },
  sessionMeta: { ...typography.meta },
  bottomPad: { height: 24 },
})
