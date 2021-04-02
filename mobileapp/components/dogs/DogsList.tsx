import * as React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {store} from "../../redux/store";

export default function DogsList({ navigation }: any) {
  const Stack = createStackNavigator();
  const state = store.getState();
  
  return (
    <View>
        <Text style={{textAlign: "center", paddingTop: 50}}>The dog list goes here!</Text>
    </View>
  );
}

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});