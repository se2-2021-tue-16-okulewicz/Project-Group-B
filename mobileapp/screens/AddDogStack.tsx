import { createStackNavigator } from '@react-navigation/stack';
import ImageUpload from '../components/helper/ImageUpload';
import * as React from "react";
import AddDetails from './AddDetails';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { State } from '../redux/reducer';
import { IDogCharacteristics } from '../components/dogs/dog/dogInterfaces';
import { initLostDogCharacteristics } from '../components/dogs/dog/dogClasses';
const inactiveColor="#919191";
const activeColor="#006ee6";


export default function AddDogStack({ navigation }: any) {
    const Stack = createStackNavigator();
    const image = useSelector((state: State) => state.image);
    const dogCharacteristics = useSelector((state: State) => state.dogCharacteristics);
    const [isImageChosen, setImageChosen] = React.useState(false);
    const [isCharacteristicsInput, setCharacteristicsInput] = React.useState(false);

    React.useEffect(() => {
        setImageChosen(image !== "")
    },[image])

    React.useEffect(() => {
        setCharacteristicsInput(areValidCharacteristics(dogCharacteristics));
    },[dogCharacteristics])
   
    function areValidCharacteristics(ch: IDogCharacteristics){
        return (ch.name != initLostDogCharacteristics.name && ch.breed != initLostDogCharacteristics.breed && ch.color != initLostDogCharacteristics.color
          && ch.size != initLostDogCharacteristics.size && ch.hairLength != initLostDogCharacteristics.hairLength && ch.tailLength != initLostDogCharacteristics.hairLength 
          && ch.tailLength != initLostDogCharacteristics.tailLength && ch.earsType != initLostDogCharacteristics.earsType && ch.specialMark != initLostDogCharacteristics.specialMark
          && ch.behaviors != initLostDogCharacteristics.behaviors);
      }

  return (
    <Stack.Navigator
      initialRouteName="Choose photo"
    >
      <Stack.Screen name="Choose photo" component={ImageUpload} 
      options={({ navigation }) => ({
        headerLeft: () => (
          <Exit/>
        ),
        headerRight: () => (
            <Next imageChosen={isImageChosen} onPress={() => navigation.navigate("Dog characteristics")}/>
        )
      })}
      />
      <Stack.Screen name="Dog characteristics" component={AddDetails} 
      options={({navigation}) => ({
        headerLeft: () => (
            <Previous onPress={() => navigation.pop()}/>
          ),
          headerRight: () => (
            <Next imageChosen={isCharacteristicsInput} onPress={() => navigation.navigate("Location and date")}/>
        )
      })}
      />
    </Stack.Navigator>
  );
}

function Exit(){
    return(
        <View>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faTimes} size={25} ></FontAwesomeIcon>
            </TouchableOpacity>
        </View>
    );
}

function Previous(props: any){
    return(
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <FontAwesomeIcon icon={faChevronLeft} size={25} color={activeColor}></FontAwesomeIcon>
            </TouchableOpacity>
        </View>
    );
}

const Next = (props: any) => {

    return(
        <View>
            <TouchableOpacity disabled={props.isImageChosen} onPress={props.onPress}>
                <FontAwesomeIcon icon={faChevronRight} size={25} color={props.imageChosen ? activeColor : inactiveColor}></FontAwesomeIcon>
            </TouchableOpacity>
        </View>
    );
}