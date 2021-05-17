import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createAppContainer } from "react-navigation";
// import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DogsScreen from "../screens/DogsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddDogScreen from "../screens/AddDogScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDog, faPlus, faUserAlt } from "@fortawesome/free-solid-svg-icons";
const inactiveColor = "#c5c5c7";
const activeTintColor = "#e04e3a";
const Tab = createBottomTabNavigator();

function MyBottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Dogs"
      tabBarOptions={{
        activeTintColor: activeTintColor,
      }}
    >
      <Tab.Screen
        name="Dogs"
        component={DogsScreen}
        options={{
          tabBarLabel: "Dogs",
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesomeIcon
                icon={faDog}
                size={25}
                color={focused ? activeTintColor : inactiveColor}
              ></FontAwesomeIcon>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add dog"
        component={AddDogScreen}
        options={{
          tabBarLabel: "Add dog",
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesomeIcon
                icon={faPlus}
                size={25}
                color={focused ? activeTintColor : inactiveColor}
              ></FontAwesomeIcon>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesomeIcon
                icon={faUserAlt}
                size={25}
                color={focused ? activeTintColor : inactiveColor}
              ></FontAwesomeIcon>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyBottomTab;
