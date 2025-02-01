import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screens/SettingScreen';
import LabelScreen from '../screens/LabelScreen';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SettingsMain" component={SettingScreen} />
      <Stack.Screen name="Label" component={LabelScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
