import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, ImageBackground, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { store } from '../../redux/store';
import * as Actions from "../../redux/actions";
import { IPicture } from '../dogs/dog/dogInterfaces';
import { initLostDogProps, initPicture } from "../dogs/dog/dogClasses";
import { base64StringToBlob } from "blob-util";
import {decode} from "base64-arraybuffer"
import { useSelector } from 'react-redux';
import { State } from '../../redux/reducer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage} from '@fortawesome/free-solid-svg-icons';

export default function ImageUpload()  {
  const [image, setImage] = useState("");
  const bg = {uri: '../../assets/dog-bg.png'}
  //const [picture, setPicture] = useState<IPicture>(initPicture);
  const picture = useSelector((state: State) => state.image);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    setImage(picture);
  },[picture])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      store.dispatch(Actions.setImage(result.uri));
    };
  }


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/images/dog-bg.png')} style={[styles.image, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <View style={{backgroundColor: "#ffffff", width: 355, height: 355, borderRadius:15, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity  onPress={() => pickImage()} >
      
        {/* <Text>Pick an image from camera roll</Text> */}
        {image ? <Image source={{uri: image}} style={{ width: 340, height: 340, borderRadius: 10 }} /> : <FontAwesomeIcon icon={faImage} size={25} ></FontAwesomeIcon>}
      </TouchableOpacity >
      </View>
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
   
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  
});

