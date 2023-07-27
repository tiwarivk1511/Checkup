// Import necessary components
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// CustomButton component
const CustomButton = ({ title, onPress, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]} // Apply custom button styles if provided
      onPress={onPress} // Call the onPress function when the button is pressed
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text> {/* Display the button title text */}
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#01C6B2', // Set the background color of the button
    borderRadius: 10, // Set the border radius of the button
    paddingVertical: 12, // Set the vertical padding of the button
    paddingHorizontal: 20, // Set the horizontal padding of the button
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
  buttonText: {
    color: 'white', // Set the text color of the button title
    fontSize: 16, // Set the font size of the button title
    fontWeight: 'bold', // Set the font weight of the button title
  },
});

export default CustomButton; // Export the CustomButton component as the default export
