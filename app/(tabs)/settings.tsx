import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  useColorScheme,
} from 'react-native'
import { useState } from 'react'
import { colours } from '../../constants/colours'
import { spacing } from '../../constants/spacing'
import { typography } from '../../constants/typography'

export default function SettingsScreen() {
  const scheme = useColorScheme()
  const t = scheme === 'dark' ? colours.dark : colours.light
  const [accent, setAccent] = useState<'british' | 'american'>('british')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.screenTitle, { color: t.textPrimary }]}>Settings</Text>
        </View>

        {/* Profile block */}
        <View style={[styles.profileBlock, { backgroundColor: t.cardBackground, borderColor: t.cardBorder }]}>
          <View style={[styles.profileAvatar, { backgroundColor: t.accent }]}>
            <Text style={[styles.profileAvatarText, { color: t.white }]}>JD</Text>
          </View>
          <View>
            <Text style={[styles.profileName, { color: t.textPrimary }]}>Josh Davies</Text>
            <Text style={[styles.profileSub, { color: t.textMuted }]}>jyb25@ic.ac.uk</Text>
          </View>
        </View>

        {/* Accent preference */}
        <SectionLabel label="ACCENT PREFERENCE" t={t} />
        <View style={[styles.group, { backgroundColor: t.cardBackground, borderColor: t.cardBorder }]}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setAccent('british')}
            activeOpacity={0.7}
          >
            <Text style={styles.rowIcon}>🇬🇧</Text>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowLabel, { color: t.textPrimary }]}>British English</Text>
              <Text style={[styles.rowSub, { color: t.textMuted }]}>RP / General British</Text>
            </View>
            <View style={[styles.radio, { borderColor: t.cardBorder }, accent === 'british' && { borderColor: t.toggleOn, backgroundColor: t.toggleOn }]} />
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: t.divider }]} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => setAccent('american')}
            activeOpacity={0.7}
          >
            <Text style={styles.rowIcon}>🇺🇸</Text>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowLabel, { color: t.textPrimary }]}>American English</Text>
              <Text style={[styles.rowSub, { color: t.textMuted }]}>General American</Text>
            </View>
            <View style={[styles.radio, { borderColor: t.cardBorder }, accent === 'american' && { borderColor: t.toggleOn, backgroundColor: t.toggleOn }]} />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <SectionLabel label="PREFERENCES" t={t} />
        <View style={[styles.group, { backgroundColor: t.cardBackground, borderColor: t.cardBorder }]}>
          <View style={styles.row}>
            <Text style={styles.rowIcon}>🌙</Text>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowLabel, { color: t.textPrimary }]}>Dark mode</Text>
              <Text style={[styles.rowSub, { color: t.textMuted }]}>Change app appearance</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: t.toggleOff, true: t.toggleOn }}
              thumbColor={t.white}
            />
          </View>
          <View style={[styles.divider, { backgroundColor: t.divider }]} />
          <View style={styles.row}>
            <Text style={styles.rowIcon}>🔔</Text>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowLabel, { color: t.textPrimary }]}>Notifications</Text>
              <Text style={[styles.rowSub, { color: t.textMuted }]}>Daily practice reminders</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: t.toggleOff, true: t.toggleOn }}
              thumbColor={t.white}
            />
          </View>
        </View>

        {/* Account */}
        <SectionLabel label="ACCOUNT" t={t} />
        <View style={[styles.group, { backgroundColor: t.cardBackground, borderColor: t.cardBorder }]}>
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <Text style={styles.rowIcon}>👤</Text>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowLabel, { color: t.textPrimary }]}>Edit profile</Text>
            </View>
            <Text style={[styles.rowChevron, { color: t.textMuted }]}>›</Text>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: t.divider }]} />
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <Text style={styles.rowIcon}>🔒</Text>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowLabel, { color: t.textPrimary }]}>Privacy policy</Text>
            </View>
            <Text style={[styles.rowChevron, { color: t.textMuted }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Sign out */}
        <TouchableOpacity style={[styles.signOutBtn, { borderColor: t.scorePoorBg, backgroundColor: t.scorePoorBg }]} activeOpacity={0.8}>
          <Text style={[styles.signOutText, { color: t.scorePoorText }]}>Sign out</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: t.textMuted }]}>AccentAI · Version 1.0.0</Text>

      </ScrollView>
    </SafeAreaView>
  )
}

function SectionLabel({ label, t }: { label: string; t: typeof colours.light | typeof colours.dark }) {
  return (
    <View style={[styles.sectionHeader, { borderBottomColor: t.divider }]}>
      <Text style={[styles.sectionLabel, { color: t.textMuted }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  header: {
    paddingTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  screenTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    letterSpacing: -0.4,
  },

  profileBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.5,
  },
  profileName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    letterSpacing: -0.2,
  },
  profileSub: {
    fontSize: typography.sizes.sm,
    marginTop: 2,
  },

  sectionHeader: {
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: typography.weights.medium,
    letterSpacing: 0.8,
  },

  group: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: 12,
  },
  rowIcon: { fontSize: 16, width: 24, textAlign: 'center' },
  rowInfo: { flex: 1 },
  rowLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  rowSub: {
    fontSize: typography.sizes.xs,
    marginTop: 1,
  },
  rowChevron: {
    fontSize: 18,
    fontWeight: typography.weights.light,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },

  divider: { height: 1, marginLeft: 52 },

  signOutBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: spacing.md,
  },
  signOutText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },

  versionText: {
    textAlign: 'center',
    fontSize: typography.sizes.xs,
    marginBottom: spacing.md,
  },
})
