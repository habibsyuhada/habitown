import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDailyTasks,
  toggleDailyTask,
  deleteDailyTask,
} from '../store/slices/dailyTasksSlice';
import { DailyTask } from '../types/dailyTask';
import IconComponent from '../components/IconComponent';
import AddTaskScreen from './AddTaskScreen';
import EditTaskScreen from './EditTaskScreen';

const DifficultyBadge = ({ difficulty, completed }: { difficulty: DailyTask['difficulty']; completed?: boolean }) => {
  const getBackgroundColor = () => {
    if (completed) return '#e0e0e0';
    
    switch (difficulty) {
      case 'easy':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.badgeText}>{difficulty}</Text>
    </View>
  );
};

const TaskItem = ({
  task,
  onToggle,
  onEdit,
}: {
  task: DailyTask;
  onToggle: () => void;
  onEdit: () => void;
}) => {
  return (
    <View style={[styles.taskItem, task.completed && styles.taskItemCompleted]}>
      <TouchableOpacity style={styles.taskContent} onPress={onToggle}>
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
            {task.completed && <IconComponent name="check" size={16} color="#fff" />}
          </View>
        </View>
        <View style={styles.taskDetails}>
          <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
            {task.title}
          </Text>
          <View style={styles.taskInfo}>
            <DifficultyBadge difficulty={task.difficulty} completed={task.completed} />
            <Text style={[styles.streak, task.completed && styles.textCompleted]}>
              🔥 {task.streak}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.actionButton, styles.editButton]} 
        onPress={onEdit}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <IconComponent 
          name="pencil" 
          size={20} 
          color="#6200ee"
        />
      </TouchableOpacity>
    </View>
  );
};

const DailyScreen = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const tasks = useSelector(selectDailyTasks);
  const dispatch = useDispatch();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleToggleTask = (taskId: string) => {
    dispatch(toggleDailyTask(taskId));
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteDailyTask(taskId));
    setEditingTaskId(null); // Close edit screen after delete
  };

  if (showAddTask) {
    return <AddTaskScreen onClose={() => setShowAddTask(false)} />;
  }

  if (editingTaskId) {
    return (
      <EditTaskScreen 
        taskId={editingTaskId} 
        onClose={() => setEditingTaskId(null)}
        onDelete={() => handleDeleteTask(editingTaskId)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{today}</Text>
        <TouchableOpacity
          style={styles.headerAddButton}
          onPress={() => setShowAddTask(true)}>
          <IconComponent name="plus" size={24} color="#6200ee" />
        </TouchableOpacity>
      </View>

      <FlatList<DailyTask>
        style={styles.taskList}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => handleToggleTask(item.id)}
            onEdit={() => setEditingTaskId(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  date: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  headerAddButton: {
    padding: 8,
  },
  taskList: {
    flex: 1,
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  taskItemCompleted: {
    backgroundColor: '#f5f5f5',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.05,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      },
    }),
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6200ee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#9e9e9e',
    borderColor: '#9e9e9e',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  taskTitleCompleted: {
    color: '#9e9e9e',
  },
  textCompleted: {
    color: '#9e9e9e',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streak: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1a1a1a',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  editButton: {
    backgroundColor: '#f0e6ff',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    textTransform: 'capitalize',
  },
});

export default DailyScreen;
