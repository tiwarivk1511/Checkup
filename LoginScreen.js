import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, SafeAreaView, TouchableOpacity, Button, Modal, Alert } from 'react-native';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import HomeScreen from './HomeScreen';

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleTextChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgetPassword = () => {
    setCurrentScreen('ForgetPasswordScreen');
  };

  const handleSubmit = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setShowPopup(true);
    } else {
      // Perform login request here
      let emailInput = email.trim();
      let passwordInput = password.trim();
      const data = {
        email: emailInput,
        password: passwordInput,
      };
      const url = "http://172.168.0.195:5000/api/login"; // Add your login URL here
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();
        // console.log(responseData)

        // Handle the API response
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          Alert.alert('Credentials not found');
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (isLoggedIn) {
    return <HomeScreen />;
  }

  if (currentScreen === 'Login') {
    return (
      <View style={styles.container}>
        {/* Logo */}
        <Image source={require('./images/medMan.png')} style={styles.image} />

        {/* Login text */}
        <Text style={styles.text}>Login</Text>

        {/* Input fields */}
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={handleTextChange}
            placeholder="Login ID"
          />

          <TextInput
            style={styles.input}
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={!passwordVisible}
            placeholder="Password"
          />

          {/* Password show button */}
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.toggleButtonText}>
              {passwordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>

          {/* Forget Password */}
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={styles.forgetPasswordText}>Forget Password ?</Text>
          </TouchableOpacity>
        </SafeAreaView>

        {/* Login button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
          <Text style={styles.textBtn}>Login</Text>
        </TouchableOpacity>

        {/* Popup */}
        <Modal visible={showPopup} animationType="slide" transparent={true}>
          <View style={styles.popupContainer}>
            <View style={styles.popup}>
              <Text style={styles.popupText}>Please Enter Login ID & Password</Text>
              <Button
                color={'#01C6B2'}
                borderRadius={10}
                title="OK"
                onPress={handleClosePopup}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  if (currentScreen === 'ForgetPasswordScreen') {
    return <ForgetPasswordScreen />;
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    // Styling for the container view
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // Styling for the image component
    marginBottom: 30,
    width: 275,
    height: 275,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  text: {
    // Styling for the text component
    color: 'black',
    marginTop: 20,
    marginBottom: 15,
    fontSize: 28,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },

  textBtn: {
    // Styling for the text component
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  toggleButtonText: {
    // Styling for the toggle button text component
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    position: 'absolute',
    zIndex: 450,
    bottom: 20,
    right: 20,
    left: 200,
  },

  buttonContainer: {
    width: 300,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#01C6B2',
    borderRadius: 10,
  },

  forgetPasswordText: {
    // Styling for the forget password text component
    color: 'black',
    marginTop: 20,
    marginBottom: 50,
    fontSize: 15,
    fontWeight: 'bold',
    position: 'relative',
    left: 200,
  },

  input: {
    // Styling for the input component
    height: 55,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor: '#E4E8F1',
    backgroundColor: '#F6F6F6',
  },

  popupContainer: {
    // Styling for the popup container
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  popup: {
    // Styling for the popup view
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  popupText: {
    // Styling for the popup text
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
