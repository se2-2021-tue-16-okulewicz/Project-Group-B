import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./SignIn";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducer";
import { ILostDogWithPicture } from "../dogs/dog/dogInterfaces";
import { store } from "../../redux/store";
import * as Actions from "../../redux/actions";

export default function LogInRegister({ navigation }: any) {
  const Stack = createStackNavigator();
  const loginInfo = useSelector((state: State) => state.loginInformation);
  const loadingdogs = useSelector((state: State) => state.loadingDogs);
  const loading = useSelector((state: State) => state.loading);
  const dogsList = useSelector((state: State) => state.dogs as ILostDogWithPicture[]);
  const cookies = useSelector((state: State) => state.loginInformation?.token);
  const refreshRequired = useSelector((state: State) => state.dogsRequireRefresh);
  return (
    <Stack.Navigator
      initialRouteName="Sign in"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sign in" component={SignIn} initialParams={navigation}></Stack.Screen>
    </Stack.Navigator>
  );
}
