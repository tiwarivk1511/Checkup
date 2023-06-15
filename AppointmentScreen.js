import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Alert, Image, PanResponder, Animated, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const AppointmentScreen = () => {
  const [swipeVisible, setSwipeVisible] = useState(Array(5).fill(false)); // Initialize swipe visibility as an array
  const [isPopupVisible, setPopupVisible] = useState(false); // State to track popup visibility

  const position = useRef([]); // Ref to track position of each card
  const panResponders = useRef([]); // Ref to store panResponder for each card

  const handleSwipeVisibility = (index, dx) => {
    const newSwipeVisible = [...swipeVisible];
    newSwipeVisible[index] = dx !== 0;
    setSwipeVisible(newSwipeVisible);
  };

  const handleSwipe = (index, direction) => {
    // Handle swipe action for the given index and direction
    console.log(`${direction} swipe for card at index ${index}`);
    // Example: Show an option or perform an action
    if (direction === 'right') {
      Alert.alert('Right Swipe', 'Send to Doctor');
    } else if (direction === 'left') {
      Alert.alert('Left Swipe', 'Remove from List');
      // Remove the card from the list
      const newSwipeVisible = swipeVisible.filter((_, cardIndex) => cardIndex !== index);
      const newPosition = position.current.filter((_, cardIndex) => cardIndex !== index);
      const newPanResponders = panResponders.current.filter((_, cardIndex) => cardIndex !== index);
      setSwipeVisible(newSwipeVisible);
      position.current = newPosition;
      panResponders.current = newPanResponders;
    }
    resetPosition(index);
  };

  const resetPosition = (index) => {
    Animated.spring(position.current[index], {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
    const newSwipeVisible = [...swipeVisible];
    newSwipeVisible[index] = false;
    setSwipeVisible(newSwipeVisible);
  };

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < 5; i++) {
      position.current[i] = useRef(new Animated.ValueXY()).current;
      panResponders.current[i] = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (event, gesture) => {
            position.current[i].setValue({ x: gesture.dx, y: gesture.dy });
            handleSwipeVisibility(i, gesture.dx);
          },
          onPanResponderRelease: (_, gesture) => {
            if (gesture.dx <= -100) {
              handleSwipe(i, 'left');
            } else if (gesture.dx >= 100) {
              handleSwipe(i, 'right');
            } else {
              resetPosition(i);
            }
          },
        })
      ).current;

      const animatedStyle = {
        transform: position.current[i].getTranslateTransform(),
      };

      const leftSwipeStyle = {
        opacity: swipeVisible[i] ? 1 : 0,
        transform: [
          {
            translateX: position.current[i].x.interpolate({
              inputRange: [-100, 0],
              outputRange: [-70, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      };

      const rightSwipeStyle = {
        opacity: swipeVisible[i] ? 1 : 0,
        transform: [
          {
            translateX: position.current[i].x.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 70],
              extrapolate: 'clamp',
            }),
          },
        ],
      };

      cards.push(
        <Animated.View key={i} {...panResponders.current[i].panHandlers} style={[styles.card, animatedStyle]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Card {i + 1}
              <TouchableOpacity onPress={() => console.log('Triple dot button pressed')}>
                <Image
                  style={styles.tripleDotIcon}
                  source={require('./images/tripdot.png')} />
              </TouchableOpacity>
            </Text>
          </View>
          <Text>Date | Time in - time out</Text>
          <Text>age + y.o <Text style={styles.tokenTxt}>Token</Text></Text>
          
          <Animated.View style={[styles.swipeOption, styles.leftSwipeOption, leftSwipeStyle]}>
            <Image source={require('./images/tick.png')} style={styles.image} />
          </Animated.View>
          <Animated.View style={[styles.swipeOption, styles.rightSwipeOption, rightSwipeStyle]}>
            <Image source={require('./images/cross.png')} style={styles.image} />
          </Animated.View>
        </Animated.View>
      );
    }

    return cards;
  };

  const renderPopup = () => {
    if (!isPopupVisible) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.popupBackdrop} activeOpacity={1} onPress={closePopup}>
        <View style={styles.popupContainer}>
          <TouchableOpacity style={styles.popupButton} onPress={() => console.log('Search Button pressed')}>
            <Text style={styles.popupButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popupButton2} onPress={() => console.log('Add New pressed')}>
            <Text style={styles.popupButtonText}>Add New</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Appointment</Text>
      <ScrollView style={styles.scroll}>{renderCards()}</ScrollView>
      <SafeAreaView>
        <TouchableOpacity onPress={openPopup}>
          <Image source={require('./images/ButtonPop.png')} style={styles.imgPop} />
        </TouchableOpacity>
      </SafeAreaView>
      {renderPopup()}
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    width: 411,
    backgroundColor: 'white',
  },

  scroll: {
    flex: 1,
    width: 420,
    height:150,
    backgroundColor: '#EAEAEA',
  },

  headingText: {
    color: 'black',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  card: {
    backgroundColor: 'white',
    width: 380,
    borderRadius: 8,
    alignSelf: 'center',
    padding: 16,
    elevation: 2,
    marginVertical: 4,
  },

  cardTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  swipeOption: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    zIndex: 1,
  },

  leftSwipeOption: {
    left: -70,
    backgroundColor: '#01C6B2',
  },

  rightSwipeOption: {
    right: -70,
    backgroundColor: '#F96D82',
  },

  imgPop: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginBottom: 5,
    shadowColor: '#808080',
    position:'absolute',
    zIndex:400,
    bottom:10,
    right:5,
  },

  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  popupBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popupContainer: {
    backgroundColor: 'white',
    width: 200,
    padding: 16,
    borderRadius: 8,
  },

  popupButton: {
    padding: 8,
    marginBottom: 2,
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  popupButton2: {
    padding: 8,
    marginBottom: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  tripleDotIcon: {
    height:16,
    width:3,
    position:'absolute',
    zIndex:400,
    bottom:10,
    right:5,
    left:290,
  },

  tokenTxt:{
    alignSelf:'flex-end',
    position:'absolute',
    zIndex:400,
    bottom:10,
    right:5,
    left:290,
  },

  popupButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;
