import React from 'react';
import { View, Image, StyleSheet, Text, Alert, Button } from 'react-native';
import CustomButton from './CustomButton';

// StartScreen component
const StartScreen = () => {
  // Handle login button press
  const handleLogin = () => {
    Alert.alert('Button Pressed');
    // Add your navigation logic here to navigate to the login screen
  };

  

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Let’s get started!</Text>

      {/* Logo */}
      <Image
        source={require('./images/Checkup_logo.png')}
        style={styles.logo}
      />

      {/* App Name */}
      <Text style={styles.appName}>Checkup</Text>

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          color="#01C6B2"
          onPress={handleLogin} // Call handleLogin when the button is pressed
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    color: 'black',
    marginBottom: 200,
    fontSize: 28,
    fontWeight: 'bold',
  },
  logo: {
    alignItems: 'center',
    marginTop: 50,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appName: {
    color: 'black',
    marginTop: 20,
    marginBottom: 200,
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 50,
    height: 55,
    width: 300,
    borderRadius: 80,
  },
});

export default StartScreen;
