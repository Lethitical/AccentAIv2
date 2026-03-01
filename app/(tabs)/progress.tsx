import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { colours } from '../../constants/colours'
import { spacing } from '../../constants/spacing'
import { typography } from '../../constants/typography'

const BARS = [40, 55, 45, 65, 60, 70, 78]
const BAR_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const WEAK_WORDS = [
  { word: 'unpredictable', score: 38, dot: 'red' },
  { word: 'umbrella', score: 44, dot: 'red' },
  { word: 'Britain', score: 61, dot: 'amber' },
]

const SESSIONS = [
  { time: 'Today', name: 'Reading Passage 3', detail: '14 words · British', score: 84 },
  { time: 'Yest.', name: 'Word Drill — /th/ sounds', detail: '22 words · British', score: 61 },
  { time: '2d ago', name: 'Reading Passage 2', detail: '18 words · American', score: 91 },
  { time: '3d ago', name: 'Reading Passage 1', detail: '11 words · American', score: 44 },
]

function getScoreStyle(score: number) {
  if (score >= 75) return { bg: colours.score.greenBg, text: colours.score.green }
  if (score >= 55) return { bg: colours.score.amberBg, text: colours.score.amber }
  return { bg: colours.score.redBg, text: colours.score.red }
}

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Progress</Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>This week</Text>
          </View>
        </View>

        {/* Overall accuracy card */}
        <View style={styles.card}>
          <Text style={styles.eyebrow}>OVERALL ACCURACY</Text>
          <Text style={styles.bigScore}>78%</Text>
          <Text style={styles.bigScoreDelta}>↑ 4% from last week</Text>

          {/* Bar chart */}
          <View style={styles.barChart}>
            {BARS.map((height, i) => (
              <View
                key={i}
                style={[
                  styles.bar,
                  { height: `${height}%` },
                  i === BARS.length - 1 && styles.barHighlight,
                ]}
              />
            ))}
          </View>
          <View style={styles.barLabels}>
            {BAR_DAYS.map((d, i) => (
              <Text key={i} style={styles.barLabel}>{d}</Text>
            ))}
          </View>
        </View>

        {/* Stat grid */}
        <View style={styles.statGrid}>
          <View style={styles.statMini}>
            <Text style={styles.statMiniLabel}>STREAK</Text>
            <Text style={styles.statMiniValue}>7 🔥</Text>
            <Text style={styles.statMiniDelta}>Best: 12 days</Text>
          </View>
          <View style={styles.statMini}>
            <Text style={styles.statMiniLabel}>WORDS</Text>
            <Text style={styles.statMiniValue}>142</Text>
            <Text style={styles.statMiniDelta}>↑ 18 this week</Text>
          </View>
        </View>

        {/* Needs work */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>NEEDS WORK</Text>
        </View>
        <View style={styles.listCard}>
          {WEAK_WORDS.map((item, index) => (
            <View key={item.word}>
              <View style={styles.wordRow}>
                <View style={[
                  styles.wordDot,
                  { backgroundColor: item.dot === 'red' ? '#EF4444' : '#F59E0B' }
                ]} />
                <Text style={styles.wordName}>{item.word}</Text>
                <Text style={styles.wordScore}>{item.score}%</Text>
              </View>
              {index < WEAK_WORDS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Session history */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>SESSION HISTORY</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listCard}>
          {SESSIONS.map((session, index) => {
            const ss = getScoreStyle(session.score)
            return (
              <View key={session.name}>
                <View style={styles.sessionRow}>
                  <Text style={styles.sessionTime}>{session.time}</Text>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionName}>{session.name}</Text>
                    <Text style={styles.sessionDetail}>{session.detail}</Text>
                  </View>
                  <View style={[styles.scoreBadge, { backgroundColor: ss.bg }]}>
                    <Text style={[styles.scoreBadgeText, { color: ss.text }]}>{session.score}%</Text>
                  </View>
                </View>
                {index < SESSIONS.length - 1 && <View style={styles.divider} />}
              </View>
            )
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colours.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  screenTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colours.text.primary,
    letterSpacing: -0.4,
  },
  chip: {
    backgroundColor: '#EAE7E0',
    borderWidth: 1,
    borderColor: colours.border,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  chipText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.primary,
  },

  card: {
    backgroundColor: colours.surface,
    borderWidth: 1,
    borderColor: '#DDD8C8',
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  eyebrow: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  bigScore: {
    fontSize: 52,
    fontWeight: typography.weights.bold,
    color: colours.text.primary,
    letterSpacing: -2,
    lineHeight: 56,
  },
  bigScoreDelta: {
    fontSize: typography.sizes.sm,
    color: colours.score.green,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.md,
  },

  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 60,
    marginBottom: 6,
  },
  bar: {
    flex: 1,
    backgroundColor: '#DDD8C8',
    borderRadius: 4,
  },
  barHighlight: { backgroundColor: colours.black },
  barLabels: { flexDirection: 'row', gap: 6 },
  barLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 9,
    color: colours.text.muted,
  },

  statGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statMini: {
    flex: 1,
    backgroundColor: colours.background,
    borderWidth: 1,
    borderColor: colours.border,
    borderRadius: 14,
    padding: spacing.md,
  },
  statMiniLabel: {
    fontSize: 10,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  statMiniValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colours.text.primary,
    letterSpacing: -0.5,
  },
  statMiniDelta: {
    fontSize: 10,
    color: colours.score.green,
    fontWeight: typography.weights.medium,
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colours.border,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
    letterSpacing: 0.8,
  },
  seeAll: {
    fontSize: typography.sizes.xs,
    color: colours.text.secondary,
    fontWeight: typography.weights.medium,
  },

  listCard: { marginBottom: spacing.lg },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: spacing.sm + 2,
  },
  wordDot: { width: 8, height: 8, borderRadius: 4 },
  wordName: {
    flex: 1,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colours.text.primary,
  },
  wordScore: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colours.text.muted,
  },

  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: spacing.sm + 2,
  },
  sessionTime: {
    fontSize: typography.sizes.xs,
    color: colours.text.muted,
    minWidth: 40,
  },
  sessionInfo: { flex: 1 },
  sessionName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colours.text.primary,
    marginBottom: 2,
  },
  sessionDetail: {
    fontSize: typography.sizes.xs,
    color: colours.text.muted,
  },
  scoreBadge: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 100,
  },
  scoreBadgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  divider: { height: 1, backgroundColor: '#E4E1DA' },
})