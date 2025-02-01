import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import our screens
import DailyScreen from './src/screens/DailyScreen';
import TodoScreen from './src/screens/TodoScreen';
import StatsScreen from './src/screens/StatsScreen';
import IconComponent from './src/components/IconComponent';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: '#757575',
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
          }}>
          <Tab.Screen
            name="Daily"
            component={DailyScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <IconComponent name="calendar-check" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Todos"
            component={TodoScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <IconComponent name="format-list-checks" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Stats"
            component={StatsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <IconComponent name="chart-bar" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
