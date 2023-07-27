import React, { useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Modal } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

export default function DataCards() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleOpenPopup = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const rowSwipeAnimatedValues = {};
  let val = 1;
  Array(val)
    .fill('')
    .forEach((_, i) => {
      rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  //Adding Data of the customers in the Card
  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => console.log('You touched me')}>
      <View style={styles.rowFront}>
        <Text style={styles.customerName}>{item.First_name}{item.Middle_name}{item.Last_name}</Text>
        <Text style={styles.time}>Date + | + shift time</Text>
        <Text style={styles.age}>{item.Age} y.o. {item.Gender}</Text>
        <Text style={styles.token}>{item.Unique_Id}</Text>
        <TouchableOpacity onPress={() => handleOpenPopup(item)}>
          <Image style={styles.tripDotBtn} source={require('./images/tripdot.png')} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Animated.View
        style={[
          styles.tick,
          {
            transform: [
              {
                scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                  inputRange: [45, 90],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity>
          <Image style={styles.tick} source={require('./images/tick.png')} />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Animated.View
          style={[
            styles.trash,
            {
              transform: [
                {
                  scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                    inputRange: [45, 90],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Image source={require('./images/cross.png')} style={styles.trash} onClick={CancleAppointments}/>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );

  const renderPopup = () => {
    if (!selectedItem) return null;

    return (
      <View style={styles.popup}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.popupOptions}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainerB}>
          <Text style={styles.popupOptions}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={[{ key: '0', text: 'item #0' }]}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={75}
        previewOpenDelay={2000}
        onRowDidOpen={onRowDidOpen}
        onSwipeValueChange={onSwipeValueChange}
      />
      {/* Popup */}
      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={handleClosePopup}>
          <View style={styles.popupOverlay}>{renderPopup()}</View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    backgroundColor: '#EAEAEA',
    flex: 1,
  },

  // Style of the card
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#E4E8F1',
    borderWidth: 2,
    justifyContent: 'center',
    height: 85,
    marginTop: 3,
    borderRadius: 10,
  },

  // Style of the back side row
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#01C6B2',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 10,
    marginTop: 3,
    height: 85,
  },

  
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    height: 85,
    borderRadius: 10,
  },

  backRightBtnRight: {
    width: 200,
    backgroundColor: 'red',
    right: 0,
    height: 85,
  },

  tick: {
    height: 37,
    width: 37,
  },

  trash: {
    height: 37,
    width: 37,
    left: 38,
  },

  tripDotBtn: {
    position: 'relative',
    left: 177,
    zIndex: 400,
    height: 16,
    width: 3,
    bottom: 55,
  },

  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popup: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    height: 78,
    position: 'absolute',
    top: 45,
    right: 40,
  },

  popupText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  popupOptions: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  buttonContainer: {
    width: 170,
    height: 30,
    borderRadius: 10,
    borderBottomColor: '#E4E8F1',
    borderTopColor: '#E4E8F1',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderWidth: 2,
    alignSelf: 'center',
  },

  buttonContainerB: {
    width: 170,
    height: 30,
    borderRadius: 10,
    marginTop: 3,
    borderBottomColor: '#E4E8F1',
    borderTopColor: '#E4E8F1',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderWidth: 2,
    alignSelf: 'center',
  },

  customerName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 10,
    top: 7,
  },

  time: {
    color: '#01C6B2',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: 7,
    marginLeft: 15,
  },

  token: {
    color: '#BDBDBD',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginRight: 10,
    bottom: 3,
  },

  age: {
    color: '#808080',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: 5,
    marginLeft: 15,
  },
});
