import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppTheme } from './theme/AppTheme';

// Import screens
import CounterPage from './screens/CounterPage';
import HistoryPage from './screens/HistoryPage';
import SettingsPage from './screens/SettingsPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Counter"
        screenOptions={{
          headerStyle: {
            backgroundColor: AppTheme.colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: AppTheme.typography.fontWeight.bold as any,
            fontSize: AppTheme.typography.fontSize.xl,
          },
          headerShadowVisible: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Counter"
          component={CounterPage}
          options={{
            title: 'Counter',
            headerRight: () => null,
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryPage}
          options={{
            title: 'History',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            title: 'Settings',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
