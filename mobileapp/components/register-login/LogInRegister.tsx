import * as React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./SignIn";
import Register from "./Register";
import store from "../../redux/store";
import { useSelector } from "react-redux";
import * as Actions from "../../redux/actions";

export default function LogInRegister({ navigation }: any) {
  const Stack = createStackNavigator();
  const state = store.getState();
  const status = useSelector((state) => state.status);
  React.useEffect(() => {
    if (status === "redirectToCars") {
      store.dispatch(Actions.setIdle());
      navigation.push("Root");
    }
  }, [status]);
  return (
    <Stack.Navigator
      initialRouteName="Log in"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sign in" component={SignIn}></Stack.Screen>
    </Stack.Navigator>
  );
}
