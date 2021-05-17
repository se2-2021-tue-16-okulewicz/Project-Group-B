import AddDogScreen from "./screens/AddDogScreen";
import DogsScreen from "./screens/DogsScreen";
import ProfileScreen from "./screens/ProfileScreen";

export type RootStackParamList = {
  Root: any;
  NotFound: undefined;
  LogInRegister: any;
  DogsList: any;
};

export type BottomTabParamList = {
  Dogs: { screen: DogsScreen };
  AddDog: { screen: AddDogScreen };
  Profile: { screen: ProfileScreen };
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
