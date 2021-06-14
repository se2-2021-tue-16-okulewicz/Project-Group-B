import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Button,
  FlatList,
} from "react-native";
//import Autocomplete from 'react-native-autocomplete-input';
import * as ImagePicker from "expo-image-picker";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { State } from "../redux/reducer";
import * as dogEnums from "../components/dogs/dog/dogArrays";
import * as dogTypes from "../components/dogs/dog/dogEnums";
import DropDownInput from "./dropDownInput";
import NumericInput from "react-native-numeric-input";
import {
  IDogCharacteristics,
  IDogDetails,
  ILostDogWithPicture,
  ILostDogWithPictureAndComments,
  ILostDogComment,
} from "../components/dogs/dog/dogInterfaces";
import { BehaviorsTypes } from "../components/dogs/dog/dogEnums";
import { store } from "../redux/store";
import * as Actions from "../redux/actions";
import { initLostDogCharacteristics } from "../components/dogs/dog/dogClasses";
import TextField from "./TextField";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { initDogDetails } from "../components/dogs/dog/dogClasses";
import Bubble from "./Bubble";

// import DatePicker from 'react-native-datepicker';

export default function DogDetails({ route, navigation }: any) {
  const { dog } = route.params;
  
  const Authorization = useSelector(
    (state: State) => state.loginInformation?.token
  );
  const [scroll, setScroll] = useState<boolean>(true);

  const isLoading = useSelector((state: State) => state.loading);

  const specificDog = useSelector(
    (state: State) => state.currentDog as ILostDogWithPictureAndComments
  );
  const [theDog, setTheDog] = useState<ILostDogWithPictureAndComments>();

  React.useEffect(() => {
    store.dispatch(
      Actions.GetDogDetailsThunk({
        Authorization: Authorization,
        dogID: dog.id,
      })
    );
    let tmp = specificDog;
    setTheDog(specificDog);
  }, [specificDog]);

  function convertDate(inputFormat: string) {
    function pad(s: any) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }

  const renderListItem = (
    comment: ILostDogComment,
    navigation: any
  ) => (
    <View style={[styles.item]}>
      <Text>{comment.authorId}</Text>
      <Text>{comment.text}</Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: "#ffffff", borderRadius: 5 }}>
      {/* <View style={{ marginBottom: "20%" }}></View> */}
      {/* <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> */}
      <ScrollView
        style={{ backgroundColor: "#f2f7ff", borderRadius: 5, padding: 10 }}
        scrollEnabled={scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView>
          <View style={[styles.row, { height: 300, padding: "1%" }]}>
            <View style={{ flex: 2, padding: 10 }}>
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 0 }}
                source={{
                  uri: `data:${dog.picture.fileType};base64,${dog.picture.data}`,
                }}
              />
            </View>
          </View>
          <TextField value={dog.location.city} placeholder="City" />
          <TextField value={dog.location.district} placeholder="District" />
          <TextField
            value={convertDate(dog.dateLost)}
            placeholder="Was lost on"
          />
          <View style={styles.row}>
            <View style={{ width: "62%", marginRight: "5%" }}>
              <TextField value={dog.name} placeholder="Name"></TextField>
            </View>

            <View style={{ width: "20%" }}>
              <TextField value={dog.age} placeholder="Age"></TextField>
            </View>
          </View>

          <TextField value={dog.breed} placeholder="Breed" />
          <TextField value={dog.color} placeholder="Color" />
          <TextField value={dog.size} placeholder="Size" />
          <TextField value={dog.hairLength} placeholder="Hair" />
          <TextField value={dog.tailLength} placeholder="Tail" />
          <TextField value={dog.earsType} placeholder="Ears" />
          <TextField value={dog.specialMark} placeholder="Special mark" />
          <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>
            Behaviour
          </Text>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {dog.behaviors.map((item: BehaviorsTypes) => {
              return (
                // <Text>{item}</Text>
                <Bubble
                  key={item}
                  isSelected={true}
                  item={item}
                  placeholder={item}
                ></Bubble>
              );
              //
            })}
          </View>
          <Text
            style={{
              fontSize: 15,
              marginTop: "4%",
              marginLeft: "1%",
              color: "#006aff",
            }}
          >
            Comments
          </Text>

          {/* <FlatList
          data={theDog.comments.length > 0 ? theDog.comments.slice(0, theDog.comments.length) : []}
          renderItem={({ item }) => renderListItem(item, navigation)}
          keyExtractor={(item) => item.id.toString()}
          /> */}

          <View style={{ marginBottom: "70%" }}></View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  input: {
    backgroundColor: "#fff",
    fontSize: 16,
    marginLeft: "1%",
    paddingTop: "1%",
    borderRadius: 7,
    color: "black",
    paddingRight: 30,
  },
  containerStyle: {
    padding: 5,
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#FAF7F6",
  },
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#FAF9F8",
    borderColor: "#bbb",
    borderWidth: 1,
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  itemTextStyle: {
    color: "#222",
  },
  itemsContainerStyle: {
    maxHeight: "60%",
  },
});
