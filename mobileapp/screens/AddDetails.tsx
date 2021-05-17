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
import * as dogArrays from "../components/dogs/dog/dogArrays";
import * as dogEnums from "../components/dogs/dog/dogEnums"
import DropDownInput from "./dropDownInput";
import NumericInput from 'react-native-numeric-input'
import { IDogCharacteristics } from '../components/dogs/dog/dogInterfaces';
import { BehaviorsTypes } from '../components/dogs/dog/dogEnums';
import { store } from '../redux/store';
import * as Actions from "../redux/actions";
import { initLostDogCharacteristics } from "../components/dogs/dog/dogClasses";
import MultiDropDownInput from './MultiDropDownInput';
import Bubble from './Bubble';
import { MenuItem } from '@material-ui/core';

export default function AddDetails() {
  const [open, setOpen] = useState(false);
  const image = useSelector((state: State) => state.image);
  const dogCharacteristics = useSelector((state: State) => state.dogCharacteristics);
  const dogBehaviours = useSelector((state: State) => state.dogBehaviours);
  const [scroll, setScroll] = useState<boolean>(true);
  const [characteristics, setCharacteristics] = useState<IDogCharacteristics>(dogCharacteristics);
  const [behavs, setBehavs] = useState<BehaviorsTypes[]>(dogCharacteristics.behaviors);



  function areValidCharacteristics(ch: IDogCharacteristics) {
    return (ch.name != initLostDogCharacteristics.name && ch.breed != initLostDogCharacteristics.breed && ch.color != initLostDogCharacteristics.color
      && ch.size != initLostDogCharacteristics.size && ch.hairLength != initLostDogCharacteristics.hairLength && ch.tailLength != initLostDogCharacteristics.hairLength
      && ch.tailLength != initLostDogCharacteristics.tailLength && ch.earsType != initLostDogCharacteristics.earsType && ch.specialMark != initLostDogCharacteristics.specialMark
      && ch.behaviors != initLostDogCharacteristics.behaviors);
  }
  function validateFields(ch: IDogCharacteristics) {
    if (areValidCharacteristics(ch)) {
      store.dispatch(Actions.setDogCharacteristics(ch));
    }
  }

  function handleChange({ name, value }: any) {
    let newCharacteristics = { ...characteristics, [name as string]: value }
    setCharacteristics(newCharacteristics);
    validateFields(newCharacteristics);
  }
  function handleBehaviourChange(value: {label: string, value: string}) {
   
    let newBehavs = behavs.slice();
    if(newBehavs.includes(value.value)){
      let index = behavs.indexOf(value.value);
      newBehavs.splice(index,1);
      setBehavs(newBehavs);
      //behavs = newBehavs;
    }
    else{
      newBehavs.push(value.value);
      setBehavs(newBehavs);
      //behavs = newBehavs;
    }
    if(newBehavs.length > 3){
      newBehavs.splice(0,1);
    }
    let newCharacteristics = {...characteristics, behaviors: newBehavs};
    setCharacteristics(newCharacteristics);
    validateFields(newCharacteristics);
  }


  return (
    <View style={{ padding: 7, backgroundColor: "#ffffff", borderRadius: 5 }}>
      {/* <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> */}
      <ScrollView style={{ backgroundColor: "#e8e9ed", borderRadius: 5, padding: 10 }}
        scrollEnabled={scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView>
          <View style={styles.row}>
            <View style={{ width: "62%", marginRight: "5%" }}>
              <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>Name</Text>
              <TextInput editable defaultValue={characteristics.name} placeholder="Name" style={styles.input} onChangeText={value => handleChange({ name: "name", value: value })}></TextInput>
            </View>

            <View style={{ width: "20%" }}>
              <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>Age</Text>
              <NumericInput value={characteristics.age} onChange={value => handleChange({ name: "age", value: value })} minValue={0} maxValue={100} step={1} rounded={true} borderColor="#ffffff" />
            </View>
          </View>
          <View style={{ marginBottom: 7 }}></View>
          <DropDownInput data={dogArrays.BreedTypes} placeholder="Breed" value={characteristics.breed}
            onValueChange={(el: dogEnums.BreedTypes) => handleChange({ name: "breed", value: el })} />

          <DropDownInput data={dogArrays.ColorTypes} placeholder="Color" value={characteristics.color}
            onValueChange={(el: dogEnums.ColorTypes) => { handleChange({ name: "color", value: el }) }} />

          <DropDownInput data={dogArrays.SizeTypes} placeholder="Size" value={characteristics.size}
            onValueChange={(el: dogEnums.SizeTypes) => { handleChange({ name: "size", value: el }) }} />

          <DropDownInput data={dogArrays.HairTypes} placeholder="Hair" value={characteristics.hairLength}
            onValueChange={(el: dogEnums.HairTypes) => { handleChange({ name: "hairLength", value: el }) }} />
          {/* <DropDownInput data={dogEnums.HeightTypes} placeholder="Height" value={height}
            onValueChange={(el: any) => { handleHeightChange(el) }} /> */}
          <DropDownInput data={dogArrays.TailTypes} placeholder="Tail" value={characteristics.tailLength}
            onValueChange={(el: dogEnums.TailTypes) => { handleChange({ name: "tailLength", value: el }) }} />

          <DropDownInput data={dogArrays.EarsTypes} placeholder="Ears" value={characteristics.earsType}
            onValueChange={(el: dogEnums.EarsTypes) => { handleChange({ name: "earsType", value: el }) }} />

          <DropDownInput data={dogArrays.SpecialMarkTypes} placeholder="Special marks" value={characteristics.specialMark}
            onValueChange={(el: dogEnums.SpecialMarkTypes) => { handleChange({ name: "specialMark", value: el }) }} />

          <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>Behaviour</Text>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                
            {dogArrays.BehaviorsTypes.map((item: {label: string, value: string}) => {
              return(
                <Bubble key={item.label} isSelected={behavs.includes(item.value)} item={item.value} placeholder={item.value} onPress={() => handleBehaviourChange(item)}></Bubble>
              )
              // 
            })}
          </View>
          <View style={{ marginBottom: "50%" }}></View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
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