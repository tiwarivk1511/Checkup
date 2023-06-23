import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import SearchCards from './SearchCard';
import DataCards from './Cards';



export default function SwipeValueBasedUi() {

  //set the data in the swipable Cards


  const [showPopup, setShowPopup] = useState(false);

  //UID genetation State
  const [genUID, setgenUID] = useState('');

  async function Generate() {
    // Add Generate UID API link here
    const API_GenUID = 'http://';

  }

  //fatching the Appointments from API
  async function fetchAppointments(){
    const url = "http://172.168.0.193:8000/api/patients";
    try {
      const currentdate = new Date();
      let date = currentdate.getFullYear().toString() + "-" + (currentdate.getMonth() + 1).toString().padStart(2, "0") + "-" + currentdate.getDate().toString().padStart(2, "0");
      // date="2023-06-23";
      const response = await fetch(
        url + "/api/appointments?date=" + date
      );
      const resData = await response.json();
      // console.log(resData);
      if (response.ok) {
        let temp = resData["success"];
        const sortedAppointments = temp.sort((a, b) => {
          const timeA = convertTo24HourFormat(a.Time);
          const timeB = convertTo24HourFormat(b.Time);
          return (
            new Date("1970/01/01 " + timeA) - new Date("1970/01/01 " + timeB)
          );
        });

        // console.log(sortedAppointments)

        setlist(sortedAppointments);
        setfilteredlist(sortedAppointments);
        // console.log(sortedAppointments);

        if (sortedAppointments.length !== 0) {
          if (sessionStorage.getItem("first_loaded") === "true") {
            sessionStorage.setItem(
              "defaultPatient",
              sortedAppointments[0].Patient.id
            );
            sessionStorage.setItem('appointment_id', sortedAppointments[0].id);

            sessionStorage.setItem("first_loaded", false);
          }
        } else {
          console.log("No Appointments Today");
        }
      } else {
        setbuffering(false);
        console.log(resData["error"]);
      }
    } catch (error) {
      setbuffering(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  //Searching Operation performence
  const [showSearch, setShowSearch] = useState(false);
  const [showPatentDetail, setShowPatentDetail] = useState(false);

  const [list, setdata] = useState([]);
  const [FilteredData, setFilteredData] = useState(list);

  async function fetchData() {
    const url = "http://172.168.0.193:8000/api/patients";
    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (res.ok) {
        setdata(resData['success']);
        // console.log(list);
      }
      else {
        // console.log(resData['error']);
      }
    }
    catch (error) {
      console.log("error");
    }
  }
  useEffect(() => {

    fetchData();

  }, [])

  const [searchQuery, setSearchQuery] = useState('');

  const handleClear = () => {
    setSearchQuery('');
  }

  const handleSearch = (text) => {
    setSearchQuery(text);
    let name = "";
    let temp = [];

    temp = list.filter((item) => {
      name = item.First_name;
      if (name.toLowerCase().startsWith(text.toLowerCase())) {
        return item;
      }
      else {
        return null;
      }
    })
    setFilteredData(temp);
  };
  //Searching Operation Completed


  // hasndling Popups & Touches
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleScreenTouch = () => {
    setShowSearch(false);
  };

  const handleSearchVisible = () => {
    setShowSearch(true);
  };

  const patentDetail = () => {
    setShowPatentDetail(true);
  };

  const handlePatentDataTouch = () => {
    setShowPatentDetail(false);
  };


  // handle Press when click on Search
  function handlePress() {
    // Task 1
    handleClosePopup();
    // Task 2
    handleSearchVisible();
  }

  // handle Press when click on Search
  function handlePressOnAddNew() {
    // Task 1
    handleClosePopup();
    // Task 2
    patentDetail();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleScreenTouch}>
      <View style={styles.appointView}>
        <Text style={styles.font}>Appointment</Text>
      </View>
      <View style={styles.appointView}>
        {/* Add the cards here */}
        <FlatList
                  data={
                    FilteredData
                  }
                  renderItem={DataCards}
                />

      </View>
      <View style={styles.btnView} backgroundColor={"white"}>
        <TouchableOpacity onPress={() => setShowPopup(true)}>
          <Image
            style={styles.imgPop}
            onPress={showPopup}
            source={require("./images/ButtonPop.png")}
          />
        </TouchableOpacity>
      </View>

      {/*Popup 1 */}
      <Modal visible={showPopup} animationType="slide" transparent={true} >
        <View style={styles.popup}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePopup}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.popupButton}
            onPress={handlePress}
          >
            <Text style={styles.popupButtonText}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.popupButton}
            onPress={() => {
              handlePressOnAddNew();
            }}
          >
            <Text style={styles.popupButtonText}>Add New</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/*Model for search */}
      {showSearch && (
        <TouchableOpacity onPress={handleScreenTouch}>
          <View style={styles.backView}>
            <View style={styles.frontView}>
              {searchQuery && (<TouchableOpacity
                style={styles.clrBtn}
                onPress={handleClear}
              >
                <Image
                  source={require('./images/clear.png')} />
              </TouchableOpacity>)}

              {/* geting input from the user for the search */}
              <TextInput
                style={styles.input}
                placeholder="Search"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              <ScrollView horizontal="true">

                <FlatList
                  data={
                    FilteredData
                  }
                  renderItem={SearchCards}
                />

              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/*Patent's Details */}
      {showPatentDetail && (
        <TouchableOpacity onPress={handlePatentDataTouch}>
          <View style={styles.PbackView}
            onPress={handlePatentDataTouch}>
            <View style={styles.PfrontView}>
              <View style={styles.fontView}>
                <Text
                  style={styles.font}>Patient's Details</Text>
              </View>

              <TextInput
                style={styles.PInput}
                placeholder='Name' />
              <TextInput
                style={styles.PInput}
                placeholder='Age' />
              <TextInput
                style={styles.PInput}
                placeholder='Gender' />
              <TextInput
                style={styles.PInput}
                placeholder='D.O.B.' />
              <TextInput
                style={styles.PInput}
                placeholder='Ph. Number' />
              <TextInput
                style={styles.PInput}
                placeholder='Address' />
              <TextInput
                style={styles.PInput}
                placeholder='E-mail' />
              <TextInput
                style={styles.uniqueID}
                placeholder='Unique ID' />

              <TouchableOpacity style={styles.btnGen}>
                <Text
                  style={styles.genTxt}>Generate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtn}>
                <Text
                  style={styles.submitTxt}>Submit</Text>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 410,
    backgroundColor: '#EAEAEA',
    flex: 1,
  },
  tripDot: {
    height: 20,
    width: 4,
    position: 'relative',
    left: 282,
  },

  // Input Styles
  input: {
    width: 355,
    height: 50,
    padding: 10,
    top: 18,
    marginLeft: 29,
    marginRight: 29,
    backgroundColor: '#C0C0C0',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 4,
  },

  clrBtn: {
    position: 'relative',
    left: 340,
    top: 58,
    zIndex: 400,
  },

  CName: {
    color: 'black',
    fontWeight: 'bold',
  },
  appointView: {
    height: 425,
    backgroundColor: '#EAEAEA',
  },

  standalonecontainer: {
    width: 395,
    backgroundColor: '#F6F9FE',
    flex: 1,
  },
  standalone: {
    marginTop: 10,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    height: 80,
    borderRadius: 10,
    borderColor: '#E4E8F1',
    marginLeft: 10,
    marginRight: 10,
  },

  standalonecustomerName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },

  standaloneage: {
    color: '#01C6B2',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: 16,
    marginLeft: 15,
  },

  standalonetoken: {
    color: '#BDBDBD',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    top: 5,
    marginRight: 10,
  },

  font: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#E4E8F1',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 4,
    height: 70,
    borderRadius: 5,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#01C6B2',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderColor: '#E4E8F1',
    marginTop: 4,
    height: 65,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 85,
    borderRadius: 10,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    height: 70,
    borderRadius: 5,
  },
  trash: {
    height: 30,
    width: 30,
  },
  tick: {
    height: 30,
    width: 30,
  },
  scrollview: {
    height: 300,
    backgroundColor: '#EAEAEA',
  },
  cards: {
    borderRadius: 20,
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
    right: 3,
  },
  popup: {
    backgroundColor: 'white',
    padding: 5,
    margin: 50,
    borderRadius: 10,
    elevation: 5,
    width: 130,
    height: 120,
    top: 620,
    left: 190,
  },

  popupB: {
    backgroundColor: 'white',
    padding: 20,
    margin: 50,
    borderRadius: 10,
    elevation: 5,
    width: 180,
    height: 150,
    top: 270,
    left: 70,
  },

  btnView: {
    width: 420,
    Color: 'white'
  },

  popupButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  popupButtonB: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopColor: '#E4E8F1',
    borderEndColor: 'white',
    borderLeftColor: 'white',
    borderBottomColor: 'white',
    borderWidth: 2,
  },
  popupButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'red',
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'red',
    fontWeight: 'bold',
    right: 5,
  },


  // styles for Search popup
  backView: {
    flex: 1,
    height: 730,
    width: 412,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 370,
  },

  // Inner View Styles
  frontView: {
    height: 730,
    width: 411,
    top: 20,
    marginStart: 0,
    borderRadius: 30,
    shadowColor: '#000',
    backgroundColor: 'white',
    borderWidth: 2,
  },


  //Patent Details Popup

  PbackView: {
    flex: 1,
    height: 730,
    width: 412,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000026',
    bottom: 370,
  },

  // Inner View Styles
  PfrontView: {
    height: 830,
    width: 411,
    margintop: 30,
    marginBottom: 10,
    marginStart: 0,
    borderRadius: 30,
    shadowColor: '#000',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#F6F9FE',
  },

  // Patient's Details

  fontView: {
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 10,
  },

  PInput: {
    width: 390,
    height: 50,
    padding: 10,
    top: 15,
    marginLeft: 10,
    marginRight: 29,
    backgroundColor: '#F6F6F6',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 4,
  },

  uniqueID: {
    width: 200,
    height: 50,
    padding: 10,
    top: 15,
    marginLeft: 10,
    marginRight: 29,
    backgroundColor: '#F6F6F6',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 4,
  },

  btnGen: {
    width: 177,
    height: 50,
    padding: 10,
    bottom: 55,
    marginLeft: 10,
    marginRight: 29,
    backgroundColor: 'white',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#01C6B2',
    borderRadius: 4,
    position: 'relative',
    left: 210,
  },

  genTxt: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  submitBtn: {
    width: 390,
    height: 50,
    padding: 10,
    top: 1,
    bottom: 55,
    marginLeft: 10,
    marginRight: 29,
    backgroundColor: '#01C6B2',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#01C6B2',
    borderRadius: 4,
    position: 'relative',
  },


  submitTxt: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
    color: '#000000',
    alignSelf: 'flex-start',
    top: 5,
    marginLeft: 15,
  },

});
