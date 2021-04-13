import * as React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "../../redux/store";
import { ILostDog, ILostDogWithPicture } from "./dog/dogInterfaces";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducer";
import * as Actions from "../../redux/actions";
import config from "../../config/config";
import { useState } from "react";

export default function DogsList({ navigation }: any) {
  const Stack = createStackNavigator();
  const state = store.getState();
  const dogsList = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const isLoading = useSelector((state: State) => state.loadingDogs);
  const cookies = useSelector((state: State) => state.loginInformation?.token);
  const refreshRequired = useSelector(
    (state: State) => state.dogsRequireRefresh
  );
  const [filters, setFilters] = useState({
    page: config.defaultFilters.page,
    size: config.defaultFilters.size,
  });
  const id = useSelector((state: State) => state.loginInformation?.id);
  const [myDogs, setMyDogs] = useState<ILostDogWithPicture[]>([]);

  //Fetching cars at the beginning
  React.useEffect(() => {
    if (refreshRequired) {
      // fetch and append page 0
      store.dispatch(
        Actions.fetchDogsThunk({
          filters: {
            ...filters,
            page: config.defaultFilters.page,
          },
          cookies: cookies,
        }) //filters
      );
      //set page number to 0
      setFilters({ ...filters, page: config.defaultFilters.page });
    } // eslint-disable-next-line
    let tmp = dogsList;
    setMyDogs(tmp.filter((dog) => dog.ownerId == id) );
  }, [refreshRequired]);

  React.useEffect(() => {
    let tmp = dogsList;
    setMyDogs(tmp.filter((dog) => dog.ownerId == id) );
  },[dogsList])
  /**
   * Is invoked after reaching bottom of the page.
   * Fetches next page and increments page number
   */
  const fetchMore = () => {
    store.dispatch(
      Actions.fetchDogsThunk({
        filters: { ...filters, page: filters.page + 1 },
        cookies: cookies,
      }) //filters
    );
    setFilters({ ...filters, page: filters.page + 1 });
  };

  const renderListItem = (dog: ILostDogWithPicture, navigation: any) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <Text style={styles.title}>{dog.name}</Text>
        <View style={styles.rowP}>
        <Image
          style={styles.picture}
          source={{
            uri: `data:${dog.picture.fileType};base64,${
              dog.picture.data as ArrayBuffer
            }`,
          }}
        />
        <TouchableOpacity >
          <Text style={styles.right}>Mark as found</Text>
        </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/images/pin.png")}
          />
          <Text style={styles.subtitle}>{dog.location.city}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>Displaying {myDogs.length} dogs</Text>

          <FlatList
            data={myDogs.length > 0 ? myDogs.slice(0, myDogs.length) : []}
            renderItem={({ item }) => renderListItem(item, navigation)}
            keyExtractor={(item) => item.name}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  searchBar: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#eeeeee",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  picture: {
    marginRight:50,
    height: 80,
    width: 80,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: "italic",
  },
  tinyLogo: {
    width: 15,
    height: 15,
  },
  row: {
    marginTop: 4,
    paddingLeft: 8,
    width: 100,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowP: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    alignItems: 'baseline'

  },
  right:{
    marginLeft: 50
  }
});
