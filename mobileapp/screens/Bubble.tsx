import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Bubble(props: any) {
  return (
    <View
      style={
        props.isSelected
          ? [styles.selectedItem, styles.row]
          : [styles.item, styles.row]
      }
    >
      <TouchableOpacity onPress={props.onPress}>
        <Text
          style={props.isSelected ? styles.selectedItemStyle : styles.itemStyle}
        >
          {props.placeholder}
        </Text>
      </TouchableOpacity>

      {/* <FontAwesomeIcon icon={faTimes} size={15} color={"gray"} ></FontAwesomeIcon> */}
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#ffffff",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,

    borderRadius: 7,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  item: {
    padding: 10,
    backgroundColor: "#ffffff",

    borderRadius: 15,
    marginRight: 10,
  },
  selectedItem: {
    padding: 10,
    backgroundColor: "#423e3a",

    borderRadius: 15,
    marginRight: 10,
  },
  placeholderStyle: {
    color: "#d8d9dd",
    fontSize: 16,
  },
  containerStyle: {
    padding: 5,
  },
  textInputStyle: {
    padding: 12,
    borderColor: "#fff",
    backgroundColor: "#ffffff",
  },
  itemStyle: {
    color: "#d8d9dd",
  },
  selectedItemStyle: {
    color: "#fff",
  },
  itemTextStyle: {
    color: "#222",
  },
  itemsContainerStyle: {
    maxHeight: "60%",
  },
});
