import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './screens/DetailScreen';
import HomeScreen from './screens/HomeScreen';
import RecordScreen from './screens/RecordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Kayıtlarım" component={HomeScreen} />
        <Stack.Screen name="Yeni Kayıt" component={RecordScreen} />
        <Stack.Screen name="Detay" component={DetailScreen} />
      </Stack.Navigator>
  );
}
