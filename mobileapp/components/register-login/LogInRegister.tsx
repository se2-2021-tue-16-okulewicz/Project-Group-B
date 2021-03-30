import * as React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./SignIn";
import Register from "./Register";
import {store} from "../../redux/store";
import { useSelector } from "react-redux";
import * as Actions from "../../redux/actions";
import { State } from "../../redux/reducer";

export default function LogInRegister({ navigation }: any) {
  const Stack = createStackNavigator();
  const loginInfo = useSelector((state: State) => state.loginInformation);
  React.useEffect(() => {
    if (loginInfo != null) {
      console.log("Logged in");
      navigation.push("DogList");
    }
  }, [loginInfo]);
  return (
    <Stack.Navigator
      initialRouteName="Sign in"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sign in" component={SignIn}></Stack.Screen>
    </Stack.Navigator>
  );
}
