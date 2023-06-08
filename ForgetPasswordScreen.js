import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, Alert, TextInput, SafeAreaView, TouchableOpacity, Button } from 'react-native';


const ForgetPasswordScreen = () => {

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('./images/forgetPass.png')}
                style={styles.image}
            />

            {/* Login text */}
            <Text style={styles.text}>Forget Password ?</Text>

            {/* Input fields */}
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                />


                {/* Login button */}
                <Button
                    style={styles.buttonContainer}
                    title="Submit"
                    color="#01C6B2"
                    onPress={() => Alert.alert('Button pressed')}
                />
            </SafeAreaView>
            <Text
                style={styles.font}
                title="Back to " />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        marginBottom: 60,
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

    font: {
        color: 'black',
        marginTop: 20,

    },
    buttonContainer: {
        marginTop: 60,
        backgroundColor: '#01C6B2', // Set the background color of the button
        borderRadius: 10, // Set the border radius of the button
        padding: 20,
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center',// Center the content vertically
    },
    input: {
        height: 55,
        width: 320,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
});

export default ForgetPasswordScreen;
