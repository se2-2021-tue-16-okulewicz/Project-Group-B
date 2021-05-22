import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import LogInRegister from "../components/register-login/LogInRegister";
import { RootStackParamList } from "../types";
import BottomTab from "./TabNavigator";
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogInRegister" component={LogInRegister} />

      <Stack.Screen name="Root" component={BottomTab} />
    </Stack.Navigator>
  );
}
