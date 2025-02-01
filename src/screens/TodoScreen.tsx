import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Text,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHabitStore } from '../store/habitStore';
import HabitCard from '../components/HabitCard';
import { Difficulty } from '../types/habit';

const TodoScreen = () => {
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabitStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    difficulty: 'medium' as Difficulty,
  });

  const todos = habits.filter(habit => habit.type === 'todo');

  const handleAddTodo = () => {
    if (newHabit.title.trim()) {
      addHabit({
        ...newHabit,
        type: 'todo',
      });
      setNewHabit({
        title: '',
        description: '',
        difficulty: 'medium',
      });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {todos.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={() => toggleHabit(habit.id)}
            onDelete={() => deleteHabit(habit.id)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Todo</Text>
            <TextInput
              style={styles.input}
              placeholder="Todo Title"
              value={newHabit.title}
              onChangeText={text => setNewHabit({ ...newHabit, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              value={newHabit.description}
              onChangeText={text =>
                setNewHabit({ ...newHabit, description: text })
              }
            />
            <View style={styles.difficultyContainer}>
              <Text style={styles.difficultyLabel}>Difficulty:</Text>
              {(['trivial', 'easy', 'medium', 'hard'] as Difficulty[]).map(
                difficulty => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.difficultyButton,
                      newHabit.difficulty === difficulty &&
                        styles.difficultyButtonActive,
                    ]}
                    onPress={() =>
                      setNewHabit({ ...newHabit, difficulty })
                    }>
                    <Text
                      style={[
                        styles.difficultyButtonText,
                        newHabit.difficulty === difficulty &&
                          styles.difficultyButtonTextActive,
                      ]}>
                      {difficulty}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={handleAddTodo}>
                <Text style={[styles.buttonText, styles.addButtonText]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
      },
    }),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#212121',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  difficultyContainer: {
    marginBottom: 16,
  },
  difficultyLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#212121',
  },
  difficultyButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  difficultyButtonActive: {
    backgroundColor: '#6200ee',
  },
  difficultyButtonText: {
    color: '#757575',
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#6200ee',
  },
  buttonText: {
    fontSize: 16,
    color: '#757575',
  },
  addButtonText: {
    color: '#fff',
  },
});

export default TodoScreen;
