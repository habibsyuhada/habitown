import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addDailyTask } from '../store/slices/dailyTasksSlice';
import { DailyTask } from '../types/dailyTask';
import IconComponent from '../components/IconComponent';

interface AddTaskScreenProps {
  onClose: () => void;
}

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ onClose }) => {
  const [titles, setTitles] = useState('');
  const [difficulty, setDifficulty] = useState<DailyTask['difficulty']>('medium');
  const dispatch = useDispatch();

  const handleAdd = () => {
    const taskTitles = titles
      .split('\n')
      .map(title => title.trim())
      .filter(title => title.length > 0);

    if (taskTitles.length > 0) {
      taskTitles.forEach(title => {
        dispatch(addDailyTask({ title, difficulty: difficulty as DailyTask['difficulty'] }));
      });
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <IconComponent name="arrow-left" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Daily Tasks</Text>
        <TouchableOpacity
          style={[styles.addButton, !titles.trim() && styles.addButtonDisabled]}
          onPress={handleAdd}
          disabled={!titles.trim()}>
          <Text style={styles.addButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>Enter one task per line</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter your tasks here&#10;Example:&#10;Do 30 push-ups&#10;Read a book&#10;Study programming"
          value={titles}
          onChangeText={setTitles}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          autoFocus
        />

        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.difficultyButtons}>
          {(['easy', 'medium', 'hard'] as const).map(diff => (
            <TouchableOpacity
              key={diff}
              style={[
                styles.difficultyButton,
                diff === difficulty && styles.difficultyButtonActive,
              ]}
              onPress={() => setDifficulty(diff)}>
              <Text
                style={[
                  styles.difficultyButtonText,
                  diff === difficulty && styles.difficultyButtonTextActive,
                ]}>
                {diff}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  difficultyButtons: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  difficultyButtonText: {
    color: '#757575',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddTaskScreen;
