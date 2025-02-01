import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateDailyTask, selectDailyTaskById, deleteDailyTask } from '../store/slices/dailyTasksSlice';
import { DailyTask } from '../types/dailyTask';
import IconComponent from '../components/IconComponent';
import { RootState } from '../store/store';

interface EditTaskScreenProps {
  taskId: string;
  onClose: () => void;
  onDelete: () => void;
}

const EditTaskScreen: React.FC<EditTaskScreenProps> = ({ taskId, onClose, onDelete }) => {
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) => selectDailyTaskById(state, taskId));
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<DailyTask['difficulty']>('medium');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  const handleUpdate = () => {
    if (title.trim() && task) {
      dispatch(updateDailyTask({
        id: taskId,
        title: title.trim(),
        difficulty,
      }));
      onClose();
    }
  };

  if (!task) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <IconComponent name="arrow-left" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Task</Text>
        <TouchableOpacity
          style={[styles.saveButton, !title.trim() && styles.saveButtonDisabled]}
          onPress={handleUpdate}
          disabled={!title.trim()}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          multiline
          numberOfLines={3}
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

        <View style={styles.taskInfo}>
          <Text style={styles.taskInfoLabel}>Current Streak</Text>
          <Text style={styles.taskInfoValue}> {task.streak}</Text>
          
          <Text style={styles.taskInfoLabel}>Created At</Text>
          <Text style={styles.taskInfoValue}>
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <IconComponent name="delete" size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    minHeight: 80,
    textAlignVertical: 'top',
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
  saveButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  taskInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  taskInfoLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  taskInfoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4d4f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 32,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default EditTaskScreen;
