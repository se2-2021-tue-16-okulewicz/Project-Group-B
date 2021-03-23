import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import Icon5 from "react-native-vector-icons/FontAwesome5";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Cars"
      tabBarOptions={{ }}
    >
      {/* <BottomTab.Screen
        name="Cars"
        component={CarsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon5 name="car" size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Bookings"
        component={BookingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon5 name="book" size={25} color={color} />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function CarsNavigator() {
  return (
    <TabOneStack.Navigator>
      {/* <TabOneStack.Screen
        name="Cars"
        component={CarsScreen}
        options={{ headerTitle: "Cars" }}
      />

      <TabOneStack.Screen
        name="CarDetails"
        component={CarsDetailsScreen}
        options={{ headerTitle: "Details" }}
      /> */}
    </TabOneStack.Navigator>
  );
}
function BookingsNavigator() {
  return (
    <TabOneStack.Navigator>
      {/* <TabOneStack.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{ headerTitle: "Bookings" }}
      />

      <TabOneStack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{ headerTitle: "Details" }}
      /> */}
    </TabOneStack.Navigator>
  );
}
