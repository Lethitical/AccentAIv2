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

// --- DATA (fake for now) ---
const sessions = [
  { id: '1', name: 'Reading Passage 3', detail: '14 words · British', score: 84, time: 'Today' },
  { id: '2', name: 'Word Drill — /th/ sounds', detail: '22 words · British', score: 61, time: 'Yest.' },
  { id: '3', name: 'Reading Passage 2', detail: '18 words · American', score: 91, time: '2d ago' },
  { id: '4', name: 'Reading Passage 1', detail: '11 words · American', score: 44, time: '3d ago' },
]

// --- HELPERS ---
function getScoreStyle(score: number) {
  if (score >= 75) return { bg: colours.score.greenBg, text: colours.score.green }
  if (score >= 55) return { bg: colours.score.amberBg, text: colours.score.amber }
  return { bg: colours.score.redBg, text: colours.score.red }
}

// --- COMPONENTS ---
function StatChip({ emoji, label }: { emoji: string; label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipEmoji}>{emoji}</Text>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  )
}

function SessionRow({
  time,
  name,
  detail,
  score,
}: {
  time: string
  name: string
  detail: string
  score: number
}) {
  const scoreStyle = getScoreStyle(score)
  return (
    <View style={styles.sessionRow}>
      <Text style={styles.sessionTime}>{time}</Text>
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionName}>{name}</Text>
        <Text style={styles.sessionDetail}>{detail}</Text>
      </View>
      <View style={[styles.scoreBadge, { backgroundColor: scoreStyle.bg }]}>
        <Text style={[styles.scoreBadgeText, { color: scoreStyle.text }]}>
          {score}%
        </Text>
      </View>
    </View>
  )
}

// --- MAIN SCREEN ---
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.wordmark}>
            Accent<Text style={styles.wordmarkItalic}>AI</Text>
          </Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </View>

        {/* Welcome */}
        <Text style={styles.welcome}>Welcome back, Josh</Text>

        {/* Stat chips */}
        <View style={styles.chipsRow}>
          <StatChip emoji="🔥" label="7 days" />
          <StatChip emoji="🎯" label="142 words" />
          <StatChip emoji="📈" label="78% accuracy" />
        </View>

        {/* Hero card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>TODAY'S SESSION</Text>
          <Text style={styles.heroHeadline}>
            Make your accent{'\n'}sound like{' '}
            <Text style={styles.heroHeadlineItalic}>you.</Text>
          </Text>
          <Text style={styles.heroSub}>
            Read a passage aloud. We'll highlight every word — green, amber, or red.
          </Text>

          <View style={styles.heroFooter}>
            <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8}>
              <Text style={styles.btnPrimaryText}>Start now</Text>
            </TouchableOpacity>

            <View style={styles.accentToggle}>
              <View style={[styles.toggleChip, styles.toggleChipOn]}>
                <Text style={styles.toggleChipOnText}>🇬🇧 British</Text>
              </View>
              <View style={[styles.toggleChip, styles.toggleChipOff]}>
                <Text style={styles.toggleChipOffText}>🇺🇸 American</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent sessions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>RECENT SESSIONS</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sessionList}>
          {sessions.map((session, index) => (
            <View key={session.id}>
              <SessionRow
                time={session.time}
                name={session.name}
                detail={session.detail}
                score={session.score}
              />
              {index < sessions.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

// --- STYLES ---
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colours.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  wordmark: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colours.text.primary,
    letterSpacing: -0.3,
  },
  wordmarkItalic: {
    fontStyle: 'italic',
    fontWeight: typography.weights.semibold,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colours.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    color: colours.white,
    letterSpacing: 0.5,
  },

  // Welcome
  welcome: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colours.text.primary,
    letterSpacing: -0.5,
    marginBottom: spacing.md,
  },

  // Chips
  chipsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EAE7E0',
    borderWidth: 1,
    borderColor: colours.border,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: spacing.md - 4,
  },
  chipEmoji: {
    fontSize: 13,
  },
  chipText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.primary,
  },

  // Hero card
  heroCard: {
    backgroundColor: colours.surface,
    borderWidth: 1,
    borderColor: '#DDD8C8',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  heroEyebrow: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  heroHeadline: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colours.text.primary,
    letterSpacing: -0.5,
    lineHeight: 28,
    marginBottom: spacing.sm,
  },
  heroHeadlineItalic: {
    fontStyle: 'italic',
    fontSize: typography.sizes.xxl,
  },
  heroSub: {
    fontSize: typography.sizes.sm,
    color: colours.text.secondary,
    fontWeight: typography.weights.regular,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    backgroundColor: colours.black,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
  },
  btnPrimaryText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colours.white,
    letterSpacing: -0.2,
  },
  accentToggle: {
    flexDirection: 'row',
    gap: 6,
  },
  toggleChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  toggleChipOn: {
    backgroundColor: colours.black,
  },
  toggleChipOff: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colours.border,
  },
  toggleChipOnText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.white,
  },
  toggleChipOffText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
  },

  // Sessions
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colours.border,
  },
  sectionLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
    letterSpacing: 0.8,
  },
  seeAll: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.secondary,
  },
  sessionList: {
    backgroundColor: colours.background,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md - 2,
  },
  sessionTime: {
    fontSize: typography.sizes.sm,
    color: colours.text.muted,
    fontWeight: typography.weights.regular,
    minWidth: 44,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colours.text.primary,
    marginBottom: 2,
  },
  sessionDetail: {
    fontSize: typography.sizes.xs,
    color: colours.text.muted,
    fontWeight: typography.weights.regular,
  },
  scoreBadge: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 100,
  },
  scoreBadgeText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E1DA',
  },
})