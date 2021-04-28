import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageUpload from "../components/helper/ImageUpload";

export default class AddDogScreen extends React.Component { 
    render() { 
      return (  
          <View style={styles.container}>  
          <ImageUpload></ImageUpload>
            <Text>Add dog Screen</Text>  
          </View>  
      );  
    }
};

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
    },  
}); 