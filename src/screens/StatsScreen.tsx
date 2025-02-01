import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useHabitStore } from '../store/habitStore';
import IconComponent from '../components/IconComponent';

const StatsScreen = () => {
  const { habits, stats } = useHabitStore();

  const completedHabits = habits.filter(habit => habit.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  const totalStreak = habits.reduce((acc, habit) => acc + habit.streak, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <IconComponent name="star" size={32} color="#FFC107" />
          <Text style={styles.statValue}>Level {stats.level}</Text>
          <Text style={styles.statLabel}>Current Level</Text>
        </View>

        <View style={styles.statCard}>
          <IconComponent name="flash" size={32} color="#2196F3" />
          <Text style={styles.statValue}>{stats.experience}/100</Text>
          <Text style={styles.statLabel}>Experience</Text>
        </View>

        <View style={styles.statCard}>
          <IconComponent name="coin" size={32} color="#FFD700" />
          <Text style={styles.statValue}>{stats.gold}</Text>
          <Text style={styles.statLabel}>Gold</Text>
        </View>

        <View style={styles.statCard}>
          <IconComponent name="fire" size={32} color="#FF5722" />
          <Text style={styles.statValue}>{totalStreak}</Text>
          <Text style={styles.statLabel}>Total Streaks</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${completionRate}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          {completedHabits} of {totalHabits} habits completed ({completionRate.toFixed(1)}%)
        </Text>
      </View>

      <View style={styles.habitsBreakdown}>
        <Text style={styles.sectionTitle}>Habits Breakdown</Text>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Daily Habits</Text>
          <Text style={styles.breakdownValue}>
            {habits.filter(h => h.type === 'daily').length}
          </Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Todos</Text>
          <Text style={styles.breakdownValue}>
            {habits.filter(h => h.type === 'todo').length}
          </Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Completed Today</Text>
          <Text style={styles.breakdownValue}>{completedHabits}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  statCard: {
    width: '50%',
    padding: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  progressSection: {
    margin: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
  },
  progressText: {
    marginTop: 8,
    color: '#757575',
    fontSize: 14,
  },
  habitsBreakdown: {
    margin: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  breakdownLabel: {
    fontSize: 16,
    color: '#212121',
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6200ee',
  },
});

export default StatsScreen;
