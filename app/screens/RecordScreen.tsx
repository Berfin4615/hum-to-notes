import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RecordScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = React.useState('');
  const [instrument, setInstrument] = React.useState('Piano');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [uri, setUri] = useState<string | null>(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('İzin reddedildi', 'Mikrofon izni gerekli.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error('Kayıt başlatılamadı', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setUri(uri);
    setRecording(null);
    console.log('Recording is saved:', uri);
  };

  const saveRecording = async () => {
    if(!uri || !title) {
      Alert.alert('Missing Information', 'Please provide a title and select an instrument.'); 
      return;
    }

    const newRecording = {
      id: Date.now().toString(),
      name: title + instrument,
      uri: uri,
      date: new Date().toLocaleString(),
    };

    const existingRecordings = await AsyncStorage.getItem('recordings');
    const recordings = existingRecordings ? JSON.parse(existingRecordings) : [];
    recordings.push(newRecording);
    
    await AsyncStorage.setItem('recordings', JSON.stringify(recordings));
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']} 
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Title of Hum</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.titleInput}
      />
      <Text style={styles.title}>Select Instrument</Text>
      <Picker
        selectedValue={instrument}
        onValueChange={(itemValue: string) => setInstrument(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Piano" value="Piano" />
        <Picker.Item label="Guitar" value="Guitar" />
        <Picker.Item label="Violin" value="Violin" />
        <Picker.Item label="Flute" value="Flute" />
        <Picker.Item label="Drums" value="Drums" />
      </Picker>

      {recording ? (
        <TouchableOpacity style={styles.recordStop} onPress={stopRecording}>
          <Text style={styles.buttonText}>🛑 Stop Record</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.recordStart} onPress={startRecording}>
          <Text style={styles.buttonText}>🎙️ Start Record</Text>
        </TouchableOpacity>
      )}

      {uri && (
        <TouchableOpacity style={styles.saveButton} onPress={saveRecording}>
          <Text style={styles.buttonText}>⬆️ Save Recording</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: -250,
    color: '#fff',
  },
  titleInput: {
    borderColor: 'purple',
    borderWidth: 1,
    borderRadius: 40,
    width: '70%',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    borderColor: 'purple',
    height: 30,
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000'
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  recordStart: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  recordStop: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#2575fc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  }
});
