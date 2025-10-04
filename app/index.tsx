import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';
import RecordScreen from './screens/RecordScreen';
import type { RootStackParamList } from './types.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Kayıtlarım" options={{
          title: '🎵 My Records',
          headerTransparent: true,
          headerStyle: { backgroundColor: 'transparent' },  
          headerTintColor: '#e5beffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 35,
          },
        }} component={HomeScreen} />
        <Stack.Screen name="Yeni Kayıt" 
          options={{
            title: 'New Record',
            headerTransparent: true,
            headerStyle: { backgroundColor: 'transparent' },  
            headerTintColor: '#e5beffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 35,
            },
          }} component={RecordScreen} />
        <Stack.Screen name="Detay" component={DetailScreen} />
      </Stack.Navigator>
  );
}
