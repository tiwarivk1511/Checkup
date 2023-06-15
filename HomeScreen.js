import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Alert, TextInput, SafeAreaView, TouchableOpacity, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CreateListScreen from './CreateListScreen';

const HomeScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('Start');

  useEffect(() => {
    // Add the hardware back press listener
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);

    // Clean up the listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
    };
  }, []);

  // Handle back button press
  const handleBackButtonPress = () => {
    if (currentScreen !== 'Start') {
      setCurrentScreen('Start'); // Go back to the Start screen
      return true; // Return true to prevent the default back button action
    }
    return false; // Return false to allow the default back button action
  };

  // Handle create list button press
  const handleCreateList = () => {
    setCurrentScreen('CreateListScreen'); // Set the current screen to 'CreateListScreen'
  };

  // Render the StartScreen
  if (currentScreen === 'Start') {
    return (
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.text}>  What would you  </Text>
        <Text style={styles.textB}>like to do?</Text>

        {/* Create New List Button */}
        <LinearGradient colors={['#FFFFFF', '#CBD6E2']} style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCreateList}>
            <Image source={require('./images/Add.png')} style={styles.image} />
            <Text style={styles.buttonText}>Create New List</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Continue Button */}
        <LinearGradient colors={['#FFFFFF', '#CBD6E2']} style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => Alert.alert('continue Button pressed')}>
            <Image source={require('./images/play.png')} style={styles.image} />
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  // Render the CreateListScreen
  if (currentScreen === 'CreateListScreen') {
    return <CreateListScreen />;
  }

  return null; // Return null if the current screen is unknown or not implemented
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#01B3A1',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 15,
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    text: {
        color: 'white',
        marginBottom: 15,
        marginLeft:40,
        marginRight:40,
        fontSize: 42,
        fontWeight: 'bold',
    },
    textB: {
        color: 'white',
        marginBottom:50,
        fontSize: 42,
        fontWeight: 'bold',
    },
    buttonContainer: {
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        height:130,
        width: 300,
        shadowColor:'#000000',
    },
    buttonText: {
        color: '#01B3A1',
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
