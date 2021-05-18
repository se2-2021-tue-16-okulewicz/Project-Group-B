import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function DropDownInput(props: any) {
  return (
    <View>
      <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>
        {props.placeholder}
      </Text>
      <RNPickerSelect
        placeholder={{
          label: props.placeholder,
          value: null,
          color: "gray",
        }}
        items={props.data}
        onValueChange={(el) => props.onValueChange(el)}
        style={pickerSelectStyles}
        value={props.value}
        InputAccessoryView={() => null}
      />
      <View style={{ marginBottom: 7 }}></View>
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
  containerStyle: {
    padding: 5,
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ffffff",
  },
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#ffffff",
    borderColor: "#bbb",
    borderWidth: 1,
  },
  itemTextStyle: {
    color: "#222",
  },
  itemsContainerStyle: {
    maxHeight: "60%",
  },
});
