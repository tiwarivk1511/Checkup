import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TextInput, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import RadioForm, { RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const CreateListScreen = () => {
  const [selectedShift, setSelectedShift] = useState('');
// created the options of the radio buttons
  const shiftOptions = [
    { label: 'Morning Shift', value: 'morning', image: require('./images/Bg.png') },
    { label: 'Evening Shift', value: 'evening', image: require('./images/Bg.png') },
  ];

  // Function to handle shift selection
  const handleShiftSelection = (value) => {
    setSelectedShift(value);
  };

  return (
    <View style={styles.backView}>
      <View style={styles.frontView}>
        {/* Title */}
        <Text style={styles.ListText}>New List</Text>

        {/* Date Input */}
        <TouchableOpacity>
          <TextInput style={styles.input} placeholder='DD/MM/YYYY' />
        </TouchableOpacity>

        <SafeAreaView style={styles.SafeArea}>
          {/* Shift Options */}
          {shiftOptions.map((option, index) => (
    
            <TouchableOpacity
              key={index}
              style={[
                styles.shiftOption,
                selectedShift === option.value ? styles.selectedShiftOption : null,
              ]}
              onPress={() => handleShiftSelection(option.value)}
            >
              {/* Adding the options */}
              <Text style={styles.optionText}>{option.label}</Text>
              {selectedShift === option.value && (
                <Image source={option.image} style={styles.selectedImage} />
              )}
            </TouchableOpacity>
          ))}
        </SafeAreaView>

        {/* Button */}
        <SafeAreaView style={styles.adjustBtn}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => Alert.alert("New List Created")}>
            <Text style={styles.buttonText}>Create New List</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Title Styles
  ListText: {
    color: 'black',
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  // SafeAreaView Styles
  SafeArea: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
  },

  // Outer View Styles
  backView: {
    backgroundColor: '#01B3A1',
    height: 845,
    width: 415,
  },

  // Inner View Styles
  frontView: {
    height: 713,
    marginTop: 150,
    marginStart: 0,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: '#000',
  },

  // Input Styles
  input: {
    padding: 10,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: '#C0C0C0',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
  },

  // Button Styles
  buttonContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#01C6B2',
  },

  // Button text style
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

  // Shift Option Styles
  shiftOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  // option text Style
  optionText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
  },

  //Selected options Background
  selectedShiftOption: {
    backgroundColor: 'white',
  },

  // Styling the  selection image for the  radio button
  selectedImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  adjustBtn: {
    marginLeft: 30,
    marginRight: 30,
  },
});

export default CreateListScreen;
