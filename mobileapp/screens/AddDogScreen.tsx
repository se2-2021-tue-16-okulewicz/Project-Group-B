import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageUpload from "../components/helper/ImageUpload";
import AddDogStack from "./AddDogStack";

export default class AddDogScreen extends React.Component {
  render() {
    return (
      <AddDogStack />
      // <View style={styles.container}>
      // <ImageUpload></ImageUpload>
      //   <Text>Add dog Screen</Text>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
