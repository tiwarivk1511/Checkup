import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default function DataCards({item}) {

    return (
        <View style={styles.rowFront}>
            <Text style={styles.customerName}>{item.First_name}{item.Middle_name}{item.Last_name}</Text>
            <Text style={styles.age}>{item.Age} y.o. {item.Gender}</Text>
            <Text style={styles.token}>{item.Unique_Id}</Text>
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
        width: 400,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#E4E8F1',
        borderWidth: 2,
        justifyContent: 'center',
        height:90,
        marginTop: 3,
        borderRadius: 10,
        padding:10,
    },

    buttonContainerB: {
        width: 370,
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
        marginBottom:13,
        top: 7,
    },

    age: {
        color: '#01C6B2',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        top:11,
        marginLeft: 15,
        fontSize:14,
    },

    token: {
        color: '#808080',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginRight: 10,
        bottom: 5,
        fontSize:14,
    },

});
