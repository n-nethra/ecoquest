import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useUser } from '@/context/UserContext';

const LEADERBOARD_DATA = [
  { id: '1', name: 'Sarah J.', points: 1250, rank: 1 },
  { id: '2', name: 'Mike T.', points: 1100, rank: 2 },
  { id: '3', name: 'Emma W.', points: 980, rank: 3 },
  { id: '4', name: 'You', points: 0, rank: 4 }, // Will update with real points
  { id: '5', name: 'Alex R.', points: 850, rank: 5 },
];

const CHALLENGES = [
  { id: '1', title: 'Zero-Waste Week', description: 'Create no trash for a whole week!', participants: 120, progress: 0.4 },
  { id: '2', title: 'Bike-to-School', description: 'Bike to school 3 times this week.', participants: 85, progress: 0.7 },
];

export default function CommunityScreen() {
  const { user } = useUser();
  const borderColor = useThemeColor({}, 'text');
  const [activeTab, setActiveTab] = useState<'Friends' | 'School' | 'City'>('School');

  // Update "You" points in leaderboard for display
  const leaderboard = LEADERBOARD_DATA.map(p => 
    p.name === 'You' ? { ...p, points: user.points } : p
  ).sort((a, b) => b.points - a.points);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Community 🌍</ThemedText>
        <ThemedText style={styles.subtitle}>Connect and compete for a better planet</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Weekly Challenges ⚔️</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.challengeScroll}>
          {CHALLENGES.map((challenge) => (
            <ThemedView key={challenge.id} style={[styles.challengeCard, { borderColor }]}>
              <ThemedText type="defaultSemiBold">{challenge.title}</ThemedText>
              <ThemedText style={styles.challengeDesc}>{challenge.description}</ThemedText>
              <ThemedText style={styles.challengeMeta}>{challenge.participants} participants</ThemedText>
              <ThemedView style={styles.progressBar}>
                <ThemedView style={[styles.progressFill, { width: `${challenge.progress * 100}%` }]} />
              </ThemedView>
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Leaderboard 🏆</ThemedText>
        
        <ThemedView style={styles.tabs}>
          {(['Friends', 'School', 'City'] as const).map((tab) => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <ThemedText style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>

        <ThemedView style={[styles.leaderboardList, { borderColor }]}>
          {leaderboard.map((item, index) => (
            <ThemedView key={item.id} style={[
              styles.leaderboardItem, 
              item.name === 'You' && styles.highlightItem
            ]}>
              <ThemedText style={styles.rank}>#{index + 1}</ThemedText>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.points}>{item.points} pts</ThemedText>
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
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  challengeScroll: {
    overflow: 'visible',
  },
  challengeCard: {
    width: 250,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  challengeDesc: {
    fontSize: 14,
    opacity: 0.8,
    marginVertical: 8,
  },
  challengeMeta: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
    opacity: 0.6,
  },
  activeTabText: {
    opacity: 1,
    color: '#000',
  },
  leaderboardList: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  highlightItem: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  rank: {
    width: 40,
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  points: {
    fontWeight: '600',
  },
});
