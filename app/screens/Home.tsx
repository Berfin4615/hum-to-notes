import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';


export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/back.jpg")}
        contentFit="cover"
        transition={1000}
      />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
