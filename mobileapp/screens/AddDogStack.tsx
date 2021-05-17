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
const inactiveColor="#919191";
const activeColor="#006ee6";

function convertDate(inputFormat: string) {
    function pad(s: any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

export default function AddDogStack({ navigation }: any) {
    const Stack = createStackNavigator();
    const Authorization = useSelector(
        (state: State) => state.loginInformation?.token
      );
    const image = useSelector((state: State) => state.image);
    const picture = useSelector((state: State) => state.picture);
    const dogCharacteristics = useSelector((state: State) => state.dogCharacteristics);
    const dogDetails = useSelector((state: State) => state.dogDetails);
    const loginInfo = useSelector((state: State) => state.loginInformation);
    const [isImageChosen, setImageChosen] = React.useState(false);
    const [isCharacteristicsInput, setCharacteristicsInput] = React.useState(false);
    const [isDetailsInput, setDetailsInput] = React.useState(false);

    React.useEffect(() => {
        setImageChosen(image !== "")
    },[image])

    React.useEffect(() => {
        setCharacteristicsInput(areValidCharacteristics(dogCharacteristics));
    },[dogCharacteristics])
    React.useEffect(() => {
        setDetailsInput(areValidDetails(dogDetails));
    },[dogDetails])
   
    function areValidDetails(ch: IDogDetails){
        return (ch.location !== initDogDetails.location);
      }
    function areValidCharacteristics(ch: IDogCharacteristics){
        return (ch.name !== initLostDogCharacteristics.name && ch.breed !== initLostDogCharacteristics.breed && ch.color !== initLostDogCharacteristics.color
          && ch.size !== initLostDogCharacteristics.size && ch.hairLength !== initLostDogCharacteristics.hairLength && ch.tailLength !== initLostDogCharacteristics.hairLength 
          && ch.tailLength !== initLostDogCharacteristics.tailLength && ch.earsType !== initLostDogCharacteristics.earsType && ch.specialMark !== initLostDogCharacteristics.specialMark
          && ch.behaviors !== initLostDogCharacteristics.behaviors);
      }
      function onExit(){
          store.dispatch(Actions.setImage(""));
          store.dispatch(Actions.setDogCharacteristics(initLostDogCharacteristics));
          store.dispatch(Actions.setDogDetails(initDogDetails));
      }


      function publishDog(){

          store.dispatch(Actions.addDogThunk({
            dog: {
                ownerId: loginInfo?.id,
                isFound: false,
                dateLost: convertDate(dogDetails.dateLost),
                name: dogCharacteristics.name,
                breed: dogCharacteristics.breed,
                age: dogCharacteristics.age,
                hairLength: dogCharacteristics.hairLength,
                color: dogCharacteristics.color,
                size: dogCharacteristics.size,
                earsType: dogCharacteristics.earsType,
                tailLength: dogCharacteristics.tailLength,
                specialMark: dogCharacteristics.specialMark,
                behaviors: dogCharacteristics.behaviors,
                location: dogDetails.location
            },
            picture: {
                id: picture.id,
                fileName: picture.fileName,
                fileType: picture.fileType,
                uri: image 
            },
            Authorization: Authorization,
          }))
        
        //onExit();
      }

  return (
    <Stack.Navigator initialRouteName="Choose photo">
      <Stack.Screen
        name="Choose photo"
        component={ImageUpload}
        options={({ navigation }) => ({
          headerLeft: () => <Exit onPress={() => onExit()} />,
          headerRight: () => (
            <Next
              enabled={isImageChosen}
              onPress={() => navigation.navigate("Dog characteristics")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Dog characteristics"
        component={AddDetails}
        options={({ navigation }) => ({
          headerLeft: () => <Previous onPress={() => navigation.pop()} />,
          headerRight: () => (
            <Next
              enabled={isCharacteristicsInput}
              onPress={() => navigation.navigate("Review and post")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Review and post"
        component={ReviewAndPost}
        options={({ navigation }) => ({
          headerLeft: () => <Previous onPress={() => navigation.pop()} />,
          headerRight: () => (
            <Post enabled={isDetailsInput} onPress={() => {publishDog(); navigation.popToTop(); navigation.navigate("Dogs"); onExit() }}/>
        )
      })}
      />
    </Stack.Navigator>
  );
}

function Exit(props: any) {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <FontAwesomeIcon icon={faTimes} size={25}></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  );
}

function Previous(props: any) {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size={25}
          color={activeColor}
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  );
}

const Next = (props: any) => {
  return (
    <View>
      <TouchableOpacity disabled={!props.enabled} onPress={props.onPress}>
        <FontAwesomeIcon
          icon={faChevronRight}
          size={25}
          color={props.enabled ? activeColor : inactiveColor}
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </View>
  );
};



const Post= (props: any) => {

    return(
        <View >
            <TouchableOpacity disabled={!(props.enabled)} onPress={props.onPress}>
            <Text style={props.enabled ? { fontSize: 16, color: activeColor} : { fontSize: 15, color: inactiveColor}}>Post</Text>
            </TouchableOpacity>
        </View>
    );
}
