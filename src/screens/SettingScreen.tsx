import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import IconComponent from '../components/IconComponent';

const SettingScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => navigation.navigate('Label')}
      >
        <View style={styles.menuContent}>
          <IconComponent name="tag" size={24} color="#6200ee" />
          <Text style={styles.menuText}>Manage Labels</Text>
        </View>
        <IconComponent name="chevron-right" size={24} color="#757575" />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Version</Text>
        <Text style={styles.sectionContent}>1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 16,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#757575',
  },
});

export default SettingScreen;
