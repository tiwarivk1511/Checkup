

import React from 'react';

import {SafeAreaView, View} from 'react-native';

import SplashScreen from './components/SplashScreen';
import StartScreen from './components/StartScreen';
import {useState, useEffect} from 'react';
import HomeScreen from './components/HomeScreen';
import CreateListScreen from './components/CreateListScreen';
import AppointmentScreen from './components/AppointmentScreen';
import LoginScreen from './components/LoginScreen';
import Cards from './components/Cards';
import SearchCards from './components/SearchCard';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Set the duration for how long you want to show the splash screen
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {<AppointmentScreen/>}
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
