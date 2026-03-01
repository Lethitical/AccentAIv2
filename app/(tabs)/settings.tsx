import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native'
import { useState } from 'react'
import { colours } from '../../constants/colours'
import { spacing } from '../../constants/spacing'
import { typography } from '../../constants/typography'

export default function SettingsScreen() {
  const [accent, setAccent] = useState<'british' | 'american'>('british')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Settings</Text>
        </View>

        {/* Profile block */}
        <View style={styles.profileBlock}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>JD</Text>
          </View>
          <View>
            <Text style={styles.profileName}>Josh Davies</Text>
            <Text style={styles.profileSub}>jyb25@ic.ac.uk</Text>
          </View>
        </View>

        {/* Accent preference */}
        <SectionLabel label="ACCENT PREFERENCE" />
        <View style={styles.group}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setAccent('british')}
            activeOpacity={0.7}
          >
            <Text style={styles.rowIcon}>🇬🇧</Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>British English</Text>
              <Text style={styles.rowSub}>RP / General British</Text>
            </View>
            <View style={[styles.radio, accent === 'british' && styles.radioSelected]} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => setAccent('american')}
            activeOpacity={0.7}
          >
            <Text style={styles.rowIcon}>🇺🇸</Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>American English</Text>
              <Text style={styles.rowSub}>General American</Text>
            </View>
            <View style={[styles.radio, accent === 'american' && styles.radioSelected]} />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <SectionLabel label="PREFERENCES" />
        <View style={styles.group}>
          <View style={styles.row}>
            <Text style={styles.rowIcon}>🌙</Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Dark mode</Text>
              <Text style={styles.rowSub}>Change app appearance</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colours.border, true: colours.black }}
              thumbColor={colours.white}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowIcon}>🔔</Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Notifications</Text>
              <Text style={styles.rowSub}>Daily practice reminders</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colours.border, true: colours.black }}
              thumbColor={colours.white}
            />
          </View>
        </View>

        {/* Account */}
        <SectionLabel label="ACCOUNT" />
        <View style={styles.group}>
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <Text style={styles.rowIcon}>👤</Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Edit profile</Text>
            </View>
            <Text style={styles.rowChevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <Text style={styles.rowIcon}>🔒</Text>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Privacy policy</Text>
            </View>
            <Text style={styles.rowChevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>AccentAI · Version 1.0.0</Text>

      </ScrollView>
    </SafeAreaView>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colours.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },

  header: {
    paddingTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  screenTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colours.text.primary,
    letterSpacing: -0.4,
  },

  profileBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colours.surface,
    borderWidth: 1,
    borderColor: '#DDD8C8',
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colours.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colours.white,
    letterSpacing: 0.5,
  },
  profileName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colours.text.primary,
    letterSpacing: -0.2,
  },
  profileSub: {
    fontSize: typography.sizes.sm,
    color: colours.text.muted,
    marginTop: 2,
  },

  sectionHeader: {
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

  group: {
    backgroundColor: colours.background,
    borderWidth: 1,
    borderColor: colours.border,
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
    color: colours.text.primary,
  },
  rowSub: {
    fontSize: typography.sizes.xs,
    color: colours.text.muted,
    marginTop: 1,
  },
  rowChevron: {
    fontSize: 18,
    color: colours.text.muted,
    fontWeight: typography.weights.light,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colours.border,
    backgroundColor: 'transparent',
  },
  radioSelected: {
    borderColor: colours.black,
    backgroundColor: colours.black,
  },

  divider: { height: 1, backgroundColor: '#E4E1DA', marginLeft: 52 },

  signOutBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colours.score.redBg,
    borderRadius: 18,
    backgroundColor: colours.score.redBg,
    marginBottom: spacing.md,
  },
  signOutText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colours.score.red,
  },

  versionText: {
    textAlign: 'center',
    fontSize: typography.sizes.xs,
    color: colours.text.muted,
    marginBottom: spacing.md,
  },
})