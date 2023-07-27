import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TextInput, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppointmentScreen from './AppointmentScreen';



const CreateListScreen = () => {
  const [selectedShift, setSelectedShift] = useState('');
  const [data, setData] = useState('');

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  

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
        <View  style={styles.input}>
        {/* Date Input */}
        <TouchableOpacity
          onPress={() => showPicker(true)}>
          <Image
          style={styles.date}
            source={require('./images/calender.png')}
          />
        </TouchableOpacity>
        <TextInput style={styles.Date}
         placeholder='DD/MM/YYYY'>{date.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'})}
         </TextInput>
        </View>
        
{/*date Picker */}
        <View>
        {isPickerShow && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
        </View>

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
    marginBottom: 10,
    marginLeft: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  // SafeAreaView Styles
  SafeArea: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
  },


  popup: {
    position: 'absolute',
    top: 100, // Adjust the top position of the popup
    left: 50, // Adjust the left position of the popup
    width: 300, // Adjust the width of the popup
    height: 200, // Adjust the height of the popup
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add shadow elevation for a raised effect
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
    width: 355,
    height:50,
    padding: 10,
    marginLeft: 29,
    marginRight: 29,
    backgroundColor: '#C0C0C0',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
  },

  Date:{
    position:'absolute',
zIndex:400,
  },

  date: {
    position:'absolute',
    zIndex:400,
    left:300,
  },

  // Button Styles
  buttonContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#01C6B2',
    borderRadius:10,
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
