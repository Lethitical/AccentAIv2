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

function getWordColour(score: number | null) {
  if (score === null) return { bg: 'transparent', text: colours.text.primary }
  if (score >= 75) return { bg: colours.score.greenBg, text: colours.score.green }
  if (score >= 55) return { bg: colours.score.amberBg, text: colours.score.amber }
  return { bg: colours.score.redBg, text: colours.score.red }
}

export default function PracticeScreen() {
  const [mode, setMode] = useState<'passage' | 'word'>('passage')
  const [accent, setAccent] = useState<'british' | 'american'>('british')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [recording, setRecording] = useState(false)

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Practice</Text>
          <View style={styles.accentToggle}>
            <TouchableOpacity
              style={[styles.accentChip, accent === 'british' && styles.accentChipOn]}
              onPress={() => setAccent('british')}
              activeOpacity={0.8}
            >
              <Text style={accent === 'british' ? styles.accentChipOnText : styles.accentChipOffText}>
                🇬🇧 British
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.accentChip, accent === 'american' && styles.accentChipOn]}
              onPress={() => setAccent('american')}
              activeOpacity={0.8}
            >
              <Text style={accent === 'american' ? styles.accentChipOnText : styles.accentChipOffText}>
                🇺🇸 American
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mode toggle */}
        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'passage' && styles.modeBtnActive]}
            onPress={() => setMode('passage')}
            activeOpacity={0.8}
          >
            <Text style={mode === 'passage' ? styles.modeBtnActiveText : styles.modeBtnText}>
              Passage
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'word' && styles.modeBtnActive]}
            onPress={() => setMode('word')}
            activeOpacity={0.8}
          >
            <Text style={mode === 'word' ? styles.modeBtnActiveText : styles.modeBtnText}>
              Word mode
            </Text>
          </TouchableOpacity>
        </View>

        {/* Difficulty */}
        <View style={styles.difficultyRow}>
          {(['easy', 'medium', 'hard'] as const).map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.diffChip, difficulty === d && styles.diffChipActive]}
              onPress={() => setDifficulty(d)}
              activeOpacity={0.8}
            >
              <Text style={difficulty === d ? styles.diffChipActiveText : styles.diffChipText}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Passage card */}
        <View style={styles.passageCard}>
          <Text style={styles.passageEyebrow}>READ ALOUD</Text>
          <View style={styles.passageTextWrap}>
            {PASSAGE.map((item) => {
              const wc = getWordColour(item.score)
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
          <View style={[styles.legendChip, { backgroundColor: colours.score.greenBg }]}>
            <Text style={[styles.legendText, { color: colours.score.green }]}>● Correct</Text>
          </View>
          <View style={[styles.legendChip, { backgroundColor: colours.score.amberBg }]}>
            <Text style={[styles.legendText, { color: colours.score.amber }]}>● Review</Text>
          </View>
          <View style={[styles.legendChip, { backgroundColor: colours.score.redBg }]}>
            <Text style={[styles.legendText, { color: colours.score.red }]}>● Incorrect</Text>
          </View>
        </View>

        {/* Record button */}
        <TouchableOpacity
          style={[styles.recordBtn, recording && styles.recordBtnActive]}
          onPress={() => setRecording(!recording)}
          activeOpacity={0.8}
        >
          <Text style={styles.recordBtnEmoji}>{recording ? '⏹️' : '🎙️'}</Text>
        </TouchableOpacity>
        <Text style={styles.recordHint}>
          {recording ? 'Recording... tap to stop' : 'Tap to record · Tap again to stop'}
        </Text>

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
  accentToggle: { flexDirection: 'row', gap: 6 },
  accentChip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colours.border,
    backgroundColor: 'transparent',
  },
  accentChipOn: {
    backgroundColor: colours.black,
    borderColor: colours.black,
  },
  accentChipOnText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.white,
  },
  accentChipOffText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
  },

  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#EAE7E0',
    borderRadius: 100,
    padding: 3,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colours.border,
  },
  modeBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 100,
  },
  modeBtnActive: { backgroundColor: colours.black },
  modeBtnText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
  },
  modeBtnActiveText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.white,
  },

  difficultyRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  diffChip: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colours.border,
    backgroundColor: 'transparent',
  },
  diffChipActive: { backgroundColor: colours.black, borderColor: colours.black },
  diffChipText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
  },
  diffChipActiveText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.white,
  },

  passageCard: {
    backgroundColor: colours.surface,
    borderWidth: 1,
    borderColor: '#DDD8C8',
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  passageEyebrow: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colours.text.muted,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  passageTextWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  passageWord: {
    fontSize: typography.sizes.md,
    lineHeight: 28,
    color: colours.text.primary,
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
    backgroundColor: colours.black,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.sm,
    shadowColor: colours.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  recordBtnActive: { backgroundColor: '#9B2020' },
  recordBtnEmoji: { fontSize: 26 },
  recordHint: {
    fontSize: typography.sizes.xs,
    color: colours.text.muted,
    textAlign: 'center',
  },
})