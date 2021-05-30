import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LogOut from "../components/profile/LogOut";

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Hello!</Text> */}
        <LogOut ></LogOut>
        {/* <Text>Profile Screen</Text> */}
      </View>
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

/*
1. Design. Button -> we dispatch something to the state -> we extract something from the state -> do something visually.
 */