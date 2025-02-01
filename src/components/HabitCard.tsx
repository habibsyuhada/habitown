import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Habit } from '../types/habit';
import IconComponent from './IconComponent';

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
}

const difficultyColors = {
  trivial: '#4CAF50',
  easy: '#8BC34A',
  medium: '#FFC107',
  hard: '#F44336',
};

const HabitCard = ({ habit, onToggle, onDelete }: HabitCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={onToggle}
        activeOpacity={0.7}>
        <IconComponent
          name={habit.completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color={habit.completed ? '#6200ee' : '#757575'}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.title, habit.completed && styles.completedTitle]}>
          {habit.title}
        </Text>
        {habit.description && (
          <Text style={styles.description}>{habit.description}</Text>
        )}
        <View style={styles.metadata}>
          <View
            style={[
              styles.difficulty,
              { backgroundColor: difficultyColors[habit.difficulty] },
            ]}>
            <Text style={styles.difficultyText}>{habit.difficulty}</Text>
          </View>
          <Text style={styles.streak}> {habit.streak}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <IconComponent name="delete-outline" size={24} color="#757575" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  checkbox: {
    marginRight: 12,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  description: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  difficulty: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  streak: {
    fontSize: 14,
    color: '#757575',
  },
  deleteButton: {
    justifyContent: 'center',
    paddingLeft: 12,
  },
});

export default HabitCard;
