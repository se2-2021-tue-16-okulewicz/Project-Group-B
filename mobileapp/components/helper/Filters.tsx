import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { store } from "../../redux/store";
import * as Actions from "../../redux/actions";
import { IPicture, Picture } from "../dogs/dog/dogInterfaces";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  filterTypes,
  IFilterSort,
  initFilterProps,
  initTypeOfDogFilter,
  ISort,
  sortDirectionTypes,
  sortTypes,
  TypeOfDogFilter,
} from "./filtersInterface";
import DropDownInput from "../../screens/dropDownInput";
import * as dogArrays from "../dogs/dog/dogArrays";
import * as dogEnums from "../dogs/dog/dogEnums";
import { CheckBox } from "react-native-elements";

export default function Filters(props: any) {
  const dogFilters = useSelector((state: State) => state.filters);

  const [filters, setFilters] = useState<IFilterSort>(dogFilters);

  const [filter, setFilter] = useState<filterTypes | undefined>(
    dogFilters.filter
  );
  const [sort, setSort] = useState<ISort>(parseSort(filters.sort));
  const [dogType, setDogType] = useState<TypeOfDogFilter>(
    parseDogType(filters.filter?.isFound)
  );

  function parseSort(sort: string) {
    if (sort === ",") {
      return { type: new String(), direction: new String() } as ISort;
    }
    var res = sort.split(",");
    return { type: res[0], direction: res[1] } as ISort;
  }

  function parseDogType(found: boolean | null | undefined) {
    var ret;
    if (found === null) {
      return { lost: true, found: true } as TypeOfDogFilter;
    } else {
      if (found) {
        return { lost: false, found: true } as TypeOfDogFilter;
      } else {
        return { lost: true, found: false } as TypeOfDogFilter;
      }
    }
  }
  function handleDogTypeChange({ name, value }: any) {
    let newDogType = { ...dogType, [name as string]: value };
    setDogType(newDogType as TypeOfDogFilter);
    let tmpDogType;
    if (
      (newDogType.found && newDogType.lost) ||
      (!newDogType.found && !newDogType.lost)
    ) {
      let newFilters = { ...filters, filter: { ...filter, isFound: null } };
      setFilters(newFilters as IFilterSort);
      store.dispatch(Actions.setFilters(newFilters as IFilterSort));
    } else if (newDogType.found && !newDogType.lost) {
      let newFilters = { ...filters, filter: { ...filter, isFound: true } };
      setFilters(newFilters as IFilterSort);
      store.dispatch(Actions.setFilters(newFilters as IFilterSort));
    } else if (!newDogType.found && newDogType.lost) {
      let newFilters = { ...filters, filter: { ...filter, isFound: false } };
      setFilters(newFilters as IFilterSort);
      store.dispatch(Actions.setFilters(newFilters as IFilterSort));
    }
  }

  function handleSortChange({ name, value }: any) {
    let newSort = { ...sort, [name as string]: value };
    setSort(newSort as ISort);
    let tmpSort = sort.type + "," + sort.direction;
    let newFilters = { ...filters, sort: tmpSort };
    setFilters(newFilters as IFilterSort);
    store.dispatch(Actions.setFilters(newFilters as IFilterSort));
  }
  function handleFilterChange({ name, value }: any) {
    let newFilter = { ...filter, [name as string]: value };
    setFilter(newFilter as filterTypes);
    let newFilters = { ...filters, filter: newFilter };
    setFilters(newFilters as IFilterSort);
    store.dispatch(Actions.setFilters(newFilters as IFilterSort));
    //validateFields(newCharacteristics);
  }

  useEffect(() => {
    setFilters(dogFilters);
    setFilter(filters.filter);
    if (dogFilters.sort == ",") {
      setSort(parseSort(filters.sort));
    }
    if (dogFilters.filter?.isFound === null) {
      setDogType(parseDogType(null));
    }
    //setSort(parseSort(filters.sort))
  }, [dogFilters, filters, filter]);

  return (
    <ScrollView
      style={{ width: "100%" }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          marginLeft: "1%",
          color: "grey",
        }}
      >
        SORT
      </Text>
      <DropDownInput
        data={sortTypes}
        placeholder="Sort by"
        value={sort.type}
        onValueChange={(el: dogEnums.SizeTypes) => {
          handleSortChange({ name: "type", value: el });
        }}
        filter={true}
      />

      <DropDownInput
        data={sortDirectionTypes}
        placeholder="Direction"
        value={sort.direction}
        onValueChange={(el: dogEnums.SizeTypes) => {
          handleSortChange({ name: "direction", value: el });
        }}
        filter={true}
      />
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          marginLeft: "1%",
          color: "grey",
        }}
      >
        FILTER
      </Text>
      <View style={{ width: "100%", marginBottom: 5 }}>
        <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>
          Name
        </Text>
        <TextInput
          editable
          defaultValue={filter?.name}
          placeholder="Name"
          style={styles.input}
          onChangeText={(value) =>
            handleFilterChange({ name: "name", value: value })
          }
        ></TextInput>
      </View>

      <View style={{ width: "100%", marginBottom: 5 }}>
        <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>
          City
        </Text>
        <TextInput
          editable
          defaultValue={filter?.location_city}
          placeholder="City"
          style={styles.input}
          onChangeText={(value) =>
            handleFilterChange({ name: "location_city", value: value })
          }
        ></TextInput>
      </View>

      <View style={{ width: "100%", marginBottom: 5 }}>
        <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>
          District
        </Text>
        <TextInput
          editable
          defaultValue={filter?.location_district}
          placeholder="District"
          style={styles.input}
          onChangeText={(value) =>
            handleFilterChange({ name: "location_district", value: value })
          }
        ></TextInput>
      </View>
      <DropDownInput
        data={dogArrays.BreedTypes}
        placeholder="Breed"
        value={filter?.breed}
        onValueChange={(el: dogEnums.BreedTypes) =>
          handleFilterChange({ name: "breed", value: el })
        }
        filter={true}
      />

      <DropDownInput
        data={dogArrays.ColorTypes}
        placeholder="Color"
        value={filter?.color}
        onValueChange={(el: dogEnums.ColorTypes) => {
          handleFilterChange({ name: "color", value: el });
        }}
        filter={true}
      />

      <DropDownInput
        data={dogArrays.SizeTypes}
        placeholder="Size"
        value={filter?.size}
        onValueChange={(el: dogEnums.SizeTypes) => {
          handleFilterChange({ name: "size", value: el });
        }}
        filter={true}
      />

      <View style={{ flexDirection: "row" }}>
        <CheckBox
          checked={dogType.lost}
          onPress={() =>
            handleDogTypeChange({ name: "lost", value: !dogType.lost })
          }
        ></CheckBox>
        <Text
          style={{
            fontSize: 15,
            marginLeft: "1%",
            color: "#006aff",
            alignSelf: "center",
          }}
        >
          Lost dogs
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <CheckBox
          checked={dogType.found}
          onPress={() =>
            handleDogTypeChange({ name: "found", value: !dogType.found })
          }
        ></CheckBox>
        <Text
          style={{
            fontSize: 15,
            marginLeft: "1%",
            color: "#006aff",
            alignSelf: "center",
          }}
        >
          Found dogs
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  modalView: {
    width: "100%",
    backgroundColor: "#e3e3e3",
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
  input: {
    backgroundColor: "#ffffff",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "black",
    paddingRight: 8,
  },
  dimBG: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22,
  },
});
