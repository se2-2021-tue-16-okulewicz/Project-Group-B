import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./SignIn";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducer";

export default function LogInRegister({ navigation }: any) {
  const Stack = createStackNavigator();
  const loginInfo = useSelector((state: State) => state.loginInformation);
  React.useEffect(() => {
    if (loginInfo != null && loginInfo.userType == "Regular") {
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
