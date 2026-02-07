import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useUser } from '@/context/UserContext';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const { user, tasks, completeTask, resetTasks } = useUser();
  const borderColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">EcoQuest 🌱</ThemedText>
        <TouchableOpacity onPress={resetTasks} style={styles.resetButton}>
          <ThemedText style={styles.resetText}>Reset Tasks</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedText style={styles.subtitle}>
        Welcome back, {user.name}! ({user.level})
      </ThemedText>

      <ThemedView style={[styles.pointsBox, { borderColor }]}>
        <ThemedText type="subtitle">Total Impact Points</ThemedText>
        <ThemedText style={styles.points}>{user.points}</ThemedText>
        <ThemedText style={styles.streak}>🔥 {user.streak} Day Streak</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle" style={styles.sectionTitle}>Daily Eco Tasks</ThemedText>
      
      <ThemedView style={styles.taskList}>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[
              styles.task,
              { borderColor },
              task.completed && styles.taskDone,
            ]}
            onPress={() => completeTask(task.id)}
            disabled={task.completed}
          >
            <ThemedView style={styles.taskContent}>
              <ThemedText type="defaultSemiBold">
                {task.title}
              </ThemedText>
              <ThemedText style={styles.taskMeta}>
                 {task.category} • {task.points} pts
              </ThemedText>
            </ThemedView>
            {task.completed ? (
              <ThemedText>✅</ThemedText>
            ) : (
              <IconSymbol name="camera.fill" size={24} color={iconColor} />
            )}
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5dcf46',
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: '#4ab535',
    borderRadius: 20,
    padding: 20

  },
  subtitle: {
    marginBottom: 20,
    fontSize: 16,
    opacity: 0.8,
    color: '#226f01'    
  },
  pointsBox: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    backgroundColor: '#36b71f',
  },
  points: {
    fontSize: 42,
    fontWeight: 'bold',
    paddingTop: 28,
    marginBottom: 7,
    color: '#efffb3',
  },
  streak: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffe562',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  taskList: {
    gap: 12,
    backgroundColor: '#36b71f00',
  },
  task: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
    backgroundColor: '#36b71f00',
  },
  taskMeta: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  taskDone: {
    opacity: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  resetButton: {
    padding: 8,
  },
  resetText: {
    fontSize: 12,
    opacity: 0.6,
  },
});
