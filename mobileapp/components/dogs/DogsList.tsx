import * as React from "react";
import { View, StatusBar, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "../../redux/store";
import { ILostDog, ILostDogWithPicture } from "./dog/dogInterfaces";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducer";
import * as Actions from "../../redux/actions";

export default function DogsList({ navigation }: any) {
  const Stack = createStackNavigator();
  const state = store.getState();
  const dogsList = useSelector((state: State) => state.dogs as ILostDogWithPicture[]);
  const isLoading = useSelector((state: State) => state.loading);
  const cookies = useSelector((state: State) => state.loginInformation?.token);


  React.useEffect(() => {
    store.dispatch(Actions.fetchDogsThunk({cookies}));
  });

  const renderListItem = (dog: ILostDogWithPicture, navigation: any) => (
    <View style={styles.item} > 
      <TouchableOpacity >
        <Text style={styles.title}>{dog.name}</Text>
        <img
            src={`data:${dog.picture.fileType};base64,${
              dog.picture.data as ArrayBuffer
            }`}
            alt={dog.picture.fileName}
          />
      </TouchableOpacity>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.container}>
  { isLoading ? <Text>Loading...</Text> :
      <View>
        <Text>Displaying {dogsList.length} dogs</Text>
        
         <FlatList 
          data={dogsList.length > 0 ? dogsList.slice(0, dogsList.length) : []}
          renderItem={({ item }) => renderListItem(item, navigation)}
          keyExtractor={(item) => item.name} /> 
      </View>}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#00bfff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  flag: {
    height: 64,
    width: 64
  },
});
