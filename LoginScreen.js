import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, Alert, TextInput, SafeAreaView, TouchableOpacity, Button } from 'react-native';


const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const onChangeText = (text) => {
    // Handle text input change
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleForgetPassword = () => {
    // Handle Forget Password action
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('./images/medMan.png')}
        style={styles.image}
      />

      {/* Login text */}
      <Text style={styles.text}>Login</Text>

      {/* Input fields */}
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Login ID"
        />

        <TextInput
          style={styles.input}
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
          <Text style={styles.forgetPasswordText}>Forget Password</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Login button */}
      <Button
        style={styles.buttonContainer}
        title="Login"
        color="#01C6B2"
        onPress={() => Alert.alert('Button pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
  image: {
    marginBottom:30,
    width: 275,
    height: 275,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  text: {
    color: 'black',
    marginTop: 20,
    marginBottom: 15,
    fontSize: 28,
    fontWeight: 'bold',
  },
  toggleButtonText: {
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  forgetPasswordText: {
    color: 'black',
    marginTop: 10,
    marginBottom: 50,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  buttonContainer: {
    backgroundColor: '#01C6B2', // Set the background color of the button
    borderRadius: 10, // Set the border radius of the button
    padding:20,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center',// Center the content vertically
  },
  input: {
    height: 55,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default LoginScreen;
