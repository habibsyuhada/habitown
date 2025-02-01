import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addLabel, updateLabel, deleteLabel, selectLabels, Label } from '../store/slices/labelSlice';
import IconComponent from '../components/IconComponent';

const COLORS = [
  '#f44336', // red
  '#e91e63', // pink
  '#9c27b0', // purple
  '#673ab7', // deep purple
  '#3f51b5', // indigo
  '#2196f3', // blue
  '#03a9f4', // light blue
  '#00bcd4', // cyan
  '#009688', // teal
  '#4caf50', // green
  '#8bc34a', // light green
  '#cddc39', // lime
  '#ffeb3b', // yellow
  '#ffc107', // amber
  '#ff9800', // orange
  '#ff5722', // deep orange
  '#795548', // brown
  '#607d8b', // blue grey
];

const LabelScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);
  
  const dispatch = useDispatch();
  const labels = useSelector(selectLabels);

  const handleSave = () => {
    if (name.trim()) {
      if (editingLabel) {
        dispatch(updateLabel({
          id: editingLabel.id,
          name: name.trim(),
          color: selectedColor,
        }));
        setEditingLabel(null);
      } else {
        dispatch(addLabel({
          name: name.trim(),
          color: selectedColor,
        }));
      }
      setName('');
      setSelectedColor(COLORS[0]);
    }
  };

  const handleEdit = (label: Label) => {
    setEditingLabel(label);
    setName(label.name);
    setSelectedColor(label.color);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteLabel(id));
    if (editingLabel?.id === id) {
      setEditingLabel(null);
      setName('');
      setSelectedColor(COLORS[0]);
    }
  };

  const renderColorItem = ({ item: color }) => (
    <TouchableOpacity
      style={[
        styles.colorItem,
        { backgroundColor: color },
        color === selectedColor && styles.colorItemSelected,
      ]}
      onPress={() => setSelectedColor(color)}
    />
  );

  const renderLabelItem = ({ item: label }: { item: Label }) => (
    <View style={styles.labelItem}>
      <View style={styles.labelContent}>
        <View style={[styles.labelColor, { backgroundColor: label.color }]} />
        <Text style={styles.labelName}>{label.name}</Text>
      </View>
      <View style={styles.labelActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEdit(label)}>
          <IconComponent name="pencil" size={20} color="#6200ee" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDelete(label.id)}>
          <IconComponent name="delete" size={20} color="#ff4d4f" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconComponent name="arrow-left" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Labels</Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter label name"
          value={name}
          onChangeText={setName}
        />
        <FlatList
          data={COLORS}
          renderItem={renderColorItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.colorList}
        />
        <TouchableOpacity
          style={[styles.saveButton, !name.trim() && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!name.trim()}>
          <Text style={styles.saveButtonText}>
            {editingLabel ? 'Update Label' : 'Add Label'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={labels}
        renderItem={renderLabelItem}
        keyExtractor={item => item.id}
        style={styles.labelList}
        contentContainerStyle={styles.labelListContent}
      />
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
    }),
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 16,
  },
  inputSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  colorList: {
    marginBottom: 16,
  },
  colorItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorItemSelected: {
    borderColor: '#000',
  },
  saveButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  labelList: {
    flex: 1,
  },
  labelListContent: {
    padding: 16,
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  labelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  labelColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  labelName: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  labelActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default LabelScreen;
