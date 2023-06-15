import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, Alert, TextInput, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import LoginScreen from './LoginScreen';

const ForgetPasswordScreen = () => {
    // State variable to keep track of the current screen
    const [currentScreen, setCurrentScreen] = useState('ForgetPassword');

    // Function to handle moving back to the LoginScreen
    const backToLoginScreen = () => {
        setCurrentScreen('LoginScreen'); // Set the current screen to 'LoginScreen'
    }

    // Render the ForgetPasswordScreen
    if (currentScreen === 'ForgetPassword') {
        return (
            <View style={styles.container}>
                {/* Logo */}
                <Image
                    source={require('./images/forgetPass.png')}
                    style={styles.image}
                />

                {/* Forget Password text */}
                <Text style={styles.text}>Forget Password ?</Text>

                {/* Email input */}
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    keyboardType='email-address' // Set the input type as email
                />

                {/* Submit button */}
                <Button
                    style={styles.buttonContainer}
                    title='Submit'
                    color="#01C6B2"
                    onPress={() => Alert.alert('E-mail Submited')}
                />
                <View style = {styles.view}>
                    {/* Back to Login text */}
                    <Text style={styles.font}>Back to
                        <TouchableOpacity onPress={backToLoginScreen}>
                            <Text style={styles.fontA}> Login</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        );
    }

    // Render the LoginScreen
    if (currentScreen === 'LoginScreen') {
        return <LoginScreen />;
    }

    return null; // Return null if the current screen is unknown or not implemented
};

const styles = StyleSheet.create({
    image: {
        // Styling for the image component
        marginBottom: 55,
        width: 275,
        height: 275,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    text: {
        // Styling for the text component
        color: 'black',
        marginTop: 10,
        marginBottom:50,
        fontSize: 28,
        alignSelf:'flex-start',
        fontWeight: 'bold',
    },
    
    font: {
        // Styling for the font component
        color: 'black',
        marginTop: 21,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
   
    fontA: {
        // Styling for the fontA component
        color: '#01C6B2',
        marginTop: 21,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    buttonContainer: {
        // Styling for the button container
        marginTop: 60,
        backgroundColor: '#01C6B2', // Set the background color of the button
        borderRadius: 10, // Set the border radius of the button
        padding: 20,
        fontWeight: 'bold',
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
    },
    input: {
        // Styling for the input component
        height: 55,
        width: 320,
        margin: 12,
        borderWidth: 1,
        marginBottom: 35,
        padding: 10,
        borderRadius: 10,
        borderColor: '#E4E8F1',
        backgroundColor: '#F6F6F6',
    },
});


export default ForgetPasswordScreen;
