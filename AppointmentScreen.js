import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  Animated,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Button
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const AppointmentScreen = () => {
  const [scrolling, setScrolling] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const onScrollBeginDrag = () => {
    setScrolling(true);
  };

  const onScrollEndDrag = () => {
    setScrolling(false);
  };

  const rowSwipeAnimatedValues = {};
  // Creating Animated.Value objects for each row
  Array(20).fill('').forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

  const [listData, setListData] = useState(
    Array(20).fill('').map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = listData.filter((item) => item.key !== rowKey);
    setListData(newData);
  };


  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'#AAA'}
    >
      {/* creating the cards to show the patent data */}
      <View>
        <TouchableOpacity>
          <Image
          source={require('./images/tripdot.png')}
          style={styles.tripleDotIcon}/>
        </TouchableOpacity>
        <Text>I am {data.item.text} in a SwipeListView</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* Tick icon */}
      <TouchableOpacity>
        <Image source={require('./images/tick.png')}
          style={styles.tick}
          onPress={() => deleteRow(rowMap, data.item.key)} />
      </TouchableOpacity>
      {/* Delete button */}
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
                  // Interpolate scale value based on swipe distance
                  scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                    inputRange: [25, 50],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        ></Animated.View>
      </TouchableOpacity>
      {/* Cross icon */}
      <TouchableOpacity>
        <Image
          source={require('./images/cross.png')}
          style={styles.trash}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Appointment</Text>
      <ScrollView
        style={styles.scroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
      >
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-50}
          previewRowKey={'0'}
          previewOpenValue={-50}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          onSwipeValueChange={onSwipeValueChange}
        />
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity onPress={() => setShowPopup(true)}>
          {/* Button image */}
          <Image
            style={styles.imgPop}
            source={require('./images/ButtonPop.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Popup */}
      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View>
          <View style={styles.popup}>
            <Text>Search</Text>
            <Text>Add New</Text>
            <Button
              style={styles.btnTxt}
              title="Search"
              onPress={handleClosePopup}
            />
            <Button style={styles.btnTxt}
            color={'white'}
              title="Add New"
              onPress={handleClosePopup}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: 411,
    height: 400,
    backgroundColor: 'white',
    padding: 1,
  },

  popup: {
    // Styling for the popup view
    position:'absolute',
    width: 200,
    padding: 8,
    borderRadius: 10,
    top:690,
    left:165,
    
  },

  btnTxt: {
    
  },


  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E8F1',
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    height: 50,
    padding: 2,
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: '#01C6B2',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 1,
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 10,
  },

  tick: {
    height: 25,
    width: 25,
  },

  scroll: {
    flex: 1,
    width: 411,
    height: 400,
    backgroundColor: '#EAEAEA',
    marginLeft: 2,
    marginRight: 4,
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
    position: 'absolute',
    zIndex: 400,
    bottom: 10,
    right: 5,
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
    height: 16,
    width: 3,
    position: 'relative',
    zIndex: 400,
    bottom: 1,
    right: 5,
    left: 290,
  },

  tokenTxt: {
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 400,
    bottom: 10,
    right: 5,
    left: 290,
  },

  popupButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;
