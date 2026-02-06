import { StyleSheet, ScrollView, Image } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  const { user } = useUser();
  const borderColor = useThemeColor({}, 'text');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedView style={styles.header}>
        <ThemedView style={[styles.avatarPlaceholder, { borderColor }]}>
          <ThemedText style={styles.avatarText}>{user.name.charAt(0)}</ThemedText>
        </ThemedView>
        <ThemedText type="title" style={styles.name}>{user.name}</ThemedText>
        <ThemedText style={styles.details}>{user.grade} • {user.group}</ThemedText>
        <ThemedText style={styles.level}>{user.level}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Stats</ThemedText>
        <ThemedView style={styles.statsGrid}>
          <ThemedView style={[styles.statCard, { borderColor }]}>
             <ThemedText style={styles.statValue}>{user.points}</ThemedText>
             <ThemedText style={styles.statLabel}>Points</ThemedText>
          </ThemedView>
          <ThemedView style={[styles.statCard, { borderColor }]}>
             <ThemedText style={styles.statValue}>{user.streak}</ThemedText>
             <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Badges</ThemedText>
        <ThemedView style={styles.badgesGrid}>
          {user.badges.map((badge) => (
            <ThemedView key={badge.id} style={[styles.badgeCard, { borderColor, opacity: badge.unlocked ? 1 : 0.5 }]}>
              <ThemedText style={styles.badgeIcon}>{badge.icon}</ThemedText>
              <ThemedText style={styles.badgeName}>{badge.name}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    marginBottom: 4,
  },
  details: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 8,
  },
  level: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34C759',
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    opacity: 0.7,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  badgeCard: {
    width: '30%',
    aspectRatio: 1,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
});
