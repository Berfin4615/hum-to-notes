import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveRecording = async (recording) => {
  const data = await AsyncStorage.getItem('recordings');
  const recordings = data ? JSON.parse(data) : [];
  recordings.unshift(recording); // son eklenen en üstte
  await AsyncStorage.setItem('recordings', JSON.stringify(recordings));
};
