import { createStackNavigator } from "@react-navigation/stack";
import ImageUpload from "../components/helper/ImageUpload";
import * as React from "react";
import AddDetails from "./AddDetails";
import ReviewAndPost from "./ReviewAndPost";
import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTimes,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { State } from "../redux/reducer";
import {
  IDogCharacteristics,
  IDogDetails,
  ILostDog,
} from "../components/dogs/dog/dogInterfaces";
import {
  initDogDetails,
  initLostDogCharacteristics,
} from "../components/dogs/dog/dogClasses";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import { store } from "../redux/store";
import * as Actions from "../redux/actions";
import DogsList from "../components/dogs/DogsList";
import DogDetails from "./DogDetails";
const inactiveColor = "#919191";
const activeColor = "#006ee6";

function convertDate(inputFormat: string) {
  function pad(s: any) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

export default function DogsStack({ navigation }: any) {
  const Stack = createStackNavigator();
  const Authorization = useSelector(
    (state: State) => state.loginInformation?.token
  );
  const image = useSelector((state: State) => state.image);
  const picture = useSelector((state: State) => state.picture);
  const dogCharacteristics = useSelector(
    (state: State) => state.dogCharacteristics
  );
  const dogDetails = useSelector((state: State) => state.dogDetails);
  const loginInfo = useSelector((state: State) => state.loginInformation);
  const [isImageChosen, setImageChosen] = React.useState(false);
  const [isCharacteristicsInput, setCharacteristicsInput] =
    React.useState(false);
  const [isDetailsInput, setDetailsInput] = React.useState(false);

  

  return (
    <Stack.Navigator initialRouteName="Lost dogs">
      <Stack.Screen
        name="Lost dogs"
        component={DogsList}
        options={({ navigation }) => ({
            headerLeft: () => null,
            
          })}
      />
      <Stack.Screen
        name="Dog details"
        component={DogDetails}
       
      />
    </Stack.Navigator>
  );
}

