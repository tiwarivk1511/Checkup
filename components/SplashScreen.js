import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./images/Checkup_logo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Checkup</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01C6B2', // Background color for the container
  },
  image: {
    alignItems:'center',
    marginTop: 50,
    width: 100,
    height: 100,
    resizeMode: 'contain',// Set the image to scale within the defined width and height
  },
  text: {
    color: 'white', // Color of the text
    marginTop: 20, // Spacing from the top
    fontSize: 28, // Font size of the text
    fontWeight: 'bold', // Font weight of the text
  },
});

export default SplashScreen;
