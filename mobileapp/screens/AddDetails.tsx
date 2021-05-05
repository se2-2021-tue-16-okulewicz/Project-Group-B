import React, { useState, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
  import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { State } from '../redux/reducer';

export default function AddDetails()  {
    const image = useSelector((state: State) => state.image);
    const [scroll,setScroll] = useState<boolean>(false);
    const DATA = [
        {code: 'AP', name: 'Andhra Pradesh'},
        {code: 'AR', name: 'Arunachal Pradesh'},
      ];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {/* <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> */}
    <ScrollView
          onKeyboardDidShow={() => setScroll(false)}
          onKeyboardDidHide={() => setScroll(true)}
          scrollEnabled={scroll}
          keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView>
            <Autocomplete
              data={DATA}
              displayKey="name"
              placeholder={'Placeholder1'}
              onSelect={value => console.warn('value', value)}
              maxHeight={200}
            />
            <View style={{marginTop: 200}}></View>
            <Autocomplete
              data={DATA}
              displayKey="name"
              placeholder={'Placeholder2'}
              isMandatory={true}
              onSelect={value => console.warn('value', value)}
            />
            <View style={{marginTop: 200}}></View>
 
            <Autocomplete
              data={DATA}
              displayKey="name"
              placeholder={'Placeholder3'}
              onSelect={value => console.warn('value', value)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
    </View>
  );
}