import React from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function TextField(props: any) {
    return (
        <View>
            <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>{props.placeholder}</Text>
            <View style={styles.item}>
                <Text style={styles.text}>{props.value}</Text>
                <View 
                    style={{
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                    }}
                />
            </View>
            <View style={{ marginBottom: 15 }}></View>
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        backgroundColor: "#ffffff",
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,

        borderRadius: 7,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
const styles = StyleSheet.create({
    containerStyle: {
        padding: 5
    },
    item: {
        padding: "1%",
        width: "100%"
    },
    text: {

        fontSize: 16,
        // paddingVertical: 12,
        // paddingHorizontal: 10,

        color: 'black',
        paddingRight: 30,
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ffffff',
        borderColor: '#bbb',
        borderWidth: 1,
    },
    itemTextStyle: {
        color: '#222',
    },
    itemsContainerStyle: {
        maxHeight: '60%',
    }
});