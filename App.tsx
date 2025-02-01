import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import DailyScreen from './src/screens/DailyScreen';
import TodosScreen from './src/screens/TodosScreen';
import TownScreen from './src/screens/TownScreen';
import SettingsStack from './src/navigation/SettingsStack';
import IconComponent from './src/components/IconComponent';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Daily':
                  iconName = 'calendar-check';
                  break;
                case 'Todos':
                  iconName = 'format-list-checks';
                  break;
                case 'Town':
                  iconName = 'home';
                  break;
                case 'Settings':
                  iconName = 'cog';
                  break;
                default:
                  iconName = 'help-circle';
              }

              return <IconComponent name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: '#757575',
            headerShown: false,
          })}>
          <Tab.Screen 
            name="Daily" 
            component={DailyScreen}
          />
          <Tab.Screen 
            name="Todos" 
            component={TodosScreen}
          />
          <Tab.Screen 
            name="Town" 
            component={TownScreen}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsStack}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
