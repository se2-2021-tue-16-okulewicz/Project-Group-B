import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, ImageBackground, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { store } from '../../redux/store';
import * as Actions from "../../redux/actions";
import { IPicture, Picture } from '../dogs/dog/dogInterfaces';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reducer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export default function ImageUpload() {
  const bg = require('../../assets/images/dog-bg.png');
  const [image, setImage] = useState("");
  const picture = useSelector((state: State) => state.picture);
  const dogImage = useSelector((state: State) => state.image);
  const [dogPicture, setDogPicture] = useState<Picture>(picture);
  //var Buffer = require('buffer/').Buffer
  //const imageToBase64 = require('image-to-base64');

  function ab2str(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  function str2ab(str: string) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  

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
    setImage(dogImage);
  }, [dogImage])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaType: 'photo',
      saveToPhotos: true,
      includeBase64: true,
      base64: true,
      fileName: true,
      type: true
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(str2ab("Hello!").byteLength);
      const data: ArrayBuffer = (str2ab((result.base64) as string)) as ArrayBuffer;
      setDogPicture({ id: 0, fileName: "upload.jpeg", fileType: "image/jpeg", data: result.base64} as Picture)
      store.dispatch(Actions.setImage(result.uri));
      console.log(data.byteLength);
      store.dispatch(Actions.setPicture({ id: 0, fileName: "upload.jpeg", fileType: "image/jpeg", data: result.base64} as Picture));
    };


  }


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={bg} style={[styles.image, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <View style={{ backgroundColor: "#ffffff", width: 355, height: 355, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => pickImage()} >
            {image ? <Image
              style={{ width: 340, height: 340, borderRadius: 10 }}
              source={{
                uri: `data:${dogPicture.fileType};base64,${
                  dogPicture.data
                }`,
              }}
            /> : <FontAwesomeIcon icon={faImage} size={25} ></FontAwesomeIcon>}

            {/* {image ? <Image source={{uri: image}} style={{ width: 340, height: 340, borderRadius: 10 }} /> : <FontAwesomeIcon icon={faImage} size={25} ></FontAwesomeIcon>} */}
          </TouchableOpacity >
        </View>

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

