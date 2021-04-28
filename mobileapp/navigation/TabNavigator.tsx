import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createAppContainer} from 'react-navigation'; 
// import { createBottomTabNavigator} from 'react-navigation-tabs'; 
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DogsScreen from "../screens/DogsScreen";
import ProfileScreen from '../screens/ProfileScreen';
import AddDogScreen from '../screens/AddDogScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDog, faPlus, faUserAlt } from '@fortawesome/free-solid-svg-icons'
const inactiveColor = '#7cd47b';
const Tab = createBottomTabNavigator(); 

function MyBottomTab(){
    return(
        <Tab.Navigator
      initialRouteName="Dogs"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
      
    >
      <Tab.Screen
        name="Dogs"
        component={DogsScreen}
        options={{
          tabBarLabel: 'Dogs',
          tabBarIcon: ({focused, tintColor }) => (
          <View>  
              <FontAwesomeIcon icon={faDog} size={25} color={focused ? tintColor : inactiveColor}></FontAwesomeIcon>
            </View>),
        }}
      />
      <Tab.Screen
        name="Add dog"
        component={AddDogScreen}
        options={{
          tabBarLabel: 'Add dog',
          tabBarIcon: ({ focused, tintColor }) => (  
            <View>  
                <FontAwesomeIcon icon={faPlus} size={25} color={focused ? tintColor : inactiveColor}></FontAwesomeIcon>
            </View>) 
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, tintColor }) => (  
            <View>  
                <FontAwesomeIcon icon={faUserAlt} size={25} color={focused ? tintColor : inactiveColor}></FontAwesomeIcon>
            </View>),
        }}
      />
    </Tab.Navigator>
    );
}

  export default MyBottomTab
