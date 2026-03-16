import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useState } from 'react'
import { colours } from '../../constants/colours'
import { spacing } from '../../constants/spacing'
import { typography } from '../../constants/typography'
import { useTheme } from '../../hooks/useTheme'

const PASSAGE = [
  { id: '1', word: 'The', score: 92 },
  { id: '2', word: 'weather', score: 88 },
  { id: '3', word: 'in', score: null },
  { id: '4', word: 'Britain', score: 61 },
  { id: '5', word: 'is', score: null },
  { id: '6', word: 'known', score: 90 },
  { id: '7', word: 'for', score: null },
  { id: '8', word: 'being', score: 38 },
  { id: '9', word: 'unpredictable.', score: 35 },
  { id: '10', word: 'Even', score: null },
  { id: '11', word: 'in', score: 95 },
  { id: '12', word: 'summer,', score: 62 },
  { id: '13', word: 'you', score: null },
  { id: '14', word: 'should', score: 91 },
  { id: '15', word: 'always', score: 89 },
  { id: '16', word: 'carry', score: null },
  { id: '17', word: 'an', score: 40 },
  { id: '18', word: 'umbrella.', score: 58 },
]

function getWordColour(score: number | null, t: typeof colours.light | typeof colours.dark) {
  if (score === null) return { bg: 'transparent', text: t.textPrimary }
  if (score >= 75) return { bg: t.scoreGoodBg, text: t.scoreGoodText }
  if (score >= 55) return { bg: t.scoreAvgBg, text: t.scoreAvgText }
  return { bg: t.scorePoorBg, text: t.scorePoorText }
}

export default function PracticeScreen() {
  const { isDark } = useTheme()
  const t = isDark ? colours.dark : colours.light
  const [mode, setMode] = useState<'passage' | 'word'>('passage')
  const [accent, setAccent] = useState<'british' | 'american'>('british')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [recording, setRecording] = useState(false)

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.screenTitle, { color: t.textPrimary }]}>Practice</Text>
          <View style={styles.accentToggle}>
            <TouchableOpacity
              style={[
                styles.accentChip,
                { borderColor: t.cardBorder },
                accent === 'british' && { backgroundColor: t.ctaBackground, borderColor: t.ctaBackground },
              ]}
              onPress={() => setAccent('british')}
              activeOpacity={0.8}
            >
              <Text style={[accent === 'british' ? styles.accentChipOnText : styles.accentChipOffText, { color: accent === 'british' ? t.ctaText : t.textMuted }]}>
                🇬🇧 British
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.accentChip,
                { borderColor: t.cardBorder },
                accent === 'american' && { backgroundColor: t.ctaBackground, borderColor: t.ctaBackground },
              ]}
              onPress={() => setAccent('american')}
              activeOpacity={0.8}
            >
              <Text style={[accent === 'american' ? styles.accentChipOnText : styles.accentChipOffText, { color: accent === 'american' ? t.ctaText : t.textMuted }]}>
                🇺🇸 American
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mode toggle */}
        <View style={[styles.modeToggle, { backgroundColor: t.toggleOff, borderColor: t.cardBorder }]}>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'passage' && { backgroundColor: t.ctaBackground }]}
            onPress={() => setMode('passage')}
            activeOpacity={0.8}
          >
            <Text style={[mode === 'passage' ? styles.modeBtnActiveText : styles.modeBtnText, { color: mode === 'passage' ? t.ctaText : t.textMuted }]}>
              Passage
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'word' && { backgroundColor: t.ctaBackground }]}
            onPress={() => setMode('word')}
            activeOpacity={0.8}
          >
            <Text style={[mode === 'word' ? styles.modeBtnActiveText : styles.modeBtnText, { color: mode === 'word' ? t.ctaText : t.textMuted }]}>
              Word mode
            </Text>
          </TouchableOpacity>
        </View>

        {/* Difficulty */}
        <View style={styles.difficultyRow}>
          {(['easy', 'medium', 'hard'] as const).map((d) => (
            <TouchableOpacity
              key={d}
              style={[
                styles.diffChip,
                { borderColor: t.cardBorder },
                difficulty === d && { backgroundColor: t.ctaBackground, borderColor: t.ctaBackground },
              ]}
              onPress={() => setDifficulty(d)}
              activeOpacity={0.8}
            >
              <Text style={[difficulty === d ? styles.diffChipActiveText : styles.diffChipText, { color: difficulty === d ? t.ctaText : t.textMuted }]}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Passage card */}
        <View style={[styles.passageCard, { backgroundColor: t.cardBackground, borderColor: t.cardBorder }]}>
          <Text style={[styles.passageEyebrow, { color: t.textMuted }]}>READ ALOUD</Text>
          <View style={styles.passageTextWrap}>
            {PASSAGE.map((item) => {
              const wc = getWordColour(item.score, t)
              return (
                <Text
                  key={item.id}
                  style={[
                    styles.passageWord,
                    { backgroundColor: wc.bg, color: wc.text },
                    item.score !== null && styles.passageWordScored,
                  ]}
                >
                  {item.word + ' '}
                </Text>
              )
            })}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={[styles.legendChip, { backgroundColor: t.scoreGoodBg }]}>
            <Text style={[styles.legendText, { color: t.scoreGoodText }]}>● Correct</Text>
          </View>
          <View style={[styles.legendChip, { backgroundColor: t.scoreAvgBg }]}>
            <Text style={[styles.legendText, { color: t.scoreAvgText }]}>● Review</Text>
          </View>
          <View style={[styles.legendChip, { backgroundColor: t.scorePoorBg }]}>
            <Text style={[styles.legendText, { color: t.scorePoorText }]}>● Incorrect</Text>
          </View>
        </View>

        {/* Record button */}
        <TouchableOpacity
          style={[
            styles.recordBtn,
            { backgroundColor: recording ? t.scorePoorText : t.ctaBackground, shadowColor: t.black },
          ]}
          onPress={() => setRecording(!recording)}
          activeOpacity={0.8}
        >
          <Text style={styles.recordBtnEmoji}>{recording ? '⏹️' : '🎙️'}</Text>
        </TouchableOpacity>
        <Text style={[styles.recordHint, { color: t.textMuted }]}>
          {recording ? 'Recording... tap to stop' : 'Tap to record · Tap again to stop'}
        </Text>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
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
    letterSpacing: -0.4,
  },
  accentToggle: { flexDirection: 'row', gap: 6 },
  accentChip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  accentChipOnText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  accentChipOffText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  modeToggle: {
    flexDirection: 'row',
    borderRadius: 100,
    padding: 3,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  modeBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 100,
  },
  modeBtnText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  modeBtnActiveText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  difficultyRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  diffChip: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  diffChipText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  diffChipActiveText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },

  passageCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  passageEyebrow: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  passageTextWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  passageWord: {
    fontSize: typography.sizes.md,
    lineHeight: 28,
    fontWeight: typography.weights.regular,
  },
  passageWordScored: {
    borderRadius: 4,
    fontWeight: typography.weights.medium,
    overflow: 'hidden',
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.lg,
  },
  legendChip: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 100 },
  legendText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.medium },

  recordBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.sm,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  recordBtnEmoji: { fontSize: 26 },
  recordHint: {
    fontSize: typography.sizes.xs,
    textAlign: 'center',
  },
})
