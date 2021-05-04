import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { store } from '../../redux/store';
import * as Actions from "../../redux/actions";

export default function ImageUpload()  {
  const [image, setImage] = useState("");

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      store.dispatch(Actions.setImage(image));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity  onPress={() => pickImage()} >
        <Text>Pick an image from camera roll</Text>
      </TouchableOpacity >
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
    {image ? <Image source={{ uri: image }} style={{ width: 400, height: 400 }} /> : < View/>}
    </View>
  );
}