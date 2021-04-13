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
  const dogsList = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const cookies = useSelector((state: State) => state.loginInformation?.token);
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh
  );
  // React.useEffect(() => {

  //   if (loginInfo?.userType === "Regular") {

  //     //store.dispatch(Actions.fetchDogsThunk({cookies}));
  //     //navigation.push("DogsList");
  //     console.log(loginInfo?.token + " loading dogs: " + loadingdogs + " loading: " + loading + " refresh required: " + refreshRequired);
  //     //store.dispatch(Actions.fetchDogsThunk({cookies}));
  //   }
  // }, [loginInfo]);
  // React.useEffect(() => {
  //   console.log(loginInfo?.token);
  //   if(status == "redirectToDogsList"){
  //   //if (loginInfo !== null && loginInfo.userType == "Regular") {
  //     //store.dispatch(Actions.fetchDogsThunk({cookies}));
  //     navigation.push("DogsList");
  //   }
  //     //store.dispatch(Actions.fetchDogsThunk({cookies}));
  //  // }
  // }, [status, loginInfo]);
  return (
    <Stack.Navigator
      initialRouteName="Sign in"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Sign in"
        component={SignIn}
        initialParams={navigation}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
