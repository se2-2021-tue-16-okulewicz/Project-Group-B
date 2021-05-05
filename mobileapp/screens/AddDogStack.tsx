import { createStackNavigator } from '@react-navigation/stack';
import ImageUpload from '../components/helper/ImageUpload';
import * as React from "react";
import AddDetails from './AddDetails';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { State } from '../redux/reducer';
const inactiveColor="#919191";
const activeColor="#006ee6";


export default function AddDogStack({ navigation }: any) {
    const Stack = createStackNavigator();
    const image = useSelector((state: State) => state.image);
    const [isImageChosen, setImageChosen] = React.useState(false);

    React.useEffect(() => {
        setImageChosen(image !== "")
    },[image])
   

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
            <Next imageChosen={isImageChosen} onPress={() => navigation.navigate("Add details")}/>
        )
      })}
      />
      <Stack.Screen name="Add details" component={AddDetails} 
      options={({navigation}) => ({
        headerLeft: () => (
            <Previous onPress={() => navigation.pop()}/>
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
            <TouchableOpacity disabled={!props.imageChosen} onPress={props.onPress}>
                <FontAwesomeIcon icon={faChevronRight} size={25} color={props.imageChosen ? activeColor : inactiveColor}></FontAwesomeIcon>
            </TouchableOpacity>
        </View>
    );
}