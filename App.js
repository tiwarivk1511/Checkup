/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from './SplashScreen';
import StartScreen from './StartScreen';
import { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen';
import CreateListScreen from './CreateListScreen';
import AppointmentScreen from './AppointmentScreen';
import LoginScreen from './LoginScreen';
import Cards from './Cards';
import SearchCards from './SearchCard';


const App = () => {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Set the duration for how long you want to show the splash screen
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {
          <AppointmentScreen/>}
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

