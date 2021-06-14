import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import LogOut from "../components/profile/LogOut";
import navigation from "../navigation";
import { State } from "../redux/reducer";

export default function ProfileScreen({navigation}: any) {
  const loginInfo = useSelector((state: State) => state.loginInformation);
  useEffect(() => {
    if(loginInfo === null){
      navigation.navigate("LogInRegister");
    }
  },[loginInfo])
  
    return (
      <View style={styles.container}>
        {/* <Text>Hello!</Text> */}
        <LogOut></LogOut>
        {/* <Text>Profile Screen</Text> */}
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: "10%"
  },
});

/*
1. Design. Button -> we dispatch something to the state -> we extract something from the state -> do something visually.
 */