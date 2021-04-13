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
  //const [dogsList, setDogsList] = React.useState<ILostDogWithPicture[]>([])
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
  }, [refreshRequired]);

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
  // React.useEffect(() => {
  //   console.log("fetch dogs!");
  //   store.dispatch(Actions.fetchDogsThunk({cookies}));
  // }, [dogsList]);

  const renderListItem = (dog: ILostDogWithPicture, navigation: any) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <Text style={styles.title}>{dog.name}</Text>
        <Image
          style={styles.flag}
          source={{
            uri: `data:${dog.picture.fileType};base64,${
              dog.picture.data as ArrayBuffer
            }`,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  // return (
  //   <Text>List of dogs!</Text>
  // );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>Displaying {dogsList.length} dogs</Text>

          <FlatList
            data={dogsList.length > 0 ? dogsList.slice(0, dogsList.length) : []}
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
    backgroundColor: "#efefef",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  flag: {
    height: 64,
    width: 64,
  },
});
