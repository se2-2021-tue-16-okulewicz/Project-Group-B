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
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "../../redux/store";
import { ILostDog, ILostDogWithPicture } from "./dog/dogInterfaces";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducer";
import * as Actions from "../../redux/actions";
import config from "../../config/config";
import { useState } from "react";
import Filters from "../helper/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSlidersH, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  IFilters,
  IFilterSort,
  initFilterProps,
} from "../helper/filtersInterface";

export default function DogsList({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const bg = require("../../assets/images/dog-bg.png");
  const pin = require("../../assets/images/pin.png");
  const image = { uri: "../../assets/images/dog-bg.PNG" };
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
  // const [filters, setFilters] = useState<IFilterSort>({
  //   page: config.defaultFilters.page,
  //   size: config.defaultFilters.size,
  // });
  const dogFilters = useSelector((state: State) => state.filters);
  const [filters, setFilters] = useState<IFilterSort>(dogFilters);

  const id = useSelector((state: State) => state.loginInformation?.id);
  const [myDogs, setMyDogs] = useState<ILostDogWithPicture[]>([]);

  //Fetching cars at the beginning
  React.useEffect(() => {
    if (refreshRequired) {
      // fetch and append page 0
      store.dispatch(
        Actions.fetchDogsThunk({
          filters: {
            ...dogFilters,
            page: config.defaultFilters.page,
          },
          Authorization: Authorization,
        }) //filters
      );
      //set page number to 0
      setFilters({ ...filters, page: config.defaultFilters.page });
    } // eslint-disable-next-line
    let tmp = dogsList;
    setMyDogs(dogsList);
    //setMyDogs(tmp.filter((dog) => dog.ownerId == id));
  }, [refreshRequired]);

  React.useEffect(() => {
    let tmp = dogsList;
    setMyDogs(dogsList);
    //setMyDogs(tmp.filter((dog) => dog.ownerId == id));
  }, [dogsList]);
  /**
   * Is invoked after reaching bottom of the page.
   * Fetches next page and increments page number
   */
  const fetchMore = () => {
    store.dispatch(
      Actions.fetchDogsThunk({
        filters: { ...dogFilters, page: filters.page + 1 },
        Authorization: Authorization,
      }) //filters
    );
    setFilters({ ...dogFilters, page: filters.page + 1 });
  };

  function markDogAsFound(id: number) {
    store.dispatch(
      Actions.markLostDogAsFoundThunk({
        Authorization: Authorization,
        dogID: id,
      })
    );
  }

  function resetFilters() {
    store.dispatch(Actions.setFilters(initFilterProps));
  }

  function handleApply() {
    setModalVisible(false);
    store.dispatch(Actions.setDogsRequireRefresh(true));
  }

  const renderListItem = (dog: ILostDogWithPicture, navigation: any) => (
    <View style={[styles.item]}>
      <TouchableOpacity>
        <Text style={styles.title}>{dog.name}</Text>
        <View style={[{ flexDirection: "row" }]}>
          <View style={{ flex: 5 }}>
            <Image
              style={styles.picture}
              source={{
                uri: `data:${dog.picture.fileType};base64,${
                  dog.picture.data as ArrayBuffer
                }`,
              }}
              //source={{uri: dog.picture.uri}}
            />
          </View>
          <View style={{ flex: 2 }}>
            {!dog.isFound ? (
              dog.ownerId !== id ? (
                <Text style={styles.lostNotOwner}>Lost</Text>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#006ee6",
                    borderRadius: 10,
                    padding: 4,
                    shadowOffset: { width: 1, height: 2 },
                    shadowColor: "black",
                    shadowOpacity: 0.5,
                  }}
                  onPress={() => markDogAsFound(dog.id)}
                >
                  <Text style={styles.lost}>Claim found</Text>
                </TouchableOpacity>
              )
            ) : (
              <Text style={styles.found}>Found</Text>
            )}
          </View>
        </View>

        <View style={styles.row}>
          <Image style={styles.tinyLogo} source={pin} />
          <Text style={styles.subtitle}>{dog.location.city}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} style={styles.image}>
        <Modal
          visible={modalVisible}
          style={styles.bottomModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={[styles.centeredView, styles.dimBG]}>
            <View style={styles.modalView}>
              <View style={{ flex: 1, flexDirection: "row", marginBottom: 25 }}>
                <TouchableOpacity
                  style={{ marginLeft: "95%" }}
                  onPress={() => setModalVisible(false)}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    size={25}
                    style={{ flex: 2 }}
                    color="#e3e3e3"
                  ></FontAwesomeIcon>
                </TouchableOpacity>
              </View>
              <Filters></Filters>
              <View style={[{ flexDirection: "row" }]}>
                <TouchableOpacity
                  style={[
                    styles.modalButtonReset,
                    { flex: 1 },
                    { margin: "5%" },
                  ]}
                  onPress={() => resetFilters()}
                >
                  <Text style={[styles.textStyle, { color: "grey" }]}>
                    Reset
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButtonApply,
                    { flex: 1 },
                    { margin: "5%" },
                  ]}
                  onPress={() => handleApply()}
                >
                  <Text style={styles.textStyle}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ backgroundColor: "white", width: "100%", padding: 10 }}>
          <TouchableOpacity
            style={[{ flexDirection: "row" }]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                color: "#006ee6",
                alignSelf: "center",
                fontSize: 20,
                flex: 5,
              }}
            >
              Configure filters
            </Text>
            <FontAwesomeIcon
              icon={faSlidersH}
              size={25}
              style={{ flex: 2 }}
              color="#006ee6"
            ></FontAwesomeIcon>
          </TouchableOpacity>
        </View>
        <FlatList
          data={myDogs.length > 0 ? myDogs.slice(0, myDogs.length) : []}
          renderItem={({ item }) => renderListItem(item, navigation)}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={fetchMore}
        />
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <View></View>
        )}
        <View style={{ backgroundColor: "white", width: "100%" }}>
          <Text style={{ color: "#006ee6", alignSelf: "center" }}>
            Displaying {myDogs.length} dogs
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "flex-start",
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
    borderRadius: 5,
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
    width: "100%",
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
  lostNotOwner: {
    marginLeft: "33%",
    color: "grey",
  },
  lost: {
    marginLeft: "33%",
    color: "white",
    fontSize: 12,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    height: "75%",
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 0,
    marginTop: "50%",
    height: "100%",
    paddingBottom: "50%",
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120,
  },
  modalButtonReset: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120,
    backgroundColor: "#e3e3e3",
  },
  modalButtonApply: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120,
    backgroundColor: "#006ee6",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "red",
  },
  dimBG: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
