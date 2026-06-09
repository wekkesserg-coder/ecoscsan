import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { ScanScreen } from './src/screens/ScanScreen';
import { AdminScreen } from './src/screens/AdminScreen';
import { StatsScreen } from './src/screens/StatsScreen';
import { ProductProvider } from './src/context/ProductContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: '#27ae60',
            tabBarInactiveTintColor: '#bdc3c7',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#ecf0f1',
            },
          }}
        >
          <Tab.Screen
            name="Scan"
            component={ScanScreen}
            options={{
              title: 'Escanear',
              tabBarLabel: 'Escanear',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📱</Text>
              ),
            }}
          />

          <Tab.Screen
            name="Admin"
            component={AdminScreen}
            options={{
              title: 'Administración',
              tabBarLabel: 'Admin',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>⚙️</Text>
              ),
            }}
          />

          <Tab.Screen
            name="Stats"
            component={StatsScreen}
            options={{
              title: 'Estadísticas',
              tabBarLabel: 'Stats',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 24, color }}>📊</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}
