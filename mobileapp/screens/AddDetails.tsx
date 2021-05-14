import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
//import Autocomplete from 'react-native-autocomplete-input';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { State } from '../redux/reducer';
import * as dogEnums from "../components/dogs/dog/dogArrays";
import * as dogTypes from "../components/dogs/dog/dogEnums"
import DropDownInput from "./dropDownInput";
import NumericInput from 'react-native-numeric-input'
import { IDogCharacteristics } from '../components/dogs/dog/dogInterfaces';
import { BehaviorsTypes } from '../components/dogs/dog/dogEnums';
import { store } from '../redux/store';
import * as Actions from "../redux/actions";
import {initLostDogCharacteristics}  from "../components/dogs/dog/dogClasses";

export default function AddDetails() {
  const image = useSelector((state: State) => state.image);
  const dogCharacteristics = useSelector((state: State) => state.dogCharacteristics);
  const [scroll, setScroll] = useState<boolean>(true);
  const [characteristics, setCharacteristics] = useState<IDogCharacteristics>(dogCharacteristics);

  

  function areValidCharacteristics(ch: IDogCharacteristics){
    return (ch.name != initLostDogCharacteristics.name && ch.breed != initLostDogCharacteristics.breed && ch.color != initLostDogCharacteristics.color
      && ch.size != initLostDogCharacteristics.size && ch.hairLength != initLostDogCharacteristics.hairLength && ch.tailLength != initLostDogCharacteristics.hairLength 
      && ch.tailLength != initLostDogCharacteristics.tailLength && ch.earsType != initLostDogCharacteristics.earsType && ch.specialMark != initLostDogCharacteristics.specialMark
      && ch.behaviors != initLostDogCharacteristics.behaviors);
  }
  function validateFields(){
    if(areValidCharacteristics(characteristics)){
      store.dispatch(Actions.setDogCharacteristics(characteristics));
    }
  }

  function handleChange({name, value}: any){
    let newCharacteristics = {...characteristics, [name as string]: value}
    setCharacteristics(newCharacteristics);
    validateFields();
  }

  return (
    <View style={{ padding: 7, backgroundColor: "#ffffff", borderRadius: 5 }}>
      {/* <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> */}
      <ScrollView style={{ backgroundColor: "#e8e9ed", borderRadius: 5, padding: 10 }}
        scrollEnabled={scroll}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView>
          <View style={styles.row}>
            <View style={{width:"62%", marginRight:"5%"}}>
              <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>Name</Text>
              <TextInput editable defaultValue={characteristics.name} placeholder="Name" style={styles.input} onChangeText={value => handleChange({name:"name",value:value})}></TextInput>
            </View>

            <View style={{width: "20%"}}>
              <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>Age</Text>
              <NumericInput value={characteristics.age} onChange={value => handleChange({name:"age",value:value})} minValue={0} maxValue={100} step={1} rounded={true} borderColor="#ffffff" />
            </View>
          </View>
          <View style={{ marginBottom: 7 }}></View>
          <DropDownInput data={dogEnums.BreedTypes} placeholder="Breed" value={characteristics.breed}
            onValueChange={(el: dogTypes.BreedTypes) => handleChange({name:"breed",value:el})} />

          <DropDownInput data={dogEnums.ColorTypes} placeholder="Color" value={characteristics.color}
            onValueChange={(el: dogTypes.ColorTypes) => { handleChange({name:"color",value:el}) }} />

          <DropDownInput data={dogEnums.SizeTypes} placeholder="Size" value={characteristics.size}
            onValueChange={(el: dogTypes.SizeTypes) => { handleChange({name:"size",value:el}) }} />

          <DropDownInput data={dogEnums.HairTypes} placeholder="Hair" value={characteristics.hairLength}
            onValueChange={(el: dogTypes.HairTypes) => { handleChange({name:"hairLength",value:el}) }} />
          {/* <DropDownInput data={dogEnums.HeightTypes} placeholder="Height" value={height}
            onValueChange={(el: any) => { handleHeightChange(el) }} /> */}
          <DropDownInput data={dogEnums.TailTypes} placeholder="Tail" value={characteristics.tailLength}
            onValueChange={(el: dogTypes.TailTypes) => { handleChange({name:"tailLength",value:el}) }} />

          <DropDownInput data={dogEnums.EarsTypes} placeholder="Ears" value={characteristics.earsType}
            onValueChange={(el: dogTypes.EarsTypes) => { handleChange({name:"earsType",value:el}) }} />

          <DropDownInput data={dogEnums.SpecialMarkTypes} placeholder="Special marks" value={characteristics.specialMark}
            onValueChange={(el: dogTypes.SpecialMarkTypes) => { handleChange({name:"specialMark",value:el}) }} />

          <DropDownInput data={dogEnums.BehaviorsTypes} placeholder="Behaviour" value={characteristics.behaviors}
            onValueChange={(el: dogTypes.BehaviorsTypes) => { handleChange({name:"behaviours",value:el}) }} />
            <View style={{ marginBottom: "50%"}}></View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems:"stretch",
  },
  input: {
    backgroundColor: "#ffffff",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,

    borderRadius: 7,
    color: 'black',
    paddingRight: 30,
  },
  containerStyle: {
    padding: 5
  },
  textInputStyle: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FAF7F6',
  },
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#FAF9F8',
    borderColor: '#bbb',
    borderWidth: 1,
  },
  itemTextStyle: {
    color: '#222',
  },
  itemsContainerStyle: {
    maxHeight: '60%',
  }
});