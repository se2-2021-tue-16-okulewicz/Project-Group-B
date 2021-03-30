import * as React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./SignIn";
import Register from "./Register";
import store from "../../redux/store";
import { useSelector } from "react-redux";
import * as Actions from "../../redux/actions";

export default function DogsList({ navigation }: any) {
  const Stack = createStackNavigator();
  const state = store.getState();
  const status = useSelector((state) => state.status);
  
  return (
    <View>
        <Text>The dog list goes here!</Text>
    </View>
  );
}