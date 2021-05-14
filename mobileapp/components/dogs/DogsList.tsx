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
  ImageBackground,
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
  const image = {uri: "../../assets/images/dog-bg.PNG"}
  const Stack = createStackNavigator();
  const state = store.getState();
  const dogsList = useSelector(
    (state: State) => state.dogs as ILostDogWithPicture[]
  );
  const isLoading = useSelector((state: State) => state.loadingDogs);
  const Authorization = useSelector(
    (state: State) => state.loginInformation?.token
  );
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
          Authorization: Authorization,
        }) //filters
      );
      //set page number to 0
      setFilters({ ...filters, page: config.defaultFilters.page });
    } // eslint-disable-next-line
    let tmp = dogsList;
    setMyDogs(tmp.filter((dog) => dog.ownerId == id));
  }, [refreshRequired]);

  React.useEffect(() => {
    let tmp = dogsList;
    setMyDogs(tmp.filter((dog) => dog.ownerId == id));
  }, [dogsList]);
  /**
   * Is invoked after reaching bottom of the page.
   * Fetches next page and increments page number
   */
  const fetchMore = () => {
    store.dispatch(
      Actions.fetchDogsThunk({
        filters: { ...filters, page: filters.page + 1 },
        Authorization: Authorization,
      }) //filters
    );
    setFilters({ ...filters, page: filters.page + 1 });
  };

  function markDogAsFound(id: number) {
    store.dispatch(
      Actions.markLostDogAsFoundThunk({
        Authorization: Authorization,
        dogID: id,
      })
    );
  }

  const renderListItem = (dog: ILostDogWithPicture, navigation: any) => (
    <View style={[styles.item]}>
      <TouchableOpacity>
        <Text style={styles.title}>{dog.name}</Text>
        <View style={[{ flexDirection: "row" }]}>
          <Image
            style={styles.picture}
            source={{
              uri: `data:${dog.picture.fileType};base64,${
                dog.picture.data as ArrayBuffer
              }`,
            }}
          />
          {!dog.isFound ? (
            <TouchableOpacity onPress={() => markDogAsFound(dog.id)}>
              <Text style={styles.lost}>Mark as found</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.found}>Found</Text>
          )}
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
      <ImageBackground source={require('../../assets/images/dog-bg.png')} style={styles.image}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>Displaying dogs: {myDogs.length}</Text>

          <FlatList
            data={myDogs.length > 0 ? myDogs.slice(0, myDogs.length) : []}
            renderItem={({ item }) => renderListItem(item, navigation)}
            keyExtractor={(item) => item.name}
          />
        </View>
      )}
      </ImageBackground>
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
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 24,
  },
  picture: {
    marginRight: 50,
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%"
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    textAlignVertical: "center",
  },
  right: {
    // marginLeft: 50,
  },
  found: {
    marginLeft: "33%",
    color: "green",
  },
  lost: {
    marginLeft: "37%",
  },
});
