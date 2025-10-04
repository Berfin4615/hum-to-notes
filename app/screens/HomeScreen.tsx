import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Recording, RootStackParamList } from '../types';

export default function HomeScreen() {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadRecordings = async () => {
      const data = await AsyncStorage.getItem('recordings');
      if (data) setRecordings(JSON.parse(data));
    };
    const unsubscribe = navigation.addListener('focus', loadRecordings);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: Recording }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detay', { recording: item })}>
      <Text style={{ fontSize: 18 }}>{item.name}</Text>
      <Text style={{ fontSize: 12, color: 'gray' }}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6a11cb', '#2575fc']} 
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Yeni Kayıt')}>
        <Text style={styles.buttonText}>➕ New Record</Text>
      </TouchableOpacity>
      <FlatList<Recording>
        data={recordings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      </LinearGradient>
    </View>
    
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  button: {
    backgroundColor: '#000000ff',
    marginTop: 700,
    borderRadius: 50,

  },
  buttonText: {
    fontSize: 18,
    color: '#d3b5e9ff',
    fontWeight: 'bold',
    padding: 10,
  }
});
